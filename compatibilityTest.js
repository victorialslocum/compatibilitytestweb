var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var input = document.getElementById("input-element");
var optionButtonsElement = document.getElementById("option-buttons");
var inputText = document.getElementById("input-text");
var answer1 = "test";
var answer2 = "test2";

function startGame() {
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  text1.innerText = textNode.text1;
  text2.innerText = textNode.text2;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  while (input.firstChild) {
    input.removeChild(input.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
      if (option.inputform) {
        const inputform = document.createElement("input");
        inputform.setAttribute("type", "text");
        inputform.classList.add("input");
        input.appendChild(inputform);
      }
    }
  });
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

function favNameQuestion(favName) {
  if (favName == "Melinda") {
    return "Test1";
  } else if (favName == "Victoria") {
    return "THIS WORKS";
  } else {
    return "HIIII";
  }
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
    text1: favNameQuestion("Victoria"),
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
    text2: "please",
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
    text1: favNameQuestion(inputText),
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
