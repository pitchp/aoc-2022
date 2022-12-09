const { dir } = require('console');
const fs = require('fs');
const { uptime } = require('process');
const data = fs.readFileSync('./sample.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

console.log(input);
let transposedInput = transposeTree(input.slice());
console.log(transposedInput);
let visibleTreeDict = {};
// lookThroughRows(input, "L>R");
// lookThroughRows(input, "R>L");
// lookThroughColumns(transposedInput, "U>D");
// lookThroughColumns(transposedInput, "D>U");

// console.log(visibleTreeDict);
// console.log(Object.keys(visibleTreeDict).length);

/*
To rewrite lookThrough function into one function
Left -> i,j
Right -> i, reverse() ABS(j - 4)
Top -> transpose(i,j) to j, i
Down -> reverse() ABS(j - 4), i

*/


function lookThroughRows(input, direction)
{
    for (let i = 0; i < input.length; i++)
    {
        let row = input[i].split('').map(Number);
        const firstTree = 0
        const lastTree  = row.length - 1;
        const firstRow = 0;
        const lastRow = input.length - 1;
        let highest = 0;
        if (direction == "L>R")
        {
            for (let j = 0; j < row.length; j++)
            {
                let currTree = row[j];
                let leftTree = row[j - 1];
                let rightTree = row[j + 1];
                if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
                {
                    treeDictFlagger(visibleTreeDict, i, j);
                    highest = currTree;
                }
                else if (currTree > leftTree)
                {
                    treeDictFlagger(visibleTreeDict, i, j);
                    highest = currTree;
                }
                else if (currTree <= rightTree && rightTree <= highest)
                {
                    break;
                }
            }
        }
        else if (direction == "R>L")
        {
            for (let j = row.length - 1; j > - 1; j--)
            {
                let currTree = row[j];
                let rightTree = row[j + 1];
                let leftTree = row[j - 1];
                if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
                {
                    treeDictFlagger(visibleTreeDict, i, j);
                    highest = currTree;
                }
                else if (currTree > rightTree)
                {
                    treeDictFlagger(visibleTreeDict, i, j);
                    highest = currTree
                }
                else if (currTree <= leftTree && leftTree <= highest)
                {
                    break;
                }
            }
        }
    }
}

function lookThroughColumns(input, direction)
{
    let newInput = transposeTree(input);
    for (let i = 0; i < input.length; i++)
    {
        let row = input[i].map(Number);
        const firstTree = 0
        const lastTree  = row.length - 1;
        const firstRow = 0;
        const lastRow = input.length - 1;
        let highest = 0;
        if (direction == "U>D")
        {
            for (let j = 0; j < row.length; j++)
            {
                let currTree = row[j];
                let upTree = row[j - 1];
                let downTree = row[j + 1];
                if (currTree > upTree || highest == 0)
                {
                    highest = currTree;
                }
                console.log("Current row:" + row);
                console.log("Current Tree: " + currTree);
                console.log("DownTree: " + downTree);
                console.log("highest: " + highest);
                if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
                {
                    treeDictFlagger(visibleTreeDict, j, i);
                }
                else if (currTree > upTree)
                {
                    treeDictFlagger(visibleTreeDict, j, i);
                    if (currTree <= downTree && downTree <= highest)
                    {
                        break;
                    }
                }
                else if (currTree <= downTree && downTree <= highest)
                {
                    break;
                }
            }
        }
        else if (direction == "D>U")
        {
            for (let j = row.length - 1; j > -1; j--)
            {
                let currTree = parseInt(row[j]);
                let downTree = parseInt(row[j + 1]);
                let upTree = parseInt(row[j - 1]);

                if (currTree > downTree || highest == 0)
                {
                    highest = currTree;
                }

                console.log("Current row:" + row);
                console.log("Current Tree: " + currTree);
                console.log("Uptree: " + upTree);
                console.log("highest: " + highest);


                if (i == firstRow || i == lastRow || j == firstTree || j == lastTree)
                {
                    treeDictFlagger(visibleTreeDict, j, i);
                }
                else if (currTree > downTree)
                {
                    treeDictFlagger(visibleTreeDict, j, i);
                    if (currTree <= upTree && upTree <= highest);
                    {
                        break;
                    }
                }
                else if (currTree <= upTree && upTree <= highest);
                {
                    console.log(currTree <= upTree);
                    console.log(upTree <= highest);
                    console.log(typeof currTree);
                    console.log(typeof upTree);
                    console.log(typeof highest);
                    console.log("test");
                    break;
                }
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

function treeDictFlagger(dictionary, coordX, coordY)
{
    let key = coordX + "," + coordY;
    if (dictionary[key] == undefined)
    {
        dictionary[key] = 1;
    }
}