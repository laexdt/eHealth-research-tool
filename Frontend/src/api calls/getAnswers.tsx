interface Answers {
    section: string;
    q_id: number;
    question: string;
    answer: string;
}

export const getAnswers = async (
    id: string | undefined,
    setData: React.Dispatch<React.SetStateAction<Answers[]>>
) => {
    const backendHost = window.RUNTIME_CONFIG.BACKEND_HOST || "localhost";
    const backendPort = window.RUNTIME_CONFIG.BACKEND_PORT || 3000;
    const endpoint = `http://${backendHost}:${backendPort}/answers/${id}`;
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
