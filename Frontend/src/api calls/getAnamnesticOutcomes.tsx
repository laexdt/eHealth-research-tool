interface AnamnesticOutcomes {
    id: number | null;
    outcome: string;
    q_id: number | null;
}

export const getAnamnesticOutcomes = async (
    id: string | undefined,
    setData: React.Dispatch<React.SetStateAction<AnamnesticOutcomes[]>>
) => {
    const backendHost = "neuroepitool-web-rug-nl-backend";
    const backendPort = 3000;
    const endpoint = `http://${backendHost}:${backendPort}/anamnestic_outcomes/${id}`;
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
