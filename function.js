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
		system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl --command \"insert { \\\"characters\\\": \\\"" + convertExpression(textArray[i]) + "\\\" }\"");
		$.sleep(10);
		if (i+1 != textArray.length) {
			system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl --command \"insert { \\\"characters\\\": \\\"" + "\\n" + "\\\" }\"");
		}
	}
	$.sleep(500);	
}

// Open Sublime and wait 1/2 second
function openSublime(){
	system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl test.js");
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
