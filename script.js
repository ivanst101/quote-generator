
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function newQuote(){

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if(!quote.author || quote.author.indexOf(",") === -1){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author.substring(0, quote.author.indexOf(","));
    }

    // Check quote lenght for styling
    if(quote.text.length > 100){
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes(){

    const apiURL = 'https://type.fit/api/quotes';
    try{
        loading();
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Catch error
        getQuotes();
    }
}

// Tweet a quote
function twittQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}



// Event listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", twittQuote);

// On-load
getQuotes();

