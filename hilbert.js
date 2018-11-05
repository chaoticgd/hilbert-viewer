/*
	Copyright (c) 2018 chaoticgd

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

// Converted to Javascript from https://en.wikipedia.org/wiki/Hilbert_curve

const Direction = {
	up: 0,
	right: 1,
	down: 2,
	left: 3
};

function xy2d(n, x, y) {
	y = n - y;

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
	return { x: x, y: n - y };
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