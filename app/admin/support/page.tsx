"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  HelpCircle, 
  Globe, 
  CreditCard, 
  ShoppingBag, 
  Users, 
  Package,
  Settings,
  ChevronRight,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Zap,
  Shield,
  Truck,
  DollarSign,
  Tag,
  Store,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// ── AI Chat Popup Component ──
function AIChatPopup({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hi there! I'm MarketPro AI Assistant. How can I help you today?\n\n• Store setup and configuration\n• Payment and billing questions\n• Product management\n• Shipping and delivery\n• Technical support\n\nJust ask me anything!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const quickReplies = [
    "How do I add products?",
    "Set up payments",
    "Custom domain help",
    "Shipping settings"
  ];

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    let response = "";
    const lowerMsg = userMessage.toLowerCase();

    // AI Response Logic
    if (lowerMsg.includes("domain") || lowerMsg.includes("custom domain")) {
      response = "🌐 **Custom Domain Help**\n\nYou can connect a custom domain on the Growth plan and above. Here's how:\n\n1. Go to **Settings → Domain**\n2. Enter your domain name\n3. Update DNS records (we'll show you exactly what to do)\n4. Wait 24 hours for propagation\n\nNeed more help? Check our DNS Guide or contact our support team!";
    } 
    else if (lowerMsg.includes("payment") || lowerMsg.includes("paystack") || lowerMsg.includes("flutterwave")) {
      response = "💰 **Payment Setup**\n\nTo accept payments on your store:\n\n1. Go to **Settings → Payments**\n2. Choose your payment gateway (Paystack, Flutterwave, etc.)\n3. Enter your API keys\n4. Test the connection\n\nNeed help with specific gateways? Let me know!";
    }
    else if (lowerMsg.includes("product") || lowerMsg.includes("add product") || lowerMsg.includes("inventory")) {
      response = "📦 **Product Management**\n\nTo add products to your store:\n\n1. Go to **Products → Add Product**\n2. Enter product name, description, and price\n3. Upload product images\n4. Set inventory quantity\n5. Click **Save**\n\nYou can also bulk import products using CSV!";
    }
    else if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery") || lowerMsg.includes("logistics")) {
      response = "🚚 **Shipping & Delivery**\n\nTo set up shipping zones:\n\n1. Go to **Settings → Store Settings → Shipping**\n2. Add shipping zones (State, LGA, Station)\n3. Set delivery fees\n4. Configure collection days\n\nYou can set different rates for different locations!";
    }
    else if (lowerMsg.includes("store") || lowerMsg.includes("setup") || lowerMsg.includes("create")) {
      response = "🏪 **Store Setup Guide**\n\nTo set up your store:\n\n1. **Basic Info**: Add your store name, logo, and description\n2. **Contact Details**: Add your email, phone, and address\n3. **Payments**: Connect your payment gateway\n4. **Products**: Add your first product\n5. **Domain**: Connect your custom domain (optional)\n\nYou're almost ready to start selling!";
    }
    else if (lowerMsg.includes("support") || lowerMsg.includes("help") || lowerMsg.includes("contact")) {
      response = "🛟 **Support Options**\n\nYou can reach us through:\n\n• **Live Chat**: Available 24/7 (click the chat button)\n• **Email**: support@marketpro.ng\n• **Phone**: +234 800 000 0000\n• **Help Center**: Browse our articles\n\nWe're here to help!";
    }
    else {
      response = "🤖 **I can help with:**\n\n• Store setup and configuration\n• Payment and billing questions\n• Product management\n• Shipping and delivery\n• Technical support\n\nCould you please rephrase your question? I want to make sure I understand correctly.";
    }

    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
    setIsTyping(false);
  };

  const handleQuickReply = (text: string) => {
    setInput(text);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#C8F135] flex items-center justify-center">
              <Bot size={18} className="text-[#0A2E1A]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">MarketPro AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-500 font-medium">Online</span>
                <span className="text-[10px] text-gray-400">• Ready to help</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "assistant" 
                  ? "bg-[#C8F135]/20" 
                  : "bg-[#0A2E1A]"
              }`}>
                {msg.role === "assistant" ? (
                  <Bot size={14} className="text-[#0A2E1A]" />
                ) : (
                  <User size={14} className="text-white" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                msg.role === "assistant"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  : "bg-[#0A2E1A] text-white"
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#C8F135]/20 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-[#0A2E1A]" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* ── Quick Replies ── */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 text-[10px] font-medium text-[#0A2E1A] dark:text-[#C8F135] bg-gray-100 dark:bg-gray-800 hover:bg-[#C8F135] hover:text-[#0A2E1A] rounded-full transition-all whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* ── Input ── */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-300 dark:disabled:bg-gray-700 text-[#C8F135] rounded-xl transition-all flex items-center gap-2 shrink-0"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>

        {/* ── Footer ── */}
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <p className="text-[10px] text-gray-400 text-center">
            AI responses are generated by MarketPro Assistant
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Support Page ──
export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIChat, setShowAIChat] = useState(false);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Package,
      color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
      questions: [
        "How do I create my store?",
        "What payment methods are supported?",
        "How to set up my store settings?"
      ]
    },
    {
      title: "Payments & Billing",
      icon: CreditCard,
      color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
      questions: [
        "How do I connect my payment gateway?",
        "What are the transaction fees?",
        "How to manage subscriptions?"
      ]
    },
    {
      title: "Store Management",
      icon: ShoppingBag,
      color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400",
      questions: [
        "How to add products?",
        "How to manage inventory?",
        "How to process orders?"
      ]
    },
    {
      title: "Domain & Hosting",
      icon: Globe,
      color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400",
      questions: [
        "Can I use my own domain name?",
        "How to connect a custom domain?",
        "DNS configuration guide"
      ]
    }
  ];

  const popularArticles = [
    {
      title: "Can I use my own domain name?",
      description: "Yes. On the Growth plan and above, you can connect a custom domain (e.g. amakafashion.com) to your MarketPro store. Go to Settings → Domain → Add Custom Domain.",
      link: "/admin/settings/domain",
      icon: Globe
    },
    {
      title: "How to set up payments",
      description: "Connect Paystack, Flutterwave, or other payment gateways to start accepting payments.",
      link: "/admin/settings/payments",
      icon: CreditCard
    },
    {
      title: "Managing your products",
      description: "Learn how to add, edit, and organize your products effectively.",
      link: "/admin/product",
      icon: Package
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* ── Header ── */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Help & Support</h1>
        <p className="text-xs text-gray-400 mt-0.5">Find answers to common questions and get help</p>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 focus:border-[#0A2E1A] transition-all"
        />
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "AI Chat", icon: Bot, action: () => setShowAIChat(true), color: "bg-[#C8F135]/10 text-[#0A2E1A]" },
          { label: "Email Support", icon: Mail, action: "#", color: "bg-blue-50 text-blue-600" },
          { label: "Call Us", icon: Phone, action: "#", color: "bg-green-50 text-green-600" },
          { label: "Documentation", icon: ExternalLink, action: "#", color: "bg-purple-50 text-purple-600" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={typeof item.action === "function" ? item.action : undefined}
            className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all ${item.color}`}
          >
            <item.icon size={18} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* ── FAQ Categories ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {faqCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                  <Icon size={16} />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{category.title}</h3>
              </div>
              <div className="p-4 space-y-2">
                {category.questions.map((question) => (
                  <button
                    key={question}
                    className="w-full text-left text-xs text-gray-600 dark:text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#C8F135] py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-between group"
                  >
                    <span>{question}</span>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Popular Articles ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Popular Articles</h2>
        </div>
        <div className="p-5 space-y-3">
          {popularArticles.map((article, index) => {
            const Icon = article.icon;
            return (
              <Link
                key={index}
                href={article.link}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 group-hover:text-[#0A2E1A] dark:group-hover:text-[#C8F135] transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{article.description}</p>
                </div>
                <ArrowRight size={16} className="text-gray-400 group-hover:text-[#0A2E1A] dark:group-hover:text-[#C8F135] transition-all" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Contact Support ── */}
      <div className="bg-gradient-to-r from-[#0A2E1A] to-[#060F09] rounded-xl p-6 text-center border border-[#C8F135]/20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#C8F135]/20 flex items-center justify-center">
            <MessageCircle size={24} className="text-[#C8F135]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Chat with AI Assistant</h3>
            <p className="text-white/50 text-xs">Get instant help from our AI support bot</p>
          </div>
          <button
            onClick={() => setShowAIChat(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C8F135] hover:bg-[#B8E025] text-[#0A2E1A] text-sm font-semibold rounded-lg transition-all"
          >
            <Bot size={16} />
            Start AI Chat
          </button>
          <p className="text-white/30 text-[10px]">Available 24/7 · Instant responses</p>
        </div>
      </div>

      {/* ── AI Chat Popup ── */}
      {showAIChat && <AIChatPopup onClose={() => setShowAIChat(false)} />}
    </div>
  );
}