document.addEventListener('DOMContentLoaded', function() {
    // Don't initialize chat on login/signup pages
    const currentPage = window.location.pathname;
    if (currentPage.includes('login') || currentPage.includes('signup')) {
        return;
    }
    // Chat responses for real estate related questions
    window.responses = {
        'default': "I'm here to help with your real estate questions. Feel free to ask about market timing, finding realtors, property investment, or any other real estate topics!",
        'greetings': ["Hello!", "Hi there!", "Welcome! How can I help you with your real estate needs?"],
        'market_timing': [
            "The decision to buy now or wait depends on several factors. Currently, key considerations include: 1) Interest rates and their projected trends, 2) Local market inventory levels, 3) Your personal financial situation, and 4) Long-term housing needs. Would you like to discuss any of these aspects in detail?",
            "Market timing is personal to each buyer's situation. Consider: Are you financially ready? Do you have stable employment? Is your credit score good? Will you stay in the area long-term? These factors often matter more than trying to time the market perfectly."
        ],
        'market_entry': [
            "Entering the real estate market requires careful consideration of: 1) Your financial readiness (stable income, savings for down payment and emergencies), 2) Current market conditions in your target area, 3) Long-term plans and commitment to the area, and 4) The cost comparison between buying vs renting in your market.",
            "The best time to enter the market is when you're financially prepared and ready for long-term homeownership. Focus on your personal readiness rather than trying to predict market peaks and valleys."
        ],
        'finding_realtor': [
            "To find a realtor that meets your needs: 1) Ask for recommendations from friends and family, 2) Read online reviews and check their transaction history, 3) Interview multiple agents and ask about their experience in your target areas/price range, 4) Verify their credentials and specializations, and 5) Ensure they communicate in a way that matches your preferences.",
            "Look for a realtor who: 1) Has experience with your property type and price range, 2) Knows your target neighborhoods well, 3) Has good references from past clients, 4) Communicates clearly and promptly, and 5) Makes you feel comfortable asking questions."
        ],
        'buying': [
            "When considering buying, evaluate: 1) Your down payment savings, 2) Monthly payment affordability including taxes and insurance, 3) Local market conditions and price trends, 4) Your long-term plans for the property, and 5) The condition and potential maintenance costs of properties you're considering.",
            "Important steps in the buying process: 1) Get pre-approved for a mortgage, 2) Find a qualified realtor, 3) Define your must-haves vs. nice-to-haves, 4) Research neighborhoods thoroughly, 5) Budget for closing costs and moving expenses."
        ],
        'selling': [
            "To maximize your property's value when selling: 1) Price it correctly based on recent comparable sales, 2) Enhance curb appeal and make necessary repairs, 3) Stage the home professionally, 4) Use high-quality photography and marketing, and 5) Be flexible with showing times.",
            "Key selling preparation steps: 1) Deep clean and declutter, 2) Address minor repairs and updates, 3) Consider professional staging, 4) Price competitively based on market analysis, 5) Plan for quick responses to offers."
        ],
        'mortgage': [
            "For mortgage success: 1) Check and improve your credit score, 2) Save for a larger down payment to get better rates, 3) Compare offers from multiple lenders, 4) Understand different loan types (conventional, FHA, VA, etc.), 5) Calculate all costs including taxes, insurance, and PMI.",
            "Important mortgage considerations: 1) Fixed vs. adjustable rates, 2) Loan term length, 3) Down payment options, 4) Closing costs and fees, 5) Pre-payment penalties and options."
        ]
    };

    // Initialize chat elements
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-button" onclick="toggleChat()">
            <i class="fas fa-comments"></i>
            <span>Chat with Us</span>
        </div>
        <div class="chat-window">
            <div class="chat-header">
                <span>REX Chat Support</span>
                <span class="chat-close" onclick="toggleChat()">×</span>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message..." onkeypress="handleKeyPress(event)">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Add initial message
    addMessage("Hello! Welcome to REX Chat Support. How can we help you with real estate today?", 'bot');
});

// Global variables
window.chatActive = false;

// Toggle chat window
window.toggleChat = function() {
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.classList.toggle('active');
    window.chatActive = !window.chatActive;
    if (window.chatActive) {
        document.querySelector('.chat-input input').focus();
    }
};

// Handle enter key press
window.handleKeyPress = function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
};

// Send message function
window.sendMessage = function() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Process message and get response
        setTimeout(() => {
            const response = getResponse(message.toLowerCase());
            addMessage(response, 'bot');
        }, 500);
    }
};

// Add message to chat
window.addMessage = function(text, type) {
    const messagesDiv = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Get AI response based on message content
window.getResponse = function(message) {
    // Check for greetings
    if (message.match(/^(hi|hello|hey|greetings)/i)) {
        return getRandomResponse('greetings');
    }
    
    // Check for market timing questions
    if (message.includes('buy now') || message.includes('wait') || 
        message.includes('when should') || message.includes('right time')) {
        return getRandomResponse('market_timing');
    }
    
    // Check for market entry questions
    if (message.includes('good time') || message.includes('enter the market') || 
        message.includes('start investing') || message.includes('begin investing')) {
        return getRandomResponse('market_entry');
    }
    
    // Check for realtor-related questions
    if (message.includes('find a realtor') || message.includes('find an agent') || 
        message.includes('choosing a realtor') || message.includes('choose an agent')) {
        return getRandomResponse('finding_realtor');
    }
    
    // Check for buying-related questions
    if (message.includes('buy') || message.includes('buying') || 
        message.includes('purchase') || message.includes('afford')) {
        return getRandomResponse('buying');
    }
    
    // Check for selling-related questions
    if (message.includes('sell') || message.includes('selling') || 
        message.includes('sale') || message.includes('market my')) {
        return getRandomResponse('selling');
    }
    
    // Check for mortgage-related questions
    if (message.includes('mortgage') || message.includes('loan') || 
        message.includes('finance') || message.includes('down payment')) {
        return getRandomResponse('mortgage');
    }
    
    // Default response
    return responses.default;
};

// Get random response from category
window.getRandomResponse = function(category) {
    const responseList = responses[category];
    return responseList[Math.floor(Math.random() * responseList.length)];
};
