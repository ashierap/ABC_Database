document.addEventListener('DOMContentLoaded', function () {
    // Game state variables
    let currentLocation = 'start';
    let hasKey = false;

    // Function to display output in the game container
    function displayOutput(output) {
        document.getElementById('output').innerText = output;
    }

    // Function to handle user input submission
    function submitAction() {
        const userInput = document.getElementById('user-input').value;
        handleAction(userInput.toLowerCase());
    }

    // Function to handle different user actions
    function handleAction(action) {
        if (action === 'quit') {
            displayOutput('Goodbye! Thanks for playing.');
        } else if (action === 'search') {
            searchLocation(currentLocation);
        } else if (action === 'north' || action === 'south' || action === 'east' || action === 'west') {
            moveDirection(action);
        } else {
            displayOutput('Invalid action. Please enter a valid direction or \'search\'.');
        }
    }

    // Function to simulate searching a location
    function searchLocation(location) {
        // Implement your search logic here
        displayOutput('You search the area, but find nothing.');
    }

    // Function to simulate moving in a direction
    function moveDirection(direction) {
    // Implement your movement logic here
    // Update current location and handle other game logic
    if (currentLocation === 'start') {
    if (direction === 'east') {
        currentLocation = 'a large game trail';
        displayOutput('Which leads off into the forest...');
    } else if (direction === 'south') {
        currentLocation = 'a path';
        displayOutput('You\'ve found a path, follow to see where it leads!');
    } else if (direction === 'west') {
        currentLocation = 'start';
        displayOutput('You try walking through the dense forest, but you have no luck.');
    } else if (direction === 'north') {
        currentLocation = 'start';
        displayOutput('You try walking through the dense forest, but you have no luck.');
    }
} else if (currentLocation === 'a path') {
    if (direction === 'south') {
        currentLocation = 'a path(1 mile)';
        displayOutput('A sign reads: *Brickle Boulder View to the West!*');
    } else if (direction === 'west') {
        currentLocation = 'a path';
        displayOutput('The forest is too thick to walk through!');
    } else if (direction === 'east') {
        currentLocation = 'a path';
        displayOutput('The forest is too thick to walk through!');
    } if (direction === 'north') {
        currentLocation = 'start';
        displayOutput('You are back at the start.');
}
} else if (currentLocation === 'a path(1 mile)') {
    if (direction === 'south') {
        currentLocation = 'a clearing';
        displayOutput('A clearing has opened up, you see a building to the southeast and a road that extends past the horizon. A loud crash is heard towards the east.');
    } else if (direction === 'west') {
        currentLocation = 'a small game trail';
        displayOutput('You are walking through the dense forest, the path is very narrow.');
    } else if (direction === 'east') {
        currentLocation = 'a path(1 mile)';
        displayOutput('The forest is too thick to walk through!');
    } else if (direction === 'north') {
        currentLocation = 'a path';
        displayOutput('You\'ve found a path, follow to see where it leads!');
    } 
} else if (currentLocation === 'a large game trail') {
    if (direction === 'east') {
        currentLocation = 'a large game trail(1 mile)';
        displayOutput('The forest grows darker and the fog is heavy...');
    } else if (direction === 'west') {
        currentLocation = 'start';
        displayOutput('You are back at the start.');
    } else if (direction === 'north') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
    } else if (direction === 'south') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
}
} else if (currentLocation === 'a large game trail(1 mile)') {
    if (direction === 'east') {
        currentLocation = 'bear';
        displayOutput('A GRIZZLY BEAR HAS ATTACKED AND KILLED YOU!');
        restartGameB();
    } else if (direction === 'west') {
        currentLocation = 'a large game trail';
        displayOutput('Which leads off into the forest...');
    }  else if (direction === 'north') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
    } else if (direction === 'south') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
    }
}  else if (currentLocation === 'a small game trail') {
    if (direction === 'west') {
        currentLocation = 'a boulder';
        displayOutput('A sign reads: *Boulder View* The sun is setting over the horizon.');
    } else if (direction === 'east') {
        currentLocation = 'a path(1 mile)';
        displayOutput('A sign reads: *Brickle Boulder View to the West!*');
    } else if (direction === 'north') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
    } else if (direction === 'south') {
        currentLocation = 'a large game trail';
        displayOutput('The forest is too thick to walk through!');
    } 
} else if (currentLocation === 'a boulder') {
    if (direction === 'east') {
        currentLocation = 'a small game trail';
        displayOutput('You are walking through the dense forest, the path is very narrow.');
    } else if (direction === 'north' || direction === 'south' || direction === 'west') {
        displayOutput('The cliffs are 90-degree drops! It\'s best to go back.');
    }
} else if (currentLocation === 'a clearing') {
    if (direction === 'south') {
        currentLocation = 'a road';
        displayOutput('The road heads south, civilization might be over the horizon ahead.');
    } else if (direction === 'east') {
        currentLocation = 'a small Dock Path';
        displayOutput('A sign reads: *Brickle River Dock to the East!*');
    } else if (direction === 'west') {
        displayOutput('You try walking through the dense forest, but you have no luck.');
    } else if (direction === 'north') {
        currentLocation = 'a path(1 mile)';
        displayOutput('A sign reads: *Brickle Boulder View to the West!*');
    }
} else if (currentLocation === 'a small Dock Path') {
    if (direction === 'east') {
        currentLocation = 'a small Dock Path(1 mile)';
        displayOutput('A sign reads: *You are almost at the river!*');
    } else if (direction === 'west') {
        currentLocation = 'a clearing';
        displayOutput('A clearing has opened up, you see a building to the southeast and a road that extends past the horizon. A loud crash is heard towards the east.');
    } else if (direction === 'north' || direction === 'south') {
        displayOutput('You try walking through the dense forest, but you have no luck.');
    } 
}  else if (currentLocation === 'a small Dock Path(1 mile)') {
    if (direction === 'east') {
        currentLocation = 'a river';
        displayOutput('A sign reads: *Brickle River ~NO SWIMMING~*');
    } else if (direction === 'west') {
        currentLocation = 'a small Dock Path';
        displayOutput('A sign reads: *Brickle River Dock to the East!*');
    } else if (direction === 'north' || direction === 'south') {
        displayOutput('You try walking through the dense forest, but you have no luck.');
    } 
} else if (currentLocation === 'a river') {
    if (direction === 'north') {
        currentLocation = 'a plane';
        displayOutput('YOU JUST FOUND A PLANE CRASH!');
    } else if (direction === 'west') {
        currentLocation = 'a small Dock Path(1 mile)';
        displayOutput('A sign reads: *You are almost at the river!*');
    } else if (direction === 'east' || direction === 'south') {
        displayOutput('THE SIGN SAYS NO SWIMMING');
    }
} else if (currentLocation === 'a plane') {
    if (direction === 'north') {
        currentLocation = 'a berry field';
        displayOutput('You have found yourself in a blueberry field. A sign reads: *Head North to pick Blueberries*');
    } else if (direction === 'south') {
        currentLocation = 'a river';
        displayOutput('A sign reads: *Brickle River ~NO SWIMMING~*');
    } else if (direction === 'east') {
        displayOutput('THE SIGN SAYS NO SWIMMING');
    } else if (direction === 'west') {
        currentLocation = 'a plane';
        displayOutput('You try walking through the dense forest, but you have no luck.');
    }
} else if (currentLocation === 'a berry field') {
    if (direction === 'north') {
        currentLocation = 'bear';
        displayOutput('A LARGE GRIZZLY BEAR HAS ATTACKED YOU! YOU DIE!');
    } else if (direction === 'south') {
        currentLocation = 'a plane';
        displayOutput('A sign reads: *Brickle River ~NO SWIMMING~*');
    } else if (direction === 'east') {
        displayOutput('THE SIGN SAYS NO SWIMMING');
    } else if (direction === 'west') {
        currentLocation = 'a berry field';
        displayOutput('You try walking through the dense forest, but you have no luck.');
    }
} else if (currentLocation === 'a road') {
    if (direction === 'south') {
        currentLocation = 'more road';
        displayOutput('The road continues south, there might be civilization ahead.');
    } else if (direction === 'north') {
        currentLocation = 'a clearing';
        displayOutput('A clearing has opened up, you see a building to the southeast and a road that extends past the horizon. A loud crash is heard towards the east.');
    } else if (direction === 'east') {
        currentLocation = 'dirt road';
        displayOutput('You have stumbled apon a dirt road with tire tracks leading towards a building to the east.');
    } else if (direction === 'west') {
        displayOutput('Baren desert strecthes arcoss the sky. Coyotes howl in the night.');
    }
} else if (currentLocation === 'more road') {
    if (direction === 'south') {
        currentLocation = 'middle of nowhere';
        displayOutput('A PACK OF WILD COYOTES ATTACK YOU AND KILL YOU! YOU ARE DEAD!');
        restartGameC();
    } else if (direction === 'north') {
        currentLocation = 'a road';
        displayOutput('The road heads south, civilization might be over the horizon ahead.');
    }  else if (direction === 'west' || direction === 'east') {
        currentLocation = 'more road';
        displayOutput('Baren desert strecthes arcoss the sky. Coyotes howl in the night.');
    }
} else if (currentLocation === 'dirt road') {
    if (direction === 'east') {
        currentLocation = 'dirt road(1 mile)';
        displayOutput('You see an abandoned building with a lock on the door.');
    } else if (direction === 'west') {
        currentLocation = 'a road';
        displayOutput('The road heads south, civilization might be over the horizon ahead.');
    } else {
        currentLocation = 'dirt road';
        displayOutput('Bare desert stretches across the sky. Coyotes howl in the night.');
    }
} else if (currentLocation === 'dirt road(1 mile)') {
    if (direction === 'east') {
        currentLocation = 'a building';
        displayOutput('You cannot enter the building without a key. A letter on the door reads: *The key to the lock is in the plane wreckage north of the building.*');
    } else if (direction === 'east' && hasKey) {
        currentLocation = 'a building';
       restartGameA();
    }
    else if (direction === 'west') {
        currentLocation = 'dirt road';
        displayOutput('You see an abandoned building with a lock on the door.');
    } else if (direction === 'north' || direction === 'south') {
        currentLocation = 'dirt road(1 mile)';
        displayOutput('Bare desert stretches across the sky. Coyotes howl in the night.');
    }
} else if (currentLocation === 'a building') {
    if (direction === 'west') {
        currentLocation = 'dirt road(1 mile)';
        displayOutput('You see an abandon building with a lock on the door.');
    } else if (direction === 'east') {
        currentLocation = 'a building';
        displayOutput('The river is behind the building, you cant swim remember...you\'re a monkey.');
    }  else if (direction === 'south' || direction === 'north') {
        currentLocation = 'a building';
        displayOutput('Baren desert strecthes arcoss the sky. Coyotes howl in the night.');
    }
} else if (currentLocation === "bear") {
    displayOutput("Oh no! You encountered a bear and lost the game. Game over! Read the Game Info for extra help.");
} else if (currentLocation === "middle of nowhere") {
    displayOutput("Oh no! You encountered a coyote and lost the game. Game over! Read the Game Info for extra help.");
} else if (currentLocation === "a building" && hasKey) {
    displayOutput("Congratulations! You've entered the building and won the game!");
    restartGameA();
} else {
    // Handle other conditions if needed
    
}
    
      // Update current location and handle other game logic
        
    }
    function restartGameB() {
    // Reset game state variables
    currentLocation = 'start';
    hasKey = false;

    // Display initial game information
    displayOutput('You died to a bear attack. New game started! You find yourself at the starting location.');
}
function restartGameC() {
    // Reset game state variables
    currentLocation = 'start';
    hasKey = false;

    // Display initial game information
    displayOutput('You died to a wild pack of coyotes attacked you. New game started! You find yourself at the starting location.');
}
function restartGameA() {
    // Reset game state variables
    currentLocation = 'start';
    hasKey = false;
    displayOutput('Congratulations! You\'ve entered the building and won the game!');
}
// Function to handle the 'search' action
function searchLocation(location, hasKey) {
    if (location === "a boulder" && !hasKey) {
        displayOutput("You searched the area and found a KEY on top of the boulder!");
        // Assuming 'displayOutput' is a function to display messages in your game
        hasKey = true;
    } else {
        displayOutput("You search the area, but find nothing.");
    }
}
       // Function to display current location information
function displayLocationInfo() {
    displayOutput(`You are at ${currentLocation}.`);
    displayOutput('Available directions: north, south, east, west, search, quit.');
}


    function startNewGame() {
    // Add your game initialization logic here
    currentLocation = 'start';
    hasKey = false;
    // Display initial game information
    displayOutput('New game started! You find yourself at the starting location. Your actions include the following: north, east, south, west, search, and quit.');
    
}
    // Function to handle loading a saved game
    function loadGame() {
        // Add your game loading logic here
        displayOutput('Loading saved game...');
    }

    // Function to display game information
    function showGameInfo() {
        displayOutput('Adventure Game Info:\nAvoid Bears and Coyotes and enter the building to win! Search at the boulder to find the key!');
    }

    // Assign the functions to the buttons
    document.getElementById('start-new-game-btn').addEventListener('click', startNewGame);
    document.getElementById('load-game-btn').addEventListener('click', loadGame);
    document.getElementById('game-info-btn').addEventListener('click', showGameInfo);
    document.getElementById('submit-btn').addEventListener('click', submitAction);
});
