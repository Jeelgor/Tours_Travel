import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL

export const getAIRecommendation = async (query) => {
    try {
        const res = await axios.post(`${apiUrl}/api/ai/ask`, { query });
        console.log(res, 999)
        return res.data;
    } catch (error) {
        console.error("AI API error:", error);
        throw error;
    }
};
