document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");

    const CELL_SIZE = 20;
    const BORDER_SIZE = 5; // Adjust the border size as needed
    const PLAYING_FIELD_SIZE = 20; // Adjust the playing field size as needed
    const ADJUSTED_CANVAS_SIZE = CELL_SIZE * PLAYING_FIELD_SIZE + BORDER_SIZE;

    canvas.width = ADJUSTED_CANVAS_SIZE;
    canvas.height = ADJUSTED_CANVAS_SIZE;

    let snake = [{ x: 10, y: 10 }];
    let direction = "right";
    let fruit = { x: 5, y: 5 };
    let gameInterval;
    let fruitCount = 0;
    let showBorderFlag = true; // Variable to control whether the border should be drawn
    let deathCount = 0; // Counter for player deaths
    let startButton;
    let startTime; // Variable to store the start time of the game

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, ADJUSTED_CANVAS_SIZE, ADJUSTED_CANVAS_SIZE);

        // Draw border if showBorderFlag is true and fruitCount is less than or equal to 40
        if (showBorderFlag && fruitCount <= 40) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = BORDER_SIZE;
            ctx.strokeRect(BORDER_SIZE / 2, BORDER_SIZE / 2, ADJUSTED_CANVAS_SIZE - BORDER_SIZE, ADJUSTED_CANVAS_SIZE - BORDER_SIZE);
        }

        // Draw snake
        ctx.fillStyle = "green";
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x * CELL_SIZE + BORDER_SIZE, snake[i].y * CELL_SIZE + BORDER_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // Draw fruit
        if (fruitCount >= 30) {
            ctx.fillStyle = "purple"; // Change color after 30 fruits
        } else if (fruitCount >= 20) {
            ctx.fillStyle = "yellow";
        } else if (fruitCount >= 10) {
            ctx.fillStyle = "blue";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.fillRect(fruit.x * CELL_SIZE + BORDER_SIZE, fruit.y * CELL_SIZE + BORDER_SIZE, CELL_SIZE, CELL_SIZE);

        // Draw death count
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Deaths: ${deathCount}`, 10, ADJUSTED_CANVAS_SIZE - 10);

        // Draw fruit count in the top right corner
        ctx.fillText(`Fruits: ${fruitCount}`, ADJUSTED_CANVAS_SIZE - 100, 20);

        // Draw timer
        if (startTime !== undefined) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            ctx.fillText(`Time: ${elapsedTime}s`, ADJUSTED_CANVAS_SIZE - 100, ADJUSTED_CANVAS_SIZE - 10);
        }
    }

    function move() {
        const head = { ...snake[0] };

        // Check if the fruit count is 50
        if (fruitCount === 50) {
    clearInterval(gameInterval); // Stop movement
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    ctx.clearRect(0, 0, ADJUSTED_CANVAS_SIZE, ADJUSTED_CANVAS_SIZE); // Clear canvas
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(`WiNNER! Time: ${elapsedTime}s`, 50, ADJUSTED_CANVAS_SIZE / 2);
    return;
    }

        // Update the head position based on the direction
        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= PLAYING_FIELD_SIZE || head.y < 0 || head.y >= PLAYING_FIELD_SIZE) {
            gameOver();
            return;
        }

        // Check collision with itself
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        // Check collision with fruit
        if (head.x === fruit.x && head.y === fruit.y) {
            if (fruitCount >= 21 && fruitCount <= 30) {
                // Decrease the length of the snake when collecting fruits 21-30
                snake.pop();
                snake.pop();
            } else {
                snake.unshift({ ...fruit });
            }

            fruitCount++;

            // Check if the fruit count is 20
            if (fruitCount >= 30) {
                clearInterval(gameInterval);
                gameInterval = setInterval(move, 42); // Further increase the interval (reduce the speed)
            } else if (fruitCount >= 20) {
                clearInterval(gameInterval);
                gameInterval = setInterval(move, 50); // Further increase the interval (reduce the speed)
            } else if (fruitCount >= 10) {
                clearInterval(gameInterval);
                gameInterval = setInterval(move, 75); // Increase the interval (reduce the speed)
            }

            // Continue normal behavior and spawn new fruit
            spawnFruit();

            // Check if the fruit count is over 40 to hide border
            if (fruitCount > 40) {
                showBorderFlag = false;
            }
        } else {
            snake.unshift(head);
            snake.pop();
        }

        draw();
    }

    function spawnFruit() {
        // Only spawn a new fruit if it's not already collected
        if (fruitCount < 50) {
            fruit.x = Math.floor(Math.random() * PLAYING_FIELD_SIZE);
            fruit.y = Math.floor(Math.random() * PLAYING_FIELD_SIZE);
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        deathCount++;
        resetGame();
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        fruitCount = 0;
        startTime = undefined; // Reset the start time
        spawnFruit();
        showBorderFlag = true;
        draw();
        if (!startButton) {
            createButton("Start Game", startGame);
        }
    }

    function startGame() {
        if (startButton) {
            startButton.remove();
            startButton = null;
        }
        startTime = Date.now(); // Set the start time when the game starts
        draw();
        spawnFruit();
        gameInterval = setInterval(move, 100);
    }

    function createButton(text, onClick) {
        startButton = document.createElement("button");
        startButton.textContent = text;
        startButton.addEventListener("click", onClick);
        document.body.appendChild(startButton);
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowRight":
                if (direction !== "left") {
                    direction = "right";
                }
                break;
        }
    }

    // Set up event listeners
    document.addEventListener("keydown", handleKeyPress);

    // Initial setup
    draw();
    spawnFruit();
    createButton("Start Game", startGame);
});
