(() => {
  const embedScript = document.currentScript;
  const assetUrl = (path) => new URL(path, embedScript.src).href;
  const widget = document.createElement("div");
  widget.className = "chat-widget";
  widget.id = "chat-widget";

  const iconUrl = assetUrl("../images/shadow-techx-icon.png");
  const contactUrl = assetUrl("../pages/html/contact/contact.html");

  widget.innerHTML = `
    <div class="chat-teaser" id="chat-teaser">
      <span class="status-dot" aria-hidden="true"></span>
      <span>Need help? <strong>Chat with us</strong></span>
      <button class="teaser-dismiss" id="dismiss-teaser" type="button" aria-label="Dismiss chat prompt">×</button>
    </div>
    <section class="chat-panel" id="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" aria-hidden="true">
      <header class="chat-header">
        <div class="chat-brand-mark" aria-hidden="true"><img src="${iconUrl}" alt=""></div>
        <div class="chat-header__copy">
          <h2 id="chat-title"><span>SHADOW</span><strong>TECHX</strong></h2>
          <p><span class="status-dot"></span> Assistant <span class="chat-header__separator">·</span> Online now</p>
        </div>
        <button class="icon-button" id="close-chat" type="button" aria-label="Close chat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>
        </button>
      </header>
      <div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
        <div class="message-row message-row--assistant">
          <div class="message-avatar" aria-hidden="true"><img src="${iconUrl}" alt=""></div>
          <div class="message-content">
            <div class="message-bubble">
              <p>Hello! 👋 I’m the <strong>Shadow Techx Assistant</strong>.</p>
              <p>We build thoughtful websites, mobile apps, custom software, e-commerce platforms, desktop apps, and practical AI tools. What can I help you explore?</p>
            </div>
            <span class="message-time">Just now</span>
          </div>
        </div>
        <div class="suggestions" id="suggestions">
          <p>Suggested questions</p>
          <button type="button" data-question="What services does Shadow Techx offer?">What services do you offer?</button>
          <button type="button" data-question="How much does a project cost?">How much does a project cost?</button>
          <button type="button" data-question="Do you build mobile apps for iOS and Android?">Do you build mobile apps?</button>
          <button type="button" data-question="How do we start a project with Shadow Techx?">How do we start a project?</button>
          <button type="button" data-question="Can I see your work?">Can I see your work?</button>
        </div>
      </div>
      <form class="chat-composer" id="chat-form">
        <label class="sr-only" for="chat-input">Your message</label>
        <input id="chat-input" name="message" type="text" maxlength="500" placeholder="Ask about services, projects, or pricing..." autocomplete="off">
        <button class="send-button" id="send-button" type="submit" aria-label="Send message" disabled>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"></path></svg>
        </button>
      </form>
      <p class="chat-footnote">For project-specific advice, <a href="${contactUrl}">tell us about your project</a>.</p>
    </section>
    <button class="chat-launcher" id="open-chat" type="button" aria-label="Open Shadow Techx Assistant" aria-expanded="false" aria-controls="chat-panel">
      <span class="launcher-glow" aria-hidden="true"></span>
      <img src="${iconUrl}" alt="">
      <span class="launcher-close" aria-hidden="true">×</span>
    </button>`;

  document.body.append(widget);

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${assetUrl("style.css")}?v=7`;
  document.head.append(stylesheet);

  const chatbotScript = document.createElement("script");
  chatbotScript.src = assetUrl("chatbot.js");
  chatbotScript.async = false;
  document.body.append(chatbotScript);
})();
