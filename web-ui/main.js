
function show_data(d) {
	write_output("emas: " + JSON.stringify(d.emas) + "\n");
	var a = d.prices;
	for (var i = 0; i < a.length; ++i) {
		var p = a[i];
		write_output(p.date.toISOString() + "\t" + p.price + "\n");
		var s = '';
		for (var j = 0; j < d.emas.length; ++j) {
			s = s + "\t" + d.emas[j] + ": " + p["ema-" + d.emas[j]];
		}
		s = s + "\n";
		write_output(s);
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

function process_data(o, t) {
	var d = JSON.parse(t); 

	//write_output(t);

	var a = d["prices"] // price data should be here as 2 - element arrays of timestamp/price pairs
	var p = new Array();
	for (var i = 0; i < a.length; ++i) {
		p.push(process_price(a[i]));
	}
	o.prices = p;
	calculate_emas(o);
	o.prices.sort(function (a,b) { return b.date - a.date });
	return o;
}

function load_data(d) {
	var u = build_data_url(d)
//	alert(u);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", u, true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				show_data(process_data(d, xhr.responseText));
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

function string_to_numbers(s) {
	var a = new Array();
	var n = s.split(/\s+/);
	for (i = 0; i < n.length; ++i) {
		var p = parseInt(n[i]);
		if (! isNaN(p)) { a.push(p); }
	}
	return a;
}

function parse_emas(t) {
	var a = string_to_numbers(t);
	a.sort(function (a,b) { return b - a; });
	// we want to sort in reverse numerical order
	// because we'll be checking for crossings against the largest ema
	return a;
}
function parse_form() {
	var f = document.forms["input"];
	var o = {
		asset: f["asset"].value,
		currency: f["currency"].value,
		interval: f["interval"].value,
	};
	o.days = (('daily' == o.interval) ? 330 : 14);
	o.emas = parse_emas(f["emas"].value);
	return o;
	

}

function calculate_ema(p, e) {
	var k = "ema-" + e;
	write_output("calculating " + k + "\n");
	//to calculate the ema, we must calculate the SMA for the first value.
	// then the ema for each period is:
	// (current price - previous ema) * smoothing constant + previous ema
	// the smoothing constant is 2 / (ema level + 1)
	var s = 2 / (e + 1);
	//first we need to calculate the sma for the first value.
	// we'll do this by averaging the first n values where n is the ema level
	var ema = 0;
	for (var i = 0; i < p.length; ++i) {
		if (i < e - 1) {
			// we're still accumulating data for the first ema
			ema += p[i].price;
		} else if (i == e - 1) {
			ema = ema / e;
			p[i][k] = ema;
		} else {
			ema = (p[i].price - ema) * s + ema;
			p[i][k] = ema;
		}
	}

}

function calculate_emas(d) {
	// this function modifies d
	write_output("calculating emas\n");
	for (var i = 0; i < d.emas.length; ++i) {
		calculate_ema(d.prices, d.emas[i]);
	}
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

	load_data(d);

}
