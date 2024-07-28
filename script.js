window.onload = function () {

    var canvas;
    var ctx;
    var delay = 1000;
    var xCoord = 0;
    var yCoord = 0;

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);

        // create of the canvas context
        ctx = canvas.getContext('2d');
        refreshCanvas();
    }

    function refreshCanvas() {
        xCoord += 2;
        yCoord += 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff0000"; // color of the rectangle
        ctx.fillRect(xCoord, yCoord, 100, 50); // (position x, position y, width, height)
    };

};