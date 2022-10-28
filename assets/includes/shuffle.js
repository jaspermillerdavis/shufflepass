const colours = fetch("assets/includes/colours.json")
	.then((response) => response.json())
	.then((json) => {
		return json;
	});

const animals = fetch("assets/includes/animals.json")
	.then((response) => response.json())
	.then((json) => {
		return json;
	});

const keyValues = fetch("assets/includes/keyValues.json")
	.then((response) => response.json())
	.then((json) => {
		return json;
	});

function numbers() {
	const rndInt1 = Math.floor(Math.random() * 8) + 1;
	const rndInt2min = Math.ceil(rndInt1 - 1);
	const rndInt2max = Math.floor(rndInt1 + 1);

	let rndInt2;
	let rndInt3;
	let rndInt3Max;
	let rndInt3Min;

	if (rndInt1 == 1) {
		rndInt2 = Math.floor(Math.random() * (rndInt2max - rndInt2min) + rndInt1);
	} else {
		rndInt2 = Math.floor(Math.random() * ((rndInt2max + 1) - rndInt2min) + rndInt2min);
	}

	if ((rndInt1 == rndInt2) && (rndInt1 == 1)) {
		rndInt3 = (rndInt2 + 1);
	} else if (rndInt1 == rndInt2) {
		rndInt3Max = Math.ceil(rndInt2 + 1);
		rndInt3Min = Math.floor(rndInt2 - 1);

		rndInt3 = Math.random() < 0.5 ? rndInt3Max : rndInt3Min;
	} else {
		rndInt3 = rndInt2;
	}

	return '' + rndInt1 + rndInt2 + rndInt3;
}

const runGenerator = async () => {
	const colourData = await colours;
	const animalData = await animals;
	const keyValuesData = await keyValues;

	function selectRandom(data) {
		const randomDataPosition = Math.floor(Math.random() * data.length);
		const randomData = data[randomDataPosition];

		return randomData;
	}

	number = numbers();
	lastNumber = String(number).slice(-1);

	function generate() {
		let randColour = selectRandom(colourData);
		let randAnimal = selectRandom(animalData);
		let keyValue = keyValuesData[(lastNumber - 1)].symbol;

		return '<span class="colour" style="color: ' + randColour.value + '">' + randColour.name + '</span>' + '<span class="animal">' + randAnimal + '</span>' + '<span class="number">' + number + '</span>' + '<span class="key">' + keyValue + '</span>';
	}

	outputDiv.innerHTML = generate();
}

document.addEventListener("DOMContentLoaded", function() {
	emoji.classList.add('spin');
	runGenerator();
	setTimeout(function() {
		emoji.classList.remove('spin');
	}, 1000);
});

function hideCopiedTip() {
	setTimeout(function() {
		copiedTip.classList.remove('visible');
	}, 2000);
}

function copyDivToClipboard() {
	var range = document.createRange();
	range.selectNode(outputDiv);
	window.getSelection().removeAllRanges(); // clear current selection
	window.getSelection().addRange(range); // to select text
	document.execCommand("copy");
	window.getSelection().removeAllRanges(); // to deselect
	copiedTip.classList.add('visible');
	hideCopiedTip();
}