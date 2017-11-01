function Player(name, turnScore, totalScore) {
  this.name = name;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

var playerOne;
var playerTwo;
var allPlayers;

var newGame = function(pOneName, pTwoName) {
  playerOne = new Player(pOneName, 0, 0);
  playerTwo = new Player(pTwoName, 0, 0);
  allPlayers = [playerOne, playerTwo];
}
// var allPlayers = [playerOne, playerTwo];
var currentPlayer = 0;

var rollDie = function() {
  return Math.floor(Math.random() * 6) + 1
}



$(function() {
  $("#player-names").submit(function(event) {
    event.preventDefault();
    if ($("#playerOne-name").val() && $("#playerTwo-name").val()) {
      newGame($("#playerOne-name").val(), $("#playerTwo-name").val());
      $("#start-screen").slideUp();
      $("#name-warning").hide();
    } else {
      $("#name-warning").show();
    }

  });

  $("#roll-button").click(function() {
    var rollDieReturn = rollDie();
    var playerScore = allPlayers[currentPlayer].turnScore
    if (rollDieReturn > 1) {
      playerScore = playerScore + rollDieReturn;
      allPlayers[currentPlayer].turnScore = playerScore;
    } else if (rollDieReturn === 1) {
      playerScore = 0;
      if (currentPlayer === 0) {
        currentPlayer = 1
      } else if (currentPlayer === 1) {
        currentPlayer = 0
      };
    };
    console.log(currentPlayer + " " + rollDieReturn + " " + playerScore)
  });


});
