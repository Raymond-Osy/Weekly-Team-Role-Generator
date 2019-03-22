let currentweekRole = [];

document
  .getElementById("generate")
  .addEventListener("click", () => genenrateUser());

genenrateUser = () => {
  fetch(`https://hidden-hollows-71371.herokuapp.com/api/users`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        for (let i = 0; i < data.data.length; i++) {
          let randomMember =
            data.data[Math.floor(Math.random() * data.data.length)];

          if (
            !currentweekRole.includes(randomMember) &&
            currentweekRole.length != 3
          ) {
            currentweekRole.push(randomMember);
          }
        }
        document.getElementById("crum-master").innerHTML = `${
          currentweekRole[0].firstName
        } ${currentweekRole[0].lastName}`;
        document.getElementById("q1").innerHTML = `${
          currentweekRole[1].firstName
        } ${currentweekRole[1].lastName}`;
        document.getElementById("q2").innerHTML = `${
          currentweekRole[2].firstName
        } ${currentweekRole[2].lastName}`;
        console.log(currentweekRole);
      } else {
        console.log("server connection failed");
      }
    })
    .catch(error => console.log(error));
};
