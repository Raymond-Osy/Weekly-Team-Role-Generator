let currentweekRole = [];
const baseApiUrl = "https://hidden-hollows-71371.herokuapp.com/api";
// const baseApiUrl = 'http://localhost:7777/api';

const scrumMaster = document.getElementById("crum-master");
const qa1 = document.getElementById("q1");
const qa2 = document.getElementById("q2");
const generateRoleButton = document.getElementById("generate");

/**
 * @func getTeamMemberFullName
 * @params {*} A Team member
 * @returns {String} Returns a team member full names
 */
const getTeamMemberFullName = teamMember => {
  const { firstName, lastName } = teamMember;
  return `${firstName} ${lastName}`;
};

/**
 *
 * @param {*} teamMember Team member object
 * @param {String} role [team lead | qa]
 * @returns {Promise<*>} Resolves to the updated team member
 */
const updateTeamMemberStatus = (teamMember, role = "team lead") => {
  return fetch(`${baseApiUrl}/users/${teamMember.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      served: true,
      role
    })
  })
    .then(response => response.json())
    .then(data => {
      return data.data[0];
    })
    .catch(err => {
      throw err;
    });
};

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

        const [teamLead, firstQA, secondQA] = currentweekRole;

        updateTeamMemberStatus(teamLead)
          .then(teamLead => {})
          .catch(err => {
            throw err;
          });

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
 * @func getActiveTeamLead
 * @param {Array} members
 * @param {Array}
 */
const getActiveTeamLead = members => {
  const pastTeamLeads = members.filter(
    member => member.served && member.role === "team lead"
  );
  const activeTeamLead = pastTeamLeads.filter(teamLead => {
    return (
      teamLead.dateEnd &&
      new Date().getTime() - new Date(teamLead.dateEnd).getTime() > 0
    );
  });
  return activeTeamLead;
};

/**
 * @func getActiveTeamQAs
 */
const getActiveTeamQAs = () => {};

/**
 * @func getAllTeamMembers
 * @returns {Promise<Array>} Returns a promise that resolves to an  array
 */
const getAllTeamMembers = () => {
  return fetch(`${baseApiUrl}/users`)
    .then(response => response.json())
    .then(data => {
      return data.data;
    })
    .catch(err => {
      throw err;
    });
};

window.onload = () => {
  // if team lead already exist for the week and is active
  // show team lead
  // do the same for QA
  getAllTeamMembers()
    .then(members => {
      return getActiveTeamLead(members);
    })
    .then(member => {
      const [activeTeamLead] = member;
      scrumMaster.textContent = getTeamMemberFullName(activeTeamLead);
    })
    .catch(err => {
      // TODO: Handle network error here
    });
};
