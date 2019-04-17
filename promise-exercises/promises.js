/*
1. Write a function called getMostFollowers, which accepts a variable number of arguments. 
You should then make an AJAX call to the Github User API 
(https://developer.github.com/v3/usres/#get-a-single-user) 
to get the name and number of followers of each argument. 
The function should return a promise, which when resolved, 
returns a string which displays the username who has the most followers. 
*/
function getMostFollowers(...users) {
	var promises = [];
	// collect all the promises for each user
	users.forEach(function(user) {
		var apiResponse = $.getJSON(`https://api.github.com/users/${user}`);
		promises.push(apiResponse);
	});
	// resolve the array of promises
	return Promise.all(promises)
		.then(function(userDataArr) {
			let max = userDataArr.sort((a,b) => a.followers < b.followers)[0]; // sort the users array in place
			return `${max.login} has the most followers with ${max.followers}`;
		});
}

/*
2. Write a function called starWarsString, which accepts a number. 
You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) 
to search for a specific character by the number passed to the function. 
Your function should return a promise that when resolved will console.log the name of the character.
*/
function starWarsString(num) {
	return $.getJSON(`https://swapi.co/api/people/${num}`)
		.then(function(data) {
			return new Promise(function(resolve, reject) {
				// Return addtional data about the character, (first movie they starred in and its location)
				$.getJSON(data.films[0])
					.then(function(filmData) {
						$.getJSON(filmData.planets[0])
							.then(function(planetData) {
								resolve(`${data.name} is featured in the ${filmData.title}, directed by ${filmData.director} and it takes place on ${planetData.name}`);
							})
					});
			});
		})
		.catch(function(err) {
			console.log('ERROR');
			console.log(err);
		});
}

function main() {
	getMostFollowers('sguar001')
		.then(function(data) {
			console.log(data);
		})
		.catch(function(err) {
			console.log('ERROR');
			console.log(err);
		});

	starWarsString(1)
		.then(function(data) {
			console.log(data);
		})
		.catch(function(err) {
			console.log('ERROR');
			console.log(err);
		});
}

main();