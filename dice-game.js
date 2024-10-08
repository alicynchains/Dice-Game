document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const text = document.getElementById("text");
    const nameButt = document.getElementById("nameButt");
    const skipButt = document.getElementById("skipButt");
    const rollDiceButt = document.getElementById("rollDiceButt"); // button gets "magic number"
    const resetButt = document.getElementById("resetButt");
    const dice1 = document.getElementById("dice1");
    const dice2 = document.getElementById("dice2");

    // Function to get player's name
    let player1 = ''; 
    let player2 = '';

    function getNames() {
        const input1Name = prompt("Player 1:", "Player 1");
    
        // Check if Player 1's input was canceled or left blank
        if (!input1Name || input1Name.trim() === "") {
            player1 = "Player 1"; // Set default if input is canceled or empty
            player2 = "Player 2"; // set Player 2 to default without prompting
            document.getElementById("player1display").innerText = player1;
            document.getElementById("player2display").innerText = player2;
            updateButtonsVisibility(false, false, true, false); // Show roll dice button
            return; // Exit the function, no prompt for Player 2
        }
    
        // If Player 1 name is valid, proceed to prompt for Player 2
        player1 = input1Name.length > 10 ? input1Name.substring(0, 10) : input1Name;
        const input2Name = prompt("Player 2:", "Player 2");
        player2 = input2Name.length > 10 ? input2Name.substring(0, 10) : input2Name;
    
        // Update the display with the players' names
        document.getElementById("player1display").innerText = player1;
        document.getElementById("player2display").innerText = player2;
    
        updateButtonsVisibility(false, false, true, false); // Show roll dice button
    }
    
    // Generalized function to toggle visibility of an element
    function toggleElementVisibility(element, shouldShow) {
        if (element) {
            element.style.display = shouldShow ? "block" : "none";
        }
    }

    // Generalized function to show/hide the buttons
    function updateButtonsVisibility(showName, showSkip, showRollDice, showReset) {
        toggleElementVisibility(nameButt, showName);
        toggleElementVisibility(skipButt, showSkip);
        toggleElementVisibility(rollDiceButt, showRollDice);
        toggleElementVisibility(resetButt, showReset);
    }

    // Initialize the game by showing only the name and skip buttons
    updateButtonsVisibility(true, true, false, false);

    // Name button: prompts the user and shows the dice roll button
    nameButt.addEventListener('click', function () {
        getNames();
    });

    // Skip button: skips name input and shows the dice roll button directly
    skipButt.addEventListener('click', function () {
        player1 = "Player 1";
        player2 = "Player 2";
        document.getElementById("player1display").innerText = `${player1}`;
        document.getElementById("player2display").innerText = `${player2}`;
        updateButtonsVisibility(false, false, true, false); // Show only roll dice button
    });

    // Roll dice button: rolls dice and updates the UI
    function rollDice() {
        const diceRoll1 = Math.floor(Math.random() * 6) + 1;
        const diceRoll2 = Math.floor(Math.random() * 6) + 1;
        dice1.src = `../dice-game/assets/images/dice_side${diceRoll1}.PNG`;
        dice2.src = `../dice-game/assets/images/dice_roll${diceRoll2}.PNG`;
        dice1.alt = `Dice Side ${diceRoll1}`;
        dice2.alt = `Dice Side ${diceRoll2}`;

        if (diceRoll1 > diceRoll2) {
            text.innerHTML = `${player1} wins!`;
            text.classList.add("p1winner");
        } else if (diceRoll2 > diceRoll1) {
            text.innerHTML = `${player2} wins!`;
            text.classList.add("p2winner");
        } else {
            text.innerHTML = "It's a draw!";
            text.classList.add("boo");
        }
        toggleElementVisibility(text, true); // Show the result text
        updateButtonsVisibility(false, false, false, true); // Show reset button only
    };

    rollDiceButt.addEventListener('click', rollDice);

    // Reset game to initial state
    function resetGame() {
        // should I bother resetting the dice to original position?
        updateButtonsVisibility(true, true, false, false); // Show name and skip buttons, hide others
        text.innerHTML = "Highest roll wins!";
        toggleElementVisibility(text, true); // Hide the text
        text.classList.remove("p1winner", "p2winner", "boo");
        dice1.src = `../dice-game/assets/images/dice_side1.PNG`;
        dice2.src = `../dice-game/assets/images/dice_roll1.PNG`;
    }

    // Reset button: resets the game
    resetButt.addEventListener('click', resetGame);
});
