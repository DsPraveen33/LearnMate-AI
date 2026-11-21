import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import type { ChatMessage } from '../../types';
import { api } from '../../services/api';

interface AIMentorPageProps {
  studentId: number;
  pathwayTitle?: string;
  active: boolean;
}

export const AIMentorPage: React.FC<AIMentorPageProps> = ({ studentId, pathwayTitle, active }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Explain the ReAct agent loop step-by-step',
    'How do conditional edges work in LangGraph?',
    'Generate a 3-day study schedule for Vector DBs',
    'Compare BM25 Sparse vs Dense Vector Search',
    'How will IBM Granite 3.0 integrate with LangChain?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (active) scrollToBottom();
  }, [active, messages, isTyping, error]);

  const handleSend = async (suggestion?: string) => {
    const text = (suggestion ?? inputValue).trim();
    if (!text || isTyping) return;

    const history = messages.slice(-8).map(message => ({
      role: message.sender,
      content: message.text.slice(0, 2000),
    }));
    while (history.reduce((length, turn) => length + turn.content.length, 0) > 6000) {
      history.splice(0, 2);
    }
    const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(), sender: 'user', timestamp: timestamp(), text,
    };

    setError('');
    setMessages(previous => [...previous, userMessage]);
    if (!suggestion) setInputValue('');
    setIsTyping(true);
    try {
      const result = await api.sendMentorMessage({student_id: studentId, message: text, history});
      setMessages(previous => [...previous, {
        id: crypto.randomUUID(), sender: 'assistant', timestamp: timestamp(), text: result.reply,
      }]);
    } catch (error) {
      setMessages(previous => previous.filter(message => message.id !== userMessage.id));
      if (!suggestion) setInputValue(text);
      setError(error instanceof Error ? error.message : 'The Mentor could not reply. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden animate-in fade-in duration-200">
      {/* Mentor Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                LearnMate AI Mentor
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Coach
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {pathwayTitle ? `Roadmap: ${pathwayTitle}` : 'Ask about your learning goals'}
            </p>
          </div>
        </div>

        <button
          disabled={isTyping}
          onClick={() => { setMessages([]); setInputValue(''); setError(''); }}
          className="text-xs text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 flex items-center gap-1 cursor-pointer transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        {messages.length === 0 && (
          <p className="text-sm text-slate-600">Ask IBM Granite about your roadmap or a topic you are learning.</p>
        )}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-xs'
                }`}
              >
                {isUser ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              {/* Message bubble */}
              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Code snippet block if any */}
                {msg.codeSnippet && (
                  <div className="mt-3 relative">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 text-slate-300 text-[11px] rounded-t-xl font-mono">
                      <span>Python Snippet</span>
                      <button
                        onClick={() => handleCopyCode(msg.codeSnippet!, msg.id)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-b-xl text-xs font-mono overflow-x-auto leading-relaxed border border-t-0 border-slate-800">
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Quick Action Suggestion Chips */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {msg.actions.map((act) => (
                      <button
                        key={act}
                        onClick={() => handleSend(act)}
                        className="text-[11px] font-semibold bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] text-right ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-lg items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Waiting for IBM Granite...</span>
            </div>
          </div>
        )}

        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Shelf */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Prompts:
        </span>
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            disabled={isTyping}
            onClick={() => handleSend(prompt)}
            className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white text-slate-700 hover:text-indigo-600 hover:border-indigo-300 border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            aria-label="Message for AI Mentor"
            maxLength={2000}
            disabled={isTyping}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask your AI Mentor about state graphs, tool calls, or course topics..."
            className="flex-1 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-hidden text-slate-800 placeholder-slate-400 transition-all"
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer shadow-sm shadow-indigo-500/20"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
