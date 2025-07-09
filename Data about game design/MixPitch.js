
//從最小為1開始取x個最大為max的整數，由小到大排序且不重複。
function makeSomeInts ( x  , max ){
  
  if( x > max ){
    return Error("Too more used integers in "+max+" numbers.");
  }
  
  let a= new Array();
  for( i=0 ; i<x ; i++){
    let y = Math.floor(Math.random()*max) + 1;
    while (a.includes(y)){
      y = Math.floor(Math.random()*max) + 1;
    };
    a.push(y);
  }
  //數字排序,直接sort會導致10跑到前面
  return a.sort(function(a, b){return a - b});
};

//做出目標數字。
function makeTargetNumber( max ){
  return Math.floor(Math.random()*max) + 1;
};

//洗牌
function shuffle( array ) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

//遊戲進行
let answer = "";
function game( target, array , tempSeq) {
  let seq = "";
  let signs = ['+','-','*','/'];
  let newArray = "";
  let temp = 0;
  
  for ( let i = 0 ; i < array.length ; i++ ){
    for ( let j = 0 ; j < signs.length ; j++ ){
      if ( answer != "" ){
        return;
      }
      
      let seq = "";
      if ( tempSeq === 0 ) {
        seq = (array[i]).toString() ;
      }
      else {
        seq = tempSeq;
        seq = seq + signs[j].toString() + (array[i]).toString() ;
      };
      
      temp = eval(seq);
      //console.log(seq, temp);
      if ( target == temp ) {
        //console.log(seq , temp);
        answer = seq;
        return;
      }
      else if ( array.length >= 2 ) {
        newArray = Array.from(array);
        newArray.splice(i,1);
        game( target , newArray , seq);
      }
    }
  }
};

//測試，從最小為1開始取x個最大為max的整數，如果能湊出最大為maxTarget的答案就成功一次，共測試t次
function test ( t, x, max, maxTarget ) {
  let count = 0;
  for ( let i = 0 ; i < t ; i++ ){
    answer = "";
    let array = makeSomeInts( x, max );
    let target = makeTargetNumber( maxTarget );
    game( target , array , 0 );
    if ( answer != "" ){
      count = count + 1 ;
    }
    else{
      console.log(array, target);
    }
  }
  return count;
}

let times = 1000;
console.log(test( times, 5, 20, 50)+'/'+times.toString());


