
// set 3rd nav link to "Logout"; shows "Login" when the user is logged in
// thirdNav = document.querySelector('nav a:nth-child(3)');
// thirdNav.setAttribute('href', '/api/user/logout');
// thirdNav.textContent = 'Logout';

//set header to "Your Dashboard"; shows "The Tech Blog" when the user is logged in
headerDiv = document.querySelector('header div');
headerDiv.setAttribute('class', 'your-dash');
headerDiv.textContent = 'Your Dashboard';


const fetchNewPostView = async () => {
  try {
    // send request to server
    const response = await fetch('/api/dashboard/new-post', {
        method: 'GET'
    });

    if (response.ok) {
        document.location.replace('/api/dashboard/new-post');
    } else {
        alert('Unable to fetch new post view');
        console.error(response.statusText);
    }
    
  } catch (err) {
    alert('Error fetching new post route. Please try again.');
    console.error(err);
  }
};

document
  .querySelector('.new-post-btn')
  .addEventListener('click', fetchNewPostView);


const fetchEditPostView = async (event) => {
  const id = event.currentTarget.getAttribute('data-id');
  
  try {
    const response = await fetch(`/api/dashboard/update/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      console.log(response);
      document.location.replace(`/api/dashboard/update/${id}`);
  
    } else {
      alert('Unable to fetch edit-post view');
      console.error(response.statusText);
    }
  } catch (err) {
    alert('Error fetching edit-post route. Please try again.');
    console.error(err);
  }
};

// fetch view when button is clicked
document
  .querySelectorAll('.post-preview').forEach((button) => {
    button.addEventListener('click', fetchEditPostView);
  });
  
