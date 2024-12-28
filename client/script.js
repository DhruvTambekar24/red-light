// const socket = new WebSocket("ws://localhost:3000");

// // Listen for messages from the server
// socket.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     if (data.light === "red") {
//         document.body.style.backgroundColor = "red";
//         document.getElementById("message").textContent = "Red Light";
//     } else {
//         document.body.style.backgroundColor = "green";
//         document.getElementById("message").textContent = "Green Light";
//     }
// };

// // Handle connection errors
// socket.onerror = (error) => {
//     console.error("WebSocket error:", error);
// };
const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.light === "red") {
        document.body.classList.remove("green");
        document.body.classList.add("red");
    } else {
        document.body.classList.remove("red");
        document.body.classList.add("green");
    }
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};
