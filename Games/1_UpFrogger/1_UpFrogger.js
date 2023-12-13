document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
  

    const grid = 48;
    const gridGap = 10;
    let timer = 0;
let timerInterval;
let minutes;
let seconds;
let formattedTime;
   let isGameOver = false;


    function Sprite(props) {
        Object.assign(this, props);
    }

    Sprite.prototype.render = function () {
        context.fillStyle = this.color;

        if (this.shape === 'rect') {
            context.fillRect(this.x, this.y + gridGap / 2, this.size, grid - gridGap);
        } else {
            context.beginPath();
            context.arc(
                this.x + this.size / 2, this.y + this.size / 2,
                this.size / 2 - gridGap / 2, 0, 2 * Math.PI
            );
            context.fill();
        }
    };

    const frogger = new Sprite({
        x: grid * 6,
        y: grid * 13,
        color: 'greenyellow',
        size: grid,
        shape: 'circle'
    });

    scoredFroggers = [];

  

    const patterns = [
        null,
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 4,
            shape: 'rect',
            speed: 0.75
        },
        {
            spacing: [0, 2, 0, 2, 0, 2, 0, 4],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 7,
            shape: 'rect',
            speed: 1.5
        },
        {
            spacing: [3],
            color: '#c55843',
            size: grid * 3,
            shape: 'rect',
            speed: 0.5
        },
        {
            spacing: [0, 0, 1],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },
        null,
        {
            spacing: [3, 8],
            color: '#c2c4da',
            size: grid * 2,
            shape: 'rect',
            speed: -1
        },
        {
            spacing: [14],
            color: '#c2c4da',
            size: grid,
            shape: 'rect',
            speed: 0.75
        },
        {
            spacing: [3, 3, 7],
            color: '#de3cdd',
            size: grid,
            shape: 'rect',
            speed: -0.75
        },
        {
            spacing: [3, 3, 7],
            color: '#0bcb00',
            size: grid,
            shape: 'rect',
            speed: 0.5
        },
        {
            spacing: [4],
            color: '#e5e401',
            size: grid,
            shape: 'rect',
            speed: -0.5
        },
        null
    ];



    const rows = [];
    for (let i = 0; i < patterns.length; i++) {
        rows[i] = [];

        let x = 0;
        let index = 0;
        const pattern = patterns[i];

        if (!pattern) {
            continue;
        }

        let totalPatternWidth =
            pattern.spacing.reduce((acc, space) => acc + space, 0) * grid +
            pattern.spacing.length * pattern.size;
        let endX = 0;
        while (endX < canvas.width) {
            endX += totalPatternWidth;
        }
        endX += totalPatternWidth;

        while (x < endX) {
            rows[i].push(new Sprite({
                x,
                y: grid * (i + 1),
                index,
                ...pattern
            }));

            const spacing = pattern.spacing;
            x += pattern.size + spacing[index] * grid;
            index = (index + 1) % spacing.length;
        }
    }
function startStopwatch() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopStopwatch() {
    clearInterval(timerInterval); // Stop the interval
    console.log('Stopwatch stopped. Final time:', formattedTime);
    isGameOver = true;
    

}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTimer() {
    if (scoredFroggers.length === 5) {
        stopStopwatch();
        displayTimer();
        // Additional logic or UI changes for the end of the game
  } else {
        timer += 1;
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        context.fillStyle = '#ffffff';
        context.font = '20px Arial';
        context.fillText(`Time: ${formattedTime}`, 10, 30);
    }
}




 let hasIncreasedSpeed1 = false; // Flag to track whether the speed has been increased

function increaseSpeedOfSprites1() {
    if (!hasIncreasedSpeed1) { // Check if speed has not been increased yet
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];

            for (let i = 0; i < row.length; i++) {
                const sprite = row[i];

                // Check the type of sprite (car or log) based on speed direction
                if (sprite.speed > 0) {
                    // Increase speed for cars and logs going in the right direction
                    sprite.speed += 0.9; // You can adjust the increment value as needed
                } else if (sprite.speed < 0) {
                    // Decrease speed for logs going in the left direction
                    sprite.speed -= 0.9; // You can adjust the decrement value as needed
                }
            }
        }

        hasIncreasedSpeed1 = true; // Set the flag to true to indicate speed has been increased
    }
}
 let hasIncreasedSpeed2 = false; // Flag to track whether the speed has been increased

