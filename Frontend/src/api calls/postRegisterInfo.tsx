export const postRegisterInfo = async (email: string, password: string) => {
    const postData = {
        email: email,
        password: password,
    };

    const backendHost = "neuroepitool-web-rug-nl-backend";
    const backendPort = 3000;
    const endpoint = `http://${backendHost}:${backendPort}/register`;

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
