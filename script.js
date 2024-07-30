window.onload = function () {
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 700;
    var snakee;

    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);

        // create of the canvas context
        ctx = canvas.getContext('2d');

        // Creation of the body's snake to start with an array; each value represent a block of the snake's body
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");

        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);
    };

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    };

    // function constructor (prototype Snake)
    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            ctx.save(); // Save initial context
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            };
            ctx.restore();
        };
        this.advance = function () {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left": // coord x
                    nextPosition[0] -= 1;
                    break;
                case "right": //coord x
                    nextPosition[0] += 1;
                    break;
                case "down": // coord y
                    nextPosition[1] += 1;
                    break;
                case "up": // coord y
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid direction");
            }
            this.body.unshift(nextPosition); // Creation of the new right block on the canvas
            this.body.pop(); // Left block delete
        };

        this.setDirection = function (newDirection) {
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw new Error("Invalid direction");
            }
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };
    };

    document.onkeydown = function handleKeyDown(event) {

        var key = event.key; // Returns the physical key code
        var newDirection;
        switch (key) {
            case "ArrowLeft":
                newDirection = "left";
                break;
            case "ArrowUp":
                newDirection = "up";
                break;
            case "ArrowRight":
                newDirection = "right";
                break;
            case "ArrowDown":
                newDirection = "down";
                break;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }
};