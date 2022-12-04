const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

//A-Z unicode char code 65-90
//a-z unicode char code 97-122
//charcodeat(0) for result value
//A-Z minus 38 for result value 27-52
//a-z minus 96 for result value  1-26

let p1Result = 0;

for (let i = 0; i < input.length; i++)
{
    let rucksack = splitRucksack(input[i]);
    let temp = 0;
    p1Result += searchRucksack(rucksack);
}

console.log("Day 3 Part 1 Answer is: " + p1Result);

let p2Result = 0;

for (let i = 0; i < input.length; i += 3)
{
    let rucksack = input.slice(i, i+3);
    p2Result += searchRucksack(rucksack);
}

console.log("Day 3 Part 1 Answer is: " + p2Result);

function splitRucksack(rucksack)
{
    let compartmentIndex = rucksack.length / 2;
    let result = [rucksack.slice(0, compartmentIndex), rucksack.slice(compartmentIndex)];
    return result;
}


function searchRucksack(rucksack)
{
    let result = 0;
    for (let A = 65; A <= 90; A++)
    {
        let char = String.fromCharCode(A);
        let regex = new RegExp(char);
        if (rucksack.every(item => item.match(regex) !== null))
        {
            result += A - 38;
            break;
        }
    }
    for (let a = 97; a <= 122; a++)
    {
        let char = String.fromCharCode(a);
        let regex = new RegExp(char);
        if (rucksack.every(item => item.match(regex) !== null))
        {
            result += a - 96;
            break;
        }
    }
    return result;
}
