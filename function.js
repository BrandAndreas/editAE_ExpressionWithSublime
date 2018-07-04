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

function getExpression(){
	var comp = activeComp();
	var selProps = comp.selectedProperties;
	var prop1 = selProps[0];
	return prop1.expression.split(/\r\n/);
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
	return propPath.reverse();
}

function createExpressionPath(selProperty)
{
	var propPath = getPropPath(selProperty);	
	var compPropPath = "comp(\"" + activeComp().name + "\").layer(\"" + layer.name + "\")" + propPath.join(""); // !!! Hier noch die Funktionsweise von comp prüfen und Funktion für Layer schreiben
	alert(compPropPath);
}

function checkExistingFile(propPath){
	var fileName = propPath.replace(/[(|"|\.|)]/g, "") + ".js";
	var searchFile = system.callSystem("where /R " + getProjectPath);
	if ()
}

function getProjectPath(){
	return app.project.file.,toString();
}

function doubleBackslash(path){
	return path.replace(/\//, "").replace(/(.)/, "$1:").replace(/\//g, "\\\\");
}
