const loginFormHandler = async (event) => {
  event.preventDefault();
  try {
    // get values from the login inputs
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // if both fields have values, send POST request to API endpoint
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        // if request is successful, redirect to the user's dashboard (route)
        document.location.replace('/dashboard');
      } else {
        alert(
          'Login failed. Please check your spelling, or sign up to The Tech Blog.'
        );
        console.error(response.statusText);
      }
    } else {
      alert('Please enter both a username and password');
    }
  } catch (err) {
    alert('Unable to login. Please check your credentials and try again.');
    console.error(err);
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
