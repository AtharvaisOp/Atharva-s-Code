document.getElementById('validationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('successMessage').textContent = '';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    if (username.length < 5) {
      document.getElementById('usernameError').style.display = 'block';
      isValid = false;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById('passwordError').style.display = 'block';
      isValid = false;
    }
    if (isValid) {
      document.getElementById('successMessage').textContent = 'Validation successful!';
    }
  });