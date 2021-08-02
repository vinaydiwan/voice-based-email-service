const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
const tts = window.speechSynthesis;
recognition.continuous = false;
recognition.interimResults = false;

// mouse event to reload page
document.onmousedown = click
function click(event) {
    if (event.button === 2) {
        window.location.reload()
    }
}

// setting timer for 7 seconds to activate speech recognition
setTimeout(() => {
    getvoice("Welcome to voice based email. Are you new here? say yes or no. speak");
    setTimeout(() => {
        recognition.start()
    }, 6100)
}, 1000)
function getvoice(str) {
    tospeak = new SpeechSynthesisUtterance(str);
    tospeak.voice = tts.getVoices()[2]
    tospeak.rate = 0.8
    tts.speak(tospeak)
}

recognition.onstart = function () {
}

// onresult method to listen voice through microphone and convert to text
recognition.onresult = function (e) {
    let content = ""
    for (let i = e.resultIndex; i < e.results.length; i++) {
        content += e.results[i][0].transcript;
    }
    // redirecting user to login page when user says yes to continue
    if (content.toLowerCase() === 'yes') {
        window.location.href = '/register';
    }
    if (content.toLowerCase() === 'no') {
        window.location.href = '/login';
    }
}
// methods used to stop speech recognition
recognition.onspeechend = function () {
    recognition.stop();
}
// method used to throw error 
recognition.onerror = function (e) {
    window.location.reload()
}