// ============================================
// STEP 1: CREATE THE QUOTES DATABASE
// ============================================

// This is our array of quote objects
// Each quote has 'text' and 'category' properties
let quotes = [
  {
    text: "Believe you can and you're halfway there.",
    category: "Motivation"
  },
  {
    text: "The only true wisdom is in knowing you know nothing.",
    category: "Wisdom"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    category: "Inspiration"
  },
  {
    text: "Everything you can imagine is real.",
    category: "Inspiration"
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "Inspiration"
  },
  {
    text: "Opportunities don't happen. You create them.",
    category: "Success"
  },
  {
    text: "A woman with a voice is, by definition, a strong woman.",
    category: "Women Empowerment"
  }
];// INITIAL QUOTES DATA
// ============================================

const defaultQuotes = [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
  { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { text: "Everything you can imagine is real.", category: "Inspiration" },
  { text: "The best way to predict the future is to create it.", category: "Inspiration" },
  { text: "Opportunities don't happen. You create them.", category: "Success" },
  { text: "A woman with a voice is, by definition, a strong woman.", category: "Women Empowerment" }
];


// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
    console.log('✅ Loaded', quotes.length, 'quotes from localStorage');
  } else {
    quotes = [...defaultQuotes];
    saveQuotes();
    console.log('📦 Initialized with default quotes');
  }
  updateStatistics();
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
  console.log('💾 Saved', quotes.length, 'quotes to localStorage');
  updateStatistics();
}

// ============================================
// SESSION STORAGE FUNCTIONS
// ============================================

function saveLastViewedQuote(quote) {
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  sessionStorage.setItem('lastViewedTime', new Date().toLocaleString());
  console.log('📌 Saved last viewed quote to sessionStorage');
  updateSessionInfo();
}

function loadSessionInfo() {
  const lastQuote = sessionStorage.getItem('lastViewedQuote');
  const lastTime = sessionStorage.setItem('lastViewedTime');
  if (lastQuote && lastTime) {
    return { quote: JSON.parse(lastQuote), time: lastTime };
  }
  return null;
}

function updateSessionInfo() {
  const sessionInfo = loadSessionInfo();
  const infoBox = document.getElementById('sessionInfo');
  
  if (sessionInfo) {
    infoBox.innerHTML = `
      <strong>Last Viewed Quote:</strong><br>
      "${sessionInfo.quote.text}"<br>
      <strong>Category:</strong> ${sessionInfo.quote.category}<br>
      <strong>Time:</strong> ${sessionInfo.time}
    `;
  } else {
    infoBox.innerHTML = '<em>No quotes viewed in this session yet.</em>';
  }
}
// ============================================
// STEP 2: FUNCTION TO SHOW A RANDOM QUOTE
// ============================================

/**
 * This function displays a random quote from our quotes array
 * It uses DOM manipulation to create and display the quote
 */
function showRandomQuote() {
  // Get the display area element by its ID
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Check if we have any quotes
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = '<div class="empty-state">No quotes available. Add some quotes first!</div>';
    return;
  }
  
  // Generate a random index number between 0 and quotes.length-1
  const randomIndex = Math.floor(Math.random() * quotes.length);
  
  // Get the random quote using the random index
  const randomQuote = quotes[randomIndex];
  
  // CLEAR the previous content
  quoteDisplay.innerHTML = '';
  
  // CREATE a new paragraph element for the quote text
  const quoteText = document.createElement('p');
  quoteText.className = 'quote-text';
  quoteText.textContent = `"${randomQuote.text}"`;
  
  // CREATE a new paragraph element for the category
  const quoteCategory = document.createElement('p');
  quoteCategory.className = 'quote-category';
  quoteCategory.textContent = `— Category: ${randomQuote.category}`;
  
  // APPEND both elements to the display area
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
  
   saveLastViewedQuote(randomQuote);
  console.log('✅ Displayed quote:', randomQuote);
}

function updateStatistics() {
  document.getElementById('totalQuotes').textContent = quotes.length;
  const categories = [...new Set(quotes.map(q => q.category))];
  document.getElementById('totalCategories').textContent = categories.length;
}

// ============================================
// STEP 3: FUNCTION TO ADD NEW QUOTES
// ============================================

/**
 * This function adds a new quote to the quotes array
 * It gets values from the input fields and creates a new quote object
 */
