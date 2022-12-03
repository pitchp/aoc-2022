const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
var input = data.split('\n').map(Number);

var elves = [];
var sum = 0;

for (var i = 0; i <= input.length; i++)
{
    
    if (input[i] > 0)
    {
        sum += input[i];
    }
    else
    {
        elves.push(sum);
        sum = 0;
    }
}

var result = elves.sort(function(a, b){return b-a});

console.log("Day 1 Part 1 answer is: " + result[0]);

console.log("Day 1 Part 2 answer is: " + (result[0] + result[1] + result[2]));