const $container_voices = document.getElementById('container_voices'), 
    $btn = document.getElementById('btn'),
    $text = document.getElementById('from-text'),
    $text_r = document.getElementById('to-text'),
    $btn_2 = document.getElementById('btn-2')

    const countries_reverse = {
        "Alemán": "de-DE",
        "Inglés": "en-GB",
        "Español": "es-ES",
        "Francés": "fr-FR",
        "Italiano": "it-IT",
        "Holandés": "nl-NL",
        "Portugués": "pt-PT",
        "Turco": "tr-TR",
    }

    const countries = {
        "de-DE": "Alemán",
        "en-GB": "Inglés",
        "es-ES": "Español",
        "fr-FR": "Francés",
        "it-IT": "Italiano",
        "nl-NL": "Holandés",
        "pt-PT": "Portugués",
        "tr-TR": "Turco",
    }

let sel_lang = document.getElementById('languages')
let options = [];
let voices = [];
let utterance = new SpeechSynthesisUtterance();

function textToSpeak(){
    utterance.text = $text_r.value;
    window.speechSynthesis.speak(utterance);
}

function textToSpeak_e(){
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


