// for speech api
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
const recognition = new SpeechRecognition();

const searchform = document.getElementById('search-bar-form');
searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchValue = searchform['searchbar'].value;
    const url = '/shop/search?search=' + searchValue;
    window.location = url; 
})

// for html references
const mic = document.getElementById('mic-speak');
const searchbar = document.getElementById('searchbar');

mic.addEventListener('click',(e)=>{
    e.preventDefault();
    recognition.start();
    recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    searchbar.value = speechToText;
    const searchUrl = '/shop/search?search=' + speechToText;
    window.location = searchUrl;
}
})

