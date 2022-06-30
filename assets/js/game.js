var names = ["姬霓太美", "你干嘛~~哎呦~~", "鸡汤来咯", "穿山甲", "催逝员", "王大队长", "屑司令", "穿山甲"];
var nameNum = names.length;
var canvas, ctx, mapCanvas, mctx;
var map, player;//objs
var isPause = false;
var isOver = false;
var playerImg, aiImg, bombImg, fireImgw, fireImgh, wallImg, skillImg;//img
var time = 0;
var score = 0;
var socket;
var enemyNum = RIVAL.aiNum;
J.ready(function () {
  if (isMobile()) {
    RIVAL.aiNum = 15;
    enemyNum = RIVAL.aiNum;
    mapLen = 1000;
    //lmapLen=120;
    WALL.initNum = 30;
    WALL.maxNum = 60;
    //J.class("show-set-btn").event("click",showSet);
    resetLittleMap();
  } else {
    J.class("change").removeClass("phone");
  }
  init();
  exeGame();
});
function init() {
  initSource();
  initObjs();
  scrollFix();
  if (!RIVAL.isAi) {
    socket = new Socket();
  } else {
    player.init({
      "id": "1",
      "x": getRp(),
      "y": getRp()
    });
  }
  initEvent();
  J.id("enemy").text(enemyNum);
}
function scrollFix() {
  J.body().event({
    ontouchmove: function (event) {
      event.preventDefault();
    },
    ontouchstart: function (event) {
      event.preventDefault();
    }
  });
}
function handleData(data) {
  var d = JSON.parse(data);
  if (d.state == "act") {
    //RIVAL.selectByIdAndPos(d.x,d.y,d.id).modAttr(d);
    RIVAL.selectById(d.id).modAttr(d);
  } else if (d.state == "add") {//加载新来的单个玩家
    addRival(d);
  } else if (d.state == "new") {
    player.init(d);
  } else if (d.state == "del") {
    RIVAL.removeById(d.id);
  } else {//加载已有的玩家
    d.each(function (one, i) {
      addRival(one);
    });
  }
}
function addRival(data) {
  RIVAL.add(data);
  //rivals[rivals.length]=new Rival(data);
}

function initSource() {
  initImg();
  canvas = document.getElementById("gameCanvas");
  canvas.width = winWidth;
  canvas.height = winHeight;
  mapCanvas = document.getElementById("mapCanvas");
  mapCanvas.width = lmapLen;
  mapCanvas.height = lmapLen;
  ctx = canvas.getContext("2d");
  ctx.textBaseline = 'middle';//设置文本的垂直对齐方式
  ctx.textAlign = 'center';
  mctx = mapCanvas.getContext("2d");
  //ctx.fillStyle="#FF0000";
}
function initImg() {
  playerImg = new Image();
  playerImg.src = 'assets/images/myself.jpg';
  aiImg = new Image();
  aiImg.src = 'assets/images/enemy.png';
  bombImg = new Image();
  bombImg.src = 'assets/images/bomb.png';
  fireImgw = new Image();
  fireImgw.src = 'assets/images/firew.png';
  fireImgh = new Image();
  fireImgh.src = 'assets/images/fireh.png';
  wallImg = new Image();
  wallImg.src = 'assets/images/wall2.png';
  var imgName = ['addhp', 'adddamage', 'addpower', 'addspeed', 'addbombnum']
  skillImg = new Array();
  for (var i = 0; i < imgName.length; i++) {
    skillImg[i] = new Image();
    skillImg[i].src = 'assets/images/' + imgName[i] + ".png";
  }
}
function initObjs() {
  player = new Bomber();
  map = new Map();
  WALL.init();
  RIVAL.init();
  BOMB.init();
  SKILL.init();
  if (RIVAL.isAi) {
    geneRivals();
  }
  //player.isInvici=true;
  //player.range=30;
}
function gameLoose() {
  isOver = true;
  gameOver();
}
function gameSuccess() {
  isOver = true;
  J.showWait("胜利", "success");
}
function killRival() {
  enemyNum--;
  J.id("enemy").text(enemyNum);
  if (enemyNum == 0) {
    gameSuccess();
  }
}
function geneRivals() {
  for (var i = 0; i < RIVAL.aiNum; i++) {
    addRival({
      "id": i,
      "x": getRp(),
      "y": getRp()
    });
  }
}
var startX = cx;
var startY = cy;

