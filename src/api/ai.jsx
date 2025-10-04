import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL

export const getAIRecommendation = async (userPrompt) => {
    try {
        const res = await axios.post(`${apiUrl}/api/ai/recommend`, { userPrompt });
        return res.data.message;
    } catch (error) {
        console.error("AI API error:", error);
        throw error;
    }
};
