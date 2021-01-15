const airPlane = document.getElementById('airPlane');
const welcome = document.forms.welcome;
const buttonEnterGame = welcome.lastElementChild;
const all = document.getElementById('all');
const combinations = document.getElementById('combinations');
const drum = document.getElementById('drum');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const luck = document.getElementById('luck');
const moneyBoard = document.getElementById('moneyBoard');
const lastVisit = document.getElementById('lastVisit');
const hello = document.getElementById('hello');
const money = document.getElementById('money');
const getMoney = document.getElementById('getMoney');
const newMoney = document.getElementById('newMoney');
const newMoneyInput = document.getElementById('newMoneyInput');
const rate = document.getElementById('rate');
const replenish = document.getElementById('replenish');
const newRate = document.getElementById('newRate');
const newRateInput = document.getElementById('newRateInput');
const getWin = document.getElementById('getWin');

let enterNameUser = welcome.elements.enterNameUser;
let imgIndexRandom1;
let imgIndexRandom2;
let imgIndexRandom3;
let count = 0;

all.style.display = 'none';
welcome.style.display = 'none';


//проверяем была ли создана кука посещения сайта
if(getCookie('lastVisit')){
    console.log(true)
    lastVisit.firstElementChild.innerHTML = getCookie('lastVisit');     
}else{
    console.log(false)    
    //последнее посещение сайта
    let date = new Date();
    let dataShowDate = date.getDate();
    let dataShowMont = date.getMonth()+1;
    let dataShowYear = date.getFullYear();
    let dataShowTime = date.getHours()+':'+date.getMinutes();
    let dataShow = dataShowDate + '.'+dataShowMont+'.'+dataShowYear+ ' в '+dataShowTime;  
    setCookie('lastVisit', dataShow, 30);  
}
// cookie
// создаем cookie
function setCookie(name, val, exp){
    let cook = name+'='+encodeURIComponent(val)+'; SameSite = None; Secure;';
    if(exp){
        let date = new Date();
        date.setDate(date.getDate()+exp);
        cook+= 'expires='+date.toUTCString();
    }
    document.cookie = cook;
}
// получаем значение cokkie
function getCookie(name){
    let cook = document.cookie; 
    let ptn = new RegExp('\\b'+name+'=','g');    
    if(ptn.test(cook)){
        let val='';
        let pos1 = cook.indexOf('=', cook.search(ptn))+1;
        let pos2 = cook.indexOf(';', pos1);
        if(pos2==-1){
            val = cook.slice(pos1);
        }else{
            val = cook.slice(pos1, pos2);
        }
        return decodeURIComponent(val);
    }return '';
}

// Проверяем есть ли cookie и запрашиваем имя, сохраняем в cookie
if(getCookie('userName')){
    console.log(true)
    all.style.display = 'block';
    hello.firstElementChild.innerHTML = getCookie('userName');   
}else{
    console.log(false)
    welcome.style.display = 'block';
    welcome.addEventListener('submit',(event)=>{
        event.preventDefault();
        if(enterNameUser.value){
            setCookie('userName', enterNameUser.value, 30);
        }
        location.reload();      
    })    
}


//button move
getMoney.addEventListener('mousedown',()=>{    
    getMoney.style.marginRight = '0px';
});
getMoney.addEventListener('mouseup',()=>{    
    getMoney.style.marginRight = '1px';
});
replenish.addEventListener('mousedown',()=>{   
    replenish.style.marginRight = '0px';
});
replenish.addEventListener('mouseup',()=>{    
    replenish.style.marginRight = '1px';
});

//error with airplane
function say(some){
    // alert(some);
    airPlane.innerHTML = some;
    airPlane.style.left='100vw';
}
function trueColorButton(){
    getMoney.style.backgroundColor = 'rgba(253, 210, 185, 0.5)';
}

let images = ['images/strawberry.png', 'images/cherry.png', 'images/grape.png', 'images/watermelon.png', 'images/pumpkin.png', 'images/apple_green.png', 'images/apple_red.png'];


// кнопка Пополнить счет
getMoney.addEventListener('click',()=>{
    let myMoneyNow = money.firstElementChild.innerHTML;  
    // getMoney.style.backgroundColor = 'rgba(253, 210, 185, 0.5)';
    newMoney.style.display = 'block';   
    newMoney.lastElementChild.addEventListener('click', ()=>{          
        money.firstElementChild.innerHTML = parseInt(myMoneyNow) + parseInt(newMoneyInput.value);
        newMoney.style.display = 'none';
        // console.log(myMoney);
        // console.log(addMoney);
    });
});

