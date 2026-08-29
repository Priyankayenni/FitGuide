import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { Language, BMIResult, ChatMessage } from '@/types';
import { getChatbotResponse, chatbotSuggestions } from '@/lib/chatbot';

interface AIChatbotProps {
  t: Translation;
  language: Language;
  bmiResult: BMIResult | null;
}

export function AIChatbot({ t, language, bmiResult }: AIChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: t.chatbot.welcome,
        timestamp: Date.now(),
      }]);
    }
  }, [open, messages.length, t.chatbot.welcome]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = (text?: string) => {
    const content = text ?? input.trim();
    if (!content) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getChatbotResponse(content, language, bmiResult);
      setMessages((prev) => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-600 shadow-glow-lg hover:scale-105 active:scale-95 transition-all duration-300 ${open ? 'opacity-0 pointer-events-none' : 'animate-fade-in-up'}`}
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden sm:inline">{t.chatbot.button}</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[80vh] glass-strong rounded-3xl shadow-cinematic flex flex-col animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success-500 border-2 border-white dark:border-ink-800" />
              </div>
              <div>
                <h3 className="font-display font-700 text-sm">{t.chatbot.title}</h3>
                <p className="text-2xs text-success-500 font-500">{t.chatbot.online}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-br-md'
                      : 'bg-neutral-100 dark:bg-ink-700 text-neutral-800 dark:text-neutral-200 rounded-bl-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-neutral-100 dark:bg-ink-700 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce-subtle" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce-subtle" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce-subtle" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {chatbotSuggestions[language].map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-500 bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700/50">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.chatbot.placeholder}
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-ink-700 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 active:scale-95 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
