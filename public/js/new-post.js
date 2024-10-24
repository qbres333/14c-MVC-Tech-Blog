// function to handle form submission (saves new post to the db)
const newPostHandler = async (event) => {
  event.preventDefault();

  try {
    // get values from new post inputs
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    // if both fields have values, send POST request to API endpoint
    if (title && content) {
      const response = await fetch('/api/new-post', {
        //endpoint is new post route
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        /* if request is successful, redirect to the user's dashboard,
      which shows the new post */
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create new post. Please try again.');
        console.error(response.statusText);
      }
    } else {
      alert('Please enter both title and content fields');
      return;
    }
  } catch (err) {
    alert('An error occurred. Please try again.');
    console.error(response.statusText);
  }

}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);