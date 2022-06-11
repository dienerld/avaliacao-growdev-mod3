let logged = sessionStorage.getItem('logged');

type TMessage = {
  description: string,
  details: string,
}

type TUser = {
  username: string,
  password: string,
  messages: TMessage[]
}

let user: TUser;
let isEdit: boolean = false;
let IdEdit: number = -1;

function checkLogged() {
  if (!logged) {
    window.location.href = './index.html';
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    user = JSON.parse(dataUser);
  }
}

function printMessages() {
  let messagesHTML = '';
  const messages = user.messages;
  if (messages.length) {
    messages.forEach((message, index) => {
      messagesHTML += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons">
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
            <button class="btn btn-edit" onClick="editMessage(${index})">Editar</button>
          </td>
        </tr>
      `;
    });
  }
  document.getElementById('table-body').innerHTML = messagesHTML;
}

function saveMessage() {
  const formMessage = document.getElementById('form-message') as HTMLFormElement;
  const description = formMessage.message.value;
  const details = formMessage.details.value;

  if (!details || !description) {
    alert('Preencha todos os campos');
    return;
  }

  const message = {
    description,
    details,
  };

  if (isEdit) {
    user.messages[IdEdit] = message;
    isEdit = false;
    IdEdit = null;
  } else {
    user.messages.push(message);
  }

  localStorage.setItem(user.username, JSON.stringify(user));
  printMessages();
  formMessage.reset();
}

function deleteMessage(index) {
  user.messages.splice(index, 1);
  localStorage.setItem(user.username, JSON.stringify(user));
  printMessages();
}

function editMessage(index) {
  const formMessage = document.getElementById('form-message') as HTMLFormElement;;
  formMessage.message.value = user.messages[index].description;
  formMessage.details.value = user.messages[index].details;
  isEdit = true;
  IdEdit = index;
}

function logout() {
  sessionStorage.clear();
  localStorage.removeItem('session');
  window.location.href = './index.html';
}

checkLogged();
printMessages();

// Only remove erros tsc
export { }
