// Toggle Chatbox Visibility
function toggleChat() {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = (chatbox.style.display === "none" || chatbox.style.display === "") ? "flex" : "none";
}

// Send User Message & Get Bot Response
function sendMessage() {
    const inputField = document.getElementById("chat-input");
    const message = inputField.value.trim();
    if (message === "") return;

    const chatMessages = document.getElementById("chat-messages");

    // Add User Message
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    inputField.value = "";

    // Bot Response Simulation
    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = getBotResponse(message);
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// **Updated Bot Responses Based on Website Purpose**
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (input.includes("report")) {
        return "To report an issue, please visit the 'Support' page and submit a form.";
    } else if (input.includes("reset password")) {
        return "You can reset your password from the login page.";
    } else if (input.includes("how does metasafe work")) {
        return "Metaसेफ़ provides AI-powered moderation, blockchain security, and safe digital spaces.";
    } else if (input.includes("is metasafe free")) {
        return "Yes! Metaसेफ़ is free to use for all users.";
    } else if (input.includes("can i join without an account")) {
        return "You'll need to sign up to access communities and participate in discussions.";
    } else if (input.includes("how to stay safe online")) {
        return "Stay safe by avoiding sharing personal details, reporting abuse, and using strong passwords.";
    } else if (input.includes("how to contact support")) {
        return "You can contact us via the support form or email support@metasafe.com.";
    } else if (input.includes("how do i join a community")) {
        return "Sign up and explore different communities to join discussions.";
    } else if (input.includes("can i delete my account")) {
        return "You can delete your account by going to account settings after logging in.";
    } else if (input.includes("do you have a mobile app")) {
        return "We're working on it! Stay tuned for updates.";
    } else {
        return "I'm here to help! Can you provide more details?";
    }
}