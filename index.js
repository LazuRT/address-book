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

// contacts.forEach((contact) => {
//   console.log(contact);
// });
