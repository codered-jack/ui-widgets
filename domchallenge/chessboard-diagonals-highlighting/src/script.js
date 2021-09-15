var diagonals = [];
var highlightedDiagonals = [];
var squareDiagonals = new Map();

generateChessboard();

// ***************************

function generateChessboard() {
	// setup all 15 top-left-bottom-right diagonal
	// collections and all 15 top-right-bottom-left
	// diagonal collections
	for (let i = 0; i < 30; i++) {
		diagonals.push([]);
	}

	var board = document.getElementById("board");
	for (let i = 0; i < 8; i++) {
		let row = document.createElement("div");
		for (let j = 0; j < 8; j++) {
			let square = document.createElement("div");
			row.appendChild(square);

			// select the top-left-bottom-right diagonal collection
			let TLdiag = diagonals[7 - (i - j)];
			// select the top-right-bottom-left diagonal collection
			let TRdiag = diagonals[15 + (i + j)];

			// save a reference to this square in each of its
			// two diagonals collections
			TLdiag.push(square);
			TRdiag.push(square);

			// save a reference to each of a square's two diagonal
			// collections
			squareDiagonals.set(square,[ TLdiag, TRdiag, ]);
		}
		board.appendChild(row);
	}
	board.addEventListener("click",onClickSquare,false);
}

function onClickSquare(evt) {
	// clear all currently highlighted squares (if any)
	for (let diagonal of highlightedDiagonals) {
		for (let square of diagonal) {
			square.classList.remove("highlighted");
		}
	}
	highlightedDiagonals = [];

	// clicked on a board square?
	if (evt.target.matches("#board > div > div")) {
		// retrieve the clicked square's two diagonal collections
		highlightedDiagonals = squareDiagonals.get(evt.target);

		// highlight all squares in both diagonal collections
		for (let diagonal of highlightedDiagonals) {
			for (let square of diagonal) {
				square.classList.add("highlighted");
			}
		}
	}
}