//кнопка Сделать ставку
replenish.addEventListener('click',()=>{   
    let myMoneyNow = money.firstElementChild.innerHTML;  
    let myRateNow = rate.firstElementChild.innerHTML; 
    // console.log(myMoneyNow);
    newRate.style.display = 'block';
    newRate.lastElementChild.addEventListener('click', ()=>{          
        if(newRateInput.value > money.firstElementChild.innerHTML){
            getMoney.style.backgroundColor = 'rgba(253, 210, 185)';
            setTimeout(trueColorButton, 2000);
            rate.firstElementChild.innerHTML = 0;
            newRate.style.display = 'none';
            return;
        }// ошибка в начислении ставок после длительной игры
        rate.firstElementChild.innerHTML = newRateInput.value;        
        newRate.style.display = 'none';        
        let newMyMoneyAfterAdd = parseInt(myMoneyNow) - parseInt(rate.firstElementChild.innerHTML);
        if(newMyMoneyAfterAdd >= 0){
            money.firstElementChild.innerHTML = newMyMoneyAfterAdd;
        }
        if(newMyMoneyAfterAdd < 0){            
            say('Ставка выше суммы на счету!');
            rate.firstElementChild.innerHTML = 0;
            return;
        }             
        rate.firstElementChild.innerHTML = parseInt(myRateNow) + parseInt(newRateInput.value)
        // console.log(newMyMoneyAfterAdd);
    })   
    getWin.firstElementChild.innerHTML = 0;
});

//кнопка попытать удачу
luck.addEventListener('click',()=>{   
    if(rate.firstElementChild.innerHTML == 0){
        say('Сделайте сначала ставку!');        
        return;
    }     
    imgIndexRandom1 = Math.round(Math.random()*6);
    imgIndexRandom2 = Math.round(Math.random()*6);
    imgIndexRandom3 = Math.round(Math.random()*6); 

    img1.src = images[imgIndexRandom1];
    img2.src = images[imgIndexRandom2];
    img3.src = images[imgIndexRandom3];

    imagesRandom = [imgIndexRandom1, imgIndexRandom2, imgIndexRandom3];
    let count = 0;
    for (let i = 0; i < imagesRandom.length; i++) {
        if(imagesRandom[i] == 5 || imagesRandom[i] == 6) count++;
        // console.log(count);       
    }
    if(imgIndexRandom1===0 && imgIndexRandom1 == imgIndexRandom2 && imgIndexRandom2 == imgIndexRandom3){
        getWin.firstElementChild.innerHTML = 800*rate.firstElementChild.innerHTML;
    }
    else if(imgIndexRandom1===1 && imgIndexRandom1 == imgIndexRandom2 && imgIndexRandom2 == imgIndexRandom3){
        getWin.firstElementChild.innerHTML = 200*rate.firstElementChild.innerHTML;
    }
    else if(imgIndexRandom1===2 && imgIndexRandom1 == imgIndexRandom2 && imgIndexRandom2 == imgIndexRandom3){
        getWin.firstElementChild.innerHTML = 80*rate.firstElementChild.innerHTML;
    }
    else if(imgIndexRandom1===3 && imgIndexRandom1 == imgIndexRandom2 && imgIndexRandom2 == imgIndexRandom3){
        getWin.firstElementChild.innerHTML = 40*rate.firstElementChild.innerHTML;
    }
    else if(imgIndexRandom1===4 && imgIndexRandom1 == imgIndexRandom2 && imgIndexRandom2 == imgIndexRandom3){
        getWin.firstElementChild.innerHTML = 20*rate.firstElementChild.innerHTML;
    }   
    else if(count == 3){
        getWin.firstElementChild.innerHTML = 10*rate.firstElementChild.innerHTML;
    }
    else if(count == 2){
        getWin.firstElementChild.innerHTML = 5*rate.firstElementChild.innerHTML;
    }
    else if(count == 1){
        getWin.firstElementChild.innerHTML = 2*rate.firstElementChild.innerHTML;
    }
    else{
        setTimeout(say, 1000, 'Попробуйте снова!');          
    } 
    money.firstElementChild.innerHTML = parseInt(money.firstElementChild.innerHTML) + parseInt(getWin.firstElementChild.innerHTML); 
    rate.firstElementChild.innerHTML = '0';
    // console.log();
})










