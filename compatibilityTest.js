// global document element variables
var line1 = document.getElementById("text1");
var line2 = document.getElementById("text2");
var input = document.getElementById("input-element");
var optionButtonsElement = document.getElementById("option-buttons");
var submit = document.getElementById("submit");
var scoreboard = document.getElementById("scoreboard");
var scoreboardDiv = document.getElementById("scoreboard-div");
var textContainer = document.getElementById("textcontainer");

// global variables
var inputText = "";
var userName = "";
var sexyName = "";
var favColor = "";
var toebees = "";
var previousButtonText = "";
var wormLength = 0;
var score = 0;
var userDict = {};
const date = new Date();

//content
const textNodes = [
  {
    id: 1,
    line1: "hello there! welcome to the Victoria Compatibility Test",
    line2: "I'm your host, Vicomputoria, programmed into this terrible code",
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
    line1:
      "ok, here are the disclaimers...\n1. Victoria does not necessarily share the same views as Vicomputoria, and so judgements may not be representative of Victoria's viewpoints\n 2. This is terrible code, I know, and I'm sorry, but I'm learning. \n3. I am not responsible for any mental damages that occur as a result of weird questions, puns, or making fun of you. \n4. Everytime you break something, you get -10 points deducted. Proceed with caution\n",
    line2: "",
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
    line1: "we'll start out with an easy question\nwhat is your name?",
    line2: "",
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
    line1: "answer to your name",
    line2: "ok next question...",
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
    line1: "what is the sexiest name?",
    line2: "",
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
    line1: "answer to sexiest name",
    line2: "",
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
    line1: "ok lets talk color...\nwhat's your favorite color?",
    line2: "",
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
    line1: "answer to color",
    line2: "tired of me yet?",
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
    line1: "oh honey, the fun hasn't even started yet...\nwanna quit?",
    line2: "",
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
    line1:
      "ok this may be the most important question you will ever hear.\ndo bees have toes?",
    line2: "",
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
    line1: "",
    line2: "",
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
    line1: "if you were a worm, how long would you be (in centimeters)?",
    line2: "",
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
    line1: "",
    line2: "",
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
    line1: "final question...\nhow do you feel about puns?",
    line2: "",
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
    line1: "",
    line2: "",
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
    line1: "now for the results... \nfinal score:",
    line2: "",
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
    line1: "",
    line2: "",
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

// firebase info
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

// initialize firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
const dbRefObject = firebase.database().ref().child("users");

// add data to firebase database and update scoreboard
function writeUserData(userName, score) {
  // create user key to prevent rewrites (i think lol)
  var newUserKey = dbRefObject.push().key;

  // create new child with user key and add username, score, and userKey
  database
    .ref()
    .child("users/" + newUserKey)
    .set({
      username: userName,
      score: score,
      userKey: newUserKey,
      date: date,
      ansers: {
        sexyName: sexyName,
        favColor: favColor,
        toebees: toebees,
        wormLength: wormLength,
      },
    });
  // update scores
  updateScores();
}

function startGame() {
  updateScores();
  showTextNode(1);
}

// update scoreboard
function updateScores() {
  // remove existing CSS in scoreboard
  scoreboard.innerHTML = "";

  // for each userID within users, add username and score to dictionary
  dbRefObject.on("value", (snap) => {
    snap.forEach((user) => {
      userDict[user.val().username] = user.val().score;
    });
  });

  // make a key, value array
  var items = Object.keys(userDict).map((key) => {
    return [key, userDict[key]];
  });

  // sort items in list
  items.sort((first, second) => {
    return second[1] - first[1];
  });

  // take top 5 items of sorted list and create elements for them
  items.slice(0, 5).forEach((value) => {
    // create wrapper for username + score pair
    const textWrapper = document.createElement("tr");
    scoreboard.appendChild(textWrapper);

    value.forEach((value) => {
      // create item for either username or score
      const scoreText = document.createElement("th");
      scoreText.innerText = value;

      textWrapper.appendChild(scoreText);
    });
  });
}

// main function that changes html
function showTextNode(textNodeIndex) {
  console.log("score: ", score);

  // find textNode and change text
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  line1.innerText = textNode.line1;
  line2.innerText = textNode.line2;

  // remove all elements except text box
  optionButtonsElement.innerHTML = "";

  input.innerHTML = "";

  // for each array under options
  textNode.options.forEach((option) => {
    var nextTextNodeIndex = option.nextText;

    if (option.inputform) {
      // if option.inputform is marked as true, create an input element
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

      // keep the text container, get rid of scoreboard
      textContainer.style.display = "block";
      scoreboardDiv.style.display = "none";
    } else if (option.scoreboard) {
      // if option.scoreboard = true, keep the button stuff, and add scoreboard stuff
      const scoreValue = option.scoreValue;
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        previousButtonText = option.text;
        updateNextTextNodeButton(nextTextNodeIndex);
        addToScore(scoreValue);
        selectOption(option);
      });
      optionButtonsElement.appendChild(button);

      // show scoreboard and update scores
      scoreboardDiv.style.display = "block";
      updateScores();

      // bye bye text container
      textContainer.style.display = "none";
    } else {
      // basically adds the amount of buttons that is specified by the amount of items in options
      const scoreValue = option.scoreValue;
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        previousButtonText = option.text;
        updateNextTextNodeButton(nextTextNodeIndex);
        addToScore(scoreValue);
        selectOption(option);
      });
      optionButtonsElement.appendChild(button);

      // keep text container, get rid of scoreboard
      scoreboardDiv.style.display = "none";
      textContainer.style.display = "block";
    }
  });
}

