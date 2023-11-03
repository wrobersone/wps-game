const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById("quote-display")
const quoteInputElement = document.getElementById("quote-input")
const timerElement = document.getElementById("timer")

quoteInputElement.addEventListener('input', () => {
    // loop over all the characters and compare each
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {

            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    // Grabs the next quote when the previous is typed correctly
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    // timerElement.innerText = 0
    // startTime = new Date()
    // setInterval(() => {
    //     timer.innerText = getTimerTime()
    // }, 1000)

    timerElement.innerText = "00:00:00"; // Set the initial display to "00:00:00"
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = formatTimerTime();
    }, 1000);
}

// function getTimerTime() {
//     return Math.floor((new Date() - startTime) / 1000)
// }

function formatTimerTime() {
    const currentTime = new Date() - startTime;
    const hours = Math.floor(currentTime / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((currentTime % 3600000) / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((currentTime % 60000) / 1000); // 1 second = 1000 milliseconds

    // Ensure the time values are displayed with two digits (e.g., "01" instead of "1")
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

renderNewQuote()