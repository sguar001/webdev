document.addEventListener('DOMContentLoaded', function() {
	charMap = new Map();
	// update phrase to display
	// this will select the first occurence of a button
	d3.select('form').on('submit', function() {
		d3.event.preventDefault();
		let userInput = d3.select('input').property('value');

		// update h2 tag to display phrase that is inputted
		if(userInput !== '') {

			// GENERAL UPDATE PATTERN
			var letters = d3.select('#letters')			// select the parent div
							.selectAll('.letter')			// select all the individual elements, even if not present to join data to
							.data(getFrequencies(userInput), d => d[0]); // here we bind the array elements to the tags on the page with 'letter' class, 
							// need to provide a key function to join based on character rather than index
			
			letters
				.classed('new', false) // remove the new class since elements in the update section already exist on the page
			.exit()
			.remove();

			letters
				.enter() // however if they are not present, the nodes will be created on enter, then appended to page
				.append('div')
					.classed('letter', true)
					.classed('new', true)
				.merge(letters)	// move to merge as styles should apply to both
					.style('width', '20px')
					.style('line-height', '20px')
					.style('margin-right', '5px')
					.style('height', d => d[1] * 20 + 'px')
					.style('color', 'white')
					.text(d => d[0]); // for the div element, set the text to be the character

			// display number of new characters found, based on the length of nodes that have been placed in enter selection
			d3.select('#count').text('(New characters: ' + letters.enter().nodes().length + ")");
			// display the word that is being analyzed
			d3.select('#phrase').text(`Analysis of: ${userInput}`);
			// clear the form input
			d3.select('input').property('value', '');

		}
	});

	// action to perform reset on reset button click
	d3.select('#reset').on('click', function() {
		d3.selectAll('.letter')
			.remove();

		d3.select('#phrase')
			.text('');

		d3.select('#count')
			.text('');	
	});
});

// dipslay the word that is being analyzed
function getFrequencies(userInput) {

	// display the number of new characters
	let charArray = userInput.split('').sort();
	charArray.forEach(function(val) {
		if(charMap.has(val)) {
			let newCount = charMap.get(val) + 1;
			charMap.set(val, newCount);
		}
		else {
			charMap.set(val, 1);
		}
	});
	let newCharArray = Array.from(charMap);
	// d3.select('#count').text(`(New characters: ${newCharArray.length})`);

	return newCharArray;
}
// display the number of new characters

// display the letters