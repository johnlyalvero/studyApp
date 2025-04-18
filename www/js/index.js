/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigateTo('brainstorm');  // Load the Brainstorm page when the device is ready
}

// Function to navigate between pages
function navigateTo(page) {
    console.log(`Navigating to: ${page}`); //test

    fetch(`pages/${page}.html`) // Load the HTML content of the requested page
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data; // Insert the loaded HTML into the main content container

            // 🔁 Initialize page-specific logic after the page is loaded
            if (page === "brainstorm") initBrainstormLogic();
        })
        .catch(error => console.error("Error loading the page:", error));
}

// Setup navigation buttons once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnBrainstorm").addEventListener("click", () => navigateTo('brainstorm'));
    document.getElementById("btnTasks").addEventListener("click", () => navigateTo('tasks'));
    document.getElementById("btnChat").addEventListener("click", () => navigateTo('chat'));
    document.getElementById("btnHome").addEventListener("click", () => navigateTo('home'));
    document.getElementById("btnStats").addEventListener("click", () => navigateTo('stats'));
});

/*
 * 🧠 Brainstorm Page Logic
 * 1. Read the user's note input
 * 2. Extract subject and deadline if provided
 * 3. Send the note to the backend
 * 4. Show confirmation message
 */
function initBrainstormLogic() {
    console.log("✅ Brainstorm logic initialized"); //test

    const saveBtn = document.getElementById("saveBrainstorm");
    const input = document.getElementById("brainstormInput");
    const saveMessage = document.getElementById("saveMessage");

    if (saveBtn && input) {
        saveBtn.addEventListener("click", () => {
            console.log("🖱️ Save button clicked"); //test

            const rawText = input.value.trim();
            if (!rawText) return;

            const note = parseNote(rawText);

            fetch("http://localhost:3000/brainstorm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note),
            })
            .then(async (res) => {
                const contentType = res.headers.get("content-type");
                if (!res.ok) throw new Error("Server error");
            
                if (contentType && contentType.includes("application/json")) {
                    return res.json();
                } else {
                    const text = await res.text();
                    throw new Error(`Invalid JSON response: ${text}`);
                }
            })
            .then(data => {
                console.log("Note saved:", data);
                input.value = "";
                if (saveMessage) {
                    saveMessage.classList.remove("hidden");
                    setTimeout(() => {
                        saveMessage.classList.add("hidden");
                    }, 3000);
                }
            })
            .catch(err => {
                console.error("Error saving the note:", err);
            });
        });
    }
}

/*
 * 🔍 Basic parser to extract subject and deadline from the note text
 */
function parseNote(text) {
    const regexDeadline = /(?:by|due|deadline|on)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i;
    const regexSubject = /(?:subject|subject:)\s*(\w+)/i;

    const deadlineMatch = text.match(regexDeadline);
    const subjectMatch = text.match(regexSubject);

    const deadline = deadlineMatch ? deadlineMatch[1] : null;
    const subject = subjectMatch ? subjectMatch[1] : null;

    return {
        id: Date.now(),
        subject: subject,
        description: text,
        deadline: deadline,
        created_at: new Date().toISOString(),
    };
}
