let clicks = 0;
let countdown;
let timeLeft = 10;  
let gameStarted = false;


const startBtn = document.getElementById("start-btn");
const countdownContainer = document.getElementById("countdown-container");
const countdownText = document.getElementById("countdown-text");
const clickArea = document.getElementById("click-area");
const clickBtn = document.getElementById("click-btn");
const clicksCount = document.getElementById("clicks-count");
const resultDisplay = document.getElementById("result");
const leaderboardList = document.getElementById("leaderboard-list");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");
const nameInput = document.getElementById("name-input");  
const errorMessage = document.getElementById("name-error-message"); 


startBtn.addEventListener("click", () => {
    if (gameStarted) return;  

    const playerName = nameInput.value.trim();

    if (!playerName) {
        errorMessage.style.display = "block";  
        return;
    }

    errorMessage.style.display = "none";

    nameInput.style.display = "none";

    gameStarted = true;
    clicks = 0;

    startBtn.style.display = "none";
    countdownContainer.style.display = "block";
    countdownText.textContent = timeLeft;

    const countdownCircle = document.getElementById("countdown-circle");
    countdownCircle.style.animation = `countdownAnimation ${timeLeft}s linear infinite`;

    countdown = setInterval(() => {
        timeLeft--;
        countdownText.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameStarted = false;
            countdownText.textContent = "¡Tiempo terminado!";
            resultDisplay.style.display = "block";
            clicksCount.textContent = `Clicks realizados: ${clicks}`;

            saveResult(playerName, clicks); 
        }
    }, 1000);

    clickArea.style.display = "block";
    clicksCount.textContent = `Clics realizados: 0`;
    resultDisplay.style.display = "none";
});


clickBtn.addEventListener("click", () => {
    if (!gameStarted) return;  
    clicks++;
});


function saveResult(name, clicks) {
    const currentResults = JSON.parse(localStorage.getItem("clicksResults")) || [];
    currentResults.push({ name, clicks });
    currentResults.sort((a, b) => b.clicks - a.clicks);  

    
    const topFiveResults = currentResults.filter((_, index) => index < 5);

    
    localStorage.setItem("clicksResults", JSON.stringify(topFiveResults));
    displayLeaderboard(topFiveResults);
}


function displayLeaderboard(results) {
    leaderboardList.innerHTML = '';  

    results.forEach((result, index) => {
        const li = document.createElement("li");
        let medal = "";
        
        
        if (index === 0) medal = "🏆";
        else if (index === 1) medal = "🥈";
        else if (index === 2) medal = "🥉";

        li.textContent = `${medal} ${result.name} - hizo ${result.clicks} clics`;
        leaderboardList.appendChild(li);
    });
}


window.onload = () => {
    const savedResults = JSON.parse(localStorage.getItem("clicksResults")) || [];
    
    
    const topFiveResults = savedResults.filter((_, index) => index < 5);
    
    displayLeaderboard(topFiveResults);
};


clearBtn.addEventListener("click", () => {
    localStorage.removeItem("clicksResults");
    displayLeaderboard([]);
});


resetBtn.addEventListener("click", () => {
    
    gameStarted = false;
    clicks = 0;
    timeLeft = 10;
    startBtn.style.display = "block";
    countdownContainer.style.display = "none";
    clickArea.style.display = "none";
    resultDisplay.style.display = "none";
    clicksCount.textContent = `Clics realizados: 0`;
    countdownText.textContent = timeLeft;
    nameInput.value = "";
    nameInput.style.display = "block";
});

const themeToggleBtn = document.getElementById("theme-toggle-btn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
