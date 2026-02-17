console.log("Test address book");

const contacts = [
  {
    id: 1,
    fullName: "Lazuardy Anugrah",
    phone: 6281292846785,
    email: "lazuardyanugrah@lazu.com",
    location: "Bogor, Indonesia",
    dateCreated: new Date("2025-02-05").toISOString(),
  },
  {
    id: 2,
    fullName: "Rizky Pratama",
    phone: 6281376543210,
    email: "rizky.pratama@gmail.com",
    location: "Bandung, Indonesia",
    dateCreated: new Date("2025-02-05").toISOString(),
  },
  {
    id: 3,
    fullName: "Aditya Hari",
    phone: 6281122334455,
    email: "adityahari@gmail.com",
    location: "Surabaya, Indonesia",
    dateCreated: new Date("2025-02-05").toISOString(),
  },
];

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
};

// Edit contact
const updateContact = function (contacts, id, updatedInfo) {
  // Search contact index
  const i = contacts.findIndex((e) => e.id === id);
  const dateLastEdited = new Date().toISOString();
  // if contact exist, update contact with edited info
  if (i !== -1) {
    contacts[i] = { ...contacts[i], dateLastEdited, ...updatedInfo };
  } else {
    console.log("Contact not found");
  }

  console.log(contacts);
};

addContact(contacts, {
  fullName: "John Doe",
  phone: 987898667,
  email: "email@email.com",
  location: "Los Angeles, California",
});
addContact(contacts, {
  fullName: "Ellen Baker",
  phone: 090987658,
  email: "ellen@email.com",
  location: "Chicago, Illinois",
});

updateContact(contacts, 3, {
  phone: 123325681,
  email: "newemail@gmail.com",
  location: "Jakarta, Indonesia",
});

for (let i = 0; i < contacts.length; i++) {
  console.log(
    `${contacts[i].fullName}, ${contacts[i].phone}, ${contacts[i].email}, ${contacts[i].location}`,
  );
}
const found = contacts.find((contact) => contact.fullName === "Rizky Pratama");
// contacts.forEach((contact) => {
//   console.log(contact);
// });
