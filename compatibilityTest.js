var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var input = document.getElementById("input-element");
var optionButtonsElement = document.getElementById("option-buttons");
var submit = document.getElementById("submit");
var scoreboard = document.getElementById("scoreboard");
var scoreboardDiv = document.getElementById("scoreboard-div");
var textContainer = document.getElementById("textcontainer");
var inputText = "";
var userName = "";
var sexyName = "";
var favColor = "";
var toebees = "";
var previousButtonText = "";
var wormLength = 0;
var x = 0;

var firebaseConfig = {
  apiKey: "AIzaSyDWI2uQ6cZILtZxOHHCoef5bpnLMgy-n_c",
  authDomain: "compatibility-test-2cec2.firebaseapp.com",
  databaseURL: "https://compatibility-test-2cec2-default-rtdb.firebaseio.com",
  projectId: "compatibility-test-2cec2",
  storageBucket: "compatibility-test-2cec2.appspot.com",
  messagingSenderId: "1053600569593",
  appId: "1:1053600569593:web:7cecd9eefb904cf2d4aa28",
  measurementId: "G-GQJNZJPK03",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

const dbRefObject = firebase.database().ref().child("users");

dbRefObject.on("value", (snap) => {
  console.log(snap.val());
});

function writeUserData(userName, score) {
  var newUserKey = dbRefObject.push().key;

  database
    .ref()
    .child("users/" + newUserKey)
    .set({
      username: userName,
      score: score,
      userKey: newUserKey,
    });
  updateScores();
}

function startGame() {
  updateScores();
  showTextNode(1);
}

function updateScores() {
  while (scoreboard.firstChild) {
    scoreboard.removeChild(scoreboard.firstChild);
  }
  dbRefObject.on("value", (snap) => {
    snap.forEach((user) => {
      const textWrapper = document.createElement("tr");
      const userNameText = document.createElement("th");
      const scoreText = document.createElement("th");
      userNameText.innerText = user.val().username;
      scoreText.innerText = user.val().score;

      textWrapper.appendChild(userNameText);
      textWrapper.appendChild(scoreText);
      scoreboard.appendChild(textWrapper);
    });
  });
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  text1.innerText = textNode.text1;
  text2.innerText = textNode.text2;
  console.log("score: ", x);

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  while (input.firstChild) {
    input.removeChild(input.firstChild);
  }

  while (scoreboardDiv.firstChild) {
    scoreboardDiv.removeChild(scoreboardDiv.firstChild);
  }

  textNode.options.forEach((option) => {
    var nextTextNodeIndex = option.nextText;
    if (showOption(option)) {
      if (option.inputform) {
        const inputForm = document.createElement("input");
        inputForm.setAttribute("type", "text");
        inputForm.classList.add("input");
        inputForm.setAttribute("id", "input-text");
        const submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.classList.add("submit-button");
        submitButton.addEventListener("click", () => {
          updateNextTextNode(nextTextNodeIndex);
          selectOption(option);
        });
        input.appendChild(inputForm);
        input.appendChild(submitButton);
        textContainer.style.display = "block";
      } else if (option.scoreboard) {
        const scoreValue = option.scoreValue;
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
          updatePreviousButtonText(option.text);
          updateNextTextNodeButton(nextTextNodeIndex);
          score(scoreValue);
          selectOption(option);
        });
        optionButtonsElement.appendChild(button);

        const scoreboardTitle = document.createElement("h2");
        scoreboardTitle.innerText = "leaderboard";
        const scoreboardDivClass = document.createElement("div");
        scoreboardDivClass.classList.add("scoreboard");
        scoreboardDiv.appendChild(scoreboardDivClass);
        scoreboardDivClass.appendChild(scoreboardTitle);
        scoreboardDivClass.appendChild(scoreboard);

        updateScores();

        textContainer.style.display = "none";
      } else {
        const scoreValue = option.scoreValue;
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
          updatePreviousButtonText(option.text);
          updateNextTextNodeButton(nextTextNodeIndex);
          score(scoreValue);
          selectOption(option);
        });
        optionButtonsElement.appendChild(button);
        textContainer.style.display = "block";
      }
    }
  });
}

