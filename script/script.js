let callFunction = getQuizzes();
let arrayWithObjects = [];

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
     
     console.log(object);
     
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
       
        for(let j = 0; j< object.questions[i].answers.length;j++){

            let response = object.questions[i].answers[j];
            choices.innerHTML += `
            <figure class="option"> 
                <img src="${response.image}">
                <figcaption>${response.text}</figcaption>
            </figure>
         `          
        } 

            

    }
    
        let disabled = document.querySelector(".screen1");
        disabled.classList.add("disabled");
        let enabled = document.querySelector(".screen2");
        enabled.classList.remove("disabled");
    





    
    

}





function comparador() { 
	return Math.random() - 0.5; 
}
