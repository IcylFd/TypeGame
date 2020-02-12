// import caption from './caption'
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

input.oninput = () => {
  var value = input.value
  // var n = value.length
  var n = 0
  if(value) {
    n++
  }
  // 控制输入每个字符的播放时间
  n < 10
  ? myPlayer.currentTime(0.414 + n * 0.07)
  : myPlayer.currentTime(0.414 + n * 0.08)
}
