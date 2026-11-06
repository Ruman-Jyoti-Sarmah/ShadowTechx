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
  ["website", "websites", "Business sites, landing pages and web apps. Fast, works on phones, and you can edit the text yourself.", assetUrl("../pages/html/website-development/website-development.html")],
  ["mobile", "mobile apps", "Android and iOS from one codebase, usually React Native or Flutter. We also handle the store submissions.", assetUrl("../pages/html/mobile-app-development/mobile-app-development.html")],
  ["custom software", "custom software", "Admin panels, stock systems, billing, staff tools. Basically the proper version of whatever spreadsheet you're using now.", assetUrl("../pages/html/custom-software-development/custom-software-development.html")],
  ["desktop", "desktop apps", "For work that needs the actual machine: files on disk, printers, scanners, barcode readers, or no internet.", assetUrl("../pages/html/desktop-software-development/desktop-software-development.html")],
  ["e-commerce", "online stores", "Catalogue, cart, checkout and payments with Razorpay, Stripe or UPI. Including the boring parts like order emails and stock.", assetUrl("../pages/html/ecommerce-development/ecommerce-development.html")],
  ["ai", "AI features", "Small, specific jobs: search your documents, draft routine replies, sort messages. We only add it where it saves real time.", assetUrl("../pages/html/ai-solutions/ai-solutions.html")]
];

const quickAnswers = [
  {
    matches: /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i,
    text: "Hey! This is a small bot that answers the usual questions \u2014 the actual team is Ruman, Amlan and the Shadow Techx crew. What are you trying to build?"
  },
  {
    matches: /\b(service|services|what do you build|what do you offer|capabilit)\b/i,
    text: "Six things: websites, mobile apps, custom software, desktop apps, online stores, and small AI features. Most projects end up being one of the first three.",
    link: ["See all six", servicesUrl]
  },
  {
    matches: /\b(price|pricing|cost|budget|quote|how much|rate|estimate)\b/i,
    text: "Websites start at \u20b94,999 for 1\u20133 pages, \u20b99,999 for up to 6, and \u20b917,999 for up to 10. Apps and custom software get quoted per project \u2014 we need to know the scope first, and we don't guess.",
    link: ["See the website packages", assetUrl("../pages/html/home/home.html#pricing")]
  },
  {
    matches: /\b(mobile|android|ios|iphone|app development|app build|application)\b/i,
    text: "Yes. Android and iOS from one codebase, usually React Native or Flutter. Cheaper to build and cheaper to maintain than two separate apps.",
    link: ["More on mobile apps", serviceDetails[1][3]]
  },
  {
    matches: /\b(how long|timeline|deadline|when can|how quickly|duration)\b/i,
    text: "A 3\u20136 page website is 2\u20133 weeks. A web app or mobile app is 6\u201312 weeks depending on scope. You get the date in writing before we start.",
    link: ["Tell us your deadline", projectUrl]
  },
  {
    matches: /\b(start|begin|process|next step|work with|hire|project|consult|contact|talk)\b/i,
    text: "Send us a paragraph. That's genuinely enough \u2014 no brief or spec needed. We'll reply within a working day with questions and a rough price.",
    link: ["Start a project", projectUrl]
  },
  {
    matches: /\b(own|ownership|source code|the code|repo|github|lock in|lock-in)\b/i,
    text: "You own everything at handover: the repo, the hosting, the domain, the logins. If you want to move to another developer later, we'll help with the transfer instead of making it hard.",
    link: ["Ask us about it", projectUrl]
  },
  {
    matches: /\b(portfolio|work|project examples|case stud|example)\b/i,
    text: "Six live sites on the work page \u2014 an online store, three resort sites, a car dealership and a restaurant. All clickable, nothing mocked up. There's also a 3D one if you want to see what the creative team can do.",
    link: ["See the live projects", workUrl]
  },
  {
    matches: /\b(team|founder|founders|who are you|about shadow|about you)\b/i,
    text: "Shadow Techx was founded by Ruman Jyoti Sarmah and co-founded by Amlan Phukan. Under them we have four teams: technical, creative, AI & innovation, and business & management. Ruman leads client projects; Amlan leads engineering delivery.",
    link: ["Meet the team", aboutUrl + "#team"]
  },
  {
    matches: /\b(where|location|based|assam|india|office)\b/i,
    text: "We're based in Assam, India, and work with clients anywhere. Most communication happens over email and calls, and we'll do video when it helps.",
    link: ["Tell us where you are", projectUrl]
  },
  {
    matches: /\b(email|phone|whatsapp|instagram|social|reach you|address|reply)\b/i,
    text: "The contact form goes straight to our inbox and you'll get a reply within one working day. We don't publish a phone number \u2014 too many spam calls.",
    link: ["Send us a message", projectUrl]
  },
  {
    matches: /\b(privacy|password|secure|sensitive|data)\b/i,
    text: "Don't put passwords or card details in this chat or the form. If a project needs access to anything, we'll ask for it properly once we've agreed to work together.",
    link: ["Read the privacy notice", assetUrl("../pages/html/privacy-policy/privacy-policy.html")]
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
    text: "I only know the usual questions \u2014 services, prices, timelines, who we are. For anything else, message the team directly and you'll get a real answer.",
    link: ["Message Ruman and Amlan", projectUrl]
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
