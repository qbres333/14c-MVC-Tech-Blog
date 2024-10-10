// create a filtered list of the user's blog posts
// const renderDashboard = async (event) => {
//     event.preventDefault();

//     // get user id
//     // match to blogpost user_id and map
//     // send GET to api/dashboard
//     // redirect to user dashboard
// }

// document.querySelector('.dashboard').addEventListener('click', renderDashboard);



// set 3rd nav link to "Logout"; shows "Login" when the user is logged in
thirdNav = document.querySelector('nav a:nth-child(3)');

thirdNav.setAttribute('href', '/logout');
thirdNav.textContent = 'Logout';