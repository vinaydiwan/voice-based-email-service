const speechRecognition = window.webkitSpeechRecognition;
const tts = window.speechSynthesis;
const recognition = new speechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

// extracting elements from form
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let epass = document.getElementById("epass");
let no = document.getElementById("no");
let username = document.getElementById("username");
let pass = document.getElementById("pass");

//mouse events to reload and redirecting to previous page
document.onmousedown = click;
function click(event) {
    if (event.button === 2) {
        window.location.reload();
    }
    if (event.button === 1) {
        window.history.back();
    }
}

// event for submiting form
function submitform() {
    document.getElementById("form").submit();
}

let tospeak;
let stage = 1;
let str = '';

setTimeout(() => {
    getvoice("Your are in registration page.");
    setTimeout(() => {
        communicate(stage);
    }, 2500);
}, 1000);

function communicate(s) {
    if (s === 1) {
        speak("Your First Name?", 3300);
    } else if (s === 2) {
        speak("Your Last Name?", 2900);
    } else if (s === 3) {
        speak("Your Email Address?", 3000);
    } else if (s === 4) {
        speak("Your Email Password?", 2900);
    } else if (s === 5) {
        speak("Your Phone Number?", 2900);
    } else if (s === 6) {
        speak("Your User name?", 2900);
    } else if (s === 7) {
        speak("Your Password?", 2750);
    } else if (s === 8) {
        readinputs();
        setTimeout(() => {
            speak("would you like to register? say yes or no.", 4800);
        }, 120000);
    }
}

function speak(str, delay = 7000) {
    getvoice(str + " speak");
    setTimeout(() => {
        recognition.start();
    }, delay);
}

function getvoice(str) {
    tospeak = new SpeechSynthesisUtterance(str);
    tospeak.voice = tts.getVoices()[2];
    tospeak.rate = 0.8;
    tts.speak(tospeak);
}

function readinputs() {
    getvoice("check your credentials.");
    getvoice("your first name.");
    getvoicebychar(fname.value);
    getvoice("your last name. ");
    getvoicebychar(lname.value);
    getvoice("your email address. ");
    getvoicebychar(email.value);
    getvoice("your email password. ");
    getvoicebychar(epass.value);
    getvoice("your mobile number.");
    getvoicebychar(no.value);
    getvoice("your user name. ");
    getvoicebychar(username.value);
    getvoice("your password. ");
    getvoicebychar(pass.value);
}

function getvoicebychar(str) {
    for (let i = 0; i < str.length; i++) {
        tospeak = new SpeechSynthesisUtterance(str[i]);
        tospeak.voice = tts.getVoices()[2];
        tospeak.rate = 1.2;
        tts.speak(tospeak);
    }
}

recognition.onstart = function () { }
recognition.onresult = function (e) {
    let content = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
        content += e.results[i][0].transcript;
    }
    str = content.replace("at the rate", "@");
    str = str.replace("at", "@");
    str = str.replace(/\s+/g, '').toLowerCase();
    editform(str);
}
function editform(str) {
    if (stage === 1) {
        fname.value = str;
    } else if (stage === 2) {
        lname.value = str;
    } else if (stage === 3) {
        email.value = str;
    } else if (stage === 4) {
        epass.value = str
    } else if (stage === 5) {
        no.value = str;
    } else if (stage === 6) {
        username.value = str;
    } else if (stage === 7) {
        pass.value = str;
    } else if (stage === 8) {
        if (str === "yes") {
            submitform();
        }
        else if (str === "no") {
            fname.value = "";
            lname.value = "";
            email.value = "";
            epass.value = "";
            no.value = "";
            username.value = "";
            pass.value = "";
            stage = 1;
            communicate(1);
        }
    }
    communicate(++stage);
}
recognition.onspeechend = function () {
    recognition.stop();
}
recognition.onerror = function (e) {
    communicate(stage);
}
