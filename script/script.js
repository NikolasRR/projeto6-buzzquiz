
function getQuizzes(){
    const quizzesServer = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizzesServer.then(loadQuizzes);    
    
}
function loadQuizzes(data){
    console.log(data.data);
}



