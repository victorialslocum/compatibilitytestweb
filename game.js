const text1Element = document.getElementById("text1");
const text2Element = document.getElementById("text2");
const optionButtonsElement = document.getElementById("option-buttons");
const userInputElement = document.getElementById("input-element");

var userInput = document.getElementById("input-text");

let score = 0;

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  text1Element.innerText = textNode.text1;
  text2Element.innerText = textNode.text2;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  while (userInputElement.firstChild) {
    userInputElement.removeChild(userInputElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });

  textNode.inputs.forEach((input) => {
    if (showInput(input)) {
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      userInputElement.appendChild(input);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function showInput(input) {
  return true;
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text1: "Hello there! Welcome to the Victoria Compatibility Test",
    text2: "I'm your host, Vicomputoria, programmed into this terrible code",
    options: [
      {
        text: "go to disclaimers",
        nextText: 2,
      },
      {
        text: "start test",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text1: "Ok, here are the disclaimers...",
    text2:
      "\nOk, here you go: \n1. Victoria does not necessarily share the same views as Vicomputoria, and so judgements may not be representative of Victoria's viewpoints\n 2. This is terrible code, I know, and I'm sorry, but I'm learning. \n3. I am not responsible for any mental damages that occur as a result of weird questions, puns, or making fun of you. \n4. Everytime you break something, you get -10 points deducted. Proceed with caution\n",
    options: [
      {
        text: "start test",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text1: "heres an input box",
    text2: "lets gooo",
    inputs: [
      {
        label: "name",
      },
    ],
  },
];

startGame();
