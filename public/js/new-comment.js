// fetch comment view
// const fetchCommentView = async (event) => {
//     const id = event.currentTarget.getAttribute('data-id');

//     try {
//         const response = await fetch (`/add-comment/${id}`, {
//             method: 'GET',
//         });

//         if (response.ok) {
//             document.location.replace(`/add-comment/${id}`);

//         } else {
//             alert('Unable to fetch comment view');
//             console.error(response.statusText);
//         }
//     } catch (err) {
//         alert('Error fetching comment route. Please try again.');
//         console.error(err);
//     }
// };

// // fetch view when button is clicked
// document.querySelectorAll('.post-header-btn').forEach((headerLink) => {
//     headerLink.addEventListener('click', fetchCommentView);
// });


//new comment form submission handler
const newCommentHandler = async (event) => {
    // event.preventDefault();

    
    // get value from input
    const comment = document.querySelector("#comment-content").value.trim();

    // if comment field has a value
    if (comment) {
        try {
            const response = await fetch(`/api/add-comment/${id}`, {
              method: 'POST',
              body: JSON.stringify({ comment }),
              headers: { 'Content-type': 'application/json' },
            });

            if (response.ok) {
                // if request is successful, redirect to blog post view with comment shown
                document.location.replace('/api/blogpost')
            }
        } catch (err) {}
    }

}

