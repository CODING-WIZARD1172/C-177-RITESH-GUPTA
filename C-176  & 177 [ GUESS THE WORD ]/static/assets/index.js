$(document).ready(function () {
  getTemplates();
});

function getTemplates() {
  $.ajax({
    type: "GET",
    url: "/get-template",
    success: function (result) {
      fillBlanks(result.word);
    },
    error: function (result) {
      alert(result.responseJSON.mesage);
    },
  });
}

var gameOver = false;

//Fill blanks only if the character match is found
$(".clickable").click(function () {
  var correctGuess = false;

  //get the id of the button clicked
  var id = $(this).attr("id");

  //get the life
  var life = parseInt($("#life").text());

  //loop through all the letters
  for (var i = 0; i < randomWord.word.length; i++) {
    //check if the character matches the id of the button
    if (randomWord.word.charAt(i).toLowerCase() === id) {
      //check if the life still left and blank is empty/already filled
      if (
        life > 0 &&
        ($(".fill_blanks").eq(i).html == "_" ||
          $(".fill_blanks").eq(i).html == id)
      ) {
        //fill the blank with the character
        $(".fill_blanks").eq(i).html(id);
        correctGuess = true;

        //check if the word guess is complete
        if ($("#blanks").text() == randomWord.word.toLowerCase()) {
          $("#result").text("YOU WIN !!");
          correctGuess = true;
          gameOver = true;
        }
      }
    }
  }
});
