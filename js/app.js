document.addEventListener('DOMContentLoaded', function () {
    initTitle();
    init();
});

const titleText = new SplitText('.title');
let numWords = titleText.chars.length;
const gameContainer = document.getElementById('gameBoard');
const dropTargets = document.querySelectorAll('.target');
const totalTargets = 6;
let totalHit = 0;

const tl = gsap.timeline({});

function init() {}

function initTitle() {
    for (let i = 0; i < numWords; i++) {
        tl.from(
            titleText.chars[i],
            {
                duration: 0.5,
                opacity: 0,
                x: -500,
                transformOrigin: '0 50%',
                ease: 'back.out',
            },
            Math.random()
        );
    }
}
