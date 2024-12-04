document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start");
    const formContainer = document.getElementById("formContainer");
    const form = document.getElementById("userForm");

    startButton.addEventListener("click", function() {
        this.style.display = 'none';
        formContainer.style.display = 'flex';
        setTimeout(() => {
            formContainer.classList.add("show");
        }, 10);
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = {
            name: document.getElementById("Name").value,
            age: document.getElementById("Age").value,
            job: document.getElementById("Job").value,
        };

        console.log(formData); // Log the form data to the console
        displayCustomAlert(formData); // Call the custom alert function with form data
    });

    function displayCustomAlert(data) {
        const message = `Hello ${data.name}! Here are the details you entered:\n\n` +
                        `Age: ${data.age}\n` +
                        `Job: ${data.job}\n\n` +
                        `Thank you for submitting your information!`;
        
        // Creating a custom alert box
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert-box"); // Apply CSS class for styling

        const messagePara = document.createElement("p");
        messagePara.textContent = message;
        messagePara.style.whiteSpace = "pre-wrap"; // Preserve newlines
        
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";

        closeButton.addEventListener("click", function() {
            document.body.removeChild(alertBox);
        });

        alertBox.appendChild(messagePara);
        alertBox.appendChild(closeButton);
        document.body.appendChild(alertBox);
    }
});
