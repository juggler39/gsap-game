document.addEventListener('DOMContentLoaded', function () {
    gsap.set('.image', { scale: 0, opacity: 0 });
    initTitle();
});

const titleText = new SplitText('.title');
let numWords = titleText.chars.length;
const gameContainer = document.getElementById('gameBoard');
const dropTargets = document.querySelectorAll('.target');
const totalTargets = 6;
let totalHit = 0;

const tl = gsap.timeline({ onComplete: init });

function init() {
    gsap.fromTo(
        '.image',
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            stagger: { amount: 0.5 },
            duration: 0.5,
            onComplete: initDraggable,
        }
    );
}

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

function initDraggable() {
    Draggable.create('.dragItem', {
        bounds: gameContainer,
        edgeResistance: 0.75,
        type: 'x, y',
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress: function () {
            this.startX = this.x;
            this.startY = this.y;
            this.offsetTop =
                this.startY - this.target.getBoundingClientRect().top;
            this.offsetLeft =
                this.startX - this.target.getBoundingClientRect().left;
        },
        onDragEnd: function () {
            const dragID = this.target.id + 'Drop';
            dropTargets.forEach((el) => {
                const spotId = el.id;
                const pos = el.getBoundingClientRect();
                const diffTop = this.offsetTop + pos.top;
                const diffLeft = this.offsetLeft + pos.left;
                if (spotId == dragID) {
                    if (this.hitTest(el, '70%')) {
                        gsap.to('.correct', {
                            duration: 0.3,
                            scale: 2,
                            autoAlpha: 1,
                            onComplete: function () {
                                gsap.to('.correct', {
                                    duration: 0.3,
                                    scale: 0,
                                    autoAlpha: 0,
                                    delay: 0.5,
                                });
                            },
                        });

                        gsap.to(this.target, {
                            duration: 0.5,
                            x: diffLeft,
                            y: diffTop,
                            onComplete: hideMatches,
                            onCompleteParams: [this.target, el],
                        });
                    } else {
                        gsap.to('.tryAgain', {
                            duration: 0.3,
                            scale: 2,
                            autoAlpha: 1,
                            onComplete: function () {
                                gsap.to('.tryAgain', {
                                    duration: 0.3,
                                    scale: 0,
                                    autoAlpha: 0,
                                    delay: 0.5,
                                });
                            },
                        });
                        gsap.to(this.target, {
                            duration: 0.5,
                            x: this.startX,
                            y: this.startY,
                        });
                    }
                }
            });
        },
    });
}

function hideMatches(dragItem, targetItem) {
    totalHit++;
    gsap.to([dragItem, targetItem], {
        duration: 0.5,
        autoAlpha: 0,
        onComplete: checkTargetCount,
    });
}
function checkTargetCount() {
    if (totalHit === totalTargets) {
        gsap.to('.modal', {
            duration: 0.3,
            autoAlpha: 1,
        });
    }
}
