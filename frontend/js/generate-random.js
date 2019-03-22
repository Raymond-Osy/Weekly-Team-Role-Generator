let currentweekRole = [];
const baseApiUrl = 'https://hidden-hollows-71371.herokuapp.com/api';

const scrumMaster = document.getElementById('crum-master');
const qa1 = document.getElementById("q1");
const qa2 = document.getElementById("q2");
const generateRoleButton = document.getElementById("generate");

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

        const [ teamLead, firstQA, secondQA ] = currentweekRole;

        // Update Role and Served Status
        fetch(`${baseApiUrl}/users/${teamLead.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            served: true,
            endDate: new Date(new Date().getTime - 24 * 60 * 60 * 1000 * 4)
          })
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            
          })

        scrumMaster.innerHTML = `${getTeamMemberFullName(teamLead)}`;
        qa1.innerHTML = `${getTeamMemberFullName(firstQA)}`;
        qa2.innerHTML = `${getTeamMemberFullName(secondQA)}`;
        
      } else {
        console.log("server connection failed");
      }
    })
    .catch(error => console.log(error));
};

generateRoleButton.addEventListener("click", () => generateTeamRoles());

/**
 * @func anyActiveTeamLead
 * @param {Array} members 
 * @param {Array}
 */
const anyActiveTeamLead = (members) => {
  const pastTeamLeads = members.filter((member) => member.served);
  const activeTeamLead = pastTeamLeads.filter((teamLead) => new Date().getTime() - new Date(teamLead.endDate).getTime() > 0);
  return activeTeamLead;
}

/**
 * @func getAllTeamMembers
 * @returns {Promise<Array>} Returns a promise that resolves to an  array
 */
const getAllTeamMembers = () => {
  return fetch(`${baseApiUrl}/users`)
    .then(response => response.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      throw err;
    })
}

window.onload = () => {
  // if team lead already exist for the week and is active
  // show team lead
  // do the same for QA
  getAllTeamMembers()
   .then((members) => anyActiveTeamLead(members))
   .then((member) => {
     console.log(member);
   })
   .catch((err) => {
     // TODO: Handle network error here
   })
}