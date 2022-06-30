## Doge大作战

[开始游戏](https://theajack.github.io/bombbattle)

![图片](https://github.com/Bistu-OSSDT-2022/20-bistutu-Accelerator2333/blob/master/assets/images/43c2be20025e125c4f4f626339ea0f1.png)

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
![图片](https://github.com/Bistu-OSSDT-2022/20-bistutu-Accelerator2333/blob/master/assets/images/ad688b1b76832eed3e42bd3259d8cf0.png)

## 你已经学会怎么战斗了，接下来面对几十个敌人吧！
![图片](https://github.com/Bistu-OSSDT-2022/20-bistutu-Accelerator2333/blob/master/assets/images/ad5ad5ad5a5d.png)

## 原理：
* 人物名称：
```shell
<<<<<<< HEAD
var names=["姬霓太美","你干嘛~哎呦~","鸡汤来咯","穿山甲","王大队长","屑司令"];
=======
var names=["姬霓太美","你干嘛~哎呦~","鸡汤来咯","穿山甲"];
>>>>>>> 763d30ec68ef8cc73692118ea5bc29f96189da4d
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
* 头像加载：
```shell
J.ready(function(){
  J.tag("head").append(J.new("style").html("#tjCopyRight{position:fixed;right:0;bottom:0;text-align:center;background-color:rgba(150,150,150,.3);padding:0 8px;font-size:10px;color:#fff;border-radius:10px 0 0 0;line-height:20px}#tjLogo{position:fixed;right:0;top:0;width:60px;height:60px;background-color:rgba(150,150,150,.3);border-radius:0 0 0 30%;cursor:pointer}"));
  J.body().append([
    J.new("img").attr({
      id:"tjLogo",
      src:"data:image/png;base64,
      onclick:"window.open('https://Accelerator2333.github.io')"
    }),
    J.new("div").attr("id","tjCopyRight").html("TheaJack&nbsp;&nbsp;CopyRight&nbsp;&nbsp;2017")
  ]);
})
```
