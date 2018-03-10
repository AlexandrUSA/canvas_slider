window.onload = function () {
	const doc = document,
		$ = TweenMax;

	(function () {
		let c = doc.getElementById('c1');
		if (c && c.getContext) {
			let _c = c.getContext('2d'),
				w = c.width = 1800,
				h = c.height = 1200,
				img = doc.querySelectorAll('.img'),
				buts = doc.querySelectorAll('.but'),
				x = 0,
				anim = false,
				step = 0,
				next = 0,
				tl = new TimelineMax(),
				nextImg = img[0],
				currImg = img[0],
				cols = 50,
				rows = 50,
				stat = {
					pos: 2
				},
				b1 = true,
				b2 = false,
				b3 = false,
				isBlocked = false;

			let nextStep = (function () {
				return window.requestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.oRequestAnimationFrame ||
					   window.msRequestAnimationFrame ||
				function (t) {
					setTimeout(t, 1000 / 60)
				}
			})();


			let new_c = doc.createElement('canvas'), // Наш псевдоканвас, для анимки основного
				_c2 = new_c.getContext('2d'),
				xw, xh, delay;

			new_c.width = w; // ШШирина и высота нового канваса должна быть как у старого
			new_c.height = h;



			function RenderTempCanvas(t) {
				_c2.clearRect(0, 0, w, h); // Очищаем первый канвас
				_c2.drawImage(nextImg, 0, 0); // Вставляем в него картинку
				xw = w / cols; // А дальше математика
				xh = h / rows;
				for (var i = 0; i <= cols; i++) {
					for (var j = 0; j <= rows; j++) {
						delay = (j * i) / (cols * rows);
						_c2.clearRect(i * xw, j * xh, xw * clamp(stat.pos - delay, 0, 1), xh * clamp(stat.pos - delay, 0, 1)) //clamp(stat.pos - delay, 0, 1) вернет чтото от 0 до 1 чтобы время не уходило в минус
					}
				}
			}

			function render(t) {
				_c.clearRect(0, 0, w, h);
				_c.drawImage(currImg, 0, 0);
				RenderTempCanvas(t);
				_c.drawImage(new_c, 0, 0); //	Рисуем второй канвас поверх нашего
			}

			function draw(t) {
				render(step);
				nextStep(draw);
			}

			draw()	// Первоначальная отрисовка

			buts[0].onclick = function () {
				script(b1, img[0])
			}

			buts[1].onclick = function () {
				script(b2, img[1])
			}

			buts[2].onclick = function () {
				script(b3, img[2])
			}


			function script(item, img) {
				if (item || isBlocked) {
					return false
				}
				isBlocked = true;
				nextImg = img;
				click()
				b1 = false;
				b2 = false;
				b3 = false;
				item = true;
				setTimeout(function () {
					currImg = nextImg
					isBlocked = false
				}, 1000)
			}

			function click() {
				tl
					.fromTo(stat, 1, {
						pos: 2
					}, {
						pos: 0
					})
					.set(stat, {
						pos: 0
					})
			};
		}
	})();


	function clamp(value, min, max) { // Вспомогательная функция
		return min < max ? (value < min ? min : value > max ? max : value) : (value < max ? max : value > min ? min : value)
	}
}
