//@include 'functions.js';
//@include 'ecma5.js';
//@include 'sublPath.js';

if(!checkSublimePath()){
	var sublFile = File.openDialog("Choose subl.exe");
	
	var newPath = replaceSpecialCharacter(sublFile.path);
	sublFile.close();
	newPath = doubleBackslash(newPath) + "\\\\subl"
	
	var newFile = new File(getThisPath()  + "/sublPath.js");
	newFile.open("w");
	newFile.write("var sublPath = \"" + newPath + "\";");
	newFile.close();
}
