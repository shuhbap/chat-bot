const fs = require('fs');
const { writeFile } = require('fs/promises');
const axios = require("axios");

module.exports = {
    /**
     * Write Session To file
     * @param {string} session_id The Unique Id That you got (format: xxx~gistPath)
     * @param {string} authFile The Session File name (default: authfile.json)
     */
    async MakeSession(session_id, authFile = "authfile.json") {
        try {
            // ✅ Direct base URL (no encoding)
            const baseUrl = "https://gist.githubusercontent.com/";

            // ✅ Validate session_id
            if (!session_id || !session_id.includes("~")) {
                throw new Error("Invalid session_id format");
            }

            // 👉 after "~" should be full gist path like:
            // username/gistid/branch/filename.json
            const gistPath = session_id.split("~")[1];

            // ✅ Fetch session JSON
            const url = `${baseUrl}${gistPath}/raw`;
            const response = await axios.get(url, { timeout: 10000 });

            if (!response || !response.data) {
                throw new Error("Empty response from server");
            }

            // ✅ Save (overwrite or create)
            const data = JSON.stringify(response.data, null, 2);
            await writeFile(authFile, data);

            console.log("Session saved to", authFile);
            return true;

        } catch (error) {
            console.error("Session Error:", error.message);
            throw error;
        }
    },
};
