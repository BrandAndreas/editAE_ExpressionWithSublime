//@include 'functions.js';
//@include 'ecma5.js';

var proj = app.project;
proj.save();

var selProps = comp.selectedProperties;


for(var i=0; i < selProps.length; i++){
	if(!selProps[i].canSetExpression) continue;
	xpression = getNewExpression(selProps[i]);
	selProps[i].expression = xpression;
}
