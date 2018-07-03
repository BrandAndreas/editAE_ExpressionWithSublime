system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl test.js");
$.sleep(500); //tell extendscript to sleep 1000 milliseconds
// alert("Kurze Pause");
system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl --command \"insert { \\\"characters\\\": \\\"super\\\" }\"");


function exportTextToSublime(textString){
	$.sleep(500);
	system.callSystem("I:\\FEM-Multimedia\\Übergabe\\Andreas_Temp\\Technik\\Sublime\\subl --command \"insert { \\\"characters\\\": \\\"" + "\\n" + textString + "\\\" }\"");
}

exportTextToSublime("Noch ein Text");