//http://www.cnblogs.com/iamlilinfeng/p/4239957.html
function initEvent() {
  if (isMobile()) {
    new Hammer(J.id("controlCover")).on("pan", setPhoneTarget);
    new Hammer(canvas).on("tap", placeBomb);
    new Hammer(J.id("pauseBtn")).on("tap", pause);
    new Hammer(J.id("restartBtn")).on("tap", restart);
  } else {
    canvas.onmousemove = setTarget;
    J.id("wrapper").event("onmousemove", setTarget);
    canvas.onclick = placeBomb;
    J.id("wrapper").event("onclick", placeBomb);
    J.id("pauseBtn").event("onclick", pause);
    J.id("restartBtn").event("onclick", restart);
  }
  //canvas.onmouseup=speeddown;
  //$("#wrapper").mouseup(speeddown);
  J.class("set-item-btn").event("onclick", geneNewGame);
  window.onresize = resize;
}

var isFirst = true;
function setPhoneTarget(e) {
  if (e.isFinal) {
    isFirst = true;
    J.id("controlWrapper").css({
      "left": (10) + "px",
      "top": (winHeight - 10 - cwLen) + "px"
    });
    J.id("controlBtn").css({
      "left": cbRange + "px",
      "top": cbRange + "px"
    });
  } else {
    if (isFirst) {
      J.id("controlWrapper").css({
        "left": (e.pointers[0].clientX - cwRange) + "px",
        "top": (e.pointers[0].clientY - cwRange) + "px"
      })
      isFirst = false;
    }
  }
  if (e.distance < range / 2) {
    J.id("controlBtn").css({
      "left": (cbRange) + "px",
      "top": (cbRange) + "px"
    })
  } else {
    var d = countDegByDxy(e.deltaX, e.deltaY);
    var x = cwRange * Math.cos(d) + cbRange;
    var y = cwRange * Math.sin(d) + cbRange;
    J.id("controlBtn").css({
      "left": (x) + "px",
      "top": (y) + "px"
    })
  }
  player.setTargetDxy(e.deltaX, e.deltaY);
}
function placeBomb() {
  player.placeBomb();
}
function geneNewGame() {
}
/*function speeddown(){
  player.speed=parseFloat(s("[data-name='playerSpeed']").val());
}
function speedup(){
  player.speed=parseFloat(s("[data-name='playerSpeed']").val())*2;
}*/
function setTarget(event) {
  player.setTarget(event.clientX, event.clientY);
}
function resize() {
  winHeight = document.body.offsetHeight;
  winWidth = document.body.offsetWidth;
  cx = winWidth / 2;
  cy = winHeight / 2;
  map.resetMap(player.x, player.y);
  canvas.width = winWidth;
  canvas.height = winHeight;
}
var i = 1;
function exeGame() {
  setInterval(function () {
    act();
  }, actt);
  draw();
  //if(!RIVAL.isAi){
  //  setInterval(function(){
  //    socket.sendPlayerPos();
  //  },sendt);
  //}
  setInterval(function () {
    if (!isPause && !isOver) {
      this.time += 0.1;
      J.id("time").text(time.toFixed(1));
    }
  }, 100);
}
function act() {
  if (!isPause && !isOver) {
    player.act();
    if (RIVAL.isAi) {
      RIVAL.each(function (rival) {
        rival.act();
      });
    }
    BOMB.each(function (bomb) {
      if (bomb == undefined) {
        var a = 1;
        a++;
      }
      bomb.act();
    });
  }
}
function draw() {
  if (!isPause && !isOver) {
    map.drawMap();
    WALL.each(function (wall) {
      wall.draw();
    });
    BOMB.each(function (bomb) {
      bomb.draw();
    });
    SKILL.each(function (skill) {
      skill.draw();
    });
    RIVAL.each(function (rival) {
      rival.draw();
    });
    player.draw();
  }
  requestAnimationFrame(draw);
}
function gameOver() {
  //isOver=true;

  /*for(i in ais){
    ais[i].drawAi();
  }*/
  J.showWait("您已阵亡", "error");
  //J.id("showInfo").slideDown();
}
function pause() {
  if (!isOver) {
    if (!isPause) {
      isPause = true;
      J.id("pauseBtn").removeClass("glyphicon-play").addClass("glyphicon-pause");
    } else {
      isPause = false;
      J.id("pauseBtn").removeClass("glyphicon-pause").addClass("glyphicon-play");
    }
  }
}
function restart() {
  location.reload();
  /*isOver=false;
  player.restart();
  J.id("showInfo").slideUp();
  time=0;*/
}
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 32) { // 空格
    pause();
  }
  if (e && e.keyCode == 13) { // enter 键
    restart();
  }
};

function showSet() {
  s(".set.phone").slideToggle();
}











