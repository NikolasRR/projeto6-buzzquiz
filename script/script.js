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
     objectTemp = object;
     console.log("Obj");
     console.log(object);
     console.log("obj temp");
     console.log(objectTemp);
   
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
        choices.scrollIntoView({block: "end"});
        
        
    }

        let disabled = document.querySelector(".screen1");
        disabled.classList.add("disabled");
        let enabled = document.querySelector(".screen2");
        enabled.classList.remove("disabled");  

}

function selected (obj, p1, p2){
    let verifyChoices = arrayWithObjects[obj];
   
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
        
        let next = document.querySelector(`.option.opt${p1+1}${j}`);

        setTimeout(() => {if(next!= null){next.scrollIntoView();}}, 2000);
        
            
        
     }
     choiced++;
     
     console.log("Choiced e hits");
     console.log(choiced);
     console.log(hits);

    if(choiced == qtdQuestions){
        setTimeout(finish,1000);   
    } 
        
}

   
    

function finish (){
    
    let score = (100/qtdQuestions)*hits;
    let round = Math.ceil(score);
    

    console.log(score);
    console.log("Entrou");
    for(let i = 0; i<objectTemp.levels.length; i++){
        console.log("score e object level"+1);
        console.log(score);
        console.log(objectTemp.levels[i].minValue);
        if(score<=objectTemp.levels[i].minValue){
            console.log("Entrou no if");

           
            let result = document.querySelector(".boxResult");
            result.innerHTML = `
            <h1 class="title-result">${round}% de acerto: ${objectTemp.levels[i].title}}!</h1>
            <img src="${objectTemp.levels[i].image}">
            <h1 class="coments-result">${objectTemp.levels[i].text}</h1>
            `
            result.scrollIntoView();
            let showBoxResult = document.querySelector(".boxResult");
            showBoxResult.classList.remove("disabled");
            let showBoxButtons = document.querySelector(".returnOrReload");
            showBoxButtons.classList.remove("disabled");
            break;
        }

    }

    

    






}

function reload(){

    let foundIn= 0;
    for(let i = 0; i<arrayWithObjects.length;i++){
        let obj = arrayWithObjects[i];
        if(obj.id == objectTemp.id){
            foundIn = i;
        }
    }
    
    
    qtdQuestions = null;
    choiced = 0;
    hits = 0;
    objectTemp=null;
    quizz(foundIn);
    

    let ocultboxResult = document.querySelector(".boxResult");
    let ocultBoxButtons = document.querySelector(".returnOrReload");
    ocultboxResult.classList.add("disabled");
    ocultBoxButtons.classList.add("disabled");


}

function backToHome(){
    window.location.reload();
}


function comparador() { 
	return Math.random() - 0.5; 
}