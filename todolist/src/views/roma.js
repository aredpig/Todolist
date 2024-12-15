// 五十音图数据
const kanaMap = [
  { kana: "あ", romaji: "a" }, { kana: "い", romaji: "i" }, { kana: "う", romaji: "u" }, { kana: "え", romaji: "e" }, { kana: "お", romaji: "o" },
  { kana: "か", romaji: "ka" }, { kana: "き", romaji: "ki" }, { kana: "く", romaji: "ku" }, { kana: "け", romaji: "ke" }, { kana: "こ", romaji: "ko" },
  { kana: "さ", romaji: "sa" }, { kana: "し", romaji: "shi" }, { kana: "す", romaji: "su" }, { kana: "せ", romaji: "se" }, { kana: "そ", romaji: "so" },
  { kana: "た", romaji: "ta" }, { kana: "ち", romaji: "chi" }, { kana: "つ", romaji: "tsu" }, { kana: "て", romaji: "te" }, { kana: "と", romaji: "to" },
  { kana: "な", romaji: "na" }, { kana: "に", romaji: "ni" }, { kana: "ぬ", romaji: "nu" }, { kana: "ね", romaji: "ne" }, { kana: "の", romaji: "no" },
  { kana: "は", romaji: "ha" }, { kana: "ひ", romaji: "hi" }, { kana: "ふ", romaji: "fu" }, { kana: "へ", romaji: "he" }, { kana: "ほ", romaji: "ho" },
  { kana: "ま", romaji: "ma" }, { kana: "み", romaji: "mi" }, { kana: "む", romaji: "mu" }, { kana: "め", romaji: "me" }, { kana: "も", romaji: "mo" },
  { kana: "や", romaji: "ya" }, { kana: "ゆ", romaji: "yu" }, { kana: "よ", romaji: "yo" },
  { kana: "ら", romaji: "ra" }, { kana: "り", romaji: "ri" }, { kana: "る", romaji: "ru" }, { kana: "れ", romaji: "re" }, { kana: "ろ", romaji: "ro" },
  { kana: "わ", romaji: "wa" }, { kana: "を", romaji: "wo" }, { kana: "ん", romaji: "n" }
];

// 随机获取一个假名
function getRandomKana() {
  const index = Math.floor(Math.random() * kanaMap.length);
  return kanaMap[index];
}
// 
// 显示提示
function showPrompt() {
  const currentKana = getRandomKana();
  const userInput = prompt(`假名: ${currentKana.kana}\n请输入对应的罗马音:`);
  if (userInput === null) {
    console.log("已退出练习。");
    return;
  }

  if (userInput.trim().toLowerCase() === currentKana.romaji) {
    console.log(`正确！假名 "${currentKana.kana}" 对应的罗马音是 "${currentKana.romaji}"`);
  } else {
    console.log(`错误！假名 "${currentKana.kana}" 对应的罗马音是 "${currentKana.romaji}"，你输入的是 "${userInput}"`);
  }

  // 继续提示
  if (confirm("是否继续练习？")) {
    showPrompt();
  } else {
    console.log("练习结束。");
  }
}

// 开始练习
console.log("欢迎学习五十音图！将在控制台中进行练习。");
showPrompt();