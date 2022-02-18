let callFunction = getQuizzes();
let arrayWithObjects = [];
let qtdQuestions = null;
let choiced = 0;
let hits = 0;
let objectTemp=null;


function getQuizzes(){
    const getQuizServer = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    getQuizServer.then(loadQuizzes); 
}

function loadQuizzes(data){
   
    const allquizes = document.querySelector(".allQuizzes");
    
    for(let i = 0; i<data.data.length; i++){
        object = data.data[i];
        arrayWithObjects[i] = object;
        
        allquizes.innerHTML += `
        <article class="quizz" onclick="quizz(${i})">
            <img src="${object.image}">
            <span>${object.title}</span>
        </article>
        `
    }
}

function quizz(number){
     let object = arrayWithObjects[number];
     qtdQuestions = object.questions.length;
     
     
     
    let header = document.querySelector(".bottomBoxHeader");
    header.innerHTML = `
    <h1>${object.title}</h1>
    <img src="${object.image}">  
    `
    let quizzesOptions = document.querySelector(".options");
    quizzesOptions.innerHTML = ``;
    
    for(let i = 0; i<object.questions.length; i++){
        quizzesOptions.innerHTML += `
            <article class="option-quizz-selected opt${i}">`
            let choices = document.querySelector('.option-quizz-selected.opt'+i);
            choices.innerHTML += `<h1>${object.questions[i].title}</h1>`
            let response = object.questions[i].answers.sort(comparador);
        for(let j = 0; j< response.length;j++){

            
            choices.innerHTML += `
            <figure class="option opt${i}${j}" onclick="selected(${number}, ${i}, ${j})">
                <img src="${response[j].image}">
                <figcaption>${response[j].text}</figcaption>
            </figure>
         `          
        } 
    }
    
        let disabled = document.querySelector(".screen1");
        disabled.classList.add("disabled");
        let enabled = document.querySelector(".screen2");
        enabled.classList.remove("disabled");  

}

function selected (obj, p1, p2){
    let verifyChoices = arrayWithObjects[obj];
    objectTemp = verifyChoices;

    console.log(objectTemp);
    
    
    for(let j = 0; j< verifyChoices.questions[p1].answers.length; j++){
       
        if(j==p2){
           
            if(verifyChoices.questions[p1].answers[j].isCorrectAnswer == true){
                const change = document.querySelector(`.option.opt${p1}${j}`);
                change.classList.add("correct");
                hits++;
                
            }else{
                const change = document.querySelector(`.option.opt${p1}${j}`);
                change.classList.add("wrong");

            }
            
        }else{
            if(verifyChoices.questions[p1].answers[j].isCorrectAnswer == true){
                const change = document.querySelector(`.option.opt${p1}${j}`);
                change.classList.add("opacity");
                change.classList.add("correct");
                
                
            }else{
                const change = document.querySelector(`.option.opt${p1}${j}`);
                
                change.classList.add("opacity");
                change.classList.add("wrong");
                
            }
        }
    }

   
    choiced++
    if(choiced == qtdQuestions){
        setTimeout(finish,1000);   
    } 
}
function finish (){
    console.log("Entrou");
    let score = (100/qtdQuestions)*hits;
    let around = Math.ceil(score);
    console.log(objectTemp.levels.length);
    
    for(let i = 0; i<objectTemp.levels.length; i++){

        
    }





}

function reload(){

    let foundIn= 0;
    for(let i = 0; i<arrayWithObjects;i++){
        let obj = arrayWithObjects[i];
        if(obj.id == objectTemp.id){
            foundIn = i;
        }
    }

    quizz(foundIn);
}

function backToHome(){
    let disabled = document.querySelector(".screen2");
    disabled.classList.add("disabled");
    let enabled = document.querySelector(".screen1");
    enabled.classList.remove("disabled");  

}


function comparador() { 
	return Math.random() - 0.5; 
}
