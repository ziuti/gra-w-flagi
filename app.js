document.addEventListener('DOMContentLoaded', () => {
    let countries = [];
    let score = 0;
    let errors = 0;
    const maxErrors = 5;

    async function fetchCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/region/europe');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            countries = await response.json();
            startGame();
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to load countries. Please try again later.');
        }
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

        
        if (country.capital && country.flags && country.flags.png) {
            document.getElementById('flag').src = country.flags.png;
            document.getElementById('flag').alt = country.name.common;
            document.getElementById('name').innerText = country.name.common;
            document.getElementById('answer').value = '';
            document.getElementById('message').innerText = '';

            document.getElementById('submit').onclick = () => checkAnswer(country.capital[0]);
        } else {
           
            showNextCountry();
        }
    }

    function checkAnswer(correctAnswer) {
        const userAnswer = document.getElementById('answer').value.trim();

        if (userAnswer === '') {
            document.getElementById('message').innerText = 'Proszę wpisać odpowiedź!';
            return; 
        }

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
});