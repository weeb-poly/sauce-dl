/** shared functions for all files**/

// includes
const https = require('https')
fs = require('fs')


/*
-- NOTE: JS has no random seed function, so I had to write my own
--       the Von Neumann method does have flaws, but it was quick to implement
input: integer
output: integer that is at maximum, the same length
Purpose: give it one manga number, and it gives you a random one. Is pseudo-random
Usage: seededRandom(11111) -> 2343
*/
function seededRandom(number){
	// runs the von neumann method
	let tempRand = number ** 2;
	let temp = tempRand.toString();
	// this makes sure the square is the same length as the number you want to generate
	while((temp.length - number.toString().length) % 2 === 1) temp = "0" + temp;
	let removeChar = (temp.length - number.toString().length) / 2;
	return parseInt(temp.substring(removeChar, temp.length - removeChar));
}


/*
-- NOTE: This does not check if the URL you are giving it is an image. use carefully
input: url (string), image name (string)
output: no return type (downloads image specified)
purpose:
usage:
*/
function download(url, imagename){
	https.get(url, (resp) => {
		let data = '';
		resp.setEncoding('binary');
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			fs.writeFile(imagename, data, 'binary', (err) => {
            if (err) throw err;
            console.log('File saved.');
      });
		});

	});
}