// is there a better way to write x = ...?
function addToScore(change) {
  score += change;
}

// finds the next text node and updates the text before its passed into the show text node function
// choses function based on an array of functions
function updateNextTextNode(nextTextNodeIndex) {
  const nextTextNode = textNodes.find(
    (nextTextNode) => nextTextNode.id === nextTextNodeIndex
  );
  inputText = document.getElementById("input-text").value;
  nextTextNode.line1 = choseFunction(inputText, nextTextNodeIndex);
}

// same thing as above but uses the previous selected button text as the input to the function
function updateNextTextNodeButton(nextTextNodeIndex) {
  const nextTextNode = textNodes.find(
    (nextTextNode) => nextTextNode.id === nextTextNodeIndex
  );
  inputText = previousButtonText;
  nextTextNode.line2 = choseFunction(inputText, nextTextNodeIndex);
}

// runs the function to show the text node with the next text node number
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  showTextNode(nextTextNodeId);
}

// blank question
function question0() {
  return "";
}

// content questions
function question1(input) {
  userName = input.toLowerCase();
  if (userName == "") {
    addToScore(-10);
    return "why'd you input nothing :(";
  } else if (userName == "victoria") {
    addToScore(-5);
    return "we have the same name :( copy cat";
  } else if (userName.charAt(0) == "j") {
    addToScore(5);
    return "your name starts with my favorite letter!";
  } else if (userName.charAt(0) == "v") {
    addToScore(-3);
    return (
      "your name starts with the same letter as mine... that's definitely weird. \nkinda makes us sound like a villian duo\nvictoria + " +
      userName +
      ". \nyea not a vibe."
    );
  } else if (userName.length <= 3) {
    addToScore(6);
    return "wow you must think you're so cool, having a short name...\nwell, I think you're cool too.";
  } else if (3 < userName.length && userName.length < 8) {
    addToScore(1);
    return "hm. average number of letters. noted.";
  } else if (userName.length == 8) {
    addToScore(3);
    return "OMG we have the name number of letters in our name";
  } else if (userName.length > 8) {
    addToScore(-1);
    return "long name... idk if I'm comfortable with someone having a longer name than me, it feels weird";
  } else {
    addToScore(-10);
    return "YOU BROKE SOMETHING";
  }
}

