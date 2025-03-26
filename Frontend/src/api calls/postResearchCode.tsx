export const postResearchCode = async (code: string) => {
    const postData = {
        code: code,
    };

    const backendHost = "neuroepitool-web-rug-nl-backend";
    const backendPort = 3000;
    const endpoint = `http://${backendHost}:${backendPort}/code`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Propagate the error up if needed
    }
};
