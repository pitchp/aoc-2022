const { dir } = require('console');
const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});
let input = data.split('\n');

let root = new directory("/",null);

executeInput(input, root);

let sum = 0;
let under = 100000;
console.log("Day 7 Part 1 Answer is : " + sumAllUnder(root, sum, under));

function directory(name, parent)
{
    this.name   = name;
    this.parent = parent;
    this.child  = [];
    this.size   = 0;

    this.addChild = function addChild(childObj)
    {
       return this.child.push(childObj);
    };
    
    this.addSize = function addSize(sizeToAdd)
    {
       return this.size += sizeToAdd;
    };

};

function file(name, size)
{
    this.name = name;
    this.size = Number(size);
}

function executeInput(input, currentDirectory)
{
    for (let i = 0; i < input.length; i++)
    {
        let temp = input[i].split(" ");
        if (temp[0] == "$" && temp[1] == "cd")
        {
            if (temp[2] == "/")
            {
                currentDirectory = root;
            }
            else if (temp[2] == "..")
            {
                currentDirectory = currentDirectory.parent;
            }
            else
            {
                currentDirectory = currentDirectory.child.find(child => child.name == temp[2]);
            }
        }
        else if (temp[0] == "dir" )
        {
            let name = temp[1];
            let tempDirectory = new directory(name, currentDirectory);
            currentDirectory.addChild(tempDirectory);
        }
        else if (Number.isInteger(parseInt(temp[0])))
        {
            let name = temp[1];
            let size = parseInt(temp[0]);
            let tempFile = new file(name, size);
            currentDirectory.addChild(tempFile);
            addSizeToAll(currentDirectory, size);
        }
    }
}

function addSizeToAll(dirObj, size)
{
    if (dirObj.parent !== null)
    {
        dirObj.addSize(size);
        addSizeToAll(dirObj.parent, size); 
    }
    else
    {
        dirObj.addSize(size);
    }
}

function sumAllUnder(dirObj, sum, under)
{
    let childArr = dirObj.child;
    for (let i = 0; i < childArr.length; i++)
    {
        if (childArr[i].constructor.name == "directory")
        {
            if (childArr[i].size <= under)
            {
                sum += childArr[i].size;
            }
            if (childArr[i].child.length > 0)
            {
                sum += sumAllUnder(childArr[i], sum, under) - sum;
            }
        }
    }
    return sum;
}