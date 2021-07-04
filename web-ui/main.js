
function show_data(a) {
	for (var i = 0; i < a.length; ++i) {
		var d = a[i];
		write_output(d.date.toISOString() + "\t" + d.price + "\n");
	}
}

function process_price(a) {
	// a is a two-element array with a timestamp and a price
	var o = new Object;
	o.price = a[1];
	o.timestamp = a[0];
	o.date = new Date(a[0] + 1000); //convert unix timestamp to javascript date object
	return o;
}

function process_data(t) {
	var d = JSON.parse(t); 

	//write_output(t);

	var a = d["prices"] // price data should be here as 2 - element arrays of timestamp/price pairs
	var o = new Array();
	for (var i = 0; i < a.length; ++i) {
		o.push(process_price(a[i]));
	}
	return o;
}

function load_data(u) {
//	alert(u);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", u, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				show_data(process_data(xhr.responseText));
			} else {
				process_error(xhr.statusText);
			}
		}
	};
	xhr.onerror = function (e) { process_error(xhr.statusText); };
	xhr.send(null); 
}

function build_data_url (d) {
	return 'https://api.coingecko.com/api/v3/coins/' + d["asset"] + '/market_chart?vs_currency=' + d["currency"] + '&days=' + d["days"] + '&interval=' + d["interval"];
}

function parse_form() {
	var f = document.forms["input"];
	var o = {
		asset: f["asset"].value,
		currency: f["currency"].value,
		interval: f["interval"].value,
	};
	o.days = (('daily' == o.interval) ? 330 : 14);
	return o;
	

}

function write_output(t) {
//	document.forms["input"]["output"].value = t;
	document.write('<pre>' + t + '</pre>');
}

function clicked_form() {
	var d = parse_form();
	var o = "";

	o += d["asset"] + "/" + d["currency"] + " " + d["interval"] + "\n";

	write_output(o);

	load_data(build_data_url(d));

}
