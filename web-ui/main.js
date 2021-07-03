
function parse_form() {
	var f = document.forms["input"];
	return {
		asset: f["asset"].value,
		currency: f["currency"].value,
		timeframe: f["timeframe"].value,
		units: f["units"].value,
	};
}

function write_output(t) {
//	document.forms["input"]["output"].value = t;
	document.write('<pre>' + t + '</pre>');
}

function clicked_form() {
	var d = parse_form();
	var o = "";

	o += d["asset"] + "/" + d["currency"] + "\n";
	o += d["timeframe"] + " " + d["units"] + "\n";

	write_output(o);

}
