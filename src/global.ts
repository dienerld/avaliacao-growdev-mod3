type TMessage = {
  title: string,
  description: string,
}

type TUser = {
  username: string,
  password: string,
  messages: TMessage[]
}

let logged = sessionStorage.getItem('logged');
let user: TUser;
