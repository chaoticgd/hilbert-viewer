window.addEventListener('load', function() {
	var aside = document.getElementsByTagName('aside')[0];
	document.getElementById('toggle-aside').addEventListener('click', function() {
		if(aside.className == '') {
			aside.className = 'hidden';
		} else {
			aside.className = '';
		}
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

		context.drawImage(
			image,
			canvas.width / 2 - imageSize.x / 2,
			canvas.height / 2 - imageSize.y / 2,
			imageSize.x,
			imageSize.y);
	}

	window.setInterval(draw, 1000 / 30);
});