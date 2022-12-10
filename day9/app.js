const { dir } = require('console');
const fs = require('fs');
const { uptime } = require('process');
const data = fs.readFileSync('./sample.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

// console.log(input);
let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let tailDict = {};

for (let i = 0; i < input.length; i++)
{
    let temp = input[i].split(" ");
    let direction = temp[0];
    let times = temp[1];
    headMovement(head, tail, tailDict, direction, times);
}
let p1Ans = Object.keys(tailDict).length;
console.log("Day 9 Part 1 Answer is: " + p1Ans);

function headMovement(headObj, tailObj, tailDict, direction, times)
{
    for (let i = 0; i < times; i++)
    {
        ropeMovement(headObj, direction);
        checkHeadTailLocation(headObj, tailObj);
        checkTailUnique(tailDict, tailObj.x, tailObj.y);
        //console.log("Head: " + headObj.x + "," + headObj.y + " / Tail: " + tailObj.x + "," + tailObj.y);
    }
}

function ropeMovement(obj, direction)
{
    switch (direction)
    {
        case "U":
            obj.y += 1;
            break;
        case "D":
            obj.y -= 1;
            break;
        case "R":
            obj.x += 1;
            break;
        case "L":
            obj.x -= 1;
            break; 
    }
}

function checkHeadTailLocation(headObj, tailObj)
{
    // if tail > 2 from head call tail movement // same row/column
    if (headObj.y == tailObj.y)
    {
        if (headObj.x - tailObj.x == 2)
        {
            ropeMovement(tailObj, "R");
        }
        else if(tailObj.x - headObj.x == 2)
        {
            ropeMovement(tailObj, "L");
        }
    }
    else if (headObj.y - tailObj.y == 1)
    {
        if (headObj.x - tailObj.x == 2)
        {
            ropeMovement(tailObj, "R");
            ropeMovement(tailObj, "U");
        }
        else if(tailObj.x - headObj.x == 2)
        {
            ropeMovement(tailObj, "L");
            ropeMovement(tailObj, "U");
        }
    }
    else if (tailObj.y - headObj.y == 1)
    {
        if (headObj.x - tailObj.x == 2)
        {
            ropeMovement(tailObj, "R");
            ropeMovement(tailObj, "D");
        }
        else if(tailObj.x - headObj.x == 2)
        {
            ropeMovement(tailObj, "L");
            ropeMovement(tailObj, "D");
        }
    }

    if (headObj.x == tailObj.x)
    {
        if (headObj.y - tailObj.y == 2)
        {
            ropeMovement(tailObj, "U");
        }
        else if(tailObj.y - headObj.y == 2)
        {
            ropeMovement(tailObj, "D");
        }
    }
    else if (headObj.x - tailObj.x == 1)
    {
        if (headObj.y - tailObj.y == 2)
        {
            ropeMovement(tailObj, "R");
            ropeMovement(tailObj, "U");
        }
        else if(tailObj.y - headObj.y == 2)
        {
            ropeMovement(tailObj, "R");
            ropeMovement(tailObj, "D");
        }
    }
    else if (tailObj.x - headObj.x == 1)
    {
        if (headObj.y - tailObj.y == 2)
        {
            ropeMovement(tailObj, "L");
            ropeMovement(tailObj, "U");
        }
        else if(tailObj.y - headObj.y == 2)
        {
            ropeMovement(tailObj, "L");
            ropeMovement(tailObj, "D");
        }
    }

}

function checkTailUnique(tailDict, x, y)
{
    let key = x + "," + y
    if (tailDict[key] == undefined)
    {
        tailDict[key] = 1;
    }
}