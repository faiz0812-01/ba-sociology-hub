(() => {
  'use strict';

  const form = document.getElementById('ai-form');
  if (!form) return;

  const questionInput = document.getElementById('ai-question');
  const subjectInput = document.getElementById('ai-subject');
  const languageInput = document.getElementById('ai-language');
  const sendButton = document.getElementById('ai-send');
  const clearButton = document.getElementById('ai-clear');
  const retryButton = document.getElementById('ai-retry');
  const count = document.getElementById('ai-count');
  const status = document.getElementById('ai-status');
  const messages = document.getElementById('ai-messages');
  const promptButtons = Array.from(document.querySelectorAll('[data-ai-prompt]'));
  const emptyState = document.getElementById('ai-empty').cloneNode(true);
  const encoder = new TextEncoder();
  const topics = {
    'Sociology': 'socialisation',
    'Philosophy of AI': 'the Turing Test',
    'Philosophy of Education': 'Dewey’s ideas about learning by doing',
    'Development Issues in Indian Economy': 'poverty and inequality in India',
    'Fundamentals of Ethics': 'utilitarianism',
    'Microeconomic Foundation': 'supply and demand',
    'History of Keralam': 'early trade in Keralam',
    'Mathematics': 'the basics of sets and functions',
    'Malayalam': 'the main elements of a short story',
    'English': 'identifying the theme of a poem',
    'Arabic': 'basic Arabic sentence structure'
  };

  // Conversation context exists only in this tab's memory.
  let history = [];
  let available = false;
  let pending = false;
  let checking = false;

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.dataset.state = isError ? 'error' : 'ready';
  }

  function updateControls() {
    sendButton.disabled = !available || pending || checking || !questionInput.value.trim();
    sendButton.textContent = pending ? 'Thinking…' : 'Ask helper →';
    clearButton.disabled = pending || !messages.querySelector('.ai-study-message');
    subjectInput.disabled = pending;
    languageInput.disabled = pending;
    questionInput.readOnly = pending;
    promptButtons.forEach(button => { button.disabled = pending; });
    retryButton.disabled = checking || pending;
    count.textContent = questionInput.value.length + ' / 1200';
    form.setAttribute('aria-busy', String(pending));
  }

  function renderResponseText(paragraph, content) {
    paragraph.replaceChildren();
    const bold = /\*\*([^\n*]+)\*\*/g;
    let cursor = 0;
    let match;
    while ((match = bold.exec(content)) !== null) {
      paragraph.append(document.createTextNode(content.slice(cursor, match.index)));
      const emphasis = document.createElement('strong');
      emphasis.textContent = match[1];
      paragraph.append(emphasis);
      cursor = match.index + match[0].length;
    }
    paragraph.append(document.createTextNode(content.slice(cursor)));
  }

  function appendMessage(role, content, type = '') {
    const empty = messages.querySelector('#ai-empty');
    if (empty) empty.remove();
    const article = document.createElement('article');
    article.className = 'ai-study-message' + (role === 'user' ? ' ai-study-message--user' : '') + (type ? ' ai-study-message--' + type : '');
    const label = document.createElement('strong');
    label.textContent = role === 'user' ? 'You' : '✦ AI Study Helper';
    const text = document.createElement('p');
    if (role === 'assistant') renderResponseText(text, content);
    else text.textContent = content;
    article.append(label, text);
    messages.append(article);
    while (messages.querySelectorAll('.ai-study-message').length > 30) messages.firstElementChild.remove();
    messages.scrollTop = messages.scrollHeight;
    return article;
  }

  function requestHistory(question) {
    const recent = history.slice(-4).map(message => ({
      role: message.role,
      content: message.content.slice(0, 2400)
    }));
    // Malayalam needs several UTF-8 bytes per character. Prefer the newest
    // complete messages and leave headroom for JSON and the server's prompt.
    let bytes = encoder.encode(question).length;
    recent.forEach(message => { bytes += encoder.encode(message.content).length; });
    while (bytes > 6500 && recent.length) {
      bytes -= encoder.encode(recent.shift().content).length;
    }
    return recent;
  }

  async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeout);
    try {
      return await fetch(url, { ...options, signal: controller.signal, cache: 'no-store', credentials: 'same-origin' });
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function checkAvailability() {
    if (checking || pending) return;
    checking = true;
    retryButton.hidden = true;
    setStatus('Checking helper availability…');
    updateControls();
    try {
      const response = await fetchWithTimeout('/api/study-helper/status');
      if (!response.ok) throw new Error('unavailable');
      const result = await response.json();
      available = result.available === true;
      setStatus(available
        ? 'Ready for your question. Check answers against your class notes.'
        : 'The helper is temporarily unavailable. You can still use the study notes and community chat.', !available);
      retryButton.hidden = available;
    } catch {
      available = false;
      setStatus('Could not connect to the helper. Check your connection and try again.', true);
      retryButton.hidden = false;
    } finally {
      checking = false;
      updateControls();
    }
  }

  questionInput.addEventListener('input', updateControls);
  questionInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!sendButton.disabled) form.requestSubmit();
    }
  });

  promptButtons.forEach(button => button.addEventListener('click', () => {
    if (pending) return;
    const topic = topics[subjectInput.value] || 'this topic';
    const suggestions = {
      explain: 'Explain ' + topic + ' in simple terms, with an everyday example.',
      mcqs: 'Make 3 practice MCQs about ' + topic + '. Include the correct answers and short explanations at the end.',
      revise: 'Give me a short revision guide to ' + topic + ', with key ideas and 3 questions to check my understanding.'
    };
    questionInput.value = suggestions[button.dataset.aiPrompt];
    updateControls();
    questionInput.focus();
  }));

  clearButton.addEventListener('click', () => {
    if (pending) return;
    history = [];
    messages.replaceChildren(emptyState.cloneNode(true));
    questionInput.value = '';
    setStatus(available ? 'Conversation cleared. Ask a new study question.' : 'Conversation cleared. The helper is currently unavailable.', !available);
    updateControls();
    questionInput.focus();
  });

  retryButton.addEventListener('click', checkAvailability);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = questionInput.value.trim();
    if (!available || pending || checking || !question) return;
    if (question.length > 1200) {
      setStatus('Please keep your question within 1200 characters.', true);
      return;
    }

    pending = true;
    retryButton.hidden = true;
    const body = {
      question,
      subject: subjectInput.value,
      language: languageInput.value,
      history: requestHistory(question)
    };
    appendMessage('user', question);
    const reply = appendMessage('assistant', 'Working through your question…', 'pending');
    setStatus('The helper is thinking. This may take a few moments.');
    updateControls();

    try {
      const response = await fetchWithTimeout('/api/study-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }, 65000);
      let result;
      try { result = await response.json(); } catch { result = {}; }
      if (!response.ok) {
        const fallback = response.status === 429
          ? 'The question limit has been reached. Please wait before asking again; the daily allowance resets at 5:30 AM IST.'
          : response.status === 503
            ? 'The helper is temporarily unavailable. Please try again in a moment.'
            : 'The helper could not answer this time. Please try again in a moment.';
        const error = new Error(typeof result.error === 'string' ? result.error.slice(0, 500) : fallback);
        throw error;
      }
      if (typeof result.answer !== 'string' || !result.answer.trim()) {
        throw new Error('The helper did not return an answer. Please try a more specific question.');
      }

      const answer = result.answer.trim().slice(0, 6000);
      reply.classList.remove('ai-study-message--pending');
      renderResponseText(reply.querySelector('p'), answer);
      history.push({ role: 'user', content: question }, { role: 'assistant', content: answer });
      history = history.slice(-8);
      questionInput.value = '';
      const remaining = Number.isInteger(result.remaining) && result.remaining >= 0 ? result.remaining : null;
      setStatus(remaining === null
        ? 'You can ask a follow-up. Check answers against your class notes.'
        : remaining + (remaining === 1 ? ' question' : ' questions') + ' left today · allowance resets at 5:30 AM IST.');
    } catch (error) {
      const message = error.name === 'AbortError'
        ? 'The reply took too long. Please try a shorter question in a moment.'
        : error instanceof TypeError
          ? 'Connection interrupted. Check your internet connection and try again.'
          : error.message || 'Could not get an answer. Please try again.';
      reply.classList.remove('ai-study-message--pending');
      reply.classList.add('ai-study-message--error');
      reply.querySelector('p').textContent = message;
      setStatus('Your question is still in the box so you can try again.', true);
    } finally {
      pending = false;
      updateControls();
      messages.scrollTop = messages.scrollHeight;
      questionInput.focus({ preventScroll: true });
    }
  });

  updateControls();
  checkAvailability();
})();
