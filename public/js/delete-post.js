// deletion handler: send DELETE request to API if user clicks delete
const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = event.currentTarget.getAttribute('data-blog-id');

  try {           
      const response = await fetch(`/api/dashboard/update/${id}`, {
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
  } catch (err) {
      alert('An error occurred. Please try again.');
      console.error(err);
  }

};

// update bloglist on dashboard upon submit
document
  .querySelector('.delete-btn')
  .addEventListener('click', deletePostHandler);