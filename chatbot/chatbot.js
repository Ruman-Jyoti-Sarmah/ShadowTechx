const widget = document.getElementById("chat-widget");
const panel = document.getElementById("chat-panel");
const launcher = document.getElementById("open-chat");
const closeButton = document.getElementById("close-chat");
const teaser = document.getElementById("chat-teaser");
const dismissTeaser = document.getElementById("dismiss-teaser");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("chat-messages");
const suggestions = document.getElementById("suggestions");
const chatbotScriptUrl = document.currentScript.src;
const assetUrl = (path) => new URL(path, chatbotScriptUrl).href;
const projectUrl = assetUrl("../pages/html/contact/contact.html");
const servicesUrl = assetUrl("../pages/html/services/services.html");
const workUrl = assetUrl("../pages/html/work/work.html");
const aboutUrl = assetUrl("../pages/html/about/about.html");

const serviceDetails = [
  ["website", "website development", "Responsive websites and web applications, from company sites and landing pages to portals and dashboards.", assetUrl("../pages/html/website-development/website-development.html")],
  ["mobile", "mobile app development", "Android and iOS apps, built natively or with a shared cross-platform codebase when that fits the product.", assetUrl("../pages/html/mobile-app-development/mobile-app-development.html")],
  ["custom software", "custom software", "Purpose-built business workflows, applications, admin panels, and integrations.", assetUrl("../pages/html/custom-software-development/custom-software-development.html")],
  ["desktop", "desktop applications", "Desktop tools for Windows, macOS, and Linux, planned around the way people use them.", assetUrl("../pages/html/desktop-software-development/desktop-software-development.html")],
  ["e-commerce", "e-commerce", "Online storefronts, product catalogues, checkout experiences, and business integrations.", assetUrl("../pages/html/ecommerce-development/ecommerce-development.html")],
  ["ai", "applied AI", "Practical AI features such as knowledge retrieval, internal assistants, and task automation—with data handling considered up front.", assetUrl("../pages/html/ai-solutions/ai-solutions.html")]
];

const quickAnswers = [
  {
    matches: /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i,
    text: "Hello! 👋 I can help you explore our services, discuss how a project starts, or find the right next step. What are you thinking of building?"
  },
  {
    matches: /\b(service|services|what do you build|what do you offer|capabilit)\b/i,
    text: "Shadow Techx builds responsive websites and web applications, Android and iOS apps, custom business software, desktop apps, e-commerce platforms, and practical AI features. Tell me what you have in mind and I can point you to the closest fit.",
    link: ["Explore all services", servicesUrl]
  },
  {
    matches: /\b(price|pricing|cost|budget|quote|how much|rate|estimate)\b/i,
    text: "Project cost depends on the scope, features, platforms, integrations, and timeline, so we don’t quote a one-size-fits-all price here. Share a little about what you need and the team can discuss a suitable scope and estimate with you.",
    link: ["Discuss your project", projectUrl]
  },
  {
    matches: /\b(mobile|android|ios|iphone|app development|app build|application)\b/i,
    text: "Yes. Shadow Techx builds mobile apps for Android and iOS. A project can use native development or a shared cross-platform codebase, depending on the product and its requirements.",
    link: ["Explore mobile app development", serviceDetails[1][3]]
  },
  {
    matches: /\b(start|begin|process|next step|work with|hire|project|consult|contact|talk)\b/i,
    text: "You don’t need a finished specification to get started. Share the goal, who the product is for, its current stage, and any questions you have. The team can then clarify the opportunity and discuss practical next steps.",
    link: ["Start a project inquiry", projectUrl]
  },
  {
    matches: /\b(portfolio|work|project examples|case stud)\b/i,
    text: "You can browse selected Shadow Techx projects on the work page. If you have a similar idea, include it in a project inquiry and the team can discuss what may fit.",
    link: ["See selected work", workUrl]
  },
  {
    matches: /\b(team|founder|founders|who are you|about shadow|about you)\b/i,
    text: "Shadow Techx is an independent digital product team founded by Ruman Jyoti Sarmah and Amlan Phukan. The founders work directly with clients on project conversations, scope, and delivery plans.",
    link: ["Meet the team", aboutUrl]
  },
  {
    matches: /\b(email|phone|whatsapp|instagram|social|reach you|address|location)\b/i,
    text: "The safest way to reach the team about a project is through the consultation page. You can describe your goals there without needing a finished specification.",
    link: ["Contact Shadow Techx", projectUrl]
  },
  {
    matches: /\b(privacy|password|secure|sensitive|data)\b/i,
    text: "Please don’t share passwords, payment information, or other sensitive credentials in this chat. For project details, use the consultation page and share only the information needed to explain your idea.",
    link: ["Read our privacy notice", assetUrl("../pages/html/privacy-policy/privacy-policy.html")]
  }
];

