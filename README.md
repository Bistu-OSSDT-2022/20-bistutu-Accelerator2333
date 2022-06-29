# [bombbattle](https://github.com/theajack/bombbattle)
## 炸弹大作战纯前端小游戏

[开始游戏](https://theajack.github.io/bombbattle)

## 导师：
  陈绵康
## 小组成员：
  张智皓
  华翰硕
  赵鑫
  冉昕哲
  王茹斌
            

## 游戏模式：
 玩法类似泡泡堂，玩家单击鼠标左键可以放置炸弹，炸弹炸到敌人可以造成伤害，场景上有不同道具，利于血量与伤害，收集道具，碾碎敌人，挑战更高分数，在众多敌人间生存下去。 
## 操作方式：
 鼠标方向-前进
 鼠标左键-释放炸弹
## 原理：
* 人物名称：
```shell
var names=["珍爱生命远离网络","114514","团长","你是一个一个"];
```
* 增加人物：
```shell
function handleData(data){
  var d=JSON.parse(data);
  if(d.state=="act"){
    //RIVAL.selectByIdAndPos(d.x,d.y,d.id).modAttr(d);
    RIVAL.selectById(d.id).modAttr(d);
   }else if(d.state=="add"){//加载新来的单个玩家
     addRival(d);
   }else if(d.state=="new"){
     player.init(d);
   }else if(d.state=="del"){
     RIVAL.removeById(d.id);
   }else{//加载已有的玩家
    d.each(function(one,i){
      addRival(one);
    });
   }
}
```
* 比赛初始化：
```shell
var isPause=false;
var isOver=false;
var playerImg,aiImg,bombImg,fireImgw,fireImgh,wallImg,skillImg;//img
var time=0;
var score=0;
```
## 语言：
本游戏基于JAVA,CSS,HTML编写，主要依靠JAVA实现游戏功能，CSS与HTML用于游戏在网页上运行。
