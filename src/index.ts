const formRegister = document.querySelector('#form-register-user')!;



const session = localStorage.getItem('session');
//@ts-ignore


// Utils
function saveSession(username: string, stayConnected: boolean = false) {
  if (stayConnected) {
    localStorage.setItem('session', username);
  }
  sessionStorage.setItem('logged', username);
}
//@ts-ignore
function checkLogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged);
    window.location.href = './home.html';
  }
}

function alert(idAlert: string) {
  const alertLogin = document.querySelector<HTMLDivElement>(`#${idAlert}`)!;
  alertLogin.classList.remove('d-none');
  return;
}

function togglePasswordLogin() {
  const elementInputPassword = document.querySelector('#user-input-password') as HTMLInputElement;
  const elementIconEye = document.querySelector('#iconEye') as HTMLElement;

  if (!elementInputPassword) return;

  if (elementInputPassword.type === 'password') {
    elementInputPassword.type = 'text';
    elementIconEye.classList.toggle('bi-eye-slash-fill');
  } else {
    elementIconEye.classList.toggle('bi-eye-slash-fill');
    elementInputPassword.type = 'password';
  }

  return;
}

function validateRegisterUsername() {
  let usernameValid = false;
  const inputUsername = document.querySelector<HTMLInputElement>('#username-register-input')!;
  const spanError = document.querySelector<HTMLInputElement>('#error-username')!;
  if (inputUsername.value.length < 3) {
    spanError.classList.toggle('d-none', usernameValid);

    return;
  }
  usernameValid = !usernameValid;
  spanError.classList.toggle('d-none', usernameValid);
  return;
}

function validateRegisterPassword() {
  let passwordValid = false;
  const inputUsername = document.querySelector<HTMLInputElement>('#password-register-input')!;
  const spanError = document.querySelector<HTMLInputElement>('#error-password')!;
  if (inputUsername.value.length < 4) {
    spanError.classList.toggle('d-none', passwordValid);

    return;
  }
  passwordValid = !passwordValid;
  spanError.classList.toggle('d-none', passwordValid);
  return;
}

function validateMatchPassword() {
  let passwordValid = false;
  const spanError = document.querySelector<HTMLInputElement>('#error-repeat-password')!;
  const password = document.querySelector<HTMLInputElement>("#password-register-input")!.value as string;
  const passwordRepeat = document.querySelector<HTMLInputElement>("#password-repeat-register-input")!.value as string;

  if (password !== passwordRepeat) {
    spanError.classList.toggle('d-none', passwordValid);

    return;
  }

  passwordValid = !passwordValid;
  spanError.classList.toggle('d-none', passwordValid);

  return;
}

// Forms
function submitFormLogin() {
  const form = document.querySelector<HTMLFormElement>("#form-login")!;
  const username = form.username.value;
  const password = form.password.value;
  const stayConnected = document.querySelector<HTMLInputElement>('#session-check')!.checked;



  if (!username || !password) {
    alert("alert-login")

    return;
  }

  const user = JSON.parse(localStorage.getItem(username) || '{}');
  if (!(password === user.password) || !user) {
    alert('alert-login');
    return;
  }


  saveSession(username, stayConnected);
  window.location.href = './home.html';

  return;
}

function submitFormRegister(e: Event) {
  e.preventDefault();
  const form = document.querySelector<HTMLFormElement>("#form-register-user")!;
  const username = form.username.value;
  const password = form.password.value;
  const passwordRepeat = form["password-repeat"].value;

  if (!username || !password || !passwordRepeat) {
    alert('alert-register');
    return;
  }

  if (password !== passwordRepeat) return;

  if (window.localStorage.getItem(username)) {
    alert('alert-register');
    return;
  }

  //@ts-ignore
  user: TUser = {
    username,
    password,
    messages: []
  }

  window.localStorage.setItem(username, JSON.stringify(user));
  saveSession(username);

  window.location.href = './home.html';

}

// Start
formRegister.addEventListener('submit', submitFormRegister);
checkLogged();
