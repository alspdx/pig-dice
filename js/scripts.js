function Player(name, turnScore, totalScore) {
  this.name = name;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

var playerOne;
var playerTwo;
var allPlayers;
var currentPlayer = 0;
var playerTurnScore;
var playerTotalScore;

var newGame = function(pOneName, pTwoName) {
  playerOne = new Player(pOneName, 0, 0);
  playerTwo = new Player(pTwoName, 0, 0);
  allPlayers = [playerOne, playerTwo];
  playerTurnScore = allPlayers[currentPlayer].turnScore;
  playerTotalScore = allPlayers[currentPlayer].totalScore;
}

var rollDie = function() {
  return Math.floor(Math.random() * 6) + 1
}

$(function() {
  $("#player-names").submit(function(event) {
    event.preventDefault();
    if ($("#playerOne-name").val() && $("#playerTwo-name").val()) {
      newGame($("#playerOne-name").val(), $("#playerTwo-name").val());
      $("#start-screen").slideToggle().css('display', 'flex');
      $("#play-screen").slideToggle().css('display', 'flex');
      $("#name-warning").hide();
    } else {
      $("#name-warning").show();
    }
  });

  $("#roll-button").click(function() {
    var rollDieReturn = rollDie();
    if (rollDieReturn > 1) {
      playerTurnScore += rollDieReturn;
    } else if (rollDieReturn === 1) {
      playerTurnScore = 0;
      if (currentPlayer === 0) {
        currentPlayer = 1
      } else if (currentPlayer === 1) {
        currentPlayer = 0
      };
    };
  });

  $("#hold-button").click(function(){
    playerTotalScore += playerTurnScore;
    playerTurnScore = 0;
    if (playerTotalScore < 100) {
      if (currentPlayer === 0) {
        currentPlayer = 1;
      } else if (currentPlayer === 1) {
        currentPlayer = 0;
      };
    } else if (playerTotalScore >= 100) {
      $("#play-screen").slideUp();
      $("#winner-screen").slideDown();
    }
  });
});
