
function getQuizzes(){
    const getQuizServer = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    getQuizServer.then(loadQuizzes); 
    
    
}
function loadQuizzes(data){
    const allquizes = document.querySelector(".allQuizzes");
    
    for(let i = 0; i<data.length; i++){
        object = data[i];
        allquizes.innerHTML = `
        <article class="quizz">
            <img src="${object.image}">
            <span>${object.title}</span>
        </article>
        
        `

        
    }



}



