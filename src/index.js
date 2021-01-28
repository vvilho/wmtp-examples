//Teht 1


const gameCheatCode = (secretCode) => {
  const letterArray = new Array(secretCode.length);
  document.addEventListener('keyup', evt => {
    letterArray.shift();
    letterArray.push(evt.key);
    console.log(letterArray);
    if (letterArray.join('') === secretCode.toLowerCase()) {
      alert('This is your cheat code: ' + secretCode);
    }
  });
};

gameCheatCode('secret');
gameCheatCode('password');
gameCheatCode('passwd');


//teht 2

const doubleClickPosition = () => {
  document.addEventListener('dblclick', evt => {
    alert('Mouse coordinates X: ' + evt.clientX + ', Y: ' + evt.clientY);
  });
};
doubleClickPosition();


//teht 3

const touchMe = () => {
  const object = document.querySelector('#touchMe');
  object.addEventListener('touchstart', evt => {
    console.log('touched');
    object.classList.toggle('green');
  });
};

touchMe();


//teht 4

const timerForWebsite = () => {
  setTimeout(() => {
    alert("Hurry up!! it's been 15 seconds allready");
  }, 15000);
};

timerForWebsite();



// teht 5

const userNotDoingAnything = () => {

  let timer;
  const timerZero = evt => {
    clearTimeout(timer);
     timer = setTimeout(() => {
      alert('Do something!');
    }, 15000);
  };

  document.addEventListener('mousemove', timerZero);
  document.addEventListener('keypress', timerZero);
  document.addEventListener('touchstart', timerZero);
};

userNotDoingAnything();
