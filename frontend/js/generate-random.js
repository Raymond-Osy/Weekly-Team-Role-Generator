let currentweekRole = [];
const baseApiUrl = 'https://hidden-hollows-71371.herokuapp.com/api';

const scrumMaster = document.getElementById('crum-master');
const qa1 = document.getElementById("q1");
const qa2 = document.getElementById("q2");

/**
 * @func getTeamMemberFullName
 * @params {*} A Team member
 * @returns {String} Returns a team member full names
 */
const getTeamMemberFullName = (teamMember) => {
  const {  firstName, lastName } = teamMember;
  return `${firstName} ${lastName}`;
}

/**
 * @func generateTeamRoles
 * @returns {void} Generates a new user
 */
const generateTeamRoles = () => {
  fetch(`${baseApiUrl}/users`)
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
        scrumMaster.innerHTML = `${getTeamMemberFullName(currentweekRole[0])}`;
        qa1.innerHTML = `${getTeamMemberFullName(currentweekRole[1])}`;
        qa2.innerHTML = `${getTeamMemberFullName(currentweekRole[2])}`;
        
      } else {
        console.log("server connection failed");
      }
    })
    .catch(error => console.log(error));
};


document
  .getElementById("generate")
  .addEventListener("click", () => generateTeamRoles());