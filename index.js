/*
 * @Date: 2020-02-11 14:36:39
 * @LastEditors  : lifangdi
 * @LastEditTime : 2020-02-12 20:48:13
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
}

// 控制输入每个字符的播放时间
// 这里是粗略比对，第一句话每帧大概0.07s，后面每帧大概0.08s
const pre = (n) => {
  n < 10
  ? myPlayer.currentTime(0.414 + n * 0.07)
  : myPlayer.currentTime(0.414 + n * 0.08)
}

const back = (n) => {
  var curTime = myPlayer.currentTime()
  n < 10
  ? myPlayer.currentTime(curTime - 0.07)
  : myPlayer.currentTime(curTime - 0.08)

}

// 文本框输入事件
// 每次键盘输入事件，获取文本框的值，并进判断逻辑
var n = 0   // 标志变量n
input.oninput = (e) => {
  var value = input.value
  var caption_arr = caption.split('')

  // 判断是否按del键
  if(e.data) {
    // 比对每个字母是否正确的逻辑
    if(caption_arr[value.length - 1] === e.data) {
      n++
      pre(n)
    } else {
      myPlayer.pause()
    }
  } else if (n > value.length) {
      // 删除到正确的字母回退视频逻辑
      back(n)
      n--
    }
}
