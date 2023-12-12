let winCounter = 0;
let deathCounter = 0;
let scoreStreakCounter = 0;
let currentStreak = 0;

function play(userChoice) {
    const computerChoice = Math.floor(Math.random() * 5) + 1;

    const choices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
    const user = choices[userChoice - 1];
    const computer = choices[computerChoice - 1];

    document.getElementById('result').innerHTML = `You chose: ${user}<br>Computer chose: ${computer}`;

    if (userChoice === computerChoice) {
        document.getElementById('result').innerHTML += "<br>It's a tie!";
        currentStreak = 0; // Reset streak on tie
    } else if (
        (userChoice === 1 && computerChoice === 3) ||
        (userChoice === 2 && computerChoice === 1) ||
        (userChoice === 3 && computerChoice === 2) ||
        (userChoice === 4 && computerChoice === 2) ||
        (userChoice === 4 && computerChoice === 5) ||
        (userChoice === 5 && computerChoice === 3) ||
        (userChoice === 5 && computerChoice === 1)
    ) {
        document.getElementById('result').innerHTML += "<br>You win!";
        winCounter++;
        currentStreak++;
        if (currentStreak > scoreStreakCounter) {
            scoreStreakCounter = currentStreak;
        }
    } else {
        document.getElementById('result').innerHTML += "<br>Computer wins!";
        deathCounter++;
        currentStreak = 0; // Reset streak on loss
    }

    document.getElementById('score').innerHTML = `Wins: ${winCounter} | Deaths: ${deathCounter} | Score Streak: ${scoreStreakCounter}`;
}

function restartGame() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('score').innerHTML = `Wins: 0 | Deaths: 0 | Score Streak: 0`;
    winCounter = 0;
    deathCounter = 0;
    scoreStreakCounter = 0;
    currentStreak = 0;
}
