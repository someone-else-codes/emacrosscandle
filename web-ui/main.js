
function process_data(t) {
	write_output(t);
}

function load_data(u) {
//	alert(u);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", u, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				process_data(xhr.responseText);
			} else {
				process_error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) { process_error(xhr.statusText); };
	xhr.send(null); 
}

function build_data_url (d) {
	return 'https://api.coingecko.com/api/v3/coins/' + d["asset"] + '/market_chart?vs_currency=' + d["currency"] + '&days=7&interval=hourly';
}

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

	load_data(build_data_url(d));

}
