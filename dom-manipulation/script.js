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
];


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
  
  console.log('✅ Displayed quote:', randomQuote);
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
  newQuoteText.value = '';
  newQuoteCategory.value = '';
  
  // Show success message
  alert(`✅ Quote added successfully! Total quotes: ${quotes.length}`);
  
  // Automatically show the newly added quote
  showRandomQuote();
  
  console.log('✅ New quote added:', newQuote);
  console.log('📚 Total quotes now:', quotes.length);

// ============================================
// STEP 4: SET UP EVENT LISTENERS
// ============================================


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Quote Generator Initialized!');
  console.log('📚 Starting with', quotes.length, 'quotes');
  
  // GET the "Show New Quote" button
  const newQuoteButton = document.getElementById('newQuote');
  
  // ADD a click event listener to it
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // GET the "Add Quote" button
  const addQuoteButton = document.getElementById('addQuoteBtn');
  
  // ADD a click event listener to it
  addQuoteButton.addEventListener('click', addQuote);
  
  // Allow pressing Enter key in input fields to add quote
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addQuote();
      }
    });
  });
  
  console.log('✅ Event listeners set up successfully!');
})}
