document.addEventListener('DOMContentLoaded', function () {
    init();
});
gridWidth = 200;
gridHeight = 100;

function init() {
    const gridContainer = document.getElementById('gridContainer');
    Draggable.create('.moveAble', {
        bounds: gridContainer,
        edgeResistance: 0.75,
        type: 'rotation',
        cursor: 'pointer',
        type: 'x, y',
        cursor: 'grab',
        activeCursor: 'grabbing',
    });
}
