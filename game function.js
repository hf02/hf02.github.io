function game() {


	let deltaTime = 0
	let deltaTimeDataLast = 0
	let fps = 0
	let keys = {}
	let clearFrames = true
	let score = 0
	let time = 30

	let paused = false
	let lastFrameWasPaused = false



	let spaceshipData = []
	let currentSpaceshipData




	let p = {
		x: getRndInteger(0, canvas.width),
		y: getRndInteger(0, canvas.height),
		speed: {
			x: 0,
			y: 0,
			r: 0
		},
		r: getRndInteger(0, 360),
		images: {
			normal: new Image(),
			thrust: new Image()
		},
		mainImage: undefined,
		attributes: {
			rotationSpeed: 0.001,
			moveSpeed: 0.0001,
			maxMoveSpeed: Infinity,
			maxRotationSpeed: Infinity,
			wallHitSpeedMultiplyer: -0.25,
			wallHitSpeedRubMultiplyer: 0.99,
			wallHitRotationMultiplyer: 1,
			gravity: 0,
			wallHitRotationMultiplyerWithGravity: 1,
			wallHitSpeedMultiplyerWithGravity: 0.95,
			wallHitSpeedRubMultiplyerWithGravity: 0.99,
			// moveResistance: 0.998,
			// rotateResistance: 0.998,
			moveResistance: 1,
			rotateResistance: 1
		}
	}

	p.images.normal.src = 'img/spaceship.png'
	p.images.thrust.src = 'img/thrust.png'
	p.mainImage = p.images.normal



	function drawImage(image, x, y, options) {
		let values = {
			rotation: 0,
			width: image.width,
			height: image.height,
			filter: '',
			...options
		}

		// how is rotating so hard ? ? ?

		ctx.save()
		ctx.translate(x + values.width / 2, y + values.height / 2)
		ctx.rotate(values.rotation * Math.PI / 180)
		ctx.translate(-x - values.width / 2, -y - values.height / 2)
		ctx.filter = values.filter
		ctx.drawImage(image, x, y, values.width, values.height)
		ctx.filter = ''
		ctx.restore()


	}

	function dt(multiplyer = 1) {
		return deltaTime * multiplyer
	}




	// function moveInDirectionBasedOnRotation(degrees, options) {
	//     let values = {
	//         multiplyer: 1,
	//         rotationShift: 0,
	//         ...options
	//     }

	//     let toReturn = {
	//         x: 0,
	//         y: 0
	//     }

	//     degrees %= 360

	//     degrees += values.rotationShift
	//     if (degrees > 360) {
	//         degrees -= 360
	//     } else if (degrees < 0) {
	//         degrees += 360
	//     }

	//     toReturn.x = values.multiplyer * Math.sin(degrees)
	//     toReturn.y = values.multiplyer * Math.cos(degrees)

	//     return toReturn

	// }

	document.body.onkeydown = (event) => {
		keys[event.code] = true
	}

	document.body.onkeyup = (event) => {
		keys[event.code] = false
	}

	function key(keyCode) {
		let stat = keys[keyCode]
		if (stat == true) {
			return true
		} else {
			return false
		}
	}


	function getKeyframeObject(index, timestamp, type) {
		// console.log(type)

		let keyframeData = spaceshipData[index].keyframeData

		// currentSpaceshipData.keyframeData.push({
		// 	x: p.x,
		// 	y: p.y,
		// 	r: p.r,
		// 	t: (p.mainImage === p.images.thrust),
		// 	s: currentKeyframeTimestampIndex
		// })

		for (let i = 0; i < keyframeData.length; i++) {
			const element = keyframeData[i];
			const elementNext = keyframeData[i + 1];

			if (i === 0 && element.s >= timestamp) {
				return element
			} else if (element.s === timestamp) {
				return element
			} else if (element.s < timestamp) {
				if (elementNext === undefined) {
					return undefined
				} else if (elementNext.s > timestamp) {
					return element
				}
			}
		}

		return undefined
	}

	let waitingToStart = true
	function startGame() {
		// note: this is not when the engine starts, this is when the game starts.
		if (waitingToStart === false) return
		waitingToStart = false

	}

	let endpointHue = 0
	let endpointAnimInv = 0
	let endpointAnim = ''
	let currentKeyframeTimestampIndex

	document.body.onload = () => {
		onResize()

		p.x = getRndInteger(0, canvas.width)
		p.y = getRndInteger(0, canvas.height)

		document.getElementById('left').ontouchstart = (e) => { touchEvents('ArrowLeft', true, e) }
		document.getElementById('left').ontouchend = (e) => { touchEvents('ArrowLeft', false, e) }
		document.getElementById('left').ontouchcancel = (e) => { touchEvents('ArrowLeft', false, e) }

		document.getElementById('right').ontouchstart = (e) => { touchEvents('ArrowRight', true, e) }
		document.getElementById('right').ontouchend = (e) => { touchEvents('ArrowRight', false, e) }
		document.getElementById('right').ontouchcancel = (e) => { touchEvents('ArrowRight', false, e) }

		function touchEvents(key, setTo, event) {
			keys[key] = setTo
			event.preventDefault()
		}


		requestAnimationFrame(loop)
	}

	window.onresize = onResize

	let dead = false
	let stopGame = false

	function loop(timestamp) {

		if (stopGame = true) {
			return
		}

		// fps, deltatime, and pausing
		deltaTime = timestamp - deltaTimeDataLast
		deltaTimeDataLast = timestamp
		fps = 1000 / deltaTime

		if (lastFrameWasPaused) {
			deltaTime = 0
			lastFrameWasPaused = false
		}

		if (paused) {
			deltaTime = 0
			lastFrameWasPaused = true
			requestAnimationFrame(loop)
			return
		}


		// misc


		if (currentSpaceshipData !== undefined) {
			if (currentSpaceshipData.endLocation.x > (canvas.width - 22)) {
				currentSpaceshipData.endLocation.x = canvas.width - 22
			}
			if (currentSpaceshipData.endLocation.y > (canvas.height - 22)) {
				currentSpaceshipData.endLocation.y = canvas.height - 22
			}
		}


		if (currentSpaceshipData === undefined) {
			currentSpaceshipData = {
				endLocation: { x: getRndInteger(0, canvas.width - 22), y: getRndInteger(0, canvas.height - 22) },
				keyframeData: [],
				timestampDeltatime: 0,
				lastStats: {
					x: p.x,
					y: p.y,
					r: p.r,
					speed: {
						x: p.speed.x,
						y: p.speed.y,
						r: p.speed.r,
					},
				}
			}
		}

		currentSpaceshipData.timestampDeltatime += Math.floor(dt())

		currentKeyframeTimestampIndex = currentSpaceshipData.timestampDeltatime

		let toPushInto = {
			x: Math.floor(p.x),
			y: Math.floor(p.y),
			r: Math.floor(p.r),
			t: (p.mainImage === p.images.thrust),
			s: currentKeyframeTimestampIndex
		}



		if (currentSpaceshipData.keyframeData[currentSpaceshipData.keyframeData.length + 1] !== toPushInto) {
			currentSpaceshipData.keyframeData.push(toPushInto)
		}





		p.mainImage = p.images.normal

		function moveFoward() {
			p.speed.x += dt(p.attributes.moveSpeed * Math.cos((p.r % 360) * Math.PI / 180))
			p.speed.y += dt(p.attributes.moveSpeed * Math.sin((p.r % 360) * Math.PI / 180))
			p.mainImage = p.images.thrust
		}


		if (key('ArrowLeft')) {
			p.speed.r -= dt(p.attributes.rotationSpeed)
			moveFoward()
		}
		if (key('ArrowRight')) {
			p.speed.r += dt(p.attributes.rotationSpeed)
			moveFoward()
		}

		p.speed.x *= p.attributes.moveResistance
		p.speed.y *= p.attributes.moveResistance
		p.speed.r *= p.attributes.rotateResistance
		// if (key('ArrowDown')) {
		//     p.speed.x -= dt(p.attributes.moveSpeed * Math.cos((p.r % 360) * Math.PI / 180))
		//     p.speed.y -= dt(p.attributes.moveSpeed * Math.sin((p.r % 360) * Math.PI / 180))
		// }

		if (p.speed.x > p.attributes.maxMoveSpeed) p.speed.x = p.attributes.maxMoveSpeed
		if (p.speed.x < -p.attributes.maxMoveSpeed) p.speed.x = -p.attributes.maxMoveSpeed

		if (p.speed.y > p.attributes.maxMoveSpeed) p.speed.y = p.attributes.maxMoveSpeed
		if (p.speed.y < -p.attributes.maxMoveSpeed) p.speed.y = -p.attributes.maxMoveSpeed

		if (p.speed.r > p.attributes.maxRotationSpeed) p.speed.r = p.attributes.maxRotationSpeed
		if (p.speed.r < -p.attributes.maxRotationSpeed) p.speed.r = -p.attributes.maxRotationSpeed

		p.speed.y += dt(p.attributes.gravity)

		p.x += dt(p.speed.x)
		p.y += dt(p.speed.y)
		p.r += dt(p.speed.r)



		if (p.x > canvas.width - p.mainImage.width) {
			p.x = canvas.width - p.mainImage.width
			p.speed.x *= p.attributes.wallHitSpeedMultiplyer
			p.speed.y *= p.attributes.wallHitSpeedRubMultiplyer
			p.speed.r *= p.attributes.wallHitRotationMultiplyer
		}
		if (p.y > canvas.height - p.mainImage.height) {
			p.y = canvas.height - p.mainImage.height
			if (p.attributes.gravity === 0) {
				p.speed.y *= p.attributes.wallHitSpeedMultiplyer
				p.speed.x *= p.attributes.wallHitSpeedRubMultiplyer
				p.speed.r *= p.attributes.wallHitRotationMultiplyer
			} else {
				p.speed.y *= p.attributes.wallHitSpeedMultiplyerWithGravity
				p.speed.x *= p.attributes.wallHitSpeedRubMultiplyerWithGravity
				p.speed.r *= p.attributes.wallHitRotationMultiplyerWithGravity
			}
		}

		if (p.x < 0) {
			p.x = 0
			p.speed.x *= p.attributes.wallHitSpeedMultiplyer
			p.speed.y *= p.attributes.wallHitSpeedRubMultiplyer
			p.speed.r *= p.attributes.wallHitRotationMultiplyer
		}
		if (p.y < 0) {
			p.y = 0
			p.speed.x *= p.attributes.wallHitSpeedRubMultiplyer
			p.speed.y *= p.attributes.wallHitSpeedMultiplyer
			p.speed.r *= p.attributes.wallHitRotationMultiplyer
		}


		spaceshipData.forEach((element, index) => {
			let keyframeObject = getKeyframeObject(index, currentKeyframeTimestampIndex, 'collision')
			if (keyframeObject === undefined) return
			if (currentSpaceshipData !== undefined && (keyframeObject.x <= (p.x + 12) && (keyframeObject.x + 12) >= p.x) && (keyframeObject.y <= (p.y + 12) && (keyframeObject.y + 12) >= p.y)) {
				p.x = currentSpaceshipData.lastStats.x
				p.y = currentSpaceshipData.lastStats.y
				p.r = currentSpaceshipData.lastStats.r
				p.speed.x = currentSpaceshipData.lastStats.speed.x
				p.speed.y = currentSpaceshipData.lastStats.speed.y
				p.speed.r = currentSpaceshipData.lastStats.speed.r
				currentSpaceshipData.timestampDeltatime = 0
				currentSpaceshipData.keyframeData = []
				time -= 1
			}
		})

		if (currentSpaceshipData !== undefined && (currentSpaceshipData.endLocation.x <= (p.x + 12) && (currentSpaceshipData.endLocation.x + 22) >= p.x) && (currentSpaceshipData.endLocation.y <= (p.y + 12) && (currentSpaceshipData.endLocation.y + 22) >= p.y)) {
			spaceshipData.push(currentSpaceshipData)
			currentSpaceshipData = undefined
			p.speed.x = 0
			p.speed.y = 0
			p.speed.r = 0
			score++
			time += 10
		}



		// rendering
		if (clearFrames === true) { ctx.clearRect(0, 0, canvas.width, canvas.height) }


		spaceshipData.forEach((element, index) => {
			let keyframeObject = getKeyframeObject(index, currentKeyframeTimestampIndex, 'rendering')
			let object = element
			drawImage(images.spawnpoint, object.lastStats.x, object.lastStats.y, { rotation: object.lastStats.r })
			if (keyframeObject === undefined) {
				drawImage(images.endpointClearedDone, object.endLocation.x, object.endLocation.y)

				return
			}


			drawImage((keyframeObject.t === false ? images.otherspaceship : images.otherspaceshipthrust), keyframeObject.x, keyframeObject.y, { rotation: keyframeObject.r })
			drawImage(images.endpointCleared, object.endLocation.x, object.endLocation.y)

			// if (index === 0) {
			//   console.log(keyframeObject.x)
			// }

		})

		if (currentSpaceshipData !== undefined) drawImage(images.spawnpoint, currentSpaceshipData.lastStats.x, currentSpaceshipData.lastStats.y, { rotation: currentSpaceshipData.lastStats.r })
		drawImage(p.mainImage, p.x, p.y, { rotation: p.r })


		endpointAnimInv += dt()
		if (endpointAnimInv > 1000) {
			endpointAnimInv = 0
			if (endpointAnim === '') {
				endpointAnim = '2'
			} else {
				endpointAnim = ''
			}
		}



		if (currentSpaceshipData !== undefined) drawImage(images[`endpoint${endpointAnim}`], currentSpaceshipData.endLocation.x, currentSpaceshipData.endLocation.y, { filter: `hue-rotate(${endpointHue}deg)` })
		endpointHue += dt(0.1)
		while (endpointHue > 360) {
			endpointHue -= 360
		}


		if (spaceshipData.length !== 0) {
			time -= (deltaTime * 0.001)
		}

		document.getElementById('scoretext').innerText = score
		document.getElementById('timetext').innerText = Math.floor(time)
		document.getElementById('fps').innerText = Math.floor(fps)


		if (time < 0) {
			document.getElementById('timetext').innerText = 'game over'
			spaceshipData = []
			currentSpaceshipData = []
			dead = true
		} else {
			requestAnimationFrame(loop)
		}
	}
}