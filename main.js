let countspan = document.querySelector(".count-question span");
let createSpans = document.querySelector(".quiz-count .spans");
let buletss = document.querySelector(".quiz-count");
let questionText = document.querySelector(".quiz-question");
let answerquestion = document.querySelector(".answer");
let buttonSubmit = document.querySelector(".submit-button");
let countdownelement = document.querySelector(".quiz-count .count-down");
let resultCounter = document.querySelector(".eval");



let counters = 0;
let rightAnswers = 0;
let coundoweninterval;

function getQuestion() {
    let questions = new XMLHttpRequest();

    questions.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let questionsobject = JSON.parse(this.responseText);
            console.log(questionsobject);
            let questioncount = questionsobject.length;
            console.log(questioncount);

            createbullets(questioncount);
            //create the question
            questionAnswer(questionsobject[counters], questioncount);


            countdown(5, questioncount);

            buttonSubmit.onclick = () => {
                let therightanswer = questionsobject[counters].right_answer;
                console.log(therightanswer);



                counters++;

                checkAnswer(therightanswer, questioncount);


                questionText.innerHTML = "";
                answerquestion.innerHTML = "";


                questionAnswer(questionsobject[counters], questioncount);

                addbullets();


                clearInterval(coundoweninterval);
                countdown(5, questioncount);


                showCount(questioncount);

            };

        }
    };


    questions.open("GET", "html.json", true);
    questions.send();
}

getQuestion();





function createbullets(num) {
    countspan.innerHTML = num;

    for (let i = 0; i < num; i++) {
        let bulletsSpans = document.createElement("span");

        if (i === 0) {
            bulletsSpans.className = "on";
        }

        createSpans.appendChild(bulletsSpans);
    }
}



function questionAnswer(obj, count) {
    if (counters < count) {
        //create h2
        let nameQuestion = document.createElement("h2");
        //create question
        let nameAnswer = document.createTextNode(obj["title"]);

        nameQuestion.appendChild(nameAnswer);
        questionText.appendChild(nameQuestion);

        for (let i = 1; i <= 4; i++) {

            let mdiv = document.createElement("div");
            mdiv.className = "an";

            //create inputs answer
            let inputs = document.createElement("input");
            inputs.type = 'radio';
            inputs.name = 'question';
            inputs.id = `answer_${i}`;
            inputs.dataset.an = obj[`answer_${i}`];

            //create checked one answer
            if (i === 1) {
                inputs.checked = true;
            }

            //create outputs answer
            let label = document.createElement("label");
            label.htmlFor = `answer_${i}`;



            let labelText = document.createTextNode(obj[`answer_${i}`]);
            label.appendChild(labelText);

            mdiv.appendChild(inputs);
            mdiv.appendChild(label);

            answerquestion.appendChild(mdiv);

        }

    }

}
questionAnswer();





function checkAnswer(rAnswer, count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;

        }

    }



    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;

    }
    console.log(theChoosenAnswer);

}





function addbullets() {
    let bultspans = document.querySelectorAll(".quiz-count .spans span");
    let spanarray = Array.from(bultspans);
    spanarray.forEach((span, index) => {
        if (counters === index) {
            span.className = "on";
        }
    });
}


function showCount(count) {
    let theResults;
    if (counters === count) {
        questionText.remove();
        answerquestion.remove();
        buttonSubmit.remove();
        buletss.remove();


        if (rightAnswers > count / 2 && rightAnswers < count) {
            theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
        } else if (rightAnswers === count) {
            theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
        } else {
            theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
        }



        resultCounter.innerHTML = theResults;
        console.log(resultCounter);
    }

}

function countdown(duration, count) {
    if (counters < count) {
        let minute, second;
        coundoweninterval = setInterval(function() {
            minute = parseInt(duration / 60);
            second = parseInt(duration % 60);


            minute = minute < 10 ? `0${minute}` : minute;
            second = second < 10 ? `0${second}` : second;


            countdownelement.innerHTML = `${minute}:${second}`;



            if (--duration < 0) {
                clearInterval(coundoweninterval);
                buttonSubmit.click();
            }
        }, 1000);
    }
}