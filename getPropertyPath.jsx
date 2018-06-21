//Copyright: Jakob Wagner and Xavier Gomez (https://forums.creativecow.net/docs/forums/post.php?forumid=227&postid=33493&univpostid=33493&pview=t)

function testButtonClick()
{
	var comp = app.project.activeItem;
	var layers = comp.selectedLayers;
	var layer = layers[0];
	var selectedProperties = comp.selectedProperties;
	var property = selectedProperties[0];
	
	var propPath = getPropPath(property);
	var prop = eval("layer.property"+getPropPath(property));
	alert(propPath);
}

function getPropPath(prop)
{
	var layerRoot = false;
	var propPath = "";
	
	while(prop.parentProperty)
	{
		// propPath = "("+prop.propertyIndex+")"+propPath;
		propPath = "('"+prop.name+"')"+propPath;
		// propPath = "('"+prop.matchName+"')"+propPath;
		prop = prop.parentProperty;
	}
	return propPath;
}

testButtonClick();