function addQuote() {
  // GET the input elements by their IDs
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  
  // GET the values that the user typed
  const quoteText = newQuoteText.value.trim();
  const quoteCategory = newQuoteCategory.value.trim();
  
  // VALIDATE: Check if both fields have content
  if (quoteText === '' || quoteCategory === '') {
    alert('⚠️ Please fill in both the quote text and category!');
    return;
  }
  
  // CREATE a new quote object
  const newQuote = {
    text: quoteText,
    category: quoteCategory
  };
  
  // ADD the new quote to our quotes array
  quotes.push(newQuote);
  
  // CLEAR the input fields (reset them)
  saveQuotes();

  newQuoteText.value = '';
  newQuoteCategory.value = '';
  
  // Show success message
  alert(`✅ Quote added successfully! Total quotes: ${quotes.length}`);
  
  // Automatically show the newly added quote
  showRandomQuote();
  
  console.log('✅ New quote added:', newQuote);
  console.log('📚 Total quotes now:', quotes.length);

  // ============================================
// JSON EXPORT FUNCTION
// ============================================

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
  
  console.log('📥 Exported', quotes.length, 'quotes to JSON file');
  alert('✅ Quotes exported successfully!');
}

// ============================================
// STEP 4: FUNCTION TO CREATE ADD QUOTE FORM
// ============================================

function createAddQuoteForm() {
  function importFromJsonFile(event) {
  const fileReader = new FileReader();
   fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      
      if (!Array.isArray(importedQuotes)) {
        alert('❌ Invalid file format. Expected an array of quotes.');
        return;
      }
      
      const validQuotes = importedQuotes.filter(q => q.text && q.category);
      
      if (validQuotes.length === 0) {
        alert('❌ No valid quotes found in the file.');
        return;
      }
      
      quotes.push(...validQuotes);
      saveQuotes();
      showRandomQuote();
      
      alert(`✅ Successfully imported ${validQuotes.length} quotes!`);
      console.log('📤 Imported', validQuotes.length, 'quotes from JSON file');
    } catch (error) {
      alert('❌ Error reading file. Please ensure it\'s a valid JSON file.');
      console.error('Import error:', error);
    }
  };
  console.log('ℹ️ Add quote form is already in HTML');
 fileReader.readAsText(event.target.files[0]);
}
}


// ============================================
// STEP 5: SET UP EVENT LISTENERS
// ============================================

function clearAllQuotes() {
  if (confirm('⚠️ Are you sure you want to delete ALL quotes? This cannot be undone!')) {
    quotes = [];
    saveQuotes();
    document.getElementById('quoteDisplay').innerHTML = '<div class="empty-state">All quotes cleared. Add new ones to get started!</div>';
    alert('✅ All quotes have been cleared.');
    console.log('🗑️ All quotes cleared from localStorage');
  }
}


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Quote Generator Initialized!');
  console.log('📚 Starting with', quotes.length, 'quotes');
  
  // GET the "Show New Quote" button
  const newQuoteButton = document.getElementById('newQuote');
  console.log('🚀 Quote Generator with Storage Initialized!');
  
  // ADD a click event listener to it
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  loadQuotes();
  updateSessionInfo();

  // GET the "Add Quote" button
  const addQuoteButton = document.getElementById('addQuoteBtn');
   document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);
  document.getElementById('clearStorage').addEventListener('click', clearAllQuotes);

  // ADD a click event listener to it
  addQuoteButton.addEventListener('click', addQuote);
   const importFile = document.getElementById('importFile');
  importFile.addEventListener('change', importFromJsonFile);

  // Allow pressing Enter key in input fields to add quote
   const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addQuote();
      }
    });
  });
  
  console.log('✅ Event listeners set up successfully!');
  console.log('✅ All event listeners set up successfully!');
});


// ============================================
// ADDITIONAL HELPER FUNCTIONS
// ============================================

/**
 * Function to get all unique categories from quotes
 */
function getCategories() {
  const categories = quotes.map(quote => quote.category);
  return [...new Set(categories)]; // Remove duplicates
}

/**
 * Function to filter quotes by category
 */
function getQuotesByCategory(category) {
  return quotes.filter(quote => quote.category === category);
}

// Log available categories when page loads
setTimeout(() => {
  console.log('📂 Available categories:', getCategories());
}, 1000);
}
