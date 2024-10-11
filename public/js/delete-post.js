// deletion handler: send DELETE request to API if user clicks delete
const deletePostHandler = async (event) => {
  try {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/dashboard/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        /* if request is successful, redirect to the user's dashboard,
      which shows the updated post list */
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog post');
        console.error(response.statusText);
      }
    }
  } catch (err) {
      alert('An error occurred. Please try again.');
      console.error(err);
  }

};

// update bloglist on dashboard upon submit
document.querySelector('.user-blog-list').addEventListener('submit', deletePostHandler);