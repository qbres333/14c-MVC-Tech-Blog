// update handler: send PUT request to API if the user updates the post
const updatePostHandler = async (event) => {

    // get values from updated post inputs
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const id = event.target.getAttribute('id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog post');
    }
}
// update bloglist on dashboard upon submit
document
  .querySelector('.edit-post-form')
  .addEventListener('submit', updatePostHandler);
