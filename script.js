const $container_voices = document.getElementById("container_voices"), 
    $btn = document.getElementById("btn"),
    $text = document.getElementById("text"),
    $btn_2 = document.getElementById("btn-2")

let voices = [];
let utterance = new SpeechSynthesisUtterance();

function textToSpeak(){
    utterance.text = $text.value;
    window.speechSynthesis.speak(utterance);
}

document.addEventListener("DOMContentLoaded", (e) => {
    window.speechSynthesis.addEventListener("voiceschanged", (e) =>{
        voices = window.speechSynthesis.getVoices();

        voices.forEach(el =>{
            const $option = document.createElement("option");
            $option.value = el.name;
            $option.textContent = `${el.name} - ${el.lang}`;
            $container_voices.appendChild($option);
        })
    })
})

document.addEventListener("click", (e) => {
    if(e.target === $btn){
        textToSpeak();
    }
})

document.addEventListener("change", (e) => {
    if(e.target === $container_voices){
        utterance.voice = voices.find(voice => voice.name === e.target.value);
    } 
})

document.addEventListener("click", (e) => {
    if(e.target === $btn_2){
        window.speechSynthesis.cancel(utterance);
    }
})