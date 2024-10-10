const loginFormHandler = async (event) => {
    event.preventDefault();

    // get values from the login inputs
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // if both fields have values, send POST request to API endpoint
    if (username && password) {
        try {
          const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
          });

          if (response.ok) {
            // if request is successful, redirect to the user's dashboard (route)
            document.location.replace('/dashboard');
          } else {
            alert(response.statusText);
          }
        } catch (err) {
            alert('An error occurred. Please try again.');
            console.error(err);
        }

    } else{
        alert('Please enter both a username and password');
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);