
// update handler: send PUT request to API if the user updates the post
const updatePostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog post');
        }
    }
}
// update bloglist on dashboard upon submit
document.querySelector('.user-blog-list').addEventListener('submit', updatePostHandler);
