function testButtonClick()
{
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;
	var layer = layers[0];
	var selectedProperties = comp.selectedProperties;
	var property = selectedProperties[0];
	
	var propPath = getPropPath(property);
	// var prop = eval("layer.property"+getPropPath(property));
	var compPropPath = "comp(\"" + comp.name + "\").layer(\"" + layer.name + "\")" + propPath.join("")
	alert(compPropPath);
}

function getPropPath(prop)
{
	var layerRoot = false;
	// var propPath = "";
	var propPath = [];	
	
	for(var i = 0; prop.parentProperty; i++)
	{
		// propPath = "("+prop.propertyIndex+")"+propPath;
		// propPath = "('"+prop.name+"')"+propPath;
		propPath[i] = "('"+prop.name+"')";
		// propPath = "('"+prop.matchName+"')"+propPath;
		prop = prop.parentProperty;
	}
	return propPath;
}

testButtonClick();
