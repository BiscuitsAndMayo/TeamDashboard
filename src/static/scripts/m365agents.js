(function () {
  "use strict";

  // Initialize Teams SDK
  microsoftTeams.app.initialize().then(function () {
    microsoftTeams.app.getContext().then(function (context) {
      if (context?.app?.host?.name) {
        updateHubState(context.app.host.name);
      }
      updateWelcomeAndInfo();
      initChat();
    });
  });

  // Update Teams host
  function updateHubState(hubName) {
    const hubEl = document.getElementById("hubState");
    if (hubEl) hubEl.innerHTML = "in " + hubName;
  }

  // Welcome + info of the day
  function updateWelcomeAndInfo() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning!" : hour < 18 ? "Good afternoon!" : "Good evening!";
    const welcomeEl = document.getElementById("welcome");
    if (welcomeEl) welcomeEl.innerText = greeting;

    const infoArray = [
      "Tip: Remember to update your timesheets today!",
      "Quote: Teamwork makes the dream work.",
      "Did you know? 75% of project Alpha is completed!",
      "Tip: Take a short break every 2 hours to stay productive."
    ];
    const infoEl = document.getElementById("infoOfTheDay");
    if (infoEl) {
      const randomIndex = Math.floor(Math.random() * infoArray.length);
      infoEl.innerText = infoArray[randomIndex];
    }
  }

  // Chat logic
  function initChat() {
    const chatWindow = document.getElementById("chatWindow");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      const userDiv = document.createElement("div");
      userDiv.className = "chat-message user";
      userDiv.innerText = "You: " + userMessage;
      chatWindow.appendChild(userDiv);

      chatInput.value = "";

      const botDiv = document.createElement("div");
      botDiv.className = "chat-message bot";
      botDiv.innerText = "Bot: Ok";
      chatWindow.appendChild(botDiv);

      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }
})();
