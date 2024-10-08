// deletion handler: send DELETE request to API if user clicks delete
const deletePostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      /* if request is successful, redirect to the user's dashboard,
      which shows the updated post list */
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

// update bloglist on dashboard upon submit
document.querySelector('.user-blog-list').addEventListener('submit', deletePostHandler);