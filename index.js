const inputForm = document.querySelector("#input-form");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const fullNameInput = document.querySelector("#full-name-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
const emailInput = document.querySelector("#email-input");
const locationInput = document.querySelector("#location-input");
const list = document.querySelector("#contacts-list");

// let contacts = [
//   {
//     id: 1,
//     fullName: "Lazuardy Anugrah",
//     phone: 6281292846785,
//     email: "lazuardyanugrah@lazu.com",
//     location: "Bogor, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
//   {
//     id: 2,
//     fullName: "Rizky Pratama",
//     phone: 6281376543210,
//     email: "rizky.pratama@gmail.com",
//     location: "Bandung, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
//   {
//     id: 3,
//     fullName: "Aditya Hari",
//     phone: 6281122334455,
//     email: "adityahari@gmail.com",
//     location: "Surabaya, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
// ];

const localStorageContacts = JSON.parse(localStorage.getItem("contacts"));
let contacts = localStorageContacts ? localStorageContacts : [];

const printContacts = function (contacts) {
  for (let i = 0; i < contacts.length; i++) {
    console.log(
      `${contacts[i].fullName}, ${contacts[i].phone}, ${contacts[i].email}, ${contacts[i].location}`,
    );
  }
};

// add contact function
const addContact = function (contacts, { fullName, phone, email, location }) {
  console.log(fullName, phone.toString(), email, location);
  const id = contacts.length + 1;
  const dateCreated = new Date().toISOString();
  contacts.push({
    id,
    fullName,
    phone: phone.toString(),
    email,
    location,
    dateCreated,
  });
  console.log(contacts);
  updateLocalStorage();
};

// Edit contact
const updateContact = function (contacts, id, updatedInfo) {
  // Search contact index
  const i = contacts.findIndex((e) => e.id === id);
  const dateLastEdited = new Date().toISOString();
  // if contact exist, update contact with updated info
  if (i !== -1) {
    contacts[i] = { ...contacts[i], dateLastEdited, ...updatedInfo };
  } else {
    console.log("Contact not found");
  }

  console.log(contacts);
};

const deleteContactById = function (contacts, id) {
  // Search contact index
  const i = contacts.findIndex((e) => e.id === id);

  // remove the contact
  if (i !== -1) {
    contacts.splice(i, 1);
    console.log(contacts);
  } else {
    console.log("Contact not found");
  }
};

const searchContactByName = function (contacts, name) {
  const found = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(name.toLowerCase()),
  );
  const searchResult = found.length > 0 ? found : "Contact not found";
  console.log(`Search contact by name ${name}:`, searchResult);

  return searchResult;
};

const searchContactById = function (contacts, id) {
  const found = contacts.find((contact) => contact.id === id);
  const searchResult = found ? found : "Contact not found";
  console.log(`Search contact by id ${id}:`, searchResult);
  return searchResult;
};

const updateLocalStorage = function () {
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

// printContacts(contacts);

// addContact(contacts, {
//   fullName: "John Doe",
//   phone: 987898667,
//   email: "email@email.com",
//   location: "Los Angeles, California",
// });

// addContact(contacts, {
//   fullName: "Ellen Baker",
//   phone: 90987658,
//   email: "ellen@email.com",
//   location: "Chicago, Illinois",
// });

// updateContact(contacts, 3, {
//   phone: 123325681,
//   email: "newemail@gmail.com",
//   location: "Jakarta, Indonesia",
// });

// deleteContactById(contacts, 1);

// searchContactByName(contacts, "Adit");
// searchContactByName(contacts, "Brock"); // not found

// searchContactById(contacts, 2);