function setChatOpen(isOpen) {
  widget.classList.toggle("is-open", isOpen);
  panel.setAttribute("aria-hidden", String(!isOpen));
  launcher.setAttribute("aria-expanded", String(isOpen));
  launcher.setAttribute("aria-label", isOpen ? "Close Shadow Techx Assistant" : "Open Shadow Techx Assistant");
  if (isOpen) {
    teaser.hidden = true;
    window.setTimeout(() => input.focus(), 120);
  } else {
    launcher.focus();
  }
}

function appendMessage(text, sender, link) {
  const row = document.createElement("div");
  row.className = `message-row message-row--${sender}`;
  const content = document.createElement("div");
  content.className = "message-content";
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  bubble.append(paragraph);
  content.append(bubble);

  if (link) {
    const anchor = document.createElement("a");
    anchor.className = "message-link";
    anchor.href = link[1];
    anchor.textContent = `${link[0]} ↗`;
    content.append(anchor);
  }

  const time = document.createElement("span");
  time.className = "message-time";
  time.textContent = "Just now";
  content.append(time);

  if (sender === "assistant") {
    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.src = assetUrl("../images/shadow-techx-icon.png");
    image.alt = "";
    avatar.append(image);
    row.append(avatar);
  }

  row.append(content);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
}

function appendTypingIndicator() {
  const row = document.createElement("div");
  row.className = "message-row message-row--assistant message-row--typing";
  row.setAttribute("role", "status");
  row.setAttribute("aria-label", "Shadow Techx Assistant is thinking");

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  image.src = assetUrl("../images/shadow-techx-icon.png");
  image.alt = "";
  avatar.append(image);

  const bubble = document.createElement("div");
  bubble.className = "typing-bubble";
  bubble.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 3; index += 1) {
    bubble.append(document.createElement("span"));
  }

  row.append(avatar, bubble);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
  return row;
}

function findAnswer(question) {
  const service = serviceDetails.find(([keyword]) => question.toLowerCase().includes(keyword));
  if (service) {
    return {
      text: `${service[1][0].toUpperCase()}${service[1].slice(1)}: ${service[2]}`,
      link: [`Explore ${service[1]}`, service[3]]
    };
  }

  return quickAnswers.find(({ matches }) => matches.test(question)) || {
    text: "I can help with Shadow Techx services, project costs, mobile apps, the team, or how to get started. What kind of digital product are you considering?",
    link: ["Explore our services", servicesUrl]
  };
}

function sendMessage(text) {
  const question = text.trim();
  if (!question) return;

  suggestions.hidden = true;
  appendMessage(question, "user");
  const answer = findAnswer(question);
  const typingIndicator = appendTypingIndicator();
  window.setTimeout(() => {
    typingIndicator.remove();
    appendMessage(answer.text, "assistant", answer.link);
  }, 650);
}

launcher.addEventListener("click", () => setChatOpen(!widget.classList.contains("is-open")));
document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", () => setChatOpen(true));
});
closeButton.addEventListener("click", () => setChatOpen(false));
dismissTeaser.addEventListener("click", () => { teaser.hidden = true; });
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = input.value;
  if (!message.trim()) return;
  input.value = "";
  sendButton.disabled = true;
  sendMessage(message);
  input.focus();
});
input.addEventListener("input", () => {
  sendButton.disabled = !input.value.trim();
});
suggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-question]");
  if (!button) return;
  sendMessage(button.dataset.question);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && widget.classList.contains("is-open")) setChatOpen(false);
});
