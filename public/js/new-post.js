// function to handle new posts (saves them to the db)
const newPostHandler = async (event) => {
  event.preventDefault();

  // get values from new post inputs
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  // if both fields have values, send POST request to API endpoint
  if (title && content) {
    const response = await fetch('/api/blog', { //route should indicate where the new post will be added
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      /* if request is successful, redirect to the user's dashboard,
      which shows the new post */
      document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
  } else {
    alert('Please enter both title and content fields');
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);