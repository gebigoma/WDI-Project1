var allImages = [
  {name: "angry-cat", cardImage: "https://goo.gl/NBLN3W"},
  {name: "peace", cardImage: "https://goo.gl/U6yCwN"},
  {name: "milton", cardImage: "https://goo.gl/xrjR8N"},
  {name: "no-face", cardImage: "https://goo.gl/zgPxQK"},
  {name: "ella", cardImage: "https://goo.gl/zKi4QD"},
  {name: "cartoon", cardImage: "https://goo.gl/sGQkUn"},
  {name: "coffee-dive", cardImage: "https://goo.gl/9QGf2K"},
  {name: "moon-river-lady", cardImage: "https://goo.gl/LJQPFj"},
  {name: "dali-elephant", cardImage: "https://goo.gl/urHihH"},
  {name: "creepy-smile", cardImage: "https://goo.gl/Nsjc49"},
  {name: "camera-love", cardImage: "https://goo.gl/Ja3kwM"},
  {name: "poke-da-bear", cardImage: "https://goo.gl/A15XBy"},
  {name: "sausage-roll", cardImage: "https://goo.gl/EuiHZa"},
  {name: "toilet-paper-run", cardImage: "https://goo.gl/aAX2oK"},
  {name: "creepy-dolls", cardImage: "https://goo.gl/apWhkN"},
  {name: "frog", cardImage: "https://goo.gl/c9hNsA"}, 
  {name: "pink-tree", cardImage: "https://goo.gl/Dq289z"},
  {name: "creepybanana", cardImage: "https://goo.gl/1LcxSQ"}
]

// define all the variables
var $music = new Audio("audio/06 Mister Sandman.mp3")
var $startText = $('#start-text')
var $instructionsButton = $('button.instructions')
var $startButton = $('.start-game')
var $playerTwoStartButton = $('.player-2-start') 
var $firstGameboard = $('#first-gameboard')
var $container = $('#container')
var $timer = $('#timer')
var $score = $('#score')
var $currentPlayer = $('#current-player')
var scoreBoard = 0
// var cardsInPlay;

// hide game display initally
$startText.hide()
$timer.hide()
$score.hide()
$playerTwoStartButton.hide()

// function when instruction button is clicked
$instructionsButton.click(function(evt) {
// prevents any default behavior from the browser when event happens
  evt.preventDefault()
  $startText.not($startText).hide()
  $startText.fadeToggle('slow', 'linear')
})

// fisher-yates shuffle algorithim
// loop from back to 1 bypassing index position 0
// start with last index, generate random number 
// between ie. last index and 0, ex.3, swap with last index, 
// next do 0 and 2nd to last index, ex 1 swap with index 2nd to last
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // while there remain elements to shuffle
  // --i > 0, decrement from 0, first is 7
  while (--currentIndex > 0) {
    //  pick a remaining element
    randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    // and swap it with the current element
    // use the back of the array to store the shuffled elements 
    // and the front of the array to store the remaining elements
    temporaryValue = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = temporaryValue;
  }
  return array;
}

function shuffleAllImages() {
  shuffle(allImages);
}

// show the cards when player 1 starts
function showCard(name, url, animation = 'fade-in', width, height) {
// reference the element with jquery
    var $imageElement = $('<img>')
    $imageElement.attr("src", url)
    $imageElement.attr("data-name", name)
    $imageElement.width(200) 
    $imageElement.height(200)
    $container.append($imageElement)
    // add class "card" and animation
    $('img').addClass(['card', animation])
}

function removeAllCards () {
  $('.card').remove()
}

// cards are not clickable before this function
function activateCards () {
// on click do this function
  $('.card').on("click", function(){
// if total selected cards is less than cards in play and this has class
    if($('.selected').length < cardsInPlay.length && !$(this).hasClass('selected')) {
//  add it
      $(this).addClass('selected')
    } else {
//  otherwise remove it
      $(this).removeClass('selected')
    }
  })
}

// slicedDeck is the deck the player is first presented with
function playerDeck(slicedDeck) {
  //  empty array to hold cards
  cardsInPlay = [];
  //  loop through slicedDeck
  for (var i = 0; i < slicedDeck.length; i += 1) {
  // add sliced deck by the name to cards in play
    cardsInPlay.push(slicedDeck[i].name);
    showCard(slicedDeck[i].name, slicedDeck[i].cardImage, 'stretch')
  }
}

// shuffle entire deckand show
function entireDeck() {
  var shuffleAll = shuffle(allImages)
  for(var i = 0; i < shuffleAll.length; i += 1) {
    showCard(shuffleAll[i].name, shuffleAll[i].cardImage)
  }
}

// start game
function startGame(){
  $music.play()
  $startText.hide()
  clearScoreAndTimer()
  $instructionsButton.hide()
  $startButton.hide()
  $playerTwoStartButton.hide()
  startTurn()
}

// start turn
function startTurn() {
  var shuffleAll = shuffle(allImages)
  var slicedDeck = allImages.slice(0, 4);
  playerDeck(slicedDeck)
  var turn = setTimeout(function(){
    removeAllCards()
    countDownEntireDeck(shuffleAll)
  }, 8000)
}

// show player the deck to choose from
function countDownEntireDeck() { 
// set the counter
  var counter = 10;
// shuffle deck
  entireDeck()
// make cards clickable
  activateCards()
  $timer.show()
  var countDown = setInterval(
    function() {
      counter --
      $timer.html(`${counter} seconds`)
      if(counter === 0) {
        clearInterval(countDown)   
        // jquery iterator
        $('.card.selected').each(function(index, card) {
          var cardName = $(card).attr('data-name')
          if(cardsInPlay.includes(cardName)) {
            increaseScore()
          }
        })       
      removeAllCards();
      displayScore(currentPlayer.score);
      switchTurns();
      $playerTwoStartButton.show();
    } 
    }, 1000)
}


var player1 = {
  name: "Player 1",
  score: 0
}

var player2 = {
  name: "Player 2",
  score: 0
}

var currentPlayer = player1

function switchTurns() {
  if(currentPlayer === player1) {
    currentPlayer = player2
    scoreBoard = 0;
  } else {
    compareScores()
  }
}

function displayScore(score) {
  $currentPlayer.html(`${currentPlayer.name} : ${score} matched pictures`)
}

function clearScoreAndTimer() {
  $currentPlayer.text("")
  $timer.text("")
}

function increaseScore() {
  currentPlayer.score++
}
 
function compareScores() {
  if (player1.score > player2.score && player1.score != player2.score) {
    setTimeout(function(){
      alert("Player 1 Wins!")
    }, 500)
  } else if (player2.score > player1.score && player2.score != player1.score) {
    setTimeout(function(){
      alert("Player 2 Wins!")
    }, 500)
  } else {
    setTimeout(function(){
      alert("Players Tie")
    }, 500) 
  }
}
  
 $startButton.on('click', startGame)
 $playerTwoStartButton.on('click', startGame)






































