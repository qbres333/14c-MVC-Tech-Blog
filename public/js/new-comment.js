//new comment form submission handler
const newCommentHandler = async (event) => {
    event.preventDefault();
    
    // get value from input
    const comment = document.querySelector("#comment-content").value.trim();
    const blogpost_id = event.target.getAttribute('data-blogpost-id');

    // if comment field has a value
    if (comment && blogpost_id) {
        try {
            const response = await fetch(`/api/add-comment`, {
              method: 'POST',
              body: JSON.stringify({ comment, blogpost_id }),
              headers: { 'Content-type': 'application/json' },
            });

            if (response.ok) {
                // if request is successful, redirect to blog post view with comment shown
                document.location.replace(`/api/comments/${id}`)
            } else {
                alert('Failed to create comment. Please try again.');
                console.error(response.statusText);
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
            console.error(response.statusText);
        }

    } else {
    alert('Please enter text in the comment field.');
    return;
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
