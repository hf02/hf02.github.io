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



let keys = {}

document.body.onkeydown = (event) => {

	if (key(event.code) === false) {
		if (event.code === 'Escape') {
			togglePause()
		}
	}

	keys[event.code] = true
}

document.body.onkeyup = (event) => {
	keys[event.code] = false
}

function togglePause() {
	if (currentGame !== undefined && currentGame.stopped === false) {
		currentGame.togglePause()
	}
}

function setPause(setTo) {
	if (currentGame !== undefined && currentGame.stopped === false) {
		currentGame.setPause(setTo)
	}
}

function key(keyCode) {
	let stat = keys[keyCode]
	if (stat == true) {
		return true
	} else {
		return false
	}
}

images = {}

async function loadImages(imagesToAdd = [{ name: '', src: '' }]) {
	document.getElementById('timetext').innerText = 'Loading images'



	return new Promise((resolve, reject) => {
		let number = 0
		let numberMax = 0

		function setPercentage() {
			document.getElementById('scoretext').innerText = `${~~((number / numberMax) * 100)}%`
			document.getElementById('timetext').innerText = `Loading images ${number} / ${numberMax}`
		}

		for (let i = 0; i < imagesToAdd.length; i++) {
			const element = imagesToAdd[i];
			numberMax++

			setPercentage()

			let imageToAdd = new Image()
			imageToAdd.src = element.src
			images[element.name] = imageToAdd
			imageToAdd.onload = () => {
				number++
				setPercentage()
				if (number >= numberMax) {
					resolve(number)
				}
			}
			imageToAdd.onerror = () => {
				reject(imageToAdd)
			}
		}
	})
}

let currentGame

async function startGame() {
	if (currentGame !== undefined) {
		await currentGame.stop()
	}

	onResize()

	currentGame = game()
	currentGame.onStop = (death, score) => {
		if (death === true) {

			if (localStorage.highscore === undefined) {
				localStorage.highscore = 0
			}


			if (localStorage.highscore < score) {
				localStorage.highscore = score
			}

			startGame()
		}
	}
}

window.onload = async () => {

	// if (localStorage.alreadyReloaded === undefined) {
	// 	localStorage.alreadyReloaded = 'false'
	// }

	// if (document.getElementById('version').content !== version) {

	// 	if (localStorage.alreadyReloaded === 'false') {
	// 		location.reload(true)
	// 		localStorage.alreadyReloaded = 'true'
	// 	} else {
	// 		alert(`the game version isn't lining up! try to clear your cache.`)
	// 		localStorage.alreadyReloaded = 'false'
	// 	}
	// }

	document.getElementById('timetext').innerText = 'Resizing content'
	onResize()
	await loadImages([
		{ name: 'endpoint', src: 'img/endpoint.png' },
		{ name: 'endpoint2', src: 'img/endpoint2.png' },
		{ name: 'otherspaceship', src: 'img/other spaceship.png' },
		{ name: 'otherspaceshipthrust', src: 'img/other spaceship thrust.png' },
		{ name: 'normal', src: 'img/spaceship.png' },
		{ name: 'normalthrust', src: 'img/thrust.png' },
		{ name: 'endpointCleared', src: 'img/other endpoint.png' },
		{ name: 'endpointClearedDone', src: 'img/other endpoint reached.png' },
		{ name: 'spawnpoint', src: 'img/spawnpoint.png' },
		{ name: 'paused', src: 'img/paused.png' },
	])
	document.getElementById('timetext').innerText = 'Starting game'
	onResize()



	document.getElementById('left').ontouchstart = (e) => { touchEvents('ArrowLeft', true, e) }
	document.getElementById('left').ontouchend = (e) => { touchEvents('ArrowLeft', false, e) }
	document.getElementById('left').ontouchcancel = (e) => { touchEvents('ArrowLeft', false, e) }

	document.getElementById('right').ontouchstart = (e) => { touchEvents('ArrowRight', true, e) }
	document.getElementById('right').ontouchend = (e) => { touchEvents('ArrowRight', false, e) }
	document.getElementById('right').ontouchcancel = (e) => { touchEvents('ArrowRight', false, e) }

	document.getElementById('top').ontouchend = (e) => {

		togglePause()

		e.preventDefault()

	}

	document.body.ontouchstart = preventDefault
	document.body.ontouchend = preventDefault
	document.body.ontouchcancel = preventDefault
	document.body.ontouchmove = preventDefault

	function preventDefault(e) {
		e.preventDefault()
	}


	function touchEvents(key, setTo, event) {
		keys[key] = setTo
		event.preventDefault()
	}

	await startGame()
}