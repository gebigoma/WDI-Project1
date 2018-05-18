var $startText = $('#start-text')
var $instructionsButton = $('button.instructions')

$startText.hide()

$instructionsButton.click(function(evt) {
  evt.preventDefault()
  $startText.not($startText).hide()

  $startText.fadeToggle('slow', 'linear')
})