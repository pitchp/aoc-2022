const { dir } = require('console');
const fs = require('fs');
const { uptime } = require('process');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

let test = input.slice(0,40);

let X = 1;
let p1Ans = 0;
let cycle = 0;

let p2Ans = "";


for (let i = 0; i < input.length; i++)
{
    let temp = input[i].split(" ");
    let inst = temp[0];
    let val  = parseInt(temp[1]);
    if (inst == "addx")
    {
        cycle++;
        p1Ans += CheckXCycle(cycle, X);
        p2Ans = drawCRT(cycle, X, p2Ans);
        p2Ans = drawCRT(cycle+1, X, p2Ans);
        X += val;
        cycle++;
        p1Ans += CheckXCycle(cycle, X);        
    }
    else if (inst = "noop")
    {
        cycle++;
        p1Ans += CheckXCycle(cycle, X);
        p2Ans = drawCRT(cycle, X, p2Ans);
    }
}

console.log("Day 10 Part 1 Answer is: " + p1Ans);
let crtScreen = p2Ans.replace(/.{40}/g,'$&\n');
console.log("See below for Day 10 Part 2 Answer")
console.log(crtScreen);

function CheckXCycle(cycle, X)
{
    const checkCycle = [20, 60, 100, 140, 180, 220];
    cycle++;
    if (checkCycle.includes(cycle))
    {
        return cycle * X;
    }
    else 
    {
        return 0;
    }
}

function drawCRT(cycle, X, crt)
{

    let cycleRowIndex = 0;
    if (cycle <= 40)
    {
        cycleRowIndex = cycle;
    }
    else if (cycle % 40 == 0 && cycle != 40)
    {
        cycleRowIndex = cycle - (40 * ((cycle / 40) - 1));
    }
    else if (cycle % 40 > 0)
    {
        cycleRowIndex = cycle - (40 * Math.floor(cycle / 40));
    }
    
    let crtPixelIndex = cycleRowIndex - 1;
    console.log("Cycle: " + cycle);
    console.log("crtPixelIndex: " + crtPixelIndex);
    console.log("X: " + X);
    if (crtPixelIndex - X == 0 || Math.abs(crtPixelIndex - X) == 1)
    // if (cycle - X == 0 || Math.abs(cycle - X) == 1)
    {
        return crt.concat("#");
    }
    else
    {
        return crt.concat(".");
    }
}