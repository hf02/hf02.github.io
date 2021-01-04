let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let starCanvas = document.getElementById('stars')
let starCtx = starCanvas.getContext('2d')

function getRndInteger(min, max) {


	return Math.floor(Math.random() * (max - min)) + min;

}

function onResize() {
	let textHolderRect = document.getElementById('textholder').getBoundingClientRect()

	function resizeCanvas(canvas) {
		canvas.width = Math.ceil(innerWidth / 2) // the width and height overflowing is fine because it will only cut off half a pixel at most.
		canvas.height = Math.ceil((innerHeight - textHolderRect.height) / 2)

		canvas.style.left = `${innerWidth / 2}px`
		canvas.style.top = `${((innerHeight - textHolderRect.height) / 2)}px`

		canvas.getBoundingClientRect() // redraw or whatever so the loop knows the canvas styling correctly
	}

	resizeCanvas(canvas)
	resizeCanvas(starCanvas)

	for (let index = 0; index < 10000; index++) {

		let posX = getRndInteger(0, starCanvas.width)
		let posY = getRndInteger(0, starCanvas.height)
		starCtx.fillStyle = `hsl(${getRndInteger(174, 222)}deg ${getRndInteger(0, 40)}% ${getRndInteger(0, 25)}%)`

		starCtx.beginPath();
		starCtx.fillRect(posX, posY, 1, 1);
		starCtx.stroke();
	}

}

window.onresize = onResize

function timeoutPromise(milliseconds) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(milliseconds)
		}, milliseconds)
	})
}

images = {
	endpoint: new Image(),
	endpoint2: new Image(),
	otherspaceship: new Image(),
	otherspaceshipthrust: new Image(),
	endpointCleared: new Image(),
	endpointClearedDone: new Image(),
	spawnpoint: new Image(),
}

images.endpoint.src = 'img/endpoint.png'
images.endpoint2.src = 'img/endpoint2.png'
images.otherspaceship.src = 'img/other spaceship.png'
images.otherspaceshipthrust.src = 'img/other spaceship thrust.png'
images.endpointCleared.src = 'img/other endpoint.png'
images.endpointClearedDone.src = 'img/other endpoint reached.png'
images.spawnpoint.src = 'img/spawnpoint.png'

async function loadImages(images = ['']) {

	function loadImage() {

	}

	for (let i = 0; i < images.length; i++) {
		const element = images[i];

	}
}

window.onload = async () => {
	onResize()
	loadImages
}