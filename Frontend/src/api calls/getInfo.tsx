interface Info {
    id: number | null;
    gender: string;
    year_of_birth: number | null;
    num_edu: number | null;
    language: string;
    participant_code: string;
    uuid: string;
}
export const getInfo = async (
    id: string | undefined,
    setInfo: React.Dispatch<React.SetStateAction<Info[]>>
) => {
    const backendHost = window.RUNTIME_CONFIG.BACKEND_HOST || "localhost";
    const backendPort = window.RUNTIME_CONFIG.BACKEND_PORT || 3000;
    const endpoint = `http://${backendHost}:${backendPort}/info/${id}`;
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
        setInfo(data);
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
