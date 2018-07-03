#include 'i:/FAZNET/Videoschnitt/Vorlage/Scripts/functions.js';

var comp = activeComp();

alert("There are " + comp.selectedProperties.length + " properties selected.");

var prop1 = comp.selectedProperties[0];

if (prop1.canSetExpression){
	alert("Yes - It can set Expressions");
}else{
	alert("No - It can't set Expressions");
}
