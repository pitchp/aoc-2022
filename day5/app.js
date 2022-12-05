const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
const crate = fs.readFileSync('./crateinput.txt',
              {encoding:'utf8', flag:'r'});
let input = data.split('\n');

let rawCrateArr = crate.replaceAll('    ','[ ]').replaceAll(/\] +\[/g,'][').split('\n');

let crateStackLabel = rawCrateArr.pop().replaceAll(/[^0-9]/g, '');

let crateRow = [];

for (let i = 0; i < rawCrateArr.length; i++)
{
    crateRow.push(rawCrateArr[i].match(/(?<=\[).(?=\])/g));
}

let crateDataWithEmpty = transposeCrate(crateRow);
let crateData = removeEmptyCrate(crateDataWithEmpty);
let instructions = numbersFromInstructions(input);

let reArrCrate = JSON.parse(JSON.stringify(crateData));
reArrCrate = moveCrate(instructions, reArrCrate, 1);

let reArrCrate2 = JSON.parse(JSON.stringify(crateData));
reArrCrate2 = moveCrate(instructions, reArrCrate2, 0);

console.log("Day 5 Part 1 Answer is: " + getTopStackMsg(reArrCrate));
console.log("Day 5 Part 2 Answer is: " + getTopStackMsg(reArrCrate2));

function transposeCrate(matrix)
{
    const rows = matrix.length;
    const cols = matrix[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++)
    {
      grid[j] = Array(rows);
    }
    
    for (let i = 0; i < rows; i++)
    {
      for (let j = 0; j < cols; j++)
      {
        grid[j][i] = matrix[i][j];
      }
    }

    for (let j = 0; j < cols; j++)
    {
      grid[j].reverse();
    }

    return grid;
}

function removeEmptyCrate(crateArr)
{
    let temp = [];
    for (let i = 0; i < crateArr.length; i++)
    {
        temp[i] = crateArr[i].filter(n => n != ' ');
    }
    return temp;
}

function numbersFromInstructions(instructionArr)
{
    let instructionsNumbers = [];
    for (let i = 0; i < instructionArr.length; i++)
    {
        let instructions   = instructionArr[i].split(' ');
        let crateAmount    = instructions[1];
        let cratestackFrom = instructions[3] - 1;
        let cratestackTo   = instructions[5] - 1;
        instructionsNumbers[i] = [crateAmount, cratestackFrom, cratestackTo];
    }
    return instructionsNumbers;
}

function moveCrate(instructions, crateArr, reverseFlag)
{
    let result = crateArr.slice();
    for (let i = 0; i < instructions.length; i++)
    {
        let crateAmount = instructions[i][0];
        let stackFrom   = instructions[i][1];
        let stackTo     = instructions[i][2];

        if (crateAmount == 1)
        {
            result[stackTo].push(result[stackFrom].pop());
        }
        else if (crateAmount == result[stackFrom].length)
        {
            if (reverseFlag == 1)
            {
                result[stackTo] = result[stackTo].concat(result[stackFrom].reverse());
            }
            else 
            {
                result[stackTo] = result[stackTo].concat(result[stackFrom]);
            }
            result[stackFrom] = [];
        }
        else if (crateAmount > 1)
        {
            if (reverseFlag == 1)
            {
                result[stackTo] = result[stackTo].concat(result[stackFrom].splice(-crateAmount).reverse());
            }
            else
            {
                result[stackTo] = result[stackTo].concat(result[stackFrom].splice(-crateAmount));
            }
        }
    }
    return result;
}

function getTopStackMsg(movedCrate)
{
    let msg = '';
    for (let i = 0; i < movedCrate.length; i++)
    {
        msg += movedCrate[i].pop();
    }
    return msg;
}