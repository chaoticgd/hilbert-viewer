function connect(id, callback) {
	document.getElementById(id).addEventListener('click', callback);
}

function clamp(val, lower, upper) {
	return Math.max(Math.min(val, upper), lower);
}

window.addEventListener('load', function() {
	var aside = document.getElementsByTagName('aside')[0];
	connect('toggle-aside', function() {
		if(aside.className == '') {
			aside.className = 'hidden';
		} else {
			aside.className = '';
		}
	});

	var zoom = 1;

	connect('zoom-in', function() {
		zoom *= 1.25;
	});
	connect('zoom-out', function() {
		zoom /= 1.25;
	});
	connect('zoom-fit', function() {
		zoom = 1;
	});

	var canvas = document.getElementById('viewport');
	var context = canvas.getContext('2d');

	var image = new Image();
	const padding = 32;

	var cursorPosition = { x: 0, y: 0 };

	function openImage(event) {
		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			image.src = event.target.result;
		});
		reader.readAsDataURL(event.target.files[0]);
	}

	document.getElementById('open-file-button').addEventListener('change', openImage);

	function getImageRectangle() {
		var imageSize = {};
		if(canvas.width > canvas.height) {
			imageSize.x = canvas.height - 2 * padding;
			imageSize.y = canvas.height - 2 * padding;
		} else {
			imageSize.x = canvas.width - 2 * padding;
			imageSize.x = canvas.width - 2 * padding;
		}

		imageSize.x *= zoom;
		imageSize.y *= zoom;

		return {
			x: canvas.width / 2 - imageSize.x / 2,
			y: canvas.height / 2 - imageSize.y / 2,
			width: imageSize.x,
			height: imageSize.y
		};
	}

	function draw() {
		canvas.width = Math.max(canvas.clientWidth, canvas.innerWidth || 0);
		canvas.height = Math.max(canvas.clientHeight, canvas.innerHeight || 0);

		var rect = getImageRectangle();

		context.beginPath();
		context.moveTo(rect.x, rect.y);
		context.lineTo(rect.x, rect.y + rect.height);
		context.lineTo(rect.x + rect.width, rect.y + rect.height);
		context.lineTo(rect.x + rect.width, rect.y);
		context.lineTo(rect.x, rect.y);

		context.strokeStyle = '#aaa';
		context.stroke();

		context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
	}

	window.setInterval(draw, 1000 / 30);

	canvas.addEventListener('mousemove', function(event) {
		var rect = getImageRectangle();

		cursorPosition.x = clamp(((event.offsetX - rect.x) * image.width) / rect.width, 0, image.width);
		cursorPosition.y = clamp(((event.offsetY - rect.y) * image.height) / rect.height, 0, image.height);

		document.getElementById('cursor-x-image').innerText = Math.floor(cursorPosition.x);
		document.getElementById('cursor-y-image').innerText = Math.floor(cursorPosition.y);
		document.getElementById('cursor-x').innerText = Math.floor(1000 * cursorPosition.x / image.width) / 1000;
		document.getElementById('cursor-y').innerText = Math.floor(1000 * cursorPosition.y / image.height) / 1000;

		var offset = xy2d(image.width, cursorPosition.x, cursorPosition.y);
		document.getElementById('cursor-offset').innerText = offset;
		document.getElementById('cursor-offset-hex').innerText = offset.toString(16);
	});
});