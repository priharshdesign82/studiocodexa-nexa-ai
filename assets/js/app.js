/* ==========================================================================
   NEXAAI - MAIN APPLICATION JAVASCRIPT
   Template: NexaAI - AI Support Agents SaaS HTML Template
   Author: NexaTheme
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. AOS INITIALIZATION (Animations)
     ------------------------------------------------------------------------ */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      disable: 'mobile'
    });
  }

  /* ------------------------------------------------------------------------
     2. HEADER SCROLL EFFECT (Glassmorphism)
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.nx-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ------------------------------------------------------------------------
     3. SCROLL TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const scrollTopWrapper = document.getElementById('scrollTopWrapper');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  if (scrollTopWrapper && scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopWrapper.classList.toggle('show-wrapper', window.scrollY > 400);
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     4. PRICING PLAN TOGGLE (Monthly / Yearly)
     ------------------------------------------------------------------------ */
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    const priceAmounts = document.querySelectorAll('.price-amount');
    const textMonthly = document.getElementById('text-monthly');
    const textYearly = document.getElementById('text-yearly');

    pricingToggle.addEventListener('change', function () {
      const isYearly = this.checked;

      // Update text colors
      textMonthly.classList.replace(isYearly ? 'text-white' : 'text-muted', isYearly ? 'text-muted' : 'text-white');
      textYearly.classList.replace(isYearly ? 'text-muted' : 'text-white', isYearly ? 'text-white' : 'text-muted');

      // Update prices based on data attributes
      priceAmounts.forEach(price => {
        price.textContent = price.getAttribute(isYearly ? 'data-yearly' : 'data-monthly');
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. HERO LIVE TERMINAL TYPING EFFECT
     ------------------------------------------------------------------------ */
  const terminal = document.getElementById('liveTerminal');
  if (terminal) {
    const logs = [
      "Receiving Ticket <span class='keyword'>#9942</span>...",
      "Extracting intent: <span class='text-white'>Order Status</span>",
      "Querying Shopify API...",
      "Status: <span class='success'>Shipped</span>. Drafting response.",
      "Ticket <span class='keyword'>#9942</span> <span class='success'>Resolved Autonomously</span>.",
      "---",
      "Receiving Ticket <span class='keyword'>#9943</span>...",
      "Extracting intent: <span class='text-white'>Billing Issue</span>",
      "High complexity detected. Routing to human agent...",
      "Escalated to <span class='warning'>Tier 2 Support</span>.",
      "---"
    ];

    let logIndex = 0;

    function addLog() {
      // Prevent terminal from filling up indefinitely (keeps last 6 lines)
      if (terminal.childElementCount > 6) {
        terminal.removeChild(terminal.firstChild);
      }

      const logElement = document.createElement('div');
      logElement.className = 'log-line';
      logElement.innerHTML = `> ${logs[logIndex]}`;

      terminal.appendChild(logElement);
      logIndex = (logIndex + 1) % logs.length;
      
      // Random delay between 1 and 3 seconds for realistic typing feel
      const nextDelay = Math.random() * 2000 + 1000;
      setTimeout(addLog, nextDelay);
    }
    setTimeout(addLog, 1000);
  }

  /* ------------------------------------------------------------------------
     6. LANGCHAIN SCROLL-SPY (Sticky Left Menu)
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('.nx-content-block');
  const navLinks = document.querySelectorAll('.nx-sticky-nav .nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    
    // Intersection Observer to highlight active section
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Triggers slightly above center
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          
          // Add in-view class to content block (for CSS fades)
          sections.forEach(sec => sec.classList.remove('in-view'));
          entry.target.classList.add('in-view');

          // Highlight corresponding sticky menu link
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll on click for sticky menu items
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerOffset = 120; // Prevent header from overlapping content
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. INTERACTIVE CHATBOT WIDGET
     ------------------------------------------------------------------------ */
  const chatElements = {
    btn: document.getElementById('nxChatBtn'),
    notif: document.getElementById('chatNotification'),
    window: document.getElementById('nxChatWindow'),
    closeBtn: document.getElementById('closeChatBtn'),
    body: document.getElementById('chatWindowBody'),
    input: document.getElementById('chatInputField'),
    sendBtn: document.getElementById('sendMsgBtn')
  };

  const aiResponses = [
    "Integrating NexaAI takes under 60 seconds. Want the guide?",
    "Our Starter plan is $49/mo, with 1,000 resolutions included.",
    "Yes, NexaAI is fully SOC2 Type II compliant.",
    "Absolutely. Our AI matches your unique brand tone seamlessly.",
    "We offer a 14-day free trial. No credit card required."
  ];

  // 7a. Auto Notification & Pulsing effect
  if (chatElements.btn && chatElements.notif) {
    setTimeout(() => {
      if (!chatElements.window.classList.contains('active')) {
        chatElements.notif.classList.add('show-notif');
      }
      setTimeout(() => chatElements.notif.classList.remove('show-notif'), 8000);
    }, 3000);

    setInterval(() => {
      if (!chatElements.window.classList.contains('active')) {
        chatElements.btn.classList.add('pulse-anim');
        setTimeout(() => chatElements.btn.classList.remove('pulse-anim'), 1000);
      }
    }, 8000);
  }

  // 7b. Toggle Chat Window
  function toggleChatWindow() {
    if(chatElements.window) chatElements.window.classList.toggle('active');
    if(chatElements.notif) chatElements.notif.classList.remove('show-notif');
    if(chatElements.btn) chatElements.btn.classList.remove('pulse-anim');
  }

  if (chatElements.btn) chatElements.btn.addEventListener('click', toggleChatWindow);
  if (chatElements.closeBtn) chatElements.closeBtn.addEventListener('click', toggleChatWindow);

  // 7c. Messaging Logic
  function scrollChatToBottom() { 
    if (chatElements.body) chatElements.body.scrollTop = chatElements.body.scrollHeight; 
  }

  function handleSendMessage() {
    if (!chatElements.input || !chatElements.body) return;
    const text = chatElements.input.value.trim();
    if (text === '') return;

    // Append User Message
    const userBubble = `<div class="chat-bubble user-bubble align-self-end"><p class="mb-0">${text}</p></div>`;
    chatElements.body.insertAdjacentHTML('beforeend', userBubble);
    chatElements.input.value = '';
    scrollChatToBottom();

    // Show Typing Indicator
    const typingId = 'typing-' + Date.now();
    const typingHTML = `
      <div class="chat-bubble ai-bubble align-self-start typing-indicator-bubble" id="${typingId}">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>`;
    chatElements.body.insertAdjacentHTML('beforeend', typingHTML);
    scrollChatToBottom();

    // Append AI Response
    setTimeout(() => {
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();
      
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiBubble = `<div class="chat-bubble ai-bubble align-self-start"><p class="mb-0">${response}</p></div>`;
      chatElements.body.insertAdjacentHTML('beforeend', aiBubble);
      scrollChatToBottom();
    }, 1500); // 1.5s typing delay
  }

  if (chatElements.sendBtn) chatElements.sendBtn.addEventListener('click', handleSendMessage);
  if (chatElements.input) {
    chatElements.input.addEventListener('keypress', (e) => { 
      if (e.key === 'Enter') handleSendMessage(); 
    });
  }

  /* ------------------------------------------------------------------------
     8. GSAP BATCH ANIMATIONS (Client Logos Reveal)
     ------------------------------------------------------------------------ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const logos = document.querySelectorAll('.client-logo-text');
    
    if (logos.length > 0) {
      gsap.set(logos, { y: 40, opacity: 0, scale: 0.9 });
      ScrollTrigger.batch(logos, {
        start: "top 85%",
        onEnter: elements => gsap.to(elements, { 
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)", overwrite: true 
        }),
        onLeaveBack: elements => gsap.to(elements, { 
          y: 40, opacity: 0, scale: 0.9, duration: 0.4, overwrite: true 
        })
      });
    }
  }

  /* ------------------------------------------------------------------------
     9. PARTICLES NETWORK (Fallback / Optional usage)
     ------------------------------------------------------------------------ */
  if (typeof tsParticles !== 'undefined') {
    const particleEl = document.getElementById("tsparticles-network");
    if (particleEl) {
      tsParticles.load("tsparticles-network", {
        fpsLimit: 60,
        interactivity: { events: { resize: true } },
        particles: {
          color: { value: ["#00D4FF", "#6C63FF"] },
          links: { color: "#00D4FF", distance: 140, enable: true, opacity: 0.05, width: 1 },
          move: { enable: true, speed: 0.5 },
          number: { density: { enable: true, area: 800 }, value: 50 },
          opacity: { value: 0.1 },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      });
    }
  }

});