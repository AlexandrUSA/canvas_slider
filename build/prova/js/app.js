jQuery(document).ready(function ($) {
	let state = {
		pos: 0
	};

	let cols = 50;
	let rows = 50;
	let canvas = $('#c1')[0];
	let context = canvas.getContext('2d');
	let image1 = $('#img1')[0];
	let image2 = $('#img2')[0];
	let image3 = $('#img3')[0],
		buts = document.querySelectorAll('.but'),
		newcanvas = $('<canvas></canvas>')[0];
	let newcontext = newcanvas.getContext('2d'),
		nextImg = image1,
		currImg = image1,
		b1 = true,
		b2 = false,
		b3 = false,
		isBlocked = false;	// Если анимка идет то запрещаем жать на любые кнопки
	//$('body').prepend(newcanvas);




	function setCanvasSize(canvas) {
		canvas.width = 1800;
		canvas.height = 1200;
		$(canvas).css('width', 900);
		$(canvas).css('height', 600);
	}

	setCanvasSize(canvas);
	setCanvasSize(newcanvas);
	let xw, xh, delay;

	function RenderTempCanvas(t) { //	3
		newcontext.clearRect(0, 0, 1800, 1200);
		newcontext.drawImage(nextImg, 0, 0);
		xw = 1800 / cols;
		xh = 1200 / rows;

		for (var i = 0; i <= cols; i++) {
			for (var j = 0; j <= rows; j++) {
				delay = (j * i) / (cols * rows);
				newcontext.clearRect(i * xw, j * xh, xw * clamp(state.pos - delay, 0, 1), xh * clamp(state.pos - delay, 0, 1));
			}
		}
		
	}

	function render(t) { //	2
		context.clearRect(0, 0, 1800, 1200);
		context.drawImage(currImg, 0, 0);
		RenderTempCanvas(t);
		context.drawImage(newcanvas, 0, 0);
	}


	function draw(t) { // 1
		render(t);
		window.requestAnimationFrame(draw);
	}

	

	draw();
	buts[0].onclick = function() {
		if(b1 || isBlocked) {
			console.log('no1')
			return false
		}
		isBlocked = true
		nextImg = image1
		click()
		b1 = true;
		b2 = false;
		b3 = false;
		
		setTimeout(function() {
			currImg = nextImg
			isBlocked = false
		}, 1000)		
	}
	
	buts[1].onclick = function() {
		if(b2 || isBlocked) {
			console.log('no2')
			return false
		}
		isBlocked = true
		nextImg = image2
		click()
		b1 = false;
		b2 = true;
		b3 = false;
		setTimeout(function() {
			currImg = nextImg;
			isBlocked = false
		}, 1000)
		
	}
	
	buts[2].onclick = function() {
		if(b3 || isBlocked) {
			console.log('no3')
			return false
		}
		isBlocked = true
		nextImg = image3
		click()
		b1 = false;
		b2 = false;
		b3 = true;
		setTimeout(function() {
			currImg = nextImg
			isBlocked = false
		}, 1000)
		
	}
		
	function click (event) {
		let tl = new TimelineMax();
			tl
				.fromTo(state, 1, {pos: 2}, {pos: 0})
				.set(state,{pos: 0})

	};



	function clamp(value, min, max) { // Вспомогательная функция
		return min < max ? (value < min ? min : value > max ? max : value) : (value < max ? max : value > min ? min : value)
	}
});
