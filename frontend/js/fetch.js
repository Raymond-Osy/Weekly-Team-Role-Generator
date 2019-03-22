const url = 'https://hidden-hollows-71371.herokuapp.com';

document.addEventListener('DOMContentLoaded', () => {
  fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  })
    .then(response => response.json())
    .then((resp) => console.log(resp))
    .catch()
})