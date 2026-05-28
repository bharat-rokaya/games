const num = Math.floor(Math.random() * 100) + 1;
const guess = parseInt(prompt("Guess a number between 1 and 100:"));

do {
    if(guess>0 && guess<=100){
        alert("Please enter a valid number between 1 and 100.");
    } else if(guess < num) {
        alert("Too low! Try again.");
    } else if(guess > num) {
        alert("Too high! Try again.");
    } else {
        alert("Congratulations! You guessed the number!");
        break;
    }
}
while(guess!=num);