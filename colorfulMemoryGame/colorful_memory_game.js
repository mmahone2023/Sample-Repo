const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

//for each color in the colors array, it creates div, card, sets color, color of card is hidden until clicked, and card is attached as a child 
function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

//shuffling process using loop through the array
//Within each iteration, it generates a random index j using Math.floor(Math.random() * (i+1)).  The j represents index within the array.
//the elements at i and j indices are swapped using array destructuring assignment
//the loop finishes iterating through the entire array, while shuffling elements
//when finished, the function returns the array with its elements rearranged into a random order 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//Event.target retrieves the element that triggered the event and assigns it to card
//If the clicked element is not a card or if it's already matched, the function returns early, ignoring other actions
//.textContent sets the text content to the stored value in dataset.color, which reveals the card's color by changing the text content to the color value
//.backgroundColor changes the card's background color to match the revealed color
//adds clicked card to 'selectedCards' array, to indicate a currently chosen card
//checks if two card have been selected, the timeout allows player to see both briefly

function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains('card') || card.classList.contains('matched')) {
        return;
    }
    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}
//checks if 2 selected cards match
//destructing selected cards using array destructuring to assign first two elements of 'selectedCards' array to card1 and card2
//if the color matches, it adds the class matched to both cards, increases score by 2 and updates score
//else if they dont match, it resets the text content of both cards to a question mark, hiding their colors
//sets background color of both cards to default color
//clears 'selectedCards' array to reset for next selections
function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    selectedCards = [];
}

//disables 'startbtn' to prevent multiple game initiations
//udpates displayed score to show its reset to zero for new game
//initiates game timer, and counts down
//shuffles colors array and duplicates it to creat pairs for the game cards
//clears the 'selectedCards' array to prepare for new card selections
//clears game container, removing existing cards from previous games
//generates new set of card in game container for new game
//events listener enables card clicks and triggers handleCardClick function
function startGame() {
    let timeLeft = 30;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}
//sets initial display of timer to show time left
//initiates an interval that triggers a function every second (1000milisec.) to update timer
//decreases every second
//displays udpate after decrement
//if time reaches 0, timer stops
//reenables 'startbtn' allowing player to start a new game
function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}
startbtn.addEventListener('click', startGame);