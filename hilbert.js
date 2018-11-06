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

const Orientation = {
	down: 0,
	left: 1,
	up: 2,
	right: 3,
	downFlipped: 4,
	leftFlipped: 5,
	upFlipped: 6,
	rightFlipped: 7
};

function rot90cc(n, point) {
	return {
		x: n / 2 - (point.y - n / 2),
		y: n / 2 + (point.x - n / 2)
	}
}

function flipX(n, point) {
	point.x = n - point.x;
	return point;
}

function flipY(n, point) {
	point.y = n - point.y;
	return point;
}

function rotatePoint(n, point, orientation) {
	switch(orientation) {
		case Orientation.down:
			return point;
		case Orientation.left:
			return rot90cc(n, point);
		case Orientation.up:
			return rot90cc(n, rot90cc(n, point));
		case Orientation.right:
			return rot90cc(n, rot90cc(n, rot90cc(n, point)));
		
		case Orientation.downFlipped:
			return flipX(n, point);
		case Orientation.leftFlipped:
			return flipY(n, rot90cc(n, rot90cc(n, rot90cc(n, point))));
		case Orientation.upFlipped:
			return flipX(n, rot90cc(n, rot90cc(n, point)));
		case Orientation.rightFlipped:
			return flipY(n, rot90cc(n, point));
	}

	throw 'Invalid orientation: ' + orientation;
}

function rotatePointBack(n, point, orientation) {
	switch(orientation) {
		case Orientation.down:
			return point;
		case Orientation.left:
			return rot90cc(n, rot90cc(n, rot90cc(n, point)));
		case Orientation.up:
			return rot90cc(n, rot90cc(n, point));
		case Orientation.right:
			return rot90cc(n, point);
		
		case Orientation.downFlipped:
			return flipX(n, point);
		case Orientation.leftFlipped:
			return rot90cc(n, flipY(n, point));
		case Orientation.upFlipped:
			return rot90cc(n, rot90cc(n, flipX(n, point)));
		case Orientation.rightFlipped:
			return rot90cc(n, rot90cc(n, rot90cc(n, flipY(n, point))));
	}

	throw 'Invalid orientation: ' + orientation;
}

function xy2d(n, point, orientation) {
	point.y = n - point.y;
	point = rotatePoint(n, point, orientation);

	var rx, ry, s, d = 0;
	for(s = n / 2; s > 0; s /= 2) {
		rx = (point.x & s) > 0;
		ry = (point.y & s) > 0;
		d += s * s * ((3 * rx) ^ ry);
		
		point = rot(s, point.x, point.y, rx, ry);
	}
	return d;
}

function d2xy(n, d, orientation) {
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

	var result = rotatePointBack(n, { x: x, y: y }, orientation);
	return { x: result.x, y: n - result.y };
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