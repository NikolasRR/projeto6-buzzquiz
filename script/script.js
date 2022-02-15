
function getQuizzes(){
    const quizzesServer = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizzesServer.then(response);    
    ;
}
function response (data){
    console.log(data.data);
}