import React, { useEffect, useRef, useState } from "react";
import { getAIRecommendation } from "../api/ai";

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = {
            id: Date.now(),
            role: "user",
            text: input,
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await getAIRecommendation(input);

            const aiMsg = {
                id: Date.now() + 1,
                role: "ai",
                text: res.answer || "No answer received",
                sources: res.sources || [],
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    role: "ai",
                    text: "⚠️ Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <div className="w-80 h-[460px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">AI Travel Assistant</p>
                            <p className="text-xs opacity-80">Ask anything about tours</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-gray-50">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>

                                {msg.role === "ai" && (
                                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                                        AI
                                    </div>
                                )}

                                <div
                                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-sm"
                                        : "bg-white border rounded-bl-sm shadow-sm"
                                        }`}
                                >
                                    {msg.text}

                                    {msg.sources?.length > 0 && (
                                        <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                                            <p className="font-medium mb-1">Related Tours</p>
                                            <ul className="space-y-1">
                                                {msg.sources.slice(0, 3).map(src => (
                                                    <li key={src.id} className="hover:text-blue-600 cursor-pointer">
                                                        • {src.tour_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {msg.role === "user" && (
                                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                                        You
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="text-sm text-gray-500 animate-pulse">
                                AI is typing…
                            </div>
                        )}

                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t bg-white flex gap-2">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && sendMessage()}
                            placeholder="Ask about destinations, budget, etc..."
                            className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full text-sm shadow disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform text-white p-4 rounded-full shadow-xl"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default ChatBox;