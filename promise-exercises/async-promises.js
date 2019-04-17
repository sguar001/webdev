/*
1. Write a function called hasMostFollowers, which accepts a variable number of arguments. 
You should then make an AJAX call to the Github User API 
(https://developer.github.com/v3/usres/#get-a-single-user) 
to get the name and number of followers of each argument. 
The function should return a promise, which when resolved, 
returns a string which displays the username who has the most followers. 
*/
async function hasMostFollowers(...users) {
	var promises = [];
	// collect all the promises for each user
	users.forEach(function(user) {
		var apiResponse = $.getJSON(`https://api.github.com/users/${user}`);
		promises.push(apiResponse);
	});
	// resolve the array of promises
	var userDataArr = await Promise.all(promises);
	let max = userDataArr.sort((a,b) => a.followers < b.followers)[0];
	return `${max.login} has the most followers with ${max.followers}`;
}

/*
2. Write a function called starWarsString, which accepts a number. 
You should then make an AJAX call to the Star Wars API (https://swapi.co/ ) 
to search for a specific character by the number passed to the function. 
Your function should return a promise that when resolved will console.log the name of the character.
*/
function starWarsString(num) {
	return new Promise(async function(resolve, reject) {
		var characterData = await $.getJSON(`https://swapi.co/api/people/${num}`); // return data of character
		var filmData = await $.getJSON(characterData.films[0]); // return data of first film they starred in
		var planetData = await $.getJSON(filmData.planets[0]);
		resolve(`${characterData.name} is featured in the ${filmData.title}, directed by ${filmData.director} and it takes place on ${planetData.name}`);
	});
}

function main() {
	// hasMostFollowers('sguar001')
	// 	.then(function(data) {
	// 		console.log(data);
	// 	})
	// 	.catch(function(err) {
	// 		console.log('ERROR');
	// 		console.log(err);
	// 	});

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