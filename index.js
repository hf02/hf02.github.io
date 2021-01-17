let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let starCanvas = document.getElementById('stars')
let starCtx = starCanvas.getContext('2d')

let currentMenu = ''

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
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

	// only use event.code, all other values might not be defined

	if (key(event.code) === false) {
		if (event.code === 'Escape' || event.code === 'ArrowUp') {
			togglePause()
		}
		if (currentMenu === 'death') {
			if (event.code === 'ArrowRight') {
				doRestart = true
			}
		}
	}

	keys[event.code] = true
}

document.body.onkeyup = (event) => {
	// only use event.code, all other values might not be defined

	if (currentMenu === 'death') {
		if (event.code === 'ArrowRight') {
			if (doRestart === true) {
				startGame()
				doRestart = false
			}
		}
	}

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
	document.getElementById('textcontainer').style.opacity = '1'



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
					document.getElementById('textcontainer').style.opacity = '1'
				}
			}
			imageToAdd.onerror = () => {
				reject(imageToAdd)
			}
		}
	})
}

let currentGame

let doRestart = false

async function startGame() {
	if (currentGame !== undefined) {
		await currentGame.stop()
	}

	onResize()

	currentGame = game()

	document.getElementById('leftcontroltext').innerText = ''
	document.getElementById('rightcontroltext').innerText = ''

	document.getElementById('death').style.top = null
	document.getElementById('death').style.transform = null

	currentMenu = 'game'
	currentGame.onStop = (death, score) => {
		if (death === true) {

			if (localStorage.highscore === undefined || parseInt(localStorage.highscore) === NaN) {
				localStorage.highscore = 0
			}

			let newHighScore = false

			if (localStorage.highscore < score) {
				localStorage.highscore = score
				newHighScore = true
			}

			document.getElementById('deathscorenumber').innerText = score
			document.getElementById('deathhighscorenumber').innerText = localStorage.highscore

			document.getElementById('death').style.top = '50%'
			document.getElementById('death').style.transform = 'translate(-50%, -50%) scale(1)'


			setTimeout(() => {


				currentMenu = 'death'
				document.getElementById('rightcontroltext').innerText = 'Restart'
				document.getElementById('leftcontroltext').innerText = ''

			}, 1000)

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
	let stopLoad = false
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
		{ name: 'starthere1', src: 'img/start here 1.png' },
		{ name: 'starthere2', src: 'img/start here 2.png' },
		{ name: 'skinblack', src: 'img/player skins/black.png' },
		{ name: 'skinblackthrust', src: 'img/player skins/blackthrust.png' }
	]).catch((e) => {
		document.getElementById('timetext').innerText = 'Error loading image!'
		stopLoad = true
	})
	if (stopLoad === true) return
	document.getElementById('timetext').innerText = 'Starting game'
	onResize()



	document.getElementById('left').ontouchstart = (e) => { touchEvents('ArrowLeft', true, e) }
	document.getElementById('left').ontouchend = (e) => { touchEvents('ArrowLeft', false, e) }
	document.getElementById('left').ontouchcancel = (e) => { touchEvents('ArrowLeft', false, e) }

	document.getElementById('right').ontouchstart = (e) => { touchEvents('ArrowRight', true, e) }
	document.getElementById('right').ontouchend = (e) => { touchEvents('ArrowRight', false, e) }
	document.getElementById('right').ontouchcancel = (e) => { touchEvents('ArrowRight', false, e) }

	document.getElementById('upleft').ontouchstart = (e) => { touchEvents('Escape', true, e) }
	document.getElementById('upleft').ontouchend = (e) => { touchEvents('Escape', false, e) }
	document.getElementById('upleft').ontouchcancel = (e) => { touchEvents('Escape', false, e) }

	document.getElementById('upright').ontouchstart = (e) => { touchEvents('ArrowUp', true, e) }
	document.getElementById('upright').ontouchend = (e) => { touchEvents('ArrowUp', false, e) }
	document.getElementById('upright').ontouchcancel = (e) => { touchEvents('ArrowUp', false, e) }

	document.body.ontouchstart = preventDefault
	document.body.ontouchend = preventDefault
	document.body.ontouchcancel = preventDefault
	document.body.ontouchmove = preventDefault

	function preventDefault(e) {
		e.preventDefault()
	}


	function touchEvents(key, setTo, event) {
		if (setTo === true) {
			document.body.onkeydown({ code: key })
		} else {
			document.body.onkeyup({ code: key })
		}
		event.preventDefault()
	}

	await startGame()
}