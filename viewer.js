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

	function openImage() {
		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			var image = new Image();
			image.addEventListener('load', function() {
				
			});
			image.src = event.target.result;
		});
	}

	document.getElementById('open-image-button').addEventListener('click', function() {
		
	});
});