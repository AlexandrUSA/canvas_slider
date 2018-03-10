const doc = document,
	FRAME = (function () {
		return window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function ( t ) {
				setTimeout(t, 1000 / 60)
			}
	})(),
	_$C = function (sel, w, h) {
		var c, _c;
		if (!arguments.length) {
			c = document.createElement('canvas');
			if (c && c.getContext) {
				_c = c.getContext('2d');
			} else {
				throw new Error('Cannot get context of object \'Canvas\'!');
			}
			c.width = w || window.innerWidth;
			c.height = h || window.innerHeight;
			console.log('Success: object \'canvas\' has been created!');
			return {
				el: c,
				ctx: _c,
			};
		}
		c = document.querySelector(sel);
		if (c && c.getContext) {
			_c = c.getContext('2d');
			c.width = w || window.innerWidth;
			c.height = h || window.innerHeight;
			console.log('Success: object canvas has been received. Height: ' + c.height + 'px Width: ' + c.width + 'px');
			return {
				el: c,
				ctx: _c
			};
		};
		throw new Error('Cannot receive object \'Canvas\'!');
	};
/*-----------------------------------*/
let c1 = _$C('#c1'),
	c = c1.el,
	_c = c1.ctx,
	c2 = _$C(),
	new_c = c2.el,
	_c2 = c2.ctx,
	w = new_c.width = c.width = 1800,
	h = new_c.height = c.height = 800,
	img = doc.querySelectorAll('.img'),
	buts = doc.querySelectorAll('.but'),
	x = 0,
	step = 0,
	next = 0,
	tl = new TimelineMax(),
	nextImg = img[next],
	currImg = img[step],
	cols = 40,
	rows = 40,
	stat = {pos: 2},
	RenderTempCanvas = ( t ) => {
		_c2.clearRect(0, 0, w, h); // Очищаем первый канвас
		_c2.drawImage(nextImg, 0, 0); // Вставляем в него картинку
		xw = w / cols; // А дальше математика
		xh = h / rows;
		for (var i = 0; i <= cols; i++) {
			for (var j = 0; j <= rows; j++) {
				delay = (j * i) / (cols * rows);
				_c2.clearRect(i * xw, j * xh, xw * clamp(stat.pos - delay, 0, 1), xh * clamp(stat.pos - delay, 0, 1)) //clamp(stat.pos - delay, 0, 1) вернет чтото от 0 до 1 чтобы время не уходило в минус
			};
		};
	},
	render = ( t ) => {
		_c.clearRect(0, 0, w, h);
		_c.drawImage(currImg, 0, 0);
		RenderTempCanvas(t);
		_c.drawImage(new_c, 0, 0);
	},
	draw = ( t ) => {
		render(step);
		FRAME(draw);
	},
	script = (item, img) => {
		if (item || isBlocked) return false
		isBlocked = true;
		nextImg = img;
		click()
		b1 = false;
		b2 = false;
		b3 = false;
		item = true;
		setTimeout(() => {
			currImg = nextImg
			isBlocked = false
		}, 1500)
	},
	click = () => {
		tl.fromTo(stat, 1.5, {pos: 2}, {pos: 0}).set(stat, {pos: 0})
	},
	clamp = (value, min, max) => {
		return min < max ? (value < min ? min : value > max ? max : value) : (value < max ? max : value > min ? min : value)
	},
	b1 = true,
	b2, b3, isBlocked, anim, xw, xh, delay;

draw();
buts[0].onclick = () => {
	script(b1, img[0])
};

buts[1].onclick = () => {
	script(b2, img[1])
};

buts[2].onclick = () => {
	script(b3, img[2])
};