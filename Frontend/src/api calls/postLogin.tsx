export const postLogin = async (email: string, password: string) => {
    const postData = {
        email: email,
        password: password,
    };

    const backendHost = window.RUNTIME_CONFIG.BACKEND_HOST || "localhost";
    const backendPort = window.RUNTIME_CONFIG.BACKEND_PORT || 3000;
    const endpoint = `http://${backendHost}:${backendPort}/login`;

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
