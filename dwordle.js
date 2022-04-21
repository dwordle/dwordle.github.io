const MAX_CHARS = 11;

const NOT_IN_WORD = 0, IN_WORD = 1, EXACT = 2;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDword = () => {
	let num = randomInt(-2147483648, 2147483647);
	return num ? num : 1;
}

const hasMaxChars = (num, max) => num < 10 ** max;

const dwordToCharArray = (dword) => {
	num = Math.abs(dword);
	let s = [];
	for (let i = 0; i < MAX_CHARS; ++i) {
		if (num >= 10 ** (MAX_CHARS - i - 1))
			s[i] = Math.floor(num / 10 ** (MAX_CHARS - i - 1)) % 10;
		else
			s[i] = (i == 0 && dword < 0) ? "-" : "0";
	}
	return s;
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