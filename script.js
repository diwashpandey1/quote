
const bar = document.getElementById('bar');
const navBar = document.getElementById('navBar');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
isCross = false;

bar.addEventListener('click', function(){

  if(isCross){
    line1.style.transform = 'rotate(0) translate(0,0)';
    line2.style.transform = 'rotate(0) translate(0,0)';
    navBar.style.transform = 'scaley(0)';
    isCross = false;
  }
  else{
    line1.style.transform = 'rotate(45deg) translate(0,10px)';
    line2.style.transform = 'rotate(-45deg) translate(5px,-10px)';
    navBar.style.transform = 'scaley(1)';
    isCross = true;
  }

});




// Function to fetch and format the time
function fetchTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayName = days[now.getDay()];
  const day = String(now.getDate()).padStart(2, '0');
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  return `<span class="t">${hours}:${minutes}:${seconds} ${ampm} </span>, ${dayName} <br> ${day} ${monthName}, ${year}`;
}

function updateTime() {
  document.getElementById('fetchTime').innerHTML = fetchTime();
}

// Update the time immediately and then every second
updateTime();
setInterval(updateTime, 1000);



// Get the input element and quote cards container
const searchInput = document.querySelector('.search__input');
const quoteCardsContainer = document.getElementById('quoteCard');
const notfoundMessage = document.getElementById('message');

// Function to filter quotes based on search input
function filterQuotes() {
  const searchTerm = searchInput.value.toLowerCase(); // Get the search term and convert to lowercase

  // Get all the quote cards
  const quoteCards = quoteCardsContainer.querySelectorAll('.quote-card');

  // Loop through each quote card to check if it contains the search term
  quoteCards.forEach(card => {
    const quoteText = card.querySelector('.quote').textContent.toLowerCase(); // Get the quote text and convert to lowercase
    const writerName = card.querySelector('.writer').textContent.toLowerCase(); // Get the writer name and convert to lowercase

    // If the quote text or writer name contains the search term, show the quote card, otherwise hide it
    if (quoteText.includes(searchTerm) || writerName.includes(searchTerm)) {
      card.style.display = 'block'; // Show the quote card
      notfoundMessage.style.display = 'none';
    } else {
      card.style.display = 'none';
      notfoundMessage.style.display = 'block';
    }
  });
}

// Event listener for input changes in the search input field
searchInput.addEventListener('input', filterQuotes);


// Get the select element for sorting
const sortSelect = document.querySelector('.sort select');

// Function to sort quote cards based on selected genre
function sortQuotes() {
  const selectedGenre = sortSelect.value; // Get the selected genre

  // Get all the quote cards
  const quoteCards = document.querySelectorAll('.quote-card');

  // Loop through each quote card
  quoteCards.forEach(card => {
    const cardGenre = card.querySelector('.tags').textContent.trim(); // Get the genre of the current quote card

    // Check if the card genre matches the selected genre or if the selected genre is "Default"
    // Show the quote card if it matches, otherwise hide it
    if (selectedGenre === "Default" || cardGenre === selectedGenre) {
      card.style.display = 'block'; // Show the quote card
    } else {
      card.style.display = 'none'; // Hide the quote card
    }
  });
}

// Event listener for changes in the select element for sorting
sortSelect.addEventListener('change', sortQuotes);




// Get all copy icons
const copyIcons = document.querySelectorAll('.response #copy');

// Convert NodeList to an array
const copyIconsArray = Array.from(copyIcons);

// Function to copy quote text to clipboard
function copyQuote(event) {
  const quoteText = event.target.closest('.quote-card').querySelector('.quote').textContent.trim(); // Get the text of the quote
  // Create a textarea element to temporarily hold the quote text
  const textarea = document.createElement('textarea');
  textarea.value = quoteText;

  // Append the textarea to the body and select its content
  document.body.appendChild(textarea);
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand('copy');

  // Remove the textarea from the body
  document.body.removeChild(textarea);

  // Change the text of the clicked icon to indicate that the text has been copied
  event.target.innerText = 'Copied !';

  
  setTimeout(() => {
    event.target.innerHTML = `Copy <i class="fas fa-clipboard"></i>`; // Change the text back to "Copy"
  }, 2000); 
}

// Loop through each copy icon and add a click event listener
copyIconsArray.forEach(icon => {
  icon.addEventListener('click', copyQuote);
});


