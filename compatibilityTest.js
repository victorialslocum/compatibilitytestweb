var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var input = document.getElementById("input-element");
var optionButtonsElement = document.getElementById("option-buttons");
var submit = document.getElementById("submit");
var inputText = "THIS IS STUPID";
var answer1 = "test";
var answer2 = "test2";
var x = 0;

function startGame() {
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  nextTextNodeIndex = textNodeIndex + 1;
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  text1.innerText = textNode.text1;
  text2.innerText = textNode.text2;
  console.log("Running showTextNode on index:", textNodeIndex);
  console.log("Show text node content: ", textNode);

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  while (input.firstChild) {
    input.removeChild(input.firstChild);
  }

  textNode.options.forEach((option) => {
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
      } else {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectOption(option));
        optionButtonsElement.appendChild(button);
      }
    }
  });
}

function score(change) {
  x = x + change;
}

function updateNextTextNode(nextTextNodeIndex) {
  const nextTextNode = textNodes.find(
    (textNode) => textNode.id === nextTextNodeIndex
  );
  inputText = document.getElementById("input-text").value;
  nextTextNode.text1 = choseFunction(inputText, nextTextNodeIndex);
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

function question4(input) {
  if (favName == "Melinda") {
    return "Test1";
  } else if (favName == "Victoria") {
    return "THIS WORKS";
  } else {
    return "HIIII";
  }
}

function choseFunction(input, index) {
  var arrayOfFunctions = [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  ];
  return arrayOfFunctions[index](input);
}

const textNodes = [
  {
    id: 1,
    text1: "Hello there! Welcome to the Victoria Compatibility Test",
    text2: "I'm your host, Vicomputoria, programmed into this terrible code",
    options: [
      {
        text: "Continue to test",
        nextText: 3,
      },
      {
        text: "Read the disclaimers",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text1: "Ok, here are the disclaimers...",
    text2:
      "\n1. Victoria does not necessarily share the same views as Vicomputoria, and so judgements may not be representative of Victoria's viewpoints\n 2. This is terrible code, I know, and I'm sorry, but I'm learning. \n3. I am not responsible for any mental damages that occur as a result of weird questions, puns, or making fun of you. \n4. Everytime you break something, you get -10 points deducted. Proceed with caution\n",
    options: [
      {
        text: "Continue",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text1:
      "Now that you've read the disclaimers, we'll start out with an easy question",
    text2: "What is the sexiest name?",
    options: [
      {
        text: "Melinda",
        nextText: 4,
      },
      {
        text: "Victoria",
        nextText: 4,
      },
      {
        text: "Potato",
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text1: "function 4",
    text2: answer2,
    options: [
      {
        text: "Continue",
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text1: "Enter your name",
    text2: inputText,
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
    text1: inputText,
    text2: "pleasework",
    options: [
      {
        inputform: true,
        text: "Submit",
        nextText: 1,
      },
    ],
  },
];

startGame();
