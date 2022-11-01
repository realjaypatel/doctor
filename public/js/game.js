console.log('ok working')


var sample = document.getElementById("slider"); // using VAR



let counter = 1
setInterval(()=>{
  if(counter == 4){
    counter = 0
  }

  sample.style.transform = ` translate3d(-${counter}00%, 0px, 0px) `
counter++
},3900)