const fs = require('fs');
const data = fs.readFileSync('./input.txt',
             {encoding:'utf8', flag:'r'});


console.log("Day 6 Part 1 Answer is: " + findMarker(data, 4));
console.log("Day 6 Part 2 Answer is: " + findMarker(data, 14));




function findMarker(input, size)
{
    let loopCount = input.length - size + 1
    for (let i = 0; i < loopCount; i++)
    {
        let markerCharCount = i + size;
        let packet = input.substring(i, markerCharCount).split('');
        let packetOnlyUnique = packet.filter((value, index, n) => n.indexOf(value) === index);
        if (packet.length == packetOnlyUnique.length)
        {
            return markerCharCount;
        }
    }
}