function question2(input) {
  sexyName = input.toLowerCase();
  if (sexyName == "victoria") {
    addToScore(10);
    return "correct answer. good choice.";
  } else if (sexyName == userName) {
    addToScore(-7);
    return "well first of all, youre wrong, and second of all, you are not that hot\nthe correct answer would have been Victoria. duh.";
  } else if (sexyName == "vicomputoria") {
    addToScore(-1);
    return "I'm flattered, but you're still wrong. Victoria is obviously the correct choice. duh.";
  } else {
    addToScore(-3);
    return "hm. ok. I guess";
  }
}

function question3(input) {
  favColor = input.toLowerCase();
  if (favColor == "victoria") {
    addToScore(-10);
    return "not a color";
  } else if (favColor == "red") {
    addToScore(7);
    return "Plus we have the same favorite color!\nAlso, the color of love... I'm not saying its meant to be but...\nJK, obviously, heheh";
  } else if (favColor == "orange") {
    addToScore(-2);
    return "um ew wack";
  } else if (favColor == "yellow") {
    addToScore(5);
    return "sunsets and smiles... thats the vibe I get at least. I like it :)";
  } else if (favColor == "green") {
    addToScore(2);
    return "nature is cool and thats mostly green so ok I guess";
  } else if (favColor == "blue") {
    addToScore(3);
    return "i feel like blue has a lot of depth and emotion behind it. it always makes me a bit sad though";
  } else if (favColor == "purple") {
    addToScore(-1);
    return "actually awful. like. wtf.";
  } else if (favColor == "pink") {
    addToScore(4);
    return "ahhh i love it pink makes me happy";
  } else if (favColor == "grey") {
    addToScore(-5);
    return "wack thats like not even a color";
  } else if (favColor == "black") {
    addToScore(1);
    return "edgy. can it even be considered a color tho?";
  } else if (favColor == "white") {
    addToScore(-3);
    return "hahahhaahahahahhahhaa ok I guess, just kinda reminds me of this one time I got pooped on by a dove";
  } else if (favColor.search("and") !== -1 || favColor.search("or ") !== -1) {
    addToScore(-5);
    return "well someone's indecisive";
  } else {
    addToScore(2);
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
    addToScore(-10);
    return "you broke something :(";
  }
}

function question5(input) {
  wormLength = parseFloat(input);
  if (wormLength < 2) {
    addToScore(-5);
    return (
      "I definitely feel like this says a lot about you...\nand tbh its not a vibe\nsmall worm = lame worm\nso in other words, " +
      userName +
      " = lame"
    );
  } else if (2 <= wormLength && wormLength <= 15) {
    addToScore(3);
    return (
      "OKOK I see you with your perfect " +
      wormLength +
      "cm worm body!!\nits a vibe and i'm here for it"
    );
  } else if (15 < wormLength && wormLength < 30) {
    addToScore(-3);
    return "well... I mean...\nyou're not long enough to be terrifying but not short enough to be nice\nso idk. just kinda. there ig";
  } else if (30 <= wormLength) {
    addToScore(5);
    return "OH ok well I see you want to either be great at your job...\nor a terror to humanity\nI can get behind both. good choice.";
  } else {
    addToScore(-10);
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
    addToScore(-10);
    return "you broke something :(";
  }
}

function returnScore() {
  var textScore = "";
  if (score == -40) {
    textScore = "\nyou got the worst score possible. congrats on sucking";
  } else if (score < 1) {
    textScore = "\nyou completely failed. yea. so um its not gonna work out.";
  } else if (score >= 1 && score < 10) {
    textScore =
      "\nwell at least you didn't get a negative number... but... yikes...";
  } else if (score >= 10 && score < 30) {
    textScore = "\nnot fantastic. below average.";
  } else if (score >= 30 && score < 50) {
    textScore = "\nokokokok you have some potential";
  } else if (score == 50) {
    textScore =
      "\nidk whether to be terrified of the fact you got a perfect score...\nor if I should just propose now";
  } else {
    score = 0;
    textScore = "\nyou broke something so score is actually 0";
  }
  writeUserData(userName, score);
  return score + "/50" + textScore;
}

function deleteScore() {
  score = 0;
  return "I'm your host, Vicomputoria, programmed into this terrible code";
}

function question7() {
  score = 0;
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

startGame();
