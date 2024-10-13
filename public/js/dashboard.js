
// set 3rd nav link to "Logout"; shows "Login" when the user is logged in
thirdNav = document.querySelector('nav a:nth-child(3)');
thirdNav.setAttribute('href', '/api/user/logout');
thirdNav.textContent = 'Logout';

//set header to "Your Dashboard"; shows "The Tech Blog" when the user is logged in
headerDiv = document.querySelector('header div');
headerDiv.setAttribute('class', 'your-dash');
headerDiv.textContent = 'Your DashBoard';


const renderNewPostView = () => {
  try {
    // const response = await fetch('/api/dashboard/new-post', {
    //   method: 'GET'
    // });

    // if (response.ok) {
      // switch to new post form
      document.location.replace = '/dashboard/new-post';
    // } else {
    //   alert('Error rendering New Post form');
    //   console.error(response.statusText);
    // }
  } catch (err) {
    alert('Error fetching new post route. Please try again.');
    console.error(err);
  }
};

document.querySelector('.add-new').addEventListener('click', renderNewPostView);