function increaseSpeedOfSprites2() {
    if (!hasIncreasedSpeed2) { // Check if speed has not been increased yet
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];

            for (let i = 0; i < row.length; i++) {
                const sprite = row[i];

                // Check the type of sprite (car or log) based on speed direction
                if (sprite.speed > 0) {
                    // Increase speed for cars and logs going in the right direction
                    sprite.speed += 0.9; // You can adjust the increment value as needed
                } else if (sprite.speed < 0) {
                    // Decrease speed for logs going in the left direction
                    sprite.speed -= 0.9; // You can adjust the decrement value as needed
                }
            }
        }

        hasIncreasedSpeed2 = true; // Set the flag to true to indicate speed has been increased
    }
}
let hasIncreasedSpeed3 = false; // Flag to track whether the speed has been increased

function increaseSpeedOfSprites3() {
    if (!hasIncreasedSpeed3) { // Check if speed has not been increased yet
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];

            for (let i = 0; i < row.length; i++) {
                const sprite = row[i];

                // Check the type of sprite (car or log) based on speed direction
                if (sprite.speed > 0) {
                    // Increase speed for cars and logs going in the right direction
                    sprite.speed += 0.9; // You can adjust the increment value as needed
                } else if (sprite.speed < 0) {
                    // Decrease speed for logs going in the left direction
                    sprite.speed -= 0.9; // You can adjust the decrement value as needed
                }
            }
        }

        hasIncreasedSpeed3 = true; // Set the flag to true to indicate speed has been increased
    }
}
let hasIncreasedSpeed4 = false; // Flag to track whether the speed has been increased

function increaseSpeedOfSprites4() {
    if (!hasIncreasedSpeed4) { // Check if speed has not been increased yet
        for (let r = 0; r < rows.length; r++) {
            const row = rows[r];

            for (let i = 0; i < row.length; i++) {
                const sprite = row[i];

                // Check the type of sprite (car or log) based on speed direction
                if (sprite.speed > 0) {
                    // Increase speed for cars and logs going in the right direction
                    sprite.speed += 0.9; // You can adjust the increment value as needed
                } else if (sprite.speed < 0) {
                    // Decrease speed for logs going in the left direction
                    sprite.speed -= 0.9; // You can adjust the decrement value as needed
                }
            }
        }

        hasIncreasedSpeed4 = true; // Set the flag to true to indicate speed has been increased
    }
}


function checkScoredFroggers() {
    if (scoredFroggers.length === 1 || scoredFroggers.length === 3 || scoredFroggers.length === 4) {
        increaseSpeedOfSprites1(); // Call the function to increase sprite speeds
        // Logic for when 1 to 4 frogs are in the array
    }  if (scoredFroggers.length === 2) {
        increaseSpeedOfSprites2(); // Call the function to increase sprite speeds
        // Logic for when 1 to 4 frogs are in the array
    }  if (scoredFroggers.length === 3) {
        increaseSpeedOfSprites3(); // Call the function to increase sprite speeds
        // Logic for when 1 to 4 frogs are in the array
    }   if (scoredFroggers.length === 4) {
        increaseSpeedOfSprites4(); // Call the function to increase sprite speeds
    } else if (scoredFroggers.length === 5) {
        console.log("Congratulations! You've reached the end with 5 frogs!");
        // Additional logic or UI changes for the end of th
    }
}


