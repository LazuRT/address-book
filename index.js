console.log("Test address book");

const contacts = [
  {
    id: 1,
    fullName: "Lazuardy Anugrah",
    phone: 6281292846785,
    email: "lazuardyanugrah@lazu.com",
    Location: "Bogor, Indonesia",
  },
  {
    id: 2,
    fullName: "Rizky Pratama",
    phone: 6281376543210,
    email: "rizky.pratama@gmail.com",
    Location: "Bandung, Indonesia",
  },
  {
    id: 3,
    fullName: "Aditya Hari",
    phone: 6281122334455,
    email: "adityahari@gmail.com",
    Location: "Surabaya, Indonesia",
  },
];

console.log(contacts);
for (let i = 0; i < contacts.length; i++) {
  console.log(contacts[i]);
}

// add contact function
const addContact = function (fullName, phone, email, location) {
  const id = contacts.length + 1;
  // contacts = [...contacts, { id, fullName, phone, email, location }];
  contacts.push({ id, fullName, phone, email, location });
  console.log(contacts);
};

addContact(
  "John Doe",
  "0987898667",
  "email@email.com",
  "Los Angeles, California",
);
addContact("Ellen Baker", "01234566", "ellen@email.com", "Chicago, Illinois");

for (let i = 0; i < contacts.length; i++) {
  console.log(
    `${contacts[i].fullName}, ${contacts[i].phone}, ${contacts[i].email}`,
  );
}
const found = contacts.find((contact) => contact.fullName === "Rizky Pratama");
// contacts.forEach((contact) => {
//   console.log(contact);
// });
