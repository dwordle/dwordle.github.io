const MAX_CHARS = 11;

const NOT_IN_WORD = 0, IN_WORD = 1, EXACT = 2;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDword = () => {
	let num = randomInt(-2147483648, 2147483647);
	return num ? num : 1;
}

const hasMaxChars = (num, max) => num < 10 ** max;

const dwordToCharArray = dword => {
	num = Math.abs(dword);
	let s = [];
	for (let i = 0; i < MAX_CHARS; ++i) {
		if (num >= 10 ** (MAX_CHARS - i - 1))
			s[i] = `${Math.floor(num / 10 ** (MAX_CHARS - i - 1)) % 10}`;
		else
			s[i] = (i == 0 && dword < 0) ? "-" : "0";
	}
	return s;
}

const stringToCharArray = string => {
	let arr = [];
	for (let i = 0; i < MAX_CHARS; ++i) {
		arr[i] = string[i];
	}
	return arr;
}

const getMatchArray = (generatedCharArray, userCharArray) => {
	let matches = [];
	for (let i = 0; i < MAX_CHARS; ++i) {
		if (generatedCharArray[i] === userCharArray[i])
			matches[i] = EXACT;
		else {
			for (let j = 0; j < MAX_CHARS; ++j)
				if (generatedCharArray[j] === userCharArray[i]) {
					matches[i] = IN_WORD;
					break;
				}
			if (matches[i] != IN_WORD)
				matches[i] = NOT_IN_WORD;
		}
	}
	return matches;
}

const game = {};

const validateField = () => {
	game.btn.disabled = game.guess.value.length != MAX_CHARS;
}

const refresh = () => {
	game.left.innerText = game.attempts;
	game.boardEl.innerText = "";
	for (let row of game.board) {
		let rowEl = document.createElement("div");
		rowEl.className = "board-row";
		for (let i in row.chars) {
			let char = document.createElement("div");
			char.className = `board-char ${["not-in-row", "in-row", "exact"][row.matches[i]]}`;
			char.innerText = row.chars[i];
			rowEl.appendChild(char);
		}
		game.boardEl.appendChild(rowEl);
	}
}

const reset = () => {
	let dword = randomDword();
	console.log(dword);
	game.dwordArray = dwordToCharArray(dword);
	game.attempts = 6;
	game.board = [];
	game.guess.value = "";
	validateField();
	refresh();
}

const initDwordle = (guessId, boardId, leftId, btnId) => {
	game.guess = document.getElementById(guessId);
	game.boardEl = document.getElementById(boardId);
	game.left = document.getElementById(leftId);
	game.btn = document.getElementById(btnId);
	validateField();
	reset();
}

const check = () => {
	if (!game.guess)
		throw "Dwordle not initialized";
	let userCharArray = stringToCharArray(game.guess.value);
	game.board.push({
		chars: userCharArray,
		matches: getMatchArray(game.dwordArray, userCharArray)
	});
	--game.attempts;
	game.guess.value = "";
	validateField();
	refresh();
}