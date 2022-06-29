# [bombbattle](https://github.com/theajack/bombbattle)
## 炸弹大作战纯前端小游戏

[开始游戏](https://theajack.github.io/bombbattle)

# 游戏模式：
 玩法类似抱抱堂，玩家单击鼠标左键可以放置炸弹，炸弹炸到敌人可以造成伤害，场景上有不同道具，利于血量与伤害，收集道具，碾碎敌人，挑战更高分数，在众多敌人间生存下去。 
# 操作方式：
 鼠标方向-前进
 鼠标左键-释放炸弹
# 原理：
* 人物名称：
```shell
var names=["珍爱生命远离网络","缺氧的鱼","姐的大姨妈都比你红","别逼我耍流氓╮","蹲在坟前听鬼讲故事"];
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
