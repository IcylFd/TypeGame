/*
 * @Date: 2020-02-11 14:36:39
 * @LastEditors  : lifangdi
 * @LastEditTime : 2020-02-12 15:56:57
 */
// import caption from './caption'
const caption = 'Like this? This is not my son, it\'s a fake! How did I come up with this... Father...'
// js原生方法获取「开始按钮」
var start = document.getElementById('start-btn')

// js原生方法获取「文本框」
var input = document.getElementById('input')

// 通过id实例化videojs对象
var myPlayer = videojs('my-video')

// 绑定「开始按钮」点击事件
start.onclick = () => {
  myPlayer.play()
  myPlayer.currentTime(0.414)
  myPlayer.pause()
  console.log(myPlayer.currentTime())
}

// 文本框输入事件
// 每次键盘输入事件，获取文本框的值，并进判断逻辑
var n = 0
input.oninput = () => {
  var value = input.value
  // var n = value.length


  ///////// 差这里判断逻辑
  if(caption.includes(value)) {
    n++
    console.log('true', n);
    // 控制输入每个字符的播放时间
    n < 10
    ? myPlayer.currentTime(0.414 + n * 0.07)
    : myPlayer.currentTime(0.414 + n * 0.08)
  } else {
    n--
    console.log('false', n);
    myPlayer.pause()
  }
  
}
