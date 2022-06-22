const quizAppData = (method, url) => {
    return fetch(url, {
        method: method
    }).then(response => {
        if (response.status >= 400) {
            return response.json().then(() => {
                console.log("failed")
            }
            )
        }

        return response.json()

    })
}

quizAppData('get', "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz").then((res) => {
    console.log(res);
    var questionResult = [];
    totalMarks = 0;
    var container = document.getElementById('container');
    
    let srNo = 1;
    for (let question of res) {
        let divElemetn = document.createElement('div');
        let questionText = document.createElement("h3");

     
        questionText.innerText = "Q"+srNo+". "+question.question;

        divElemetn.appendChild(questionText);
        
        for (let option of question.options) {
            let questionOption = document.createElement('input');
            questionOption.type = "radio";
            questionOption.name = question.id;

            questionOption.addEventListener('click', function () {
                let selectedOptionIndex = question.options.indexOf(option);
                question.isAnswerCorrect = selectedOptionIndex === question.answer;
            });
           
            
            let lab = document.createElement('label');
            lab.style.display = "block";
            lab.classList.add('lab')
            
            let labelQuestion = document.createElement('label');
            labelQuestion.innerText = option;

            lab.appendChild(questionOption);
            lab.appendChild(labelQuestion);
            divElemetn.appendChild(lab);
        }


        const horizontalLine =  document.createElement('hr');
        horizontalLine.style.color="#fad744"
        divElemetn.appendChild(horizontalLine);

        container.appendChild(divElemetn);
        questionResult.push(question);
        srNo++;
    }

    let button = document.createElement('button')
    button.value = "Submit";
    button.innerText = "Submit"

    container.appendChild(button);


    button.addEventListener('click',function(){
      
        totalQuestions = questionResult.length; 
        totalMarks = questionResult.filter(rec => rec.isAnswerCorrect === true).length;
        
        var result = document.getElementById('result');
        result.innerText = totalMarks + "/" + totalQuestions;
    })

})

