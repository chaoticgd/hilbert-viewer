function connect(id, callback) {
	document.getElementById(id).addEventListener('click', callback);
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

	function openImage(event) {
		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			image.src = event.target.result;
		});
		reader.readAsDataURL(event.target.files[0]);
	}

	document.getElementById('open-file-button').addEventListener('change', openImage);

	function draw() {
		canvas.width = Math.max(canvas.clientWidth, canvas.innerWidth || 0);
		canvas.height = Math.max(canvas.clientHeight, canvas.innerHeight || 0);

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

		var rect = {
			x: canvas.width / 2 - imageSize.x / 2,
			y: canvas.height / 2 - imageSize.y / 2,
			width: imageSize.x,
			height: imageSize.y
		};

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
});