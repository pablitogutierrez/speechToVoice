const $container_voices = document.getElementById('container_voices'), 
    $btn = document.getElementById('btn'),
    $text = document.getElementById('from-text'),
    $text_r = document.getElementById('to-text'),
    $btn_2 = document.getElementById('btn-2')

    const countries_reverse = {
        "Español": "es-ES",
        "Inglés": "en-GB",
    }

    const countries = {
        "es-ES": "Español",
        "en-GB": "Inglés",
    }

let sel_lang = document.getElementById('languages')
let options = [];
let voices = [];
let utterance = new SpeechSynthesisUtterance();

function textToSpeak(){
    utterance.text = $text_r.textContent;
    window.speechSynthesis.speak(utterance);
}

function textToSpeak_e(){
    utterance.text = $text.textContent;
    window.speechSynthesis.speak(utterance);
}

document.addEventListener("DOMContentLoaded", (e) => {
    window.speechSynthesis.addEventListener("voiceschanged", (e) =>{
        voices = window.speechSynthesis.getVoices();

        const $option = document.createElement("option");
        $option.value = voices[2].name;
        $option.textContent = `${voices[2].name} - ${voices[2].lang}`;
        $container_voices.appendChild($option);
        
    })
})

document.addEventListener("click", (e) => {
    if(e.target === $btn){
        if(sel_lang.value == "Español"){
            textToSpeak_e();
        } else {
            textToSpeak();
        }
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

for(let country_code in countries) {
    let option = `${countries[country_code]}`;
    options.push(option);
}

for(value in options){
    var option = document.createElement("option");
    option.text = options[value];
    sel_lang.add(option);
} 

$btn.addEventListener("click", () => {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${$text.value}&langpair=es-ES|${countries_reverse[sel_lang.value]}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        $text_r.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            $text_r.value = data.translation;
        });
    });
});


