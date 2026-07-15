import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getAssistantReply, defaultSuggestionChips, assistantProfile } from '../../services/assistantEngine.js';
import styles from './AIAssistant.module.css';

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  text: `Hi! I'm ${assistantProfile.name.split(' ')[0]}'s AI assistant 👋 Ask me anything about his skills, projects or experience.`,
  chips: defaultSuggestionChips,
};

const TYPE_SPEED_MS = 14; // ms per character for the typing animation

let messageIdCounter = 1;
const nextId = () => `msg-${Date.now()}-${messageIdCounter++}`;

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 8V4m0 0h-2m2 0h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="9" cy="13.5" r="1.3" fill="currentColor" />
    <circle cx="15" cy="13.5" r="1.3" fill="currentColor" />
    <path d="M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 12L20.5 4l-6 16-3-6.5-7-1.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadPing, setUnreadPing] = useState(true);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus the input when the window opens
  useEffect(() => {
    if (isOpen) {
      setHasOpenedOnce(true);
      setUnreadPing(false);
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Clean up any in-flight typing animation on unmount
  useEffect(() => () => clearTimeout(typingTimeoutRef.current), []);

  const typeOutMessage = useCallback((fullText, chips) => {
    const id = nextId();
    setMessages((prev) => [...prev, { id, role: 'assistant', text: '', chips: [], done: false }]);
    setIsTyping(true);

    let i = 0;
    const step = () => {
      i += 1;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: fullText.slice(0, i) } : m))
      );
      if (i < fullText.length) {
        typingTimeoutRef.current = setTimeout(step, TYPE_SPEED_MS);
      } else {
        setIsTyping(false);
        setMessages((prev) => (prev.map((m) => (m.id === id ? { ...m, chips, done: true } : m))));
      }
    };
    typingTimeoutRef.current = setTimeout(step, TYPE_SPEED_MS);
  }, []);

  const sendMessage = useCallback(
    async (rawText) => {
      const text = rawText.trim();
      if (!text || isTyping) return;

      setMessages((prev) => [...prev, { id: nextId(), role: 'user', text }]);
      setInput('');

      try {
        const history = messages.map((m) => ({ role: m.role, text: m.text }));
        const { text: replyText, chips } = await getAssistantReply(text, history);
        typeOutMessage(replyText, chips || []);
      } catch (err) {
        typeOutMessage(
          "Sorry, I couldn't process that right now. Please try again in a moment.",
          defaultSuggestionChips
        );
      }
    },
    [isTyping, messages, typeOutMessage]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleChipClick = (chip) => {
    sendMessage(chip);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        type="button"
        className={styles.fab}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={isOpen}
      >
        <span className={styles.fabIcon}>{isOpen ? <CloseIcon /> : <BotIcon />}</span>
        {unreadPing && !hasOpenedOnce && <span className={styles.fabPing} aria-hidden="true" />}
      </button>

      {/* Chat window */}
      <div
        className={`${styles.chatWindow} ${isOpen ? styles.chatWindowOpen : ''}`}
        role="dialog"
        aria-label="AI assistant chat"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <div className={styles.headerAvatar}>
            <BotIcon />
          </div>
          <div className={styles.headerText}>
            <span className={styles.headerTitle}>Ask about {assistantProfile.name.split(' ')[0]}</span>
            <span className={styles.headerSubtitle}>
              <span className={styles.statusDot} /> Online · Local assistant
            </span>
          </div>
          <button
            type="button"
            className={styles.headerClose}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body} ref={bodyRef}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${m.role === 'user' ? styles.messageRowUser : ''}`}
            >
              <div className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}>
                {m.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < m.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              {m.role === 'assistant' && m.done && m.chips && m.chips.length > 0 && (
                <div className={styles.inlineChips}>
                  {m.chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      className={styles.chip}
                      onClick={() => handleChipClick(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className={styles.typingIndicator} aria-live="polite">
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
              <span className={styles.typingDot} />
            </div>
          )}
        </div>

        <form className={styles.inputRow} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            className={styles.input}
            aria-label="Type your question"
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default React.memo(AIAssistant);
