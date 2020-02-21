/*
 * @Date: 2020-02-11 14:36:39
 * @LastEditors  : lifangdi
 * @LastEditTime : 2020-02-21 22:12:42
 */
const CAPTION = 'Like this?This is not my son, it\'s a fake!How did I come up with this...Father...'
const SENTENCE1 = 'Like this?'
const SENTENCE2 = 'This is not my son, it\'s a fake! How did I come up with this...'
const SENTENCE3 = 'Father...'

const subTitle = document.getElementById('subtitle')
const start = document.getElementById('start')

// js原生方法获取「文本框」
const input = document.getElementById('input')

const game_tip = document.getElementById('game-tip')

const wrong = document.getElementById('wrong-box')

const sentences = document.getElementsByClassName('sentences')

const randomLine = () => {
  let line_height = getRandomNum(55, 70);
  wrong.innerHTML = ''
  for(let i = 0; i < line_height; i++) {
    let wrong_line = document.createElement('li');
    wrong.appendChild(wrong_line);
    wrong_line.style.height = getRandomNum(3, line_height) + 'px';
    wrong_line.className = 'wrong-line';
  }
}


// 通过id实例化videojs对象
const myPlayer = videojs('my-video')

// 绑定「开始输入框」输入事件
start.focus()
start.oninput = () => {
  if(start.value === 'start') {
    myPlayer.currentTime(0.414)
    start.classList.add('remove-start')
    input.focus();
    sentences[0].className = 'sentences'
    // sentences[1].className = 'sentences hide'
    // sentences[2].className = 'sentences hide'

  }
}

// 控制输入每个字符的播放时间
const pre = (n) => {
  let span
  n <= 10 ? span = 76 : span = 85
  myPlayer.play()
  setTimeout(() => {
    myPlayer.pause()
  }, span)
}

const back = (n) => {
  const curTime = myPlayer.currentTime()
  n <= 10
  ? myPlayer.currentTime(curTime - 0.074)
  : myPlayer.currentTime(curTime - 0.085)

}

const inputLetter = (className, inner, inputSentencesName) => {
  const letter = document.createElement('span');
  letter.className = className
  inputSentencesName.appendChild(letter);
  letter.innerHTML = inner
}

let videoLength
myPlayer.on('loadedmetadata',() => videoLength = Math.floor(myPlayer.duration()))

function getRandomNum(min, max) {
  return (Math.random() * (max - min) + min).toFixed(3);
}

const inputSentences1 = document.createElement('div');
subTitle.appendChild(inputSentences1);
inputSentences1.className = 'sentences'
  
// 文本框输入事件
// 每次键盘输入事件，获取文本框的值，并进判断逻辑
let n = 0   // 标志变量n
let lastCorrect = 0.414
input.oninput = (e) => {
  let value = input.value
  let caption_arr = CAPTION.split('')
  const letter = document.getElementsByClassName('letter')
  // let curSentence = inputSentences1
  // if(value === SENTENCE1) {
  //   console.log(1)
  //   sentences[1].className = 'sentences'
  //   sentences[0].className = 'sentences hide'
  //   inputSentences1.className = 'sentences s1 hide'
  //   curSentence = inputSentences2
  // } else if(value === SENTENCE1 + SENTENCE2) {
  //   sentences[2].className = 'sentences'
  //   sentences[1].className = 'sentences hide'
  //   inputSentences2.className = 'sentences hide'
  //   curSentence = inputSentences3
  // }
  // 判断是否按del键
  if(e.data) {
    // 比对每个字母是否正确的逻辑
    if(CAPTION.includes(value) && caption_arr[value.length - 1] === e.data) {
      wrong.style.display = 'none';
      n++
      pre(n)
      inputLetter('letter letter-right', e.data, inputSentences1);
      lastCorrect = myPlayer.currentTime()

      // 成功结束逻辑
      if(value.length === CAPTION.length) {
        game_tip.classList.remove('display-end')
        game_tip.classList.remove('show-end')
        input.blur()
      }
    } else {
      randomLine()
      myPlayer.pause()
      inputLetter('letter letter-wrong', e.data, inputSentences1);
      myPlayer.currentTime(getRandomNum(0.5, videoLength))
      wrong.style.display = 'block';
    }
  } else if (n > value.length) {
    // 删除到正确的字母回退视频逻辑
    inputSentences1.removeChild(letter[letter.length-1])
    back(n)
    n--
  } else {
    inputSentences1.removeChild(letter[letter.length-1])
    myPlayer.currentTime(lastCorrect)
    if (CAPTION.includes(value)) {
      wrong.style.display = 'none';
    }
  }
}
