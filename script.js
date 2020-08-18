var bird=document.querySelector('.bird');
var wallone=document.querySelector('.wallone');
var walltwo=document.querySelector('.walltwo');
var arrowUp=document.querySelector(".fa-arrow-up")
var arrowDown=document.querySelector(".fa-arrow-down");
let score=0;
let scoreDOM=document.querySelector(".score");

let jump=new Audio('./assets/mario.wav');
let wind=new Audio("./assets/wind.wav")


let props=['nice!','awesome!','whoah!','wow!']
let propsDOM=document.querySelector('.props')


// arrowUp.onclick=()=>{
//     bird.classList.add("fly_up")
//     setTimeout(()=>{
//         bird.classList.remove("fly_up")
//     },1000)
// }

// arrowDown.onclick=()=>{
//     bird.classList.add("fly_down")
//     setTimeout(()=>{
//         bird.classList.remove("fly_down")
//     },1000)
// }

let isFlying=false;
let isBlowing=false;

function flyBird(){
    if(isFlying)return;
    isFlying=true;
    if(wallone.classList.contains("slide")){
        bird.classList.add("fly_down")
        setTimeout(()=>{
            bird.classList.remove("fly_down")
        },1000)
    }
    else{
        bird.classList.add("fly_up")
        setTimeout(()=>{
            bird.classList.remove("fly_up")
        },1000)
    }
    propsDOM.innerHTML=props[Math.random() * props.length | 0];
    setTimeout(()=>{
        propsDOM.innerHTML=""
        isFlying=false;

    },1000)

    jump.play()
    blowWind()

}

function blowWind(){
    if(isBlowing)return;
    isBlowing=true;
    wind.play();
    
    setTimeout(()=>{
        isBlowing=false;
        blowWind()
    },6000)
}


function throwWall(){
    if(Math.random() > .5){
        if(wallone.classList.contains("slide")){
            console.log("contingency condition!")
            walltwo.classList.add('slidetwo')
            setTimeout(()=>{
                walltwo.classList.remove('slidetwo')
            },4000)
        }
        else{
        console.log("wallOne")
        wallone.classList.add("slide")
        setTimeout(()=>{
            wallone.classList.remove('slide')
        },4000)
    }
    }
    else{
        if(walltwo.classList.contains("slidetwo")){
            console.log("contingencytwo condition!")

            wallone.classList.add('slide')
            setTimeout(()=>{
                wallone.classList.remove('slide')
            },4000)
        }
else{
        walltwo.classList.add("slidetwo")
        console.log("wallTwo")
        setTimeout(()=>{
            walltwo.classList.remove('slidetwo')
        },4000)
    }
}
setTimeout(throwWall,4000)
}




    throwWall()





setInterval(()=>{
    let wallOneLeft=parseInt(window.getComputedStyle(wallone).getPropertyValue('left'));
    let wallTwoLeft=parseInt(window.getComputedStyle(walltwo).getPropertyValue('left'));
    let birdTop=parseInt(window.getComputedStyle(bird).getPropertyValue("top"))
     console.log("walloneLeft:" + wallOneLeft);
     console.log("birdTop: " + birdTop)

    if(wallOneLeft > 80 && wallOneLeft < 120 && birdTop < 200){
        console.log("walloneLeft:" + wallOneLeft);
        console.log("birdTop: " + birdTop)
        alert("Ooops, you splatted into a floating block! Your score was " + score);
        window.location.reload()
    }

     if(wallTwoLeft > 80 && wallTwoLeft < 120 && birdTop > 135){
        console.log("walltwoLeft:" + wallTwoLeft);
        console.log("birdTop: " + birdTop)
        alert("Ooops, you splatted into a floating block! Your score was " + score);
        window.location.reload()    }


    score++;
    scoreDOM.innerHTML=score;
},100)

let clouds=document.querySelectorAll(".cloud");

function runClouds(){
clouds.forEach(cloud=>{
    let cloudLeft=parseInt(window.getComputedStyle(cloud).getPropertyValue("left"));
    cloudLeft-=3

    if(cloudLeft < -40){
        cloudLeft=350;
    }
    cloud.style.left=`${cloudLeft}px`

})
setTimeout(runClouds,10)
}

runClouds()