'use strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
    colorChange();
  }

  
  const letter = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'n', 'm'];

  //キーボード生成
  function createKeyboad(number,numbers, info){
    const tr = document.createElement('tr');
    tr.id = info;
    const table = document.querySelector('table');
    table.appendChild(tr);

    for(let i = 0; i + number < number + numbers; i++){
      const td = document.createElement('td');
      td.id = letter[i + number];
     
      td.textContent = letter[i + number];
      
      tr.appendChild(td);
    }
  }
  createKeyboad(0, 10);
  createKeyboad(10, 9);
  createKeyboad(19, 7);

  
  const words = [
    "red",
    "pink",
    "blue",
    "yellow"
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  let number = 0;
  let mnumber = 0;
  
  const target = document.getElementById('target');
  const keys = document.getElementById('keys');
  const misstype = document.getElementById('misstype');
  const result = document.getElementById('result');
  const type = document.getElementById('type');
  const table = document.querySelector('table');
  const replay = document.querySelector('a');


  
  //クリックしたら、
  //・タイマー開始
  //・キーボードと問題を表示
  document.addEventListener('click', () => {
    if(isPlaying === true){
      return;
    }
    isPlaying = true;
    keys.classList.remove('hide');
    table.classList.remove('hide');

    startTime = Date.now();
    setWord();
  });
  
  //次に押すキーボードの色を変える
  function colorChange(){
    for(let i = 0; i < letter.length; i++){
      if(word[loc] === letter[i]){
        const color = document.getElementById(letter[i]);
        color.classList.add('color');
      
      }
    }
  }
  //押された色のキーボードの色を元に戻す
  function colorRemove(){
    for(let i = 0; i < letter.length; i++){
      if(word[loc - 1] === letter[i]){
        const color = document.getElementById(letter[i]);
        color.classList.remove('color');
      
      }
    }
  }

  
  //キーが押された時の動作
  document.addEventListener('keydown',e =>{
    keys.textContent = `type: ${e.key}`;
  
    if(e.key !== word[loc]){
      mnumber++;
      return;
    }

    loc++;
    number++;

    // 1: _ed
    // 2: __d
    // 3: ___s
    target.textContent = '_'.repeat(loc) + word.substring(loc);
   colorChange();
   colorRemove();
   

   //問題を全て終えた時の操作
    if(loc === word.length) {
      if(words.length === 0){
       keys.remove();
       table.remove();
       target.remove();
       re.textContent = '結果'
        const resultTime = ((Date.now() -startTime) / 1000).toFixed(2);
        result.textContent = ` \n ${resultTime} 秒`;
        type.textContent = `タイプ数: ${number}`;
        misstype.textContent = `ミスタイプ: ${mnumber}`;
        replay.classList.remove('hide');

        return;
      }
      setWord();
    }
  });
}