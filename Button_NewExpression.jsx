//@include 'functions.js';
//@include 'ecma5.js';

var proj = app.project;
proj.save();

var selProps = comp.selectedProperties;

selProps.forEach(function(property){
	var path = getPropPath(property);
	if(!checkExistingFile(path)){
		createFile(property);		
	}else if(confirm('There already exists an expression!\nOverwrite it?')){
		createFile(property);
	}else{
		openFile(property);
	}
	
})
