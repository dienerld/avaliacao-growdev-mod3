const elementValidUsername = document.querySelector<HTMLSpanElement>("#errorUsername")!;
const elementValidPassword = document.querySelector<HTMLSpanElement>("#errorPassword")!;


const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');


function saveSession(data: string) {
  sessionStorage.setItem('logged', data);
}

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

function alert() {
  const alertLogin = document.querySelector<HTMLDivElement>('#alertLogin')!;
  alertLogin.classList.remove('d-none');
  return;
}

function togglePassword() {
  const elementInputPassword = document.querySelector('#userInputPassword') as HTMLInputElement;
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

function validateUsername() {
  let usernameValid = false;
  const username = document.querySelector<HTMLInputElement>("#userInputUsername")!.value as string;
  if (username.length < 3) {
    elementValidUsername.classList.toggle('d-none', usernameValid);

    return;
  }
  usernameValid = !usernameValid;
  elementValidUsername.classList.toggle('d-none', usernameValid);
  return;
}

function validatePassword() {
  let passwordValid = false;
  const password = document.querySelector<HTMLInputElement>("#userInputPassword")!.value as string;

  if (password.length < 3) {
    elementValidPassword.classList.toggle('d-none', passwordValid);
    return;
  }
  passwordValid = !passwordValid;
  elementValidPassword.classList.toggle('d-none', passwordValid);

  return;
}


function submitForm() {
  const username = document.querySelector<HTMLInputElement>("#userInputUsername")!.value as string;
  const password = document.querySelector<HTMLInputElement>("#userInputPassword")!.value as string;

  if (!elementValidPassword.classList.contains('d-none')
    || !elementValidUsername.classList.contains('d-none')) {
    validatePassword();
    validateUsername();
    return;
  }
  if (!username || !password) {
    validatePassword();
    validateUsername();
    return;
  }

  const user = JSON.parse(localStorage.getItem(username) || '{}');
  if (!(password === user.password) || !user) {
    alert();
    return;
  }
  saveSession(username);

  window.location.href = './home.html';
}
