const signupFormHandler = async (event) => {
  event.preventDefault();

  // get values from the signup inputs
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if both fields have values, send POST request to API endpoint (save user data)
  if (username && password) {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        // if request is successful, redirect to the dashboard
        document.location.replace('/dashboard');
      } else {
        alert('User already exists. Please check your spelling, or log in to The Tech Blog.')
        console.error(response.statusText);
      }
    } catch (err) {
        alert('An error occurred. Please try again.');
        console.error(err);
    }
  } else {
    alert('Please enter both a username and password');
    return;
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
