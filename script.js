const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const twitterEl = document.getElementById("twitter");
const newQuoteEl = document.getElementById("new-quote");
const quoteIconEl = document.getElementById("quote-icon");
const quoteContainerEl = document.getElementById("quote-container");
const loaderEl = document.getElementById("loader");

function loader() {
    loaderEl.hidden = false;
    quoteContainerEl.hidden = true;
}

function complete() {
    if (!loaderEl.hidden) {
        quoteContainerEl.hidden = false;
        loaderEl.hidden = true;
    }
}

async function getQuote() {
    loader();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        quoteEl.innerText = data.quoteText;

        if (data.quoteAuthor === "") {
            authorEl.innerText = "Unknown";
        } else {
            authorEl.innerText = data.quoteAuthor;
        }

        if (data.quoteText.length >= 100) {
            quoteIconEl.classList.add("quote-icon-sm");
            quoteEl.classList.add("quote-text-sm");
            authorEl.classList.add("quote-author-sm");
        } else {
            quoteIconEl.classList.remove("quote-icon-sm");
            quoteEl.classList.remove("quote-text-sm");
            authorEl.classList.remove("quote-author-sm");
        }
        complete()
    } catch (error) {
        getQuote()
        console.log("Oops! No quote found.\nError -", error);
    }
}

getQuote();
loader();

function postOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteEl.innerText} - ${authorEl.innerText}`;
    window.open(twitterUrl, "_blank");
}

twitterEl.addEventListener("click", postOnTwitter);
newQuoteEl.addEventListener("click", getQuote);