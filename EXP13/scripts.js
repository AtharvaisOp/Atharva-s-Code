document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start");
    const formContainer = document.getElementById("formContainer");
    const form = document.getElementById("userForm");
    const arrayDiv = document.querySelector(".array");
    const userInput = document.getElementById("userInput");
    const sumButton = document.getElementById("sum");
    const resultElement = document.getElementById("result");
    
    startButton.addEventListener("click", function() {
        this.style.display = 'none';
        formContainer.style.display = 'flex';
        setTimeout(() => {
            formContainer.classList.add("show");
        }, 10);
    });
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = {
            name: document.getElementById("Name").value,
            age: document.getElementById("Age").value,
            job: document.getElementById("Job").value,
        };
        console.log(formData);
        displayCustomAlert(formData);
    });
    
    function displayCustomAlert(data) {
        const message = `Hello ${data.name}! Here are the details you entered:\n\n` +
                        `Age: ${data.age}\n` +
                        `Job: ${data.job}\n\n` +
                        `Thank you for submitting your information!`;
        const alertBox = document.createElement("div");
        alertBox.classList.add("alert-box"); 
        const messagePara = document.createElement("p");
        messagePara.textContent = message;
        messagePara.style.whiteSpace = "pre-wrap";
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", function() {
            document.body.removeChild(alertBox);
            formContainer.style.display = 'none';
            arrayDiv.style.display = 'block';
        });
        alertBox.appendChild(messagePara);
        alertBox.appendChild(closeButton);
        document.body.appendChild(alertBox);
    }

    let numbers = [1, 2, 3, 4]; // Initial array of numbers

    function updateNumbersArray(newNumber) {
        numbers.push(newNumber); // Add the new number to the array
    }

    function sumUsingForEach(arr) {
        let sum = 0;
        arr.forEach(function(number) {
            sum += number;
        });
        return sum;
    }

    function sumUsingReduce(arr) {
        return arr.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);
    }
    sumButton.addEventListener("click", function() {
        const userNumber = parseInt(userInput.value); // Convert user input to a number
        if (!isNaN(userNumber) && userNumber > 0) {
            // Generate an array of numbers from 1 to userNumber
            let numbers = Array.from({ length: userNumber }, (v, k) => k + 1);
            
            // Sum of numbers from 1 to n using reduce
            let sumReduce = numbers.reduce((acc, currentValue) => acc + currentValue, 0);
            
            resultElement.textContent = `Sum from 1 to ${userNumber}= ${sumReduce}`;
        } else {
            resultElement.textContent = 'Please enter a valid positive number.';
        }
    });
    
    
    
});

document.addEventListener("DOMContentLoaded", function() {
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString('en-US', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric',
            hour12: true
        });

        document.getElementById('datetime').textContent = dateTimeString;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});
