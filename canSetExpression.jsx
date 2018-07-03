#include 'i:/FAZNET/Videoschnitt/Vorlage/Scripts/functions.js';

var comp = activeComp();

var prop1 = comp.selectedProperties[0];

if (prop1.canSetExpression){
	alert("Yes - It can set Expressions");
}else{
	alert("No - It can't set Expressions");
}
