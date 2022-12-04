const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

let p1Result = 0;
let p2Result = 0

for (let i = 0; i < input.length; i++)
{
    p1Result += compareAssg1(input[i]);
    p2Result += compareAssg2(input[i]);
}

console.log("Day 4 Part 1 Answer is: " + p1Result);
console.log("Day 4 Part 2 Answer is: " + p2Result);


function compareAssg1(input)
{
    let elf = input.split(',');
    let elf1 = elf[0].split('-').map(Number);
    let elf2 = elf[1].split('-').map(Number);
    if (
        (elf1[0] >= elf2[0] && elf1[1] <= elf2[1])
        ||
        (elf2[0] >= elf1[0] && elf2[1] <= elf1[1])
       )
    {
        return 1;
    }
    else { return 0 };
}

function compareAssg2(input)
{
    let elf = input.split(',');
    let elf1 = elf[0].split('-').map(Number);
    let elf2 = elf[1].split('-').map(Number);
    if (
        (elf1[0] <= elf2[1] && elf1[1] >= elf2[0])
        ||
        (elf2[0] <= elf1[1] && elf2[1] >= elf1[0])
       )
    {
        return 1;
    }
    else { return 0 };
}
