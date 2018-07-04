//@include 'functions.js';
var proj = app.project;
proj.save();
var projPath = getProjPath();


var newText = getExpression();

openSublime();
exportTextToSublime(newText);
