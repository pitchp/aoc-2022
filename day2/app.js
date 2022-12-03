const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

// opponent A B C rock paper scissors
// you      X Y Z rock paper scissors
// your choice point X Y Z 1 2 3
// lose draw win 0 3 6
/*
    X Y Z
A   3 6 0
B   0 3 6
C   6 0 3
*/
let urChoicePt = 
{
    "X": 1,
    "Y": 2,
    "Z": 3
};
let RpsIndex =
{
    "A": 0,
    "B": 1,
    "C": 2,
    "X": 0,
    "Y": 1,
    "Z": 2
};

let resultPoint =
[
    [3, 6, 0],
    [0, 3, 6],
    [6, 0, 3]
];

function playRound(input)
{
    let temp = input.split(' ');
    let opp = RpsIndex[temp[0]];
    let you = RpsIndex[temp[1]];
    return resultPoint[opp][you] + urChoicePt[temp[1]];
}

let sum = 0;

for (let i = 0; i < input.length; i++)
{
    sum += playRound(input[i]);
};

console.log("Day 2 Part 1 Answer is: " + sum);

// part 2 X = lose, Y = draw, Z = win 
// find your choice point

let part2Index =
{
    'X': 0,
    'Y': 3,
    'Z': 6
}

function findChoice(input)
{
    let temp = input.split(' ');
    let opp = RpsIndex[temp[0]];
    let resultPt = part2Index[temp[1]];
    let yourChoicePt = resultPoint[opp].indexOf(resultPt) + 1;
    return resultPt + yourChoicePt
}

let p2sum = 0;
for (let i = 0; i < input.length; i++)
{
    p2sum += findChoice(input[i]);
};

console.log("Day 2 Part 2 Answer is: " + p2sum);