function updatePreviousButtonText(buttonText) {
  previousButtonText = buttonText;
}

function score(change) {
  x = x + change;
}

function updateNextTextNode(nextTextNodeIndex) {
  const nextTextNode = textNodes.find(
    (nextTextNode) => nextTextNode.id === nextTextNodeIndex
  );
  inputText = document.getElementById("input-text").value;
  nextTextNode.text1 = choseFunction(inputText, nextTextNodeIndex);
}

function updateNextTextNodeButton(nextTextNodeIndex) {
  const nextTextNode = textNodes.find(
    (nextTextNode) => nextTextNode.id === nextTextNodeIndex
  );
  inputText = previousButtonText;
  nextTextNode.text2 = choseFunction(inputText, nextTextNodeIndex);
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  showTextNode(nextTextNodeId);
}

function question0() {
  return "";
}

function question1(input) {
  userName = input.toLowerCase();
  if (userName == "victoria") {
    score(-5);
    return "we have the same name :( copy cat";
  } else if (userName.charAt(0) == "j") {
    score(5);
    return "your name starts with my favorite letter!";
  } else if (userName.charAt(0) == "v") {
    score(-3);
    return (
      "your name starts with the same letter as mine... that's definitely weird. \nkinda makes us sound like a villian duo\nvictoria + " +
      userName +
      ". \nyea not a vibe."
    );
  } else if (userName.length <= 3) {
    score(6);
    return "wow you must think you're so cool, having a short name...\nwell, I think you're cool too.";
  } else if (3 < userName.length < 8) {
    score(1);
    return "hm. average number of letters. noted.";
  } else if (userName.length == 8) {
    score(3);
    return "OMG we have the name number of letters in our name";
  } else if (userName.length > 8) {
    score(-1);
    return "long name... idk if I'm comfortable with someone having a longer name than me, it feels weird";
  } else {
    score(-10);
    return "YOU BROKE SOMETHING";
  }
}

function question2(input) {
  sexyName = input.toLowerCase();
  if (sexyName == "victoria") {
    score(10);
    return "correct answer. good choice.";
  } else if (sexyName == userName) {
    score(-7);
    return "well first of all, youre wrong, and second of all, you are not that hot\nthe correct answer would have been Victoria. duh.";
  } else if (sexyName == "vicomputoria") {
    score(-1);
    return "I'm flattered, but you're still wrong. Victoria is obviously the correct choice. duh.";
  } else {
    score(-3);
    return "hm. ok. I guess";
  }
}

function question3(input) {
  favColor = input.toLowerCase();
  if (favColor == "victoria") {
    score(-10);
    return "not a color";
  } else if (favColor == "red") {
    score(7);
    return "Plus we have the same favorite color!\nAlso, the color of love... I'm not saying its meant to be but...\nJK, obviously, heheh";
  } else if (favColor == "orange") {
    score(-2);
    return "um ew wack";
  } else if (favColor == "yellow") {
    score(5);
    return "sunsets and smiles... thats the vibe I get at least. I like it :)";
  } else if (favColor == "green") {
    score(2);
    return "nature is cool and thats mostly green so ok I guess";
  } else if (favColor == "blue") {
    score(3);
    return "i feel like blue has a lot of depth and emotion behind it. it always makes me a bit sad though";
  } else if (favColor == "purple") {
    score(-1);
    return "actually awful. like. wtf.";
  } else if (favColor == "pink") {
    score(4);
    return "ahhh i love it pink makes me happy";
  } else if (favColor == "grey") {
    score(-5);
    return "wack thats like not even a color";
  } else if (favColor == "black") {
    score(1);
    return "edgy. can it even be considered a color tho?";
  } else if (favColor == "white") {
    score(-3);
    return "hahahhaahahahahhahhaa ok I guess, just kinda reminds me of this one time I got pooped on by a dove";
  } else if (favColor.search("and") !== -1) {
    score(-5);
    return "well someone's indecisive";
  } else {
    score(2);
    return "wack. whats wrong with the colors of the rainbow???";
  }
}

