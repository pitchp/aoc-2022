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
var max = Math.max(...elves);
console.log("Day 1 Part 1 answer is: " + max);

var topthree = elves.sort(function(a, b){return b-a});

console.log("Day 1 Part 2 answer is: " + (topthree[0] + topthree[1] + topthree[2]));