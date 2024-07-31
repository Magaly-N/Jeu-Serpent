window.onload = function () {
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 700;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;

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
        applee = new Apple([10, 10]);

        refreshCanvas();
    }

    function refreshCanvas() {

        snakee.advance();
        if (snakee.checkCollision()) {
            // GAME OVER
        }
        else {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas, delay);
        }

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

        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            // Head of snake is outside of the caneva along its length
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            // Head of snake is outside of the caneva across its width
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            };

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            };
            return wallCollision || snakeCollision;
        };
    };

    function Apple(position) {
        this.position = position;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#33cc33"; // apple's color
            ctx.beginPath();
            var radius = blockSize / 2;
            // xCoord and yCoord = middle of the apple
            var x = position[0] * blockSize + radius;
            var y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
    }

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