function question4(input) {
  toebees = input.toLowerCase();
  if (toebees == "yes") {
    return "wow confident answer. I like a person with confidence.\nunfortunately scientist say no, but I like to think that they're wrong.\njust because its classified as a 'tarsal segment' doesn't mean it isn't a toe\nso good for you in bee-lieving in the power of bees with toes";
  } else if (toebees == "no") {
    return "well you're technically right according to scientists\nso congrats on being smart but not congrats in not bee-lieving in bees\nit's kind of discrimina-toe-ry";
  } else if (toebees == "idk") {
    return "don't know? sounds a little unconfident. bee more educated next time";
  } else if (toebees == "why") {
    return "CAUSE I SAID SO";
  } else {
    score(-10);
    return "you broke something :(";
  }
}

function question5(input) {
  wormLength = parseFloat(input);
  if (wormLength < 1) {
    score(-5);
    return (
      "I definitely feel like this says a lot about you...\nand tbh its not a vibe\nsmall worm = lame worm\nso in other words, " +
      userName +
      " = lame"
    );
  } else if (1 <= wormLength && wormLength <= 6) {
    score(3);
    return (
      "OKOK I see you with your perfect " +
      wormLength +
      "in worm body!!\nits a vibe and i'm here for it"
    );
  } else if (6 < wormLength && wormLength < 12) {
    score(-3);
    return "well... I mean...\nyou're not long enough to be terrifying but not short enough to be nice\nso idk. just kinda. there ig";
  } else if (12 <= wormLength) {
    score(5);
    return "OH ok well I see you want to either be great at your job...\nor a terror to humanity\nI can get behind both. good choice.";
  } else {
    score(-10);
    return "WHAT DID YOU DO :((((";
  }
}

function question6(input) {
  if (input == "omg yes") {
    return "YES AGREED OMG";
  } else if (input == "ew") {
    return "ok maybe you're the one who's ew, not the puns";
  } else if (input == "idk") {
    return "there's a lot of things I don't know, but this is not one of them\npuns are obviously the best";
  } else if (input == "why") {
    return "...\nwhy are you questioning me";
  } else {
    score(-10);
    return "you broke something :(";
  }
}

function returnScore() {
  var textScore = "";
  if (x == -40) {
    textScore = "\nyou got the worst score possible. congrats on sucking";
  } else if (x < 1) {
    textScore = "\nyou completely failed. yea. so um its not gonna work out.";
  } else if (x >= 1 && x < 10) {
    textScore =
      "\nwell at least you didn't get a negative number... but... yikes...";
  } else if (x >= 10 && x < 30) {
    textScore = "\nnot fantastic. below average.";
  } else if (x >= 30 && x < 50) {
    textScore = "\nokokokok you have some potential";
  } else if (x == 50) {
    textScore =
      "\nidk whether to be terrified of the fact you got a perfect score...\nor if I should just propose now";
  } else {
    x = 0;
    textScore = "\nyou broke something so score is actually 0";
  }
  writeUserData(userName, x);
  return x + "/50" + textScore;
}

function deleteScore() {
  x = 0;
  return "I'm your host, Vicomputoria, programmed into this terrible code";
}

function question7() {
  x = 0;
  return "hello there! welcome to the Victoria Compatibility Test\nI'm your host, Vicomputoria, programmed into this terrible code";
}

function choseFunction(input, index) {
  const arrayOfFunctions = [
    deleteScore,
    deleteScore,
    question0,
    question0,
    question1,
    question0,
    question2,
    question0,
    question3,
    question0,
    question0,
    question4,
    question0,
    question5,
    question0,
    question6,
    returnScore,
    question7,
  ];
  return arrayOfFunctions[index](input);
}

