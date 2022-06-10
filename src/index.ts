const elementValidUsername = document.querySelector<HTMLSpanElement>("#errorUsername")!;
const elementValidPassword = document.querySelector<HTMLSpanElement>("#errorPassword")!;
const formRegister = document.querySelector('#form-register-user')!;


// TODO: Fazer Validação de campos

const session = localStorage.getItem('session');
let logged = sessionStorage.getItem('logged');
type User = {
  username: string,
  password: string,
  messages: string[]
}

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

function alert(idAlert: string) {
  const alertLogin = document.querySelector<HTMLDivElement>(`#${idAlert}`)!;
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

function validateInput(id: string,) {
  let usernameValid = false;
  const username = document.querySelector<HTMLInputElement>(`#${id}`)!.value as string;
  if (username.length < 3) {
    elementValidUsername.classList.toggle('d-none', usernameValid);

    return;
  }
  usernameValid = !usernameValid;
  elementValidUsername.classList.toggle('d-none', usernameValid);
  return;
}




function submitFormLogin() {
  const username = document.querySelector<HTMLInputElement>("#userInputUsername")!.value as string;
  const password = document.querySelector<HTMLInputElement>("#userInputPassword")!.value as string;

  if (!elementValidPassword.classList.contains('d-none')
    || !elementValidUsername.classList.contains('d-none')) {
    validateInput('userInputUsername');
    validateInput('userInputPassword');

    return;
  }

  if (!username || !password) {
    validateInput('userInputUsername');
    validateInput('userInputPassword');

    return;
  }

  const user = JSON.parse(localStorage.getItem(username) || '{}');
  if (!(password === user.password) || !user) {
    alert('alertLogin');
    return;
  }
  saveSession(username);
  window.location.href = './home.html';

  return;
}

function submitFormRegister(e: Event) {
  e.preventDefault();
  const username = document.querySelector<HTMLInputElement>("#username-register-input")!.value as string;
  const password = document.querySelector<HTMLInputElement>("#password-register-input")!.value as string;
  const passwordRepeat = document.querySelector<HTMLInputElement>("#password-repeat-register-input")!.value as string;

  if (!username || !password || !passwordRepeat) {
    alert('alertRegister');
    document.getElementById('modal-close')!.click();
    return;
  }

}

formRegister.addEventListener('submit', submitFormRegister);

checkLogged();
