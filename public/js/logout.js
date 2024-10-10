const logout = async () => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // return the user to the homepage
        document.location.replace('/');
      } else {
        alert('Could not create log out. Please try again.');
        console.error(response.statusText);
      }
    } catch (err) {
        alert('An error occurred. Please try again.');
        console.error(err);
    }

};

document.querySelector('#logout').addEventListener('click', logout);