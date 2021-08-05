const speechRecognition = window.webkitSpeechRecognition;
const tts = window.speechSynthesis;
const recognition = new speechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

const username = document.getElementById("username");
const pass = document.getElementById("pass");

// mouse event to reload page and redirect to previous page
document.onmousedown = click
function click(event) {
    if (event.button === 2) {
        window.location.reload()
    }
    if (event.button === 1) {
        window.history.back()
    }
}
function submitform() {
    document.getElementById("form").submit();
}

let tospeak;
let stage = 1;

setTimeout(() => {
    getvoice("Your in login page.");
    setTimeout(() => {
        getInputs(1)
    }, 3300)
}, 1000)
function getInputs(s) {
    if (s === 1) {
        communicate("Your user name?",2900)
    } else if (s === 2) {
        communicate("your password?",2700)
    } else if (s === 3) {
        readinputs()
        setTimeout(() => {
            communicate("would you like to login? say yes or no. ",4900)
        }, 34000);
    }
}
function communicate(str,delay=7000) {
    getvoice(str + "speak");
    setTimeout(() => {
        recognition.start();
    }, delay)
}
function getvoice(str) {
    tospeak = new SpeechSynthesisUtterance(str);
    tospeak.voice = tts.getVoices()[2]
    tospeak.rate = 0.8
    tts.speak(tospeak)
}
function getvoicebychar(str) {
    for (let i = 0; i < str.length; i++) {
        tospeak = new SpeechSynthesisUtterance(str[i]);
        tospeak.voice = tts.getVoices()[2]
        tospeak.rate = 1.2
        tts.speak(tospeak)
    }
}
function readinputs() {
    getvoice("check your credentials.")
    getvoice("your username. ")
    getvoicebychar(username.value)
    getvoice("your password. ")
    getvoicebychar(pass.value)
}
function checkcontent(content) {
    if (content === 'yes' && stage === 3) {
        submitform()
    } else if (content === 'no' && stage === 3) {
        username.value = ""
        pass.value = ""
        stage=1
        getInputs(1)
    }
    else login(content)
}
function login(str) {
    if (stage === 1) {
        username.value = str
    } else if (stage === 2) {
        pass.value = str
    }
    getInputs(++stage)
}

recognition.onstart = function () {}
recognition.onresult = function (e) {
    let content = ""
    for (let i = e.resultIndex; i < e.results.length; i++) {
        content += e.results[i][0].transcript;
    }
    str = content.replace("at the rate", "@")
    str = str.replace("at", "@")
    str = str.replace(/\s+/g, '').toLowerCase()
    checkcontent(str)
}
recognition.onspeechend = function () {
    recognition.stop();
}
recognition.onerror = function (e) {
    getInputs(stage)
}
