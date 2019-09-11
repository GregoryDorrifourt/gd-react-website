
let HeartCoordinates = [
    {x:0, y:6, gpId:1},
    {x:2, y:8, gpId:1},
    {x:5, y:8, gpId:1},
    {x:7, y:6, gpId:1},
    {x:7.5, y:3.5, gpId:1},
    {x:7, y:1, gpId:1},
    {x:4, y:-2, gpId:1},
    {x:2, y:-4, gpId:1},
    {x:0, y:-6, gpId:1},
    {x:-2, y:-4, gpId:1},
    {x:-4, y:-2, gpId:1},
    {x:-7, y:1, gpId:1},
    {x:-7.5, y:3.5, gpId:1},
    {x:-7, y:6, gpId:1},
    {x:-5, y:8, gpId:1},
    {x:-2, y:8, gpId:1}
];

const randomRanges = [
    {y:7, xrange: [-6, -1], num:2},
    {y:7, xrange: [1, 6], num:2},
    {y:5, xrange: [-7, -5], num: 1},
    {y:5, xrange: [-5, -3], num: 1},
    {y:5, xrange: [-3, 0], num: 1},
    {y:5, xrange: [0, 3], num: 2},
    {y:5, xrange: [3, 5], num: 2},
    {y:5, xrange: [5, 7], num: 2},
    {y:3, xrange: [-7, 0], num: 2},
    {y:3, xrange: [0, 7], num: 2},
    {y:1, xrange: [-7, 0], num: 2},
    {y:1, xrange: [0, 7], num: 2},
    {y:0, xrange: [-6, 0], num: 2},
    {y:0, xrange: [0,6], num: 1},
    {y:-2, xrange: [-4,0], num: 1},
    {y:-2, xrange: [0,4], num: 1},
    {y:-5, xrange: [-1,1], num: 1}
]

const generateRandomDots = (ranges, target, gpId = 1) => {
    ranges.forEach((item)=> {
        for(let i=0; i<item.num; i++) {
            const x = Math.random()*(Math.abs(item.xrange[0]-item.xrange[1]))+item.xrange[0];
            const y = item.y + (Math.random()*1)-0.5;
            target.push({x,y,gpId});
        }
    });

    return target;
}

HeartCoordinates = generateRandomDots(randomRanges, HeartCoordinates);

export default HeartCoordinates;