const { dir } = require('console');
const fs = require('fs');
const { uptime } = require('process');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

let visibleTreeDict = {};

lookThrough(input, "Left", "Part1");
lookThrough(input, "Right", "Part1");
lookThrough(input, "Up", "Part1");
lookThrough(input, "Down", "Part1");
let p1Ans = Object.keys(visibleTreeDict).length;
console.log("Day 8 Part 1 Answer is: " + p1Ans);

lookThrough(input, "Left", "Part2");
lookThrough(input, "Right", "Part2");
lookThrough(input, "Up", "Part2");
lookThrough(input, "Down", "Part2");

let keys = Object.keys(visibleTreeDict).sort((a,b) => { return visibleTreeDict[b] - visibleTreeDict[a] });
let p2Ans = visibleTreeDict[keys[0]];
console.log("Day 8 Part 2 Answer is: " + p2Ans);


function lookThrough(input, direction, partFlag)
{
    let transposedInput = [];
    if (direction == "Up" || direction == "Down")
    {
        transposedInput = transposeTree(input.slice());
    }
    for (let i = 0; i < input.length; i++)
    {
        let row = [];
        if (direction == "Left")
        {
            row = input[i].split('').map(Number);
        }
        else if (direction == "Right")
        {
            row = input[i].split('').reverse().map(Number);
        }
        else if (direction == "Up")
        {
            row = transposedInput[i].map(Number);
        }
        else if (direction == "Down")
        {
            row = transposedInput[i].reverse().map(Number);
        }

        if (partFlag == "Part1")
        {
            part1CompareTree(row, input, i, direction);
        }
        else if (partFlag == "Part2")
        {
            part2TreeScore(row, input, i, direction);
        }
    }
}

function part1CompareTree(row, input, i, direction)
{
        const firstTree = 0
        const lastTree  = row.length - 1;
        const firstRow = 0;
        const lastRow = input.length - 1;
        let highest = Math.max(...row);
        let highestSeen = 0;

        for (let j = 0; j < row.length; j++)
        {
            let currTree = row[j];

            if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
            {
                treeDictFlagger(visibleTreeDict, i, j, direction, row.length);
                highestSeen = currTree;
            }

            if (currTree > highestSeen && currTree != highest)
            {
                treeDictFlagger(visibleTreeDict, i, j, direction, row.length);
                highestSeen = currTree;
            }
            else if (currTree == highest)
            {
                treeDictFlagger(visibleTreeDict, i, j, direction, row.length);
                break;
            }
        }
}

function part2TreeScore(row, input, i, direction)
{
        const firstTree = 0
        const lastTree  = row.length - 1;
        const firstRow = 0;
        const lastRow = input.length - 1;
        
        for (let j = 0; j < row.length; j++)
        {
            let currTree = row[j];
            let selfHeight = currTree;
            let score = 0;

            for (let k = j; k < row.length; k++)
            {

                let rightTree = row[k + 1];

                if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
                {
                    treeDictScore(visibleTreeDict, i, j, direction, row.length, 0);
                    break;
                }

                if (rightTree < selfHeight)
                {
                    score += 1;
                }
                else if (rightTree >= selfHeight && rightTree != undefined)
                {
                    score += 1;
                    treeDictScore(visibleTreeDict, i, j, direction, row.length, score);
                    break;
                }
                else if (rightTree == undefined)
                {
                    treeDictScore(visibleTreeDict, i, j, direction, row.length, score);
                    break;
                }
            }
        }
}

function transposeTree(matrix)
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

    return grid;
}

function treeDictFlagger(dictionary, coordX, coordY, direction, arrLength)
{
    let key;
    if (direction == "Left")
    {
        key = coordX + "," + coordY;
    }
    else if (direction == "Right")
    {
        key = coordX + "," + Math.abs(coordY - arrLength + 1);
    }
    else if (direction == "Up")
    {
        key = coordY + "," + coordX;
    }
    else if (direction == "Down")
    {
        key = Math.abs(coordY - arrLength + 1) + "," + coordX;
    }
    if (dictionary[key] == undefined)
    {
        dictionary[key] = 1;
    }
}

function treeDictScore(dictionary, coordX, coordY, direction, arrLength, score)
{
    let key;
    if (direction == "Left")
    {
        key = coordX + "," + coordY;
    }
    else if (direction == "Right")
    {
        key = coordX + "," + Math.abs(coordY - arrLength + 1);
    }
    else if (direction == "Up")
    {
        key = coordY + "," + coordX;
    }
    else if (direction == "Down")
    {
        key = Math.abs(coordY - arrLength + 1) + "," + coordX;
    }

    if (dictionary[key] == undefined)
    {
        dictionary[key] = score;
    }
    else
    {
        dictionary[key] *= score;
    }
}