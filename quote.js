const quotes = [
  { quote: "Mind has infinite power.", writer: "Diwash Pandey", genre: "Motivation" },
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", writer: "Franklin D. Roosevelt", genre: "Motivation" },
  { quote: "Life is 10% what happens to us and 90% how we react to it.", writer: "Charles R. Swindoll", genre: "Motivation" },
  { quote: "Love is not just looking at each other, it's looking in the same direction.", writer: "Antoine de Saint-Exupéry", genre: "Love" },
  { quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.", writer: "Martin Luther King Jr.", genre: "Love" },
  { quote: "The best way to find yourself is to lose yourself in the service of others.", writer: "Mahatma Gandhi", genre: "Love" },
  { quote: "To love oneself is the beginning of a lifelong romance.", writer: "Oscar Wilde", genre: "Love" },
  { quote: "Tears are words that need to be written.", writer: "Paulo Coelho", genre: "Sad" },
  { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", writer: "Nelson Mandela", genre: "Sad" },
  { quote: "In every walk with nature, one receives far more than he seeks.", writer: "John Muir", genre: "Sad" },
  { quote: "Love is composed of a single soul inhabiting two bodies.", writer: "Aristotle", genre: "Sad" },
  { quote: "The way to love anything is to realize that it may be lost.", writer: "Gilbert K. Chesterton", genre: "Sad" },
  { quote: "Sadness flies away on the wings of time.", writer: "Jean de La Fontaine", genre: "Sad" },
  { quote: "The only thing we have to fear is fear itself.", writer: "Franklin D. Roosevelt", genre: "Motivation" },
  { quote: "Love is an irresistible desire to be irresistibly desired.", writer: "Robert Frost", genre: "Love" },
  { quote: "The greatest happiness you can have is knowing that you do not necessarily require happiness.", writer: "William Saroyan", genre: "Love" },
  { quote: "Our greatest glory is not in never falling, but in rising every time we fall.", writer: "Confucius", genre: "Love" },
  { quote: "Love is like the wind, you can't see it but you can feel it.", writer: "Nicholas Sparks", genre: "Love" },
  { quote: "When you reach the end of your rope, tie a knot in it and hang on.", writer: "Franklin D. Roosevelt", genre: "Motivation" },
  { quote: "Sadness is but a wall between two gardens.", writer: "Khalil Gibran", genre: "Sad" }
];

const quoteCard = document.getElementById("quoteCard");
let html = "";

for (let i = 0; i < quotes.length; i++) {
  html += `
  <div class="quote-card" id="quoteCard${i}">
    <p class="quote">${quotes[i].quote}</p>
    <p class="writer">- ${quotes[i].writer}</p>
    <p class="tags">${quotes[i].genre}</p>
    <div class="response" id="response${i}">
      <i class="fas fa-thumbs-up"></i>
      <i class="fas fa-thumbs-down"></i>
      <p id="copy">Copy <i class="fas fa-clipboard"></i></p>
      <p id="download${i}"><i class="fas fa fa-arrow-down"></i></p>
      <p id="share${i}"><i class="fas fa-share"></i></p>
    </div>
  </div>
  `;
}

quoteCard.innerHTML = html;

for (let i = 0; i < quotes.length; i++) {
  document.getElementById(`download${i}`).addEventListener('click', () => downloadQuote(i));
  document.getElementById(`share${i}`).addEventListener('click', () => shareQuote(i));
}

function downloadQuote(index) {
  const quoteCardElement = document.getElementById(`quoteCard${index}`);
  const responseElement = document.getElementById(`response${index}`);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Hide the response section before capturing the image
  responseElement.style.display = 'none';

  html2canvas(quoteCardElement).then(canvasResult => {
    const padding = 20;

    // Resize the hidden canvas to include padding
    canvas.width = canvasResult.width + 2 * padding;
    canvas.height = canvasResult.height + 2 * padding;

    // Fill the canvas with white background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the captured image onto the canvas with padding
    ctx.drawImage(canvasResult, padding, padding);

    // Add watermark
    const watermarkText = "QuoteByDiwash";
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.textAlign = "right";
    ctx.fillText(watermarkText, canvas.width - padding, canvas.height - padding);

    // Create a link element to initiate download
    const link = document.createElement('a');
    link.download = 'quote.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();

    // Show the response section again after capturing the image
    responseElement.style.display = '';
  }).catch(error => {
    console.error('Error capturing the quote card:', error);
    // Show the response section again in case of an error
    responseElement.style.display = '';
  });
}

function shareQuote(index) {
  const quoteCardElement = document.getElementById(`quoteCard${index}`);
  const responseElement = document.getElementById(`response${index}`);
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Hide the response section before capturing the image
  responseElement.style.display = 'none';

  html2canvas(quoteCardElement).then(canvasResult => {
    const padding = 20;

    // Resize the hidden canvas to include padding
    canvas.width = canvasResult.width + 2 * padding;
    canvas.height = canvasResult.height + 2 * padding;

    // Fill the canvas with white background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the captured image onto the canvas with padding
    ctx.drawImage(canvasResult, padding, padding);

    // Add watermark
    const watermarkText = "QuoteByDiwash";
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.textAlign = "right";
    ctx.fillText(watermarkText, canvas.width - padding, canvas.height - padding);

    // Convert canvas to Blob
    canvas.toBlob(blob => {
      const file = new File([blob], "quote.jpg", { type: "image/jpeg" });
      const filesArray = [file];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
          files: filesArray,
          title: 'Quote',
          text: quotes[index].quote
        }).then(() => {
          console.log('Share was successful.');
        }).catch((error) => {
          console.error('Sharing failed', error);
        });
      } else {
        alert('Sharing not supported by your browser.');
      }
    }, 'image/jpeg');

    // Show the response section again after capturing the image
    responseElement.style.display = '';
  }).catch(error => {
    console.error('Error capturing the quote card:', error);
    // Show the response section again in case of an error
    responseElement.style.display = '';
  });
}
