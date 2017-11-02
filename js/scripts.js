function Player(name, turnScore, totalScore) {
  this.name = name;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

var playerOne;
var playerTwo;
var allPlayers;
var notCurrentPlayer = 1;
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

var rollTwoDie = function() {
  return Math.flor(Math.random() * 12) + 2
}

var rollThreeDie = function() {
  return Math.flor(Math.random() * 18) + 3
}

var rollFourDie = function() {
  return Math.flor(Math.random() * 24) + 4
}

$(function() {

  $("#player-names").submit(function(event) {
    event.preventDefault();
    if ($("#playerOne-name").val() && $("#playerTwo-name").val()) {
      newGame($("#playerOne-name").val(), $("#playerTwo-name").val());
      $("#start-screen").slideToggle().css('display', 'flex');
      // $("#play-screen").slideToggle().css('display', 'flex');
      $("#name-warning").hide();
      $("#current-player-name").text(allPlayers[currentPlayer].name);
      $("#player-one-name-input").text(playerOne.name);
      $("#player-two-name-input").text(playerTwo.name);
      $("#player-one-score-output").text(playerOne.totalScore);
      $("#player-two-score-output").text(playerTwo.totalScore);
      // $("#play-screen").slideToggle();
      $("#next-player-screen").slideToggle();
    } else {
      $("#name-warning").show();
    }
  });

  $("#player-ready").click(function() {
    $("#next-player-name").text(allPlayers[currentPlayer].name);
    $("#play-screen").slideToggle().css('display', 'flex');
    $("#next-player-screen").slideToggle();
  });

  $("#roll-button").click(function() {
    var rollDieReturn = rollDie();
    $("#die-roll-output").text(rollDieReturn);
    if (rollDieReturn > 1) {
      playerTurnScore += rollDieReturn;
      $("#turn-score-output").text(playerTurnScore);
    } else if (rollDieReturn === 1) {
      playerTurnScore = 0;
      $("#turn-score-output").text(playerTurnScore);
      if (currentPlayer === 0) {
        currentPlayer = 1;
        notCurrentPlayer = 0;
      } else if (currentPlayer === 1) {
        currentPlayer = 0;
        notCurrentPlayer = 1;
      };
      $("#play-screen").slideUp();
      $("#next-player-screen").slideDown();
    };
    $("#current-player-name").text(allPlayers[currentPlayer].name);
  });

  $("#hold-button").click(function(){
    allPlayers[currentPlayer].totalScore += playerTurnScore;
    playerTurnScore = 0;
    $("#player-one-score-output").text(playerOne.totalScore);
    $("#player-two-score-output").text(playerTwo.totalScore);
    if (allPlayers[currentPlayer].totalScore < 100) {
      if (currentPlayer === 0) {
        currentPlayer = 1;
        notCurrentPlayer = 0;
      } else if (currentPlayer === 1) {
        currentPlayer = 0;
        notCurrentPlayer = 1;
      };
      $("#play-screen").slideUp();
      $("#next-player-screen").slideDown();
      $("#current-player-name").text(allPlayers[currentPlayer].name);
    } else if (allPlayers[currentPlayer].totalScore >= 100) {
      $("#play-screen").slideUp();
      $("#winner-screen").slideDown();
      $("#winner-name-output").text(allPlayers[currentPlayer].name);
      $("#loser-name-output").text(allPlayers[notCurrentPlayer].name);
    }
    $("#turn-score-output").text(playerTurnScore);
    $("#die-roll-output").text("0");
  });
});
