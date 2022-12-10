const { dir } = require('console');
const fs = require('fs');
const { uptime } = require('process');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

// console.log(input);
let head = new ropeKnot();
let tail1 = new ropeKnot();
let tail2 = new ropeKnot();
let tail3 = new ropeKnot();
let tail4 = new ropeKnot();
let tail5 = new ropeKnot();
let tail6 = new ropeKnot();
let tail7 = new ropeKnot();
let tail8 = new ropeKnot();
let tail9 = new ropeKnot();

let tailArr = [tail1, tail2, tail3, tail4, tail5, tail6, tail7, tail8, tail9];
let tailDict = {};
let tail9Dict = {};

for (let i = 0; i < input.length; i++)
{
    let temp = input[i].split(" ");
    let direction = temp[0];
    let times = temp[1];
    headMovement(head, tailArr, tailDict, direction, times);
}
let p1Ans = Object.keys(tailDict).length;
console.log("Day 9 Part 1 Answer is: " + p1Ans);

let p2Ans = Object.keys(tail9Dict).length;
console.log("Day 9 Part 2 Answer is: " + p2Ans);

function headMovement(headObj, tailObjArr, tailDict, direction, times)
{
    for (let i = 0; i < times; i++)
    {
        ropeMovement(headObj, direction);
        for (let j = 0; j < tailObjArr.length; j++)
        {
            let currTail = tailObjArr[j];
            if (j == 0)
            {
                checkHeadTailLocation(headObj, currTail);
                checkTailUnique(tailDict, currTail.x, currTail.y);
            }
            else if (j == tailObjArr.length - 1)
            {
                checkHeadTailLocation(tailObjArr[j - 1], currTail);
                checkTailUnique(tail9Dict, currTail.x, currTail.y);
            }
            else
            {
                checkHeadTailLocation(tailObjArr[j - 1], currTail);
            }
        }
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
    else if (headObj.y - tailObj.y >= 1)
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
    else if (tailObj.y - headObj.y >= 1)
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
    else if (headObj.x - tailObj.x >= 1)
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
    else if (tailObj.x - headObj.x >= 1)
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

function ropeKnot()
{
    this.x = 0;
    this.y = 0;
}

function checkTailUnique(tailDict, x, y)
{
    let key = x + "," + y
    if (tailDict[key] == undefined)
    {
        tailDict[key] = 1;
    }
}