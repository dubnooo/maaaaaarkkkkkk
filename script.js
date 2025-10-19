// Дані вікторини про сучасних українських музикантів
const questions = [
    {
        question: "Яка марка цього телефону?",
        image: "https://media.wired.com/photos/68aea51e5215f864834f873a/3:2/w_2560%2Cc_limit/Google%2520Pixel%252010%2520Pro%2520SOURCE%2520Julian%2520Chokkattu.png",
             answers: [
            { text: "Vertu", correct: false },
            { text: "Google pixel", correct: true },
            { text: "Iqoo", correct: false },
            { text: "Vivo", correct: false },
        ]
    },
    {
        question: "Яка модель телефону?",
        image: "https://pixelmania.com.ua/image/cache/catalog/image/cache/catalog/img/10125/smartfon-google-pixel-10-pro-xl-16-256gb-moonstone-global-5-1200x1200.webp", // Фото KAZKA (Саша Зарицька)
        answers: [
            { text: "Pixel 10", correct: false },
            { text: "Pixel 8 Pro", correct: false },
            { text: "Pixel 10 Pro XL", correct: true },
            { text: "Pixel 9", correct: false },
        ]
    },
    {
        question: "Яка модель телефону?",
        image: "https://mobileplanet.ua/uploads/product/2022-10-24/google-pixel-7-8-128gb-lemongrass-257140.webp", // Фото Wellboy
        answers: [
            { text: "Pixel 4", correct: false },
            { text: "Pixel 6", correct: false },
            { text: "Pixel 7", correct: true },
            { text: "Pixel 8", correct: false },
        ]
    },
    {
        question: "Яка модель телефону?",
        image: "https://content1.rozetka.com.ua/goods/images/big/566991734.jpg", // Фото Джамали
        answers: [
            { text: "Pixel 9", correct: false },
            { text: "Pixel 8a", correct: false },
            { text: "Pixel 9a", correct: true },
            { text: "Pixel 7a", correct: false },
        ]
    },
    {
        question: "Яка модель телефону?",
        image: "https://sota.store/image/cache/catalog/Google-Pixel/google-pixel-6-pro-gld-01-1600x1600.webp", // Фото Kalush Orchestra
        answers: [
            { text: "Pixel 10 Pro", correct: false },
            { text: "Pixel 6 Pro", correct: true },
            { text: "Pixel 5 Pro", correct: false },
            { text: "Pixel 8 pro", correct: false },
        ]
    },
    {
        question: "Яка компанія має найкращу камеру у телефоні на даний момент?",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbL1bm3XqvVnsiUvknfV5iFfvmGlyO9L-2HQ&s", // Фото Святослава Вакарчука
        answers: [
            { text: "Apple", correct: false },
            { text: "Vivo", correct: true },
            { text: "Google", correct: false },
            { text: "Samsung", correct: false },
        ]
    },
    {
        question: "Яка компанія має однакову назву моделів своїх телефонів як у Apple  ?",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCTzUBbtcixg1Mur7kKrANEmeNB87lnKH2gQ&s", // Фото Тіни Кароль
        answers: [
            { text: "Nothing", correct: false },
            { text: "Oppo", correct: false },
            { text: "Xiaomi", correct: true },
            { text: "Google", correct: false },
        ]
    },
    {
        question: "Який у мене телефон?",
        image: "https://content1.rozetka.com.ua/goods/images/big/381556600.png", // Фото Тіни Кароль
        answers: [
            { text: "Pixei 9", correct: false },
            { text: "Pixel 8", correct: false },
            { text: "Pixel 8 Pro", correct: true },
            { text: "Pixel 8a", correct: false },
        ]
    },
    {
        question: "Яка  компанія виробляє телефони з найкращою камерою за свої гроші?",
        image: "https://cdnuploads.aa.com.tr/uploads/Contents/2016/02/02/thumbs_b_c_79fb97f97f72f565d1e56dae5c9f2263.jpg", // Фото ONUKA
        answers: [
            { text: "Apple", correct: false },
            { text: "Tecno", correct: false },
            { text: "Google", correct: true },
            { text: "Poco", correct: false },
        ]
    }
];





// Змінні та DOM-елементи
let currentQuestionIndex = 0;
let score = 0;


const body = document.body;
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('progress-bar');
const themeToggleButton = document.getElementById('theme-toggle');


// --- Функції логіки вікторини ---


function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


function showQuestion() {
    resetState();
    updateProgressBar(); // Оновлення прогресу


    const currentQuestion = questions[currentQuestionIndex];
   
    questionText.innerText = currentQuestion.question;


    // Додавання зображення (Фото музиканта/гурту)
    if (currentQuestion.image) {
        questionImage.src = currentQuestion.image;
        questionImage.style.display = 'block';
    } else {
        questionImage.style.display = 'none';
        questionImage.src = '';
    }


    // Створення кнопок для відповідей
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}


function resetState() {
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";


    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }


    // Блокування всіх кнопок і підсвітка правильної
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });


    nextButton.disabled = false;
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


function showResult() {
    updateProgressBar(); // Фінальне оновлення прогрес-бару до 100%
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreText.innerHTML = `Ви вгадали **${score}** з **${questions.length}** телефонів! <br> Це чудовий результат!`;
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.style.display = 'none';
    quizBox.style.display = 'block';
    showQuestion();
}


// --- Функція зміни теми ---


function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleButton.innerText = "💡 Light Mode";
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleButton.innerText = "🌙 Dark Mode";
    }
}


// --- Обробники подій ---


nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);
themeToggleButton.addEventListener('click', toggleTheme);


// Початковий запуск
startQuiz();

