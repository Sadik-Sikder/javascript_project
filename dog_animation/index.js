const canvas = document.getElementById('canvas1');
let mov = 'still'
const animationselect = document.getElementById('animations');
animationselect.addEventListener('change', function(e){
    mov = e.target.value;
})
const ctx = canvas.getContext('2d')
console.log(ctx)
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;

const playerImage = new Image()
playerImage.src = 'shadow_dog.png';

const animationState = [
    {
        name: 'idle',
        frame: 7,
    },
    {
        name: 'jump',
        frame: 7,
    },
    {
        name: 'still',
        frame: 7,
    },
    {
        name: 'run',
        frame: 9,
    },
    {
        name: 'rotating_ball',
        frame: 11,
    },
    {
        name: 'sit',
        frame: 5,
    },
    {
        name: 'roll',
        frame: 7,
    },
    {
        name: 'duck',
        frame: 7,
    },
    {
        name: 'jump and sit',
        frame: 12,
    },
    {
        name: 'howl',
        frame: 4,
    },
];
const spriteDetails = [];
animationState.forEach((state, index) => {
    let frames = {
        loc:[],
    }
    for(let i = 0; i <state.frame; i++){
        let positionX = i * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteDetails[state.name] = frames
});
console.log(spriteDetails);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteDetails[mov].loc.length;
    let frameX = position * spriteWidth;
    let frameY = spriteDetails[mov].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameFrame++;
    requestAnimationFrame(animate);
}
animate(); 
