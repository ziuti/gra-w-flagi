let countries = [];
let score = 0;
let errors = 0;
const maxErrors = 5;

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/region/europe');
    countries = await response.json();
    startGame();
}

function startGame() {
    if (errors < maxErrors) {
        showNextCountry();
    } else {
        endGame();
    }
}

function showNextCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];
    
    document.getElementById('flag').src = country.flags.png;
    document.getElementById('flag').alt = country.name.common;
    document.getElementById('name').innerText = country.name.common;
    document.getElementById('answer').value = '';
    
    document.getElementById('submit').onclick = () => checkAnswer(country.capital[0]);
}

function checkAnswer(correctAnswer) {
    const userAnswer = document.getElementById('answer').value.trim();

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;    
        document.getElementById('message').innerText = 'Dobrze!';
    } else {
        errors++;
        document.getElementById('message').innerText = `Źle! Poprawna odpowiedź to: ${correctAnswer}`;
    }
    
    document.getElementById('score').innerText = score;
    document.getElementById('errors').innerText = errors;
    

    startGame();
}

function endGame() {
    alert(`Koniec gry! Twój wynik to: ${score} punktów. Popełniłeś ${errors} błędów.`);
    resetGame();
}

function resetGame() {
    score = 0;
    errors = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('errors').innerText = errors;
    fetchCountries();
}


fetchCountries();