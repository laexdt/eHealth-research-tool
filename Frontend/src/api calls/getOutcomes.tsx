interface OutcomeData {
    section: string;
    outcome: string;
    id: string;
    uuid: string;
}

export const getOutcomes = async (
    id: string | undefined,
    setData: React.Dispatch<React.SetStateAction<OutcomeData[]>>
) => {
    const backendHost = window.RUNTIME_CONFIG.BACKEND_HOST || "localhost";
    const backendPort = window.RUNTIME_CONFIG.BACKEND_PORT || 3000;
    const endpoint = `http://${backendHost}:${backendPort}/outcome/${id}`;
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
