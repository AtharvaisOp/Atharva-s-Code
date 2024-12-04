const mouseButton = document.getElementById("mouseButton");
const mouseMessage = document.getElementById("mouseMessage");

mouseButton.addEventListener("click", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    mouseMessage.textContent = `Mouse clicked at: X=${x}, Y=${y}`;
});
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");

textInput.addEventListener("input", () => {
    charCount.textContent = `Characters typed: ${textInput.value.length}`;
});
const demoForm = document.getElementById("demoForm");

demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Form submitted successfully!");
});
