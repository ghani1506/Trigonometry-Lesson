document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let studentName = document.getElementById("studentName").value;
    let studentAnswer = parseFloat(document.getElementById("studentAnswer").value);
    
    // The correct answer (adjust according to your trigonometry question)
    let correctAnswer = 10.5; // Example value
    let tolerance = 0.1; // Acceptable error margin

    let score = 0;
    if (Math.abs(studentAnswer - correctAnswer) <= tolerance) {
        score = 1; // Full mark if within tolerance
    }

    document.getElementById("result").innerHTML = score === 1 ? 
        "Correct! Well done!" : "Incorrect, try again.";

    // Send data to Power Automate for storing in OneDrive
    sendToOneDrive(studentName, studentAnswer, score);
});

function sendToOneDrive(name, answer, score) {
    let data = {
        studentName: name,
        answer: answer,
        score: score
    };

    fetch("https://prod-XX.westus.logic.azure.com/workflows/XXXXXXXXXXXXXX/triggers/manual/paths/invoke", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Data sent successfully:", data))
    .catch(error => console.error("Error sending data:", error));
}