const textNodes = [
  {
    id: 1,
    text1: "hello there! welcome to the Victoria Compatibility Test",
    text2: "I'm your host, Vicomputoria, programmed into this terrible code",
    options: [
      {
        text: "Continue to test",
        scoreValue: 0,
        nextText: 3,
      },
      {
        text: "Read the disclaimers",
        scoreValue: 2,
        nextText: 2,
      },
      {
        text: "leaderboard",
        scoreValue: 0,
        nextText: 17,
      },
    ],
  },
  {
    id: 2,
    text1:
      "ok, here are the disclaimers...\n1. Victoria does not necessarily share the same views as Vicomputoria, and so judgements may not be representative of Victoria's viewpoints\n 2. This is terrible code, I know, and I'm sorry, but I'm learning. \n3. I am not responsible for any mental damages that occur as a result of weird questions, puns, or making fun of you. \n4. Everytime you break something, you get -10 points deducted. Proceed with caution\n",
    text2: "",
    options: [
      {
        text: "Continue",
        scoreValue: 0,
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text1: "we'll start out with an easy question\nwhat is your name?",
    text2: "",
    options: [
      {
        inputform: true,
        text: "Submit",
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text1: "answer to your name",
    text2: "ok next question...",
    options: [
      {
        text: "continue",
        scoreValue: 0,
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text1: "what is the sexiest name?",
    text2: "",
    options: [
      {
        inputform: true,
        text: "Submit",
        nextText: 6,
      },
    ],
  },
  {
    id: 6,
    text1: "answer to sexiest name",
    text2: "",
    options: [
      {
        text: "continue",
        scoreValue: 0,
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text1: "ok lets talk color...\nwhat's your favorite color?",
    text2: "",
    options: [
      {
        inputform: true,
        text: "Submit",
        nextText: 8,
      },
    ],
  },
  {
    id: 8,
    text1: "answer to color",
    text2: "tired of me yet?",
    options: [
      {
        text: "nope ask away",
        scoreValue: 3,
        nextText: 10,
      },
      {
        text: "kind of...",
        scoreValue: -5,
        nextText: 9,
      },
      {
        text: "please make it stop",
        scoreValue: -10,
        nextText: 16,
      },
    ],
  },
  {
    id: 9,
    text1: "oh honey, the fun hasn't even started yet...\nwanna quit?",
    text2: "",
    options: [
      {
        text: "get me out of here",
        scoreValue: -10,
        nextText: 16,
      },
      {
        text: "quitting is for losers",
        scoreValue: 2,
        nextText: 10,
      },
    ],
  },
  {
    id: 10,
    text1:
      "ok this may be the most important question you will ever hear.\ndo bees have toes?",
    text2: "",
    options: [
      {
        text: "yes",
        scoreValue: 7,
        nextText: 11,
      },
      {
        text: "no",
        scoreValue: 5,
        nextText: 11,
      },
      {
        text: "idk",
        scoreValue: -5,
        nextText: 11,
      },
      {
        text: "why",
        scoreValue: -5,
        nextText: 11,
      },
    ],
  },
  {
    id: 11,
    text1: "",
    text2: "",
    options: [
      {
        text: "continue",
        scoreValue: 0,
        nextText: 12,
      },
    ],
  },
  {
    id: 12,
    text1: "if you were a worm, how long would you be (in inches)?",
    text2: "",
    options: [
      {
        inputform: true,
        text: "Submit",
        nextText: 13,
      },
    ],
  },
  {
    id: 13,
    text1: "",
    text2: "",
    options: [
      {
        text: "continue",
        scoreValue: 0,
        nextText: 14,
      },
    ],
  },
  {
    id: 14,
    text1: "final question...\nhow do you feel about puns?",
    text2: "",
    options: [
      {
        text: "omg yes",
        scoreValue: 10,
        nextText: 15,
      },
      {
        text: "ew",
        scoreValue: -7,
        nextText: 15,
      },
      {
        text: "idk",
        scoreValue: -5,
        nextText: 15,
      },
      {
        text: "why",
        scoreValue: -5,
        nextText: 15,
      },
    ],
  },
  {
    id: 15,
    text1: "",
    text2: "",
    options: [
      {
        text: "continue",
        scoreValue: 0,
        nextText: 16,
      },
    ],
  },
  {
    id: 16,
    text1: "now for the results... \nfinal score:",
    text2: "",
    options: [
      {
        text: "leaderboard",
        scoreValue: 0,
        nextText: 17,
      },
      {
        text: "try again",
        scoreValue: 0,
        nextText: 1,
      },
    ],
  },
  {
    id: 17,
    text1: "",
    text2: "",
    options: [
      {
        scoreboard: true,
        text: "back to test",
        scoreValue: 0,
        nextText: 1,
      },
    ],
  },
];

startGame();
