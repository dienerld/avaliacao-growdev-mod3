//@ts-ignore
const modalDetails = new bootstrap.Modal(document.querySelector('#modal-details'))!;
//@ts-ignore
const modalStoreMessage = new bootstrap.Modal(document.querySelector('#modal-store-message'))!;

//@ts-ignore
let isEdit = false;
let indexEdit = -1;



function resetForm() {
  document.querySelector<HTMLElement>('#modal-store-message-label')!.innerHTML = 'Nova Mensagem';
  document.querySelector<HTMLFormElement>('#storeForm')!.reset();
  return;
}

//@ts-ignore
function checkLogged() {
  if (!logged) {
    window.location.href = './index.html';
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    user = JSON.parse(dataUser);
  }

  return;
}

function storeUser() {
  localStorage.setItem(user.username, JSON.stringify(user));

  return;
}

function logout() {
  sessionStorage.clear();
  localStorage.removeItem('session');
  window.location.href = './index.html';

  return;
}

function alert(message: string) {
  const alertLogin = document.querySelector<HTMLDivElement>('#alertEdit')!;
  document.querySelector<HTMLDivElement>('#textAlert')!.innerHTML = message;

  alertLogin.classList.remove('d-none');
  return;
}

function editMessage(idMessage: number) {
  modalDetails.hide();
  document.querySelector<HTMLElement>('#modal-store-message-label')!.innerHTML = 'Alterar Mensagem';
  isEdit = true;
  indexEdit = idMessage;
  const form = document.querySelector<HTMLFormElement>("#storeForm")!;
  modalStoreMessage.show();
  //@ts-ignore
  form.title.value = user.messages[idMessage].title;
  form.description.value = user.messages[idMessage].description;

  return;
}

function storeMessage() {
  const form = document.querySelector<HTMLFormElement>("#storeForm")!;

  //@ts-ignore
  const title = form.title.value;
  const description = form.description.value;

  if (!title || !description) {
    alert(title ? 'Preencha a descrição' : 'Preencha o título');
    return;
  }

  const alertLogin = document.querySelector<HTMLDivElement>('#alertEdit')!;
  if (!alertLogin.classList.contains('d-none')) {
    alertLogin.classList.add('d-none');
  }

  if (!isEdit) {
    user.messages.push({ title, description });
  } else {
    user.messages[indexEdit].title = title;
    user.messages[indexEdit].description = description;
    isEdit = false;
  }

  printMessages();
  modalStoreMessage.hide();
  storeUser();
  form.reset();
  return;
}

function deleteMessage(idMessage: number) {
  user.messages.splice(idMessage, 1);
  storeUser();
  printMessages();
  modalDetails.hide();
  return;
}

function triggerModalViewer(idMessage: number) {
  //@ts-ignore
  document.querySelector<HTMLElement>('#modal-details-title')!.innerHTML = user.messages[idMessage].title;
  document.querySelector<HTMLElement>('#modal-details-description')!.innerHTML = user.messages[idMessage].description;
  modalDetails.show();

  const btnEdit = document.querySelector('#btn-edit')!;
  btnEdit.setAttribute('onclick', `editMessage(${idMessage})`);

  const btnDelete = document.querySelector('#btn-delete')!;
  btnDelete.setAttribute('onclick', `deleteMessage(${idMessage})`);

  return;
}


function printMessages() {
  const tableBody = document.querySelector('#table-body-messages')!;
  tableBody.innerHTML = '';

  user.messages.forEach((message, index) => {
    const trElement = document.createElement('tr');
    trElement.classList.add('clickable', 'bg-secondary');
    trElement.style.animationDelay = `${(index + 1) * 0.2}s`;
    trElement.style.opacity = "0";
    trElement.style.borderStyle = "hidden";
    trElement.setAttribute('onclick', `triggerModalViewer(${index})`);

    const thElement = document.createElement('th');
    thElement.classList.add('col-2', 'col-md-1', 'text-center');
    thElement.setAttribute('scope', 'row');
    thElement.innerText = String(index + 1);
    trElement.appendChild(thElement);

    const tdElementDesc = document.createElement('td');
    tdElementDesc.classList.add('col-10', 'col-md-4', 'col-lg-4');
    tdElementDesc.innerText = message.title;
    trElement.appendChild(tdElementDesc);

    const tdElementDet = document.createElement('td');
    tdElementDet.classList.add("d-none", "d-md-table-cell");

    if (message.description.length > 90) {
      tdElementDet.innerText = message.description.substring(0, 90) + '...';
    } else {
      tdElementDet.innerText = message.description;
    }

    trElement.appendChild(tdElementDet);
    tableBody.appendChild(trElement);
  });

  return;
}


checkLogged();
printMessages();
