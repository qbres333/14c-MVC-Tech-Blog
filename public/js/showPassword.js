function toggleLoginPassword() {
    let login_password = document.getElementById('password-login');

    if (login_password.type === 'password') {
        // change password type to text so it's visible
        login_password.type = 'text';
    } else {
        login_password.type = 'password';
    }


};

function toggleSignupPassword() {
    let signup_password = document.getElementById('password-signup');

    // signup password toggle
    if (signup_password.type === 'password') {
      // change password type to text so it's visible
      signup_password.type = 'text';
    } else {
      signup_password.type = 'password';
    }

};