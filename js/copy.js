
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
  {name: "creepybanana", cardImage: "https://goo.gl/1LcxSQ"},
 
]

let cardsInPlay;
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

$startText.hide()
$timer.hide()
$score.hide()
$playerTwoStartButton.hide()

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

function shuffleAllImages() {
  shuffle(allImages);
}

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

function playerDeck(slicedDeck) {
  cardsInPlay = [];
  for (var i = 0; i < slicedDeck.length; i += 1) {
    cardsInPlay.push(slicedDeck[i].name);
    showCard(slicedDeck[i].name, slicedDeck[i].cardImage, 'stretch')
  }
}

function entireDeck() {
  var shuffleAll = shuffle(allImages)
  for(var i = 0; i < shuffleAll.length; i += 1) {
    showCard(shuffleAll[i].name, shuffleAll[i].cardImage)
  }
}

function countDownEntireDeck() { 
  var counter = 10;
  entireDeck()
  activateCards()
  $timer.show()
  var countDown = setInterval(
    function() {
      counter --
      $timer.html(`${counter} seconds`)
      if(counter === 0) {
        clearInterval(countDown)        
        $('.card.selected').each(function(idx, card) {
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

function startTurn() {
  var shuffleAll = shuffle(allImages);
  var slicedDeck = allImages.slice(0, 4);
  playerDeck(slicedDeck)
  var turn = setTimeout(function(){
    removeAllCards()
    countDownEntireDeck(shuffleAll)
  }, 8000)
}

function startGame(){
  $startText.hide()
  clearScoreAndTimer()
  $instructionsButton.hide()
  $startButton.hide();
  $playerTwoStartButton.hide();
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
 




































