const speechRecognition = window.webkitSpeechRecognition
const tts = window.speechSynthesis;
const p = document.getElementById("p")

const recognition = new speechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

document.onmousedown = click
function click(event){
    if(event.button === 0){
        alert("kjbfka")
    }
}
recognition.onstart = function(){
    p.textContent = "voice is activated";
}
recognition.onspeechend = function(){
    recognition.stop();
   // instruc.textContent = "voice is deactivated";
}
recognition.onerror= function(e){
   // instruc.textContent = "Try again";
}
recognition.onresult = function(e){
    let content = ""
    for(let i = e.resultIndex;i<e.results.length;i++){
        content += e.results[i][0].transcript;
    }
    p.innerText = content;
    
    let tospeak = new SpeechSynthesisUtterance("t. e. s. d. e. m. o. 0 6 2 1 @ gmail.com")
    tospeak.voice = tts.getVoices()[2]
    tospeak.rate = 0.7
    tts.speak(tospeak)
}

