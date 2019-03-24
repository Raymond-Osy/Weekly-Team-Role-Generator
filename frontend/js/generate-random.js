let currentweekRole = [];
const baseAPIUrlHosted = "https://hidden-hollows-71371.herokuapp.com/api";
const baseAPIUrlLocal = "http://localhost:7777/api";

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

const allHaveServed = teamMembers => {
  const membersWhoHaveServed = teamMembers.filter(
    teamMember => teamMember.served
  );
  return membersWhoHaveServed.length === teamMembers.length;
};

/**
 *
 * @param {*} teamMember Team member object
 * @param {String} role [team lead | qa]
 * @returns {Promise<*>} Resolves to the updated team member
 */
const updateTeamMemberStatus = (teamMember, role = "team lead") => {
  return fetch(`${baseAPIUrlLocal}/users/${teamMember.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
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
  fetch(`${baseAPIUrlLocal}/users`)
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        let teamLead = data.data[Math.floor(Math.random() * data.data.length)];

        // assumption here is that: anyone who has served as
        // QA can later serve as team lead
        while (teamLead.served && teamLead.role === "team lead") {
          teamLead = data.data[Math.floor(Math.random() * data.data.length)];
        }

        let firstSelectedQA =
          data.data[Math.floor(Math.random() * data.data.length)];
        let secondSelectedQA =
          data.data[Math.floor(Math.random() * data.data.length)];

        let qa1IsATeamLead = firstSelectedQA.firstName === teamLead.firstName;

        while (qa1IsATeamLead) {
          firstSelectedQA =
            data.data[Math.floor(Math.random() * data.data.length)];
          qa1IsATeamLead = firstSelectedQA.firstName === teamLead.firstName;
        }

        // assumption here is that: anyone who has served as
        // team lead can later serve as QA
        while (firstSelectedQA.served && firstSelectedQA.role === "qa") {
          firstSelectedQA =
            data.data[Math.floor(Math.random() * data.data.length)];
        }

        let qa2HasBeenSelected =
          secondSelectedQA.firstName === teamLead.firstName ||
          secondSelectedQA.firstName === secondSelectedQA.firstName;

        while (qa2HasBeenSelected) {
          secondSelectedQA =
            data.data[Math.floor(Math.random() * data.data.length)];
          qa2HasBeenSelected =
            secondSelectedQA.firstName === teamLead.firstName ||
            secondSelectedQA.firstName === firstSelectedQA.firstName;
        }

        while (
          secondSelectedQA.served &&
          secondSelectedQA.role === "qa" &&
          !allHaveServed(data.data)
        ) {
          secondSelectedQA =
            data.data[Math.floor(Math.random() * data.data.length)];
        }

        Promise.all([
          updateTeamMemberStatus(teamLead),
          updateTeamMemberStatus(firstSelectedQA, "qa"),
          updateTeamMemberStatus(secondSelectedQA, "qa")
        ])
          .then(values => {
            const [teamLead, firstQA, secondQA] = values;
            scrumMaster.innerHTML = `${getTeamMemberFullName(teamLead)}`;
            qa1.innerHTML = `${getTeamMemberFullName(firstQA)}`;
            qa2.innerHTML = `${getTeamMemberFullName(secondQA)}`;
          })
          .catch(err => {
            throw err;
          });
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
const getActiveTeamLead = (members, role = "team lead") => {
  const pastTeamLeads = members.filter(
    member => member.served && member.role === role
  );
  const activeTeamLead = pastTeamLeads.filter(teamLead => {
    return (
      teamLead.dateEnd &&
      new Date(teamLead.dateEnd).getTime() - new Date().getTime() > 0
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
 * of all team members
 */
const getAllTeamMembers = () => {
  return fetch(`${baseAPIUrlLocal}/users`)
    .then(response => response.json())
    .then(data => {
      return data.data;
    })
    .catch(err => {
      throw err;
    });
};

/**
 * @func getTeamLeadsAndQAs
 * @returns {Promise<Array>} Resolves to an array of the active team lead
 * and the two active QAs
 */
const getTeamLeadsAndQAs = () => {
  return getAllTeamMembers()
    .then(members => {
      const leads = members.filter(member => {
        const leadIsActive =
          new Date(member.dateEnd).getTime() - new Date().getTime() >= 0;
        return (
          ((member.served && member.role === "team lead") ||
            member.role === "qa") &&
          leadIsActive
        );
      });

      return leads;
    })
    .catch(err => {
      throw err;
    });
};

window.onload = () => {
  getTeamLeadsAndQAs()
    .then(leads => {
      const [teamLead, firstQA, secondQA] = leads;
      scrumMaster.textContent = getTeamMemberFullName(teamLead);
      qa1.textContent = getTeamMemberFullName(firstQA);
      qa2.textContent = getTeamMemberFullName(secondQA);
    })
    .catch(err => {
      throw err;
    });
};
