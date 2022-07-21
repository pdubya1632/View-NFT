//handlelogin
async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  //make sure they are filled
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response, ' Logged in successfully!');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

//handle signup/register
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  const successModal = document.querySelector('#success');

  //check to make sure all fields have values
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
    } else {
      alert(response.statusText);
    }

    //then we send in a request to log into the webpage
    const responseTwo = await fetch('api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (responseTwo.ok) {
      console.log(response, 'Logged in successfully!');
      successModal.classList.remove('hidden');
      // document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}
//Add event listeners to the buttons
// document
//   .querySelector("#login-btn")
//   .addEventListener("click", loginFormHandler);

// document
//   .querySelector('#signup-btn')
//   .addEventListener('click', signupFormHandler);
