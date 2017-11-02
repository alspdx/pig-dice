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
var dieAmount;


function newGame(pOneName, pTwoName) {
  playerOne = new Player(pOneName, 0, 0);
  playerTwo = new Player(pTwoName, 0, 0);
  allPlayers = [playerOne, playerTwo];
  playerTurnScore = allPlayers[currentPlayer].turnScore;
  playerTotalScore = allPlayers[currentPlayer].totalScore;
  $("#start-screen").slideToggle().css('display', 'flex');
  $("#name-warning").hide();
}

function rollDice(howMany) {
  return Math.floor(Math.random() * (6 * howMany)) + howMany
}

function changePlayer() {
  if (currentPlayer === 0) {
    currentPlayer = 1;
    notCurrentPlayer = 0;
  } else if (currentPlayer === 1) {
    currentPlayer = 0;
    notCurrentPlayer = 1;
  }
}

function nextPlayerScreen() {
  $("#play-screen").slideToggle().css('display', 'flex');
  $("#next-player-screen").slideToggle();
}

function scoreOutputReset() {
  $("#turn-score-output").text("");
  $("#die-roll-output").text("");
  playerTurnScore = 0;
  rollDiceReturn = 0;
}

function currentPlayerNameOutput(player) {
  $(".current-player-name").text(allPlayers[player].name)
}

$(function() {
  $("#player-names").submit(function(event) {
    event.preventDefault();
    dieAmount = parseInt($("input[type='radio'][name='diceNumber']:checked").val());

    if ($("#playerOne-name").val() && $("#playerTwo-name").val()) {
      newGame($("#playerOne-name").val(), $("#playerTwo-name").val());
      currentPlayerNameOutput(currentPlayer);
      $("#player-one-name-input").text(playerOne.name);
      $("#player-two-name-input").text(playerTwo.name);
      $("#next-player-screen").slideToggle();
    } else {
      $("#name-warning").show();
    }
  });

  $("#player-ready").click(function() {
    currentPlayerNameOutput(currentPlayer);
    nextPlayerScreen();
  });

  $("#roll-button").click(function() {
    var rollDiceReturn = rollDice(dieAmount);
    $("#die-roll-output").text(rollDiceReturn);
    if (rollDiceReturn > dieAmount) {
      playerTurnScore += rollDiceReturn;
      $("#turn-score-output").text(playerTurnScore);
    } else if (rollDiceReturn === dieAmount) {
      scoreOutputReset();
      changePlayer();
      nextPlayerScreen();
    };
    currentPlayerNameOutput(currentPlayer);
  });

  $("#hold-button").click(function() {
    if (playerTurnScore > 0) {
      allPlayers[currentPlayer].totalScore += playerTurnScore;
      $("#player-one-score-output").text(playerOne.totalScore);
      $("#player-two-score-output").text(playerTwo.totalScore);
      if ((allPlayers[currentPlayer].totalScore) < (100 * dieAmount)) {
        changePlayer();
        nextPlayerScreen();
      } else if ((allPlayers[currentPlayer].totalScore) >= (100 * dieAmount)) {
        $("#play-screen").slideUp();
        $("#winner-screen").slideDown();
        $("#winner-name-output").text(allPlayers[currentPlayer].name);
        $("#loser-name-output").text(allPlayers[notCurrentPlayer].name);
      }
      currentPlayerNameOutput(currentPlayer);
      scoreOutputReset();
    } else {
      alert('Hey! It is still your turn, ' + allPlayers[currentPlayer].name + ", and it will remain your turn until you roll the damn dice!");
    };
  });
});
