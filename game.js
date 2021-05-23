const textElement = document.getElementById("text");
const textElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = testNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
}

function selectOption(option) {}

const textNodes = [
  {
    id: 1,
    text: "Hello there! Welcome to the Victoria Compatibility Test",
    options: [
      {
        text: "ji",
        setState: { disclaimers: true },
        nextText: 2,
      },
      {
        text: "tiiii",
        setState: { disclaimers: true },
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    // text: "Hello there! Welcome to the Victoria Compatibility Test",
    // options: [
    //   {
    //     text: "ji",
    //     setState: { disclaimers: true },
    //     nextText: 2,
    //   },
    //   {
    //     text: "tiiii",
    //     setState: { disclaimers: true },
    //     nextText: 2,
    //   }
    // ],
  },
];

startGame();
