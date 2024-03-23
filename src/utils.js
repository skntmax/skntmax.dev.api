const user_types = {
  normal: "normal",
  admin: "admin",
  super_admin: "super_admin",
};

const traffic_from = {
  default: "bytecode.live",
  google: "google",
  linkedIn: "linkedIn",
  github: "github",
};

export function generateUsernames(name, count = 10) {
  let usernames = [];

  for (let i = 0; i < count; i++) {
    let lowercaseName = name.toLowerCase().replace(/\s/g, "");
    let randomNumber = Math.floor(Math.random() * 9000) + 1000;
    let username = lowercaseName + randomNumber;
    let randomAlphabets = "";
    // Check if the generated username already exists
    while (usernames.includes(username)) {
      randomNumber = Math.floor(Math.random() * 9000) + 1000;
      username = lowercaseName + randomNumber;
    }

    // for (let j = 0; j < 5; j++) {
    //     randomAlphabets += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random lowercase alphabet
    // }

    usernames.push(username);
  }

  return usernames.slice(0, getRandomNumberInRange(0, 10));
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { user_types, traffic_from };
