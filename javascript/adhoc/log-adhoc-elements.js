// Helper script to log page elements to a new window depending on
// a jQuery selection.
var header = "<html><head><title>Adhoc window</title></head><body>";
var output = "";
$("img").each(function(){
	output += $(this).attr("src") + "<br>";
});
footer = "</body></html>";
var content = header + escape(output) + footer;
window.open("data:text/html," + content, "Window Title (not shown)");