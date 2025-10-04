import React, { useState } from "react";
import { getAIRecommendation } from "../api/ai";

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const aiResponse = await getAIRecommendation(input);
            const aiMessage = { role: "ai", text: aiResponse };

            console.log(aiMessage)
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { role: "ai", text: "Error getting AI response." };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setInput("");
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="w-72 h-96 bg-white shadow-xl rounded-lg flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-2 rounded-t-lg flex justify-between items-center">
                        <span>Ask AI Tour Guide</span>
                        <button onClick={handleToggle} className="text-white text-xl font-bold">×</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-2 rounded ${msg.role === "user"
                                    ? "bg-blue-100 text-right"
                                    : "bg-green-100 text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex p-2 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask for recommendations..."
                            className="flex-grow p-1 border rounded mr-1 text-sm"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={handleToggle}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg focus:outline-none"
                    aria-label="Open AI Chat"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default ChatBox;