function displayTimer() {
    context.fillStyle = '#ffffff';
    context.font = '20px Arial';
    context.clearRect(0, 0, canvas.width, 30); // Clear previous timer display
    context.fillText(`Time: ${formattedTime}`, 10, 30);
}
 
  function loop() {
      if (isGameOver) {
        return;
    }
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#000047';
    context.fillRect(0, grid, canvas.width, grid * 6);

    context.fillStyle = '#1ac300';
    context.fillRect(0, grid, canvas.width, 5);
    context.fillRect(0, grid, 5, grid);
    context.fillRect(canvas.width - 5, grid, 5, grid);
    for (let i = 0; i < 4; i++) {
        context.fillRect(grid + grid * 3 * i, grid, grid * 2, grid);
    }

    context.fillStyle = '#8500da';
    context.fillRect(0, 7 * grid, canvas.width, grid);

    context.fillRect(0, canvas.height - grid * 2, canvas.width, grid);

    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];

        for (let i = 0; i < row.length; i++) {
            const sprite = row[i];
            sprite.x += sprite.speed;
            sprite.render();

            if (sprite.speed < 0 && sprite.x < 0 - sprite.size) {
                let rightMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x > rightMostSprite.x) {
                        rightMostSprite = row[j];
                    }
                }

                const spacing = patterns[r].spacing;
                sprite.x =
                    rightMostSprite.x + rightMostSprite.size +
                    spacing[rightMostSprite.index] * grid;
                sprite.index = (rightMostSprite.index + 1) % spacing.length;
            }

            if (sprite.speed > 0 && sprite.x > canvas.width) {
                let leftMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x < leftMostSprite.x) {
                        leftMostSprite = row[j];
                    }
                }

                const spacing = patterns[r].spacing;
                let index = leftMostSprite.index - 1;
                index = index >= 0 ? index : spacing.length - 1;
                sprite.x = leftMostSprite.x - spacing[index] * grid - sprite.size;
                sprite.index = index;
            }
        }
    }

    frogger.x += frogger.speed || 0;
    frogger.render();

    scoredFroggers.forEach(frog => frog.render());

    const froggerRow = frogger.y / grid - 1 | 0;
    let collision = false;
    for (let i = 0; i < rows[froggerRow].length; i++) {
        let sprite = rows[froggerRow][i];

        if (frogger.x < sprite.x + sprite.size - gridGap &&
            frogger.x + grid - gridGap > sprite.x &&
            frogger.y < sprite.y + grid &&
            frogger.y + grid > sprite.y) {
            collision = true;

            if (froggerRow > rows.length / 2) {
                frogger.x = grid * 6;
                frogger.y = grid * 13;
            } else {
                frogger.speed = sprite.speed;
            }
        }
    }

    if (!collision) {
        frogger.speed = 0;

        const col = (frogger.x + grid / 2) / grid | 0;
        if (froggerRow === 0 && col % 3 === 0 &&
            !scoredFroggers.find(frog => frog.x === col * grid) &&
            scoredFroggers.length < 5
        ) {
            scoredFroggers.push(new Sprite({
                ...frogger,
                x: col * grid,
                y: frogger.y + 5
            }));    
        
        }

        if (froggerRow < rows.length / 2 - 1) {
            frogger.x = grid * 6;
            frogger.y = grid * 13;
        }
    }

    updateTimer(); // Call the stopwatch function
    checkScoredFroggers();

}



    document.addEventListener('keydown', function (e) {
        if (e.which === 37) {
            frogger.x -= grid;
        } else if (e.which === 39) {
            frogger.x += grid;
        } else if (e.which === 38) {
            frogger.y -= grid;
        } else if (e.which === 40) {
            frogger.y += grid;
        }

        frogger.x = Math.min(Math.max(0, frogger.x), canvas.width - grid);
        frogger.y = Math.min(Math.max(grid, frogger.y), canvas.height - grid * 2);
    });

    requestAnimationFrame(loop);
});


    scoredFroggers = [];

    const patterns = [
        null,
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 4,
            shape: 'rect',
            speed: 0.75
        },
        {
            spacing: [0, 2, 0, 2, 0, 2, 0, 4],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },
        {
            spacing: [2],
            color: '#c55843',
            size: grid * 7,
            shape: 'rect',
            speed: 1.5
        },
        {
            spacing: [3],
            color: '#c55843',
            size: grid * 3,
            shape: 'rect',
            speed: 0.5
        },
        {
            spacing: [0, 0, 1],
            color: '#de0004',
            size: grid,
            shape: 'circle',
            speed: -1
        },
        null,
        {
            spacing: [3, 8],
            color: '#c2c4da',
            size: grid * 2,
            shape: 'rect',
            speed: -1
        },
        {
            spacing: [14],
            color: '#c2c4da',
            size: grid,
            shape: 'rect',
            speed: 0.75
        },
        {
            spacing: [3, 3, 7],
            color: '#de3cdd',
            size: grid,
            shape: 'rect',
            speed: -0.75
        },
        {
            spacing: [3, 3, 7],
            color: '#0bcb00',
            size: grid,
            shape: 'rect',
            speed: 0.5
        },
        {
            spacing: [4],
            color: '#e5e401',
            size: grid,
            shape: 'rect',
            speed: -0.5
        },
        null
    ];


    const rows = [];
    for (let i = 0; i < patterns.length; i++) {
        rows[i] = [];

        let x = 0;
        let index = 0;
        const pattern = patterns[i];

        if (!pattern) {
            continue;
        }

        let totalPatternWidth =
            pattern.spacing.reduce((acc, space) => acc + space, 0) * grid +
            pattern.spacing.length * pattern.size;
        let endX = 0;
        while (endX < canvas.width) {
            endX += totalPatternWidth;
        }
        endX += totalPatternWidth;

        while (x < endX) {
            rows[i].push(new Sprite({
                x,
                y: grid * (i + 1),
                index,
                ...pattern
            }));

            const spacing = pattern.spacing;
            x += pattern.size + spacing[index] * grid;
            index = (index + 1) % spacing.length;
        }
    }
    

