// Converted to Javascript from https://en.wikipedia.org/wiki/Hilbert_curve

function xy2d(n, x, y) {
	var rx, ry, s, d = 0;
	for(s = n / 2; s > 0; s /= 2) {
		rx = (x & s) > 0;
		ry = (y & s) > 0;
		d += s * s * ((3 * rx) ^ ry);
		
		var result = rot(s, x, y, rx, ry);
		x = result.x;
		y = result.y;
	}
	return d;
}

function d2xy(n, d) {
	var rx, ry, s, t = d, x = 0, y = 0;
	for(s = 1; s < n; s *= 2) {
		rx = 1 & (t / 2);
		ry = 1 & (t ^ rx);
		var result = rot(s, x, y, rx, ry);
		x = result.x;
		y = result.y;
		x += s * rx;
		y += s * ry;
		t /= 4;
	}
	return { x: x, y: y };
}

function rot(n, x, y, rx, ry) {
	if(ry == 0) {
		if(rx == 1) {
			x = n - 1 - x;
			y = n - 1 - y;
		}

		var t = x;
		x = y;
		y = t;
	}
	return { x: x, y: y };
}