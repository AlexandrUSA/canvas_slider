function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
ready(CODE)

function CODE() {
	let doc = document,
		FRAME = (function () {
			return window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (t) {
					setTimeout(t, 1000 / 60)
				}
		})(),
		$ = function (sel) {
			return doc.getElementById(sel)
		},
		$C = function (sel, w, h) {
			let c = doc.querySelector(sel);
			if (c && c.getContext) {
				let _c = c.getContext('2d');
				c.width = w || 800;
				c.height = h || 600;
				return {
					c: c,
					cxt: _c,
					w: c.width,
					h: c.height
				}
			}
			console.log('Error: canvas is not exist!')
		};

	let c1 = $C('#c1'),
	    c2 = $C('#c2'),
		_c1 = c1.cxt,
		_c2 = c2.cxt,
		balls = [],
		w = c1.w,
		h = c1.h,
		pic1 = $('img1');
		c1 = c1.c;

	
	////////////////////////////
	
	
	class Ball {
		constructor(x, y, r, c) {
			this.x = x || 0;
			this.y = y || 0;
			this.r = r || 5;
			this.c = c || '#000';
			//	Скорость
			this.vx = 0;
			this.vy = 0;
			this.friction = .9; // Сили трения
			// Начальная позиция точки и гравитация
			this.origX = x || 0;
			this.origY = y || 0;
			this.springCoef = .01
		}
		setPos(newX, newY) {
			this.x = newX || 0;
			this.y = newY || 0;
		}

		think(m) {
			let dx = this.x - m.x,
				dy = this.y - m.y,
				dist = Math.sqrt(dx * dx + dy * dy), // RandomInt(.2,.8) - клевый эффект
				angle, tx, ty, dx1, dy1;
			if (dist < 10) { // Расстояние от шарика до мышки
				angle = Math.atan2(dy, dx); // Получаем угол движения
				tx = m.x + Math.cos(angle) * 30;
				ty = m.y + Math.sin(angle) * 30;
				this.vx += tx - this.x;
				this.vy += ty - this.y;
			}
			// Притяжение
			dx1 = -(this.x - this.origX); // Расст от текущего центра до оригинального
			dy1 = -(this.y - this.origY);
			this.vx += dx1 * this.springCoef; // Скорость которая возращает точки назад
			this.vy += dy1 * this.springCoef;
			// Трение
			this.vx *= this.friction;
			this.vy *= this.friction;
			// Скорость
			this.x += this.vx;
			this.y += this.vy;
		}


		draw(c) {
			c.save()
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			c.strokeStyle = this.c;
			c.stroke();
			c.fillStyle = this.c;
			c.fill();
			c.closePath();
			c.restore()
		}
	}

	class MousePos {
		constructor(obj) {
			this.x = 0;
			this.y = 0;
			obj.onmousemove = e => {
				this.x = e.pageX;
				this.y = e.pageY;
			}
		}
	}
	let mousePos = new MousePos(c1);
	let mouse = new Ball(mousePos.x, mousePos.y, 1, 'rgba(0,0,0,1)');
	for (let i = 0; i < 15; i++) {
		balls.push(
			new Ball(
				200 + 100 * Math.cos(i * 2 * Math.PI / 15),
				200 + 100 * Math.sin(i * 2 * Math.PI / 15),
				1, 'blue'
			))
	}

	function connectBalls(balls) {
		_c1.beginPath();
		for (var i = 0, jlen = balls.length; i <= jlen; ++i) {
			var p0 = balls[i + 0 >= jlen ? i + 0 - jlen : i + 0];
			var p1 = balls[i + 1 >= jlen ? i + 1 - jlen : i + 1];
			_c1.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
		}
		_c1.closePath();
		_c1.fillStyle = "rgba(0,0,0,1)";
		_c1.fill();
	}


	function Render() {
		FRAME(Render);
		_c1.clearRect(0, 0, w, h)
		mouse.setPos(mousePos.x, mousePos.y);		
		balls.forEach(ball => {
			ball.think(mousePos)		
		})
		connectBalls(balls)
		_c2.clearRect(0, 0, w, h);
			_c2.globalCompositeOperation = 'source-over';
			_c2.drawImage(c1,0,0);
			_c2.globalCompositeOperation = 'source-in';
			_c2.drawImage(pic1,0,0);
	}
	Render()






}
