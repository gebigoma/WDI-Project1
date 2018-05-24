
var allImages = [
  {name: "casserole", cardImage: "images/Image1.jpg"},
  {name: "pudding", cardImage: "images/Image2.jpg"},
  {name: "oatmeal", cardImage: "images/Image3.jpg"},
  {name: "pasta", cardImage: "images/Image4.jpg"},
  {name: "casserole", cardImage: "images/Image1.jpg"},
  {name: "pudding", cardImage: "images/Image2.jpg"},
  {name: "oatmeal", cardImage: "images/Image3.jpg"},
  {name: "pasta", cardImage: "images/Image4.jpg"},
  {name: "casserole", cardImage: "images/Image1.jpg"},
  {name: "pudding", cardImage: "images/Image2.jpg"},
  {name: "oatmeal", cardImage: "images/Image3.jpg"},
  {name: "pasta", cardImage: "images/Image4.jpg"},
  {name: "casserole", cardImage: "images/Image1.jpg"},
  {name: "pudding", cardImage: "images/Image2.jpg"},
  {name: "oatmeal", cardImage: "images/Image3.jpg"},
  {name: "pasta", cardImage: "images/Image4.jpg"}, 
]
var cardsInPlay = [];
var cardsInPlay2 = [];

var $startText = $('#start-text')
var $instructionsButton = $('button.instructions')
var $startButton = $('.start-game')
var $firstGameboard = $('#first-gameboard')
var $container = $('#container')
var $timer = $('#timer')
var $score = $('#score')
var $currentPlayer = $('#current-player')
var scoreBoard = 0

$startText.hide()
$timer.hide()
$score.hide()

$instructionsButton.click(function(evt) {
  evt.preventDefault()
  $startText.not($startText).hide()
  $startText.fadeToggle('slow', 'linear')
})

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  }
  return array;
}

var shuffleAll = shuffle(allImages);

var slicedDeck = allImages.slice(0, 2);

function shuffleAllImages() {
  shuffle(allImages);
}

// width and height in arguments not working
function showCard(name, url, animation = 'fade-in', width, height) {
    var $imageElement = $('<img>');
    $imageElement.attr("src", url)
    $imageElement.attr("data-name", name)
    $imageElement.width(200) 
    $imageElement.height(200)
    $container.append($imageElement)
    $('img').addClass(['card', animation])
}

function removeAllCards () {
  $('.card').remove()
}

function activateCards () {
  $('.card').on("click", function(){
    if($('.selected').length < cardsInPlay.length && !$(this).hasClass('selected')) {
      $(this).addClass('selected')
    } else {
      $(this).removeClass('selected')
    }
  })
}

function playerDeck() {
  for (var i = 0; i < slicedDeck.length; i += 1) {
    cardsInPlay.push(slicedDeck[i].name);
    showCard(slicedDeck[i].name, slicedDeck[i].cardImage, 'stretch')
  }
}

function entireDeck() {
  // not shuffling for 2nd player
  shuffle(allImages)
  for(var i = 0; i < shuffleAll.length; i += 1) {
    showCard(shuffleAll[i].name, shuffleAll[i].cardImage)
  }
}

function countDownEntireDeck() { 
  var counter = 3;
  entireDeck()
  activateCards()
  var countDown = setInterval(
    function() {
      $timer.show()
      counter --
      $timer.html(`${counter} seconds`)
      if(counter === 0) {
        clearInterval(countDown)        
        $('.card.selected').each(function(idx, card) {
          var cardName = $(card).attr('data-name')
// push player2 cards to separate array
          if(cardsInPlay.includes(cardName)) {
// reset for 2nd player, still showing same deck and shuffled cards
            increaseScore()
          }
        })       
      removeAllCards() 
      switchTurns();
      $startButton.show();
      // shuffle(allImages)
    } 
    }, 1000)
}

function startTurn() {
  playerDeck()
  var turn = setTimeout(function(){
    removeAllCards()
    countDownEntireDeck()
  }, 3000)
}

function startGame(){
  $instructionsButton.hide()
  $startButton.hide();
  // debugger
  startTurn();
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
  } else {
    alert("END OF GAME...")
  }
}

$startButton.on('click', startGame)

function increaseScore() {
  scoreBoard++
  $currentPlayer.html(`Current Player Score: ${scoreBoard} matched cards`)
}

function compareScores(){
  // compare player1 and player2 scores and declare winner
  // make 2 arrays then compare arrays? if player1[] > player2, player1 wins, else if player 2 > player1, player 2 wins
  }
  

// match the players deck to entireDeck, score for each pair matched. 
// show total matched cards score
// run player2 same as player1
// compare player scores and declare winner
// reset game








































