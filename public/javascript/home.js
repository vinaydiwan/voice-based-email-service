const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
const tts = window.speechSynthesis;

// mouse event to reload page
document.onmousedown = click
function click(event) {
    if (event.button === 2) {
        window.location.reload()
    }
}

// setting timer for 7 seconds to activate speech recognition
setTimeout(() => {
    getVoice("Welcome to voice based email. Are you new here? say yes or no. speak");
    setTimeout(() => {
        recognition.start()
    }, 6100)
}, 1000)
const getVoice = function (str) {
    const tospeak = new SpeechSynthesisUtterance(str);
    tospeak.voice = tts.getVoices()[2];
    tospeak.rate = 0.8;
    tts.speak(tospeak)
}
let content = ''
recognition.onstart = function () { }
// onresult method to listen voice through microphone and convert to text
recognition.onresult = function (e) {
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