//@include 'sublPath.js';

// Selektierte Kompositionen suchen


function selectedComp(){
	for (var i = 1; i <= app.project.numItems; i ++) {
	    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).selected === true)) {
	        return app.project.item(i);
        }
	}
}

// Aktive Komposition speichern

function activeComp(){
	var activeItem = app.project.activeItem;
	if (activeItem instanceof CompItem){
	return activeItem;
	}
	return null;
}


// Export String to the current open file in Sublime

function exportTextToSublime(textArray){
	for(var i=0; i<textArray.length; i++){
		$.sleep(10);
		system.callSystem(sublPath + " --command \"insert { \\\"characters\\\": \\\"" + convertExpression(textArray[i]) + "\\\" }\"");
		$.sleep(10);
		if (i+1 != textArray.length) {
			system.callSystem(sublPath + " --command \"insert { \\\"characters\\\": \\\"" + "\\n" + "\\\" }\"");
		}
	}
	$.sleep(500);	
}

// Open Sublime and wait 1/2 second
function openSublime(){
	system.callSystem(sublPath + " test.js");
	$.sleep(500); //tell extendscript to sleep 1000 milliseconds
}

function getExpression(property){
	// var comp = activeComp();
	// var selProps = comp.selectedProperties;
	// var prop1 = selProps[0];
	return property.expression.split(/\r\n/);
}

function convertExpression(textString){
	var quotationMarks = /\"/g;
	var carriageReturn = /\r\n/g;
	var newString = textString.replace(quotationMarks, "\\\\\\\"");
	return newString;
}

function getPropPath(prop)
{
	var layerRoot = false;
	var propPath = [];	
	
	for(var i = 0; prop.parentProperty; i++)
	{
		propPath[i] = "('"+prop.name+"')";		
		prop = prop.parentProperty;
	}
	return propPath.reverse().join("");
}

function createExpressionPath(selProperty)
{
	var propPath = getPropPath(selProperty);	
	var compPropPath = "comp(\"" + activeComp().name + "\").layer(\"" + layer.name + "\")" + propPath.join(""); // !!! Hier noch die Funktionsweise von comp prüfen und Funktion für Layer schreiben
	alert(compPropPath);
}

function checkExistingFile(propPath){
	var fileName = propPath.replace(/[(|"|\.|'\s)]/g, "") + ".js";	
	var searchFile = system.callSystem("where \/R " + getProjectPath() + " " + fileName).split(/\r\n/)[0];
	var projPath = app.project.file.toString().replace(/[^\/|.]+\.aep/, "").replace(/\//, "").replace(/(.)/, "$1:").replace(/\//g, "\\");
	var newFilePath = projPath + fileName;
	return searchFile === newFilePath;
}

function getProjectPath(){
	var projPath = app.project.file.toString();
	projPath = doubleBackslash(projPath);
	projPath = deleteProjName(projPath);
	return projPath;
}

function doubleBackslash(path){
	return path.replace(/\//, "").replace(/(.)/, "$1:").replace(/\//g, "\\\\");
}

function deleteProjName(path){
	return path.replace(/[^\\\\|.]+\.aep/, "");
}

function createFile(property){
	var txtFilePath = createFilePathForwardslash(property);
	var txtFile = new File(txtFilePath);
	txtFile.open("w");
	
	system.callSystem(sublPath + " " + doubleBackslash(txtFile.path) + "\\\\"  + fileName);	
	txtFile.close();
	var existingExpression = getExpression(property);
	exportTextToSublime(existingExpression);
}

function openFile(property){
	var txtFilePath = createFilePathForwardslash(property);
	system.callSystem(sublPath + " " + txtFilePath.replace(/\//g, "\\\\"));
}

function createFilePathForwardslash(property){ // creates i:/FAZNET/Videoschnitt/.../TransformierenAnkerpunkt.js

	var pathToProperty = getPropPath(property); //=> ('Transformieren')('Ankerpunkt')
	var fileName = pathToProperty.replace(/[(|"|\.|'|\s)]/g, "") + ".js"; //=> TransformierenAnkerpunkt.js
	var projPath = app.project.file.toString().replace(/[^\/|.]+\.aep/, ""); //=> /i/FAZNET/Videoschnitt/.../
	var newFilePath = projPath.replace(/\//, "").replace(/(.)/, "$1:"); //=> i:/FAZNET/Videoschnitt/.../	
	var txtFilePath = newFilePath + escape(fileName);//=> i:/FAZNET/Videoschnitt/.../TransformierenAnkerpunkt.js
	return txtFilePath;
}




// check Sublime path

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
		"ẞ" : /%E1%BA%9E/g,


	}
	Object.keys(objSpecChar).forEach(function(element){		
		str = str.replace(objSpecChar[element], element.toString());
	})
	return str;
}
