//@include 'functions.js';
//@include 'ecma5.js';

var proj = app.project;
proj.save();
var comp = activeComp();
var selProps = comp.selectedProperties;
createExpressionDirectory()

selProps.forEach(function(property){
	// var path = getPropPath(property);
	if(!checkExistingFile(property)){
		createFile(property);		
	}else if(confirm('There already exists an expression!\nOverwrite it?')){
		createFile(property);
	}else{
		openFile(property);
	}
	
})
