//@include 'sublPath.js';



// ######### Project and Comp ##########

function activeComp(){
	var activeItem = app.project.activeItem;
	if (activeItem instanceof CompItem){
	return activeItem;
	}
	return null;
}

function getProjectPath(){ //=> i:\\FAZNET\\...\\
	var projPath = app.project.file.toString();
	projPath = doubleBackslash(projPath);
	projPath = deleteProjName(projPath);
	return projPath;
}

function getExpressionPath(){
	var projPath = getProjectPath();
	return projPath + "expression\\\\"
}

function createExpressionDirectory(){
	myFolder = new Folder(getExpressionPath());
	myFolder.create();
}



// ######### To Sublime ##########

function callSublime(str){
	system.callSystem(sublPath + str);
}

function insertStringInSublime(str){
	callSublime(" --command \"insert { \\\"characters\\\": \\\"" + str + "\\\" }\"");
}

// Export String to the current open file in Sublime

function exportTextToSublime(textArray){
	for(var i=0; i<textArray.length; i++){
		$.sleep(10);
		insertStringInSublime(convertExpression(textArray[i]));
		
		$.sleep(10);
		if (i+1 != textArray.length) {
			insertStringInSublime("\\n");			
		}
	}

	$.sleep(500);	
}


function createFile(property){
	var filePath = createFilePath(property);

	var txtFile = new File(filePath);
	txtFile.open("w");
	system.callSystem(sublPath + " " + filePath);	
	txtFile.close();
	
	var existingExpression = getExpression(property);
	exportTextToSublime(existingExpression);
}

function openFile(property){
	var txtFilePath = createFilePath(property);
	callSublime(" " + stxtFilePath);
}




// ######### Read Properties ##########

function getPropPath(prop){ //=> ('Transformieren')('Ankerpunkt')
	var layerRoot = false;
	var propPath = [];	
	
	for(var i = 0; prop.parentProperty; i++)
	{
		propPath[i] = "('"+prop.name+"')";		
		prop = prop.parentProperty;
	}
	return propPath.reverse().join("");
}

function getExpression(property){ //=> [var a="10";, [10,20]]
	if(!property){
		alert("Please select at least one property.");
		return;
	}
	return property.expression.split(/\r\n/);
}

function createExpressionPath(selProperty)
{
	var propPath = getPropPath(selProperty);	
	var compPropPath = "comp(\"" + activeComp().name + "\").layer(\"" + layer.name + "\")" + propPath.join(""); // !!! Hier noch die Funktionsweise von comp prüfen und Funktion für Layer schreiben
	alert(compPropPath);
}

function checkExistingFile(property){
	var fileName = createFilename(property);
	var searchFile = system.callSystem("where \/R " + getExpressionPath() + " " + fileName).split(/\r\n/)[0];
	searchFile = searchFile.replace(/\\/g, "\\\\")

	var newFilePath = createFilePath(property);
	
	return searchFile === newFilePath;
}

// !! Bekommt nicht nur neue Expression, sondern erzeugt auch Datei. Das muss noch getrennt werden.

function getNewExpression(property){
	var FilePath = createFilePath(property);
	
	var expFile = new File(FilePath);
	expFile.open("r");
	var exp = expFile.read();	
	expFile.close();
	return exp;
}

// ######### Prepare Strings for Export to Sublime ##########

function forwardToTwoBackslashes(str){
	return str.replace(/\//g, "\\\\");
}

function createFilename(property){ //=> TransformierenAnkerpunkt.js
	var pathToProperty = getPropPath(property); 
	return pathToProperty.replace(/[(|"|\.|'|\s)]/g, "") + ".js"; 
}

function createPathToFile(){ //=> /i/FAZNET/Videoschnitt/.../
	var projPath = app.project.file.toString().replace(/[^\/|.]+\.aep/, "");
	return projPath.replace(/\//, "").replace(/(.)/, "$1:");
}

function convertExpression(textString){ //=> var a = \\\"10\\\";
	var quotationMarks = /\"/g;	
	var newString = textString.replace(quotationMarks, "\\\\\\\"");
	return newString;
}

// !! Nicht nur doubleBackslash, auch i/ zu i:
function doubleBackslash(path){
	return path.replace(/\//, "").replace(/(.)/, "$1:").replace(/\//g, "\\\\");
}

function deleteProjName(path){ // Kills projectname.aep at the end of string
	return path.replace(/[^\\\\|.]+\.aep/, "");
}

function createFilePath(property){ //=> i:\\FAZNET\\Videoschnitt\\...\\TransformierenAnkerpunkt.js
	var fileName = createFilename(property);
	var projPath = getExpressionPath();	
	var txtFilePath = projPath + fileName;
	return txtFilePath;
}




// ######### check Sublime path ##########

function getThisPath(){
	var thisFile = new File($.fileName);  
	return basePath = thisFile.path;
}

function checkSublimePath(){
	var sublExePath = sublPath + ".exe";
	var searchFile = system.callSystem("where \/R " + sublPath.replace(/subl/, "") + " subl.exe").split(/\r\n/)[0];
	return searchFile === sublExePath;
}

function replaceSpecialCharacter(str){
	objSpecChar = {
		"Ü" : /%C3%9C/g,
		"Ä" : /%C3%84/g,
		"Ö" : /%C3%96/g,
		"ß" : /%C3%9F/g,
		"ä" : /%C3%A4/g,
		"ö" : /%C3%B6/g,
		"ü" : /%C3%BC/g,
		"ẞ" : /%E1%BA%9E/g
	}
	Object.keys(objSpecChar).forEach(function(element){		
		str = str.replace(objSpecChar[element], element.toString());
	})
	return str;
}
