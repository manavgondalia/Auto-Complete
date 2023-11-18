class Node {
	next = [];
	output = false;
}

function addWord(TrieArray, word) {
	let trie_id = 0;
	for (let i = 0; i < word.length; i++) {
		let val = word[i].charCodeAt(0) - "a".charCodeAt(0);
		if (TrieArray[trie_id].next[val] === undefined) {
			TrieArray.push(new Node());
			TrieArray[trie_id].next[val] = TrieArray.length - 1;
		}
		trie_id = TrieArray[trie_id].next[val];
	}
	TrieArray[trie_id].output = true;
}

function traversal(TrieArray, trie_id, currentString) {
	if (TrieArray[trie_id].output) {
		return currentString;
	}
	for (let i = 0; i < 26; i++) {
		if (TrieArray[trie_id].next[i] !== undefined) {
			let result = traversal(
				TrieArray,
				TrieArray[trie_id].next[i],
				currentString + String.fromCharCode(i + "a".charCodeAt(0))
			);
			if (result !== "") {
				return result;
			}
		}
	}
	return "";
}

function search(TrieArray, word) {
	let trie_id = 0;
	let closestString = "";
	for (let i = 0; i < word.length; i++) {
		let val = word[i].charCodeAt(0) - "a".charCodeAt(0);
		if (TrieArray[trie_id].next[val] === undefined) {
			return undefined;
		}
		closestString += word[i];
		trie_id = TrieArray[trie_id].next[val];
	}
	return traversal(TrieArray, trie_id, closestString);
}

let TrieArray = [new Node()];

async function getWordsInTrie() {
	const res = await fetch("dictionary.txt");
	const data = await res.text();
	const words = data.split("\n");
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].replace("\r", "");
		addWord(TrieArray, words[i]);
	}
	console.log(words);
	return words;
}

function runGetWords() {
	return getWordsInTrie();
}

runGetWords();

const wordToComplete = document.getElementById("wordToComplete");

wordToComplete.addEventListener("input", () => {
	let word = wordToComplete.value.split(" ");
	word = word[word.length - 1];

	let prevWords = wordToComplete.value.split(" ");
	prevWords.pop();

	const closestString = search(TrieArray, word);

	if (closestString === undefined) {
		document.getElementById("complete").innerHTML = "";
		return;
	} else if (word === "") {
		document.getElementById("complete").innerHTML = "";
		return;
	}

	console.log(closestString);

	document.getElementById("complete").innerHTML = closestString;

	// if down arrow key is pressed, fill in the word
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowDown") {
			wordToComplete.value = prevWord;
		}
	});
});
