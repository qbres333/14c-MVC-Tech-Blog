// update handler: send PUT request to API if the user updates the post
const updatePostHandler = async (event) => {
    event.preventDefault();

    try {
      // get values from updated post inputs
      const title = document.querySelector('#post-title').value.trim();
      const content = document.querySelector('#post-content').value.trim();

      const id = event.target.getAttribute('data-id');

      if (title && content) {
        // change route if needed
        const response = await fetch(`/api/dashboard/update/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update blog post');
          console.error(response.statusText);
        }
      } else {
        alert('Please enter both title and content fields');
        return;
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
      console.error(err);
    }
}
// update blog list on dashboard upon submit
document
  .querySelector('.edit-post-form')
  .addEventListener('submit', updatePostHandler);
