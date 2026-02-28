const inputForm = document.querySelector("#input-form");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const fullNameInput = document.querySelector("#full-name-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
const emailInput = document.querySelector("#email-input");
const locationInput = document.querySelector("#location-input");
const list = document.querySelector("#contacts-list");

// let seedContacts = [
//   {
//     id: 1,
//     fullName: "Lazuardy Anugrah",
//     phone: "6281292846785",
//     email: "lazuardyanugrah@lazu.com",
//     location: "Bogor, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
//   {
//     id: 2,
//     fullName: "Rizky Pratama",
//     phone: "6281376543210",
//     email: "rizky.pratama@gmail.com",
//     location: "Bandung, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
//   {
//     id: 3,
//     fullName: "Aditya Hari",
//     phone: "6281122334455",
//     email: "adityahari@gmail.com",
//     location: "Surabaya, Indonesia",
//     dateCreated: new Date("2025-02-05").toISOString(),
//   },
// ];

// const localStorageContacts = JSON.parse(localStorage.getItem("contacts"));
let contacts = loadContact();
let editId;

const printContacts = function (contacts) {
  for (let i = 0; i < contacts.length; i++) {
    console.log(
      `${contacts[i].fullName}, ${contacts[i].phone}, ${contacts[i].email}, ${contacts[i].location}`,
    );
  }
};

// Add contact from form
const addContactForm = function (e) {
  e.preventDefault();

  const contact = {
    id: contacts.length + 1,
    fullName: fullNameInput.value,
    phone: phoneNumberInput.value,
    email: emailInput.value,
    location: locationInput.value,
    dateCreated: new Date().toISOString(),
  };
  contacts.push(contact);
  console.log(contacts);
  inputForm.reset();
  updateLocalStorage(contacts);
  renderContacts(contacts);
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
  updateLocalStorage(contacts);
  renderContacts(contacts);
};

// Edit contact
// const updateContact = function (contacts, id, updatedInfo) {
//   // Search contact index
//   const i = contacts.findIndex((e) => e.id === id);
//   const dateLastEdited = new Date().toISOString();
//   // if contact exist, update contact with updated info
//   if (i !== -1) {
//     contacts[i] = { ...contacts[i], dateLastEdited, ...updatedInfo };
//   } else {
//     console.log("Contact not found");
//   }

//   console.log(contacts);
// };

const initiateUpdateContact = function (id) {
  // change editid
  editId = id;
  // Search contact
  const contact = contacts.find((contact) => contact.id === id);
  // fill form with contact details
  fullNameInput.value = contact.fullName;
  phoneNumberInput.value = contact.phone;
  emailInput.value = contact.email;
  locationInput.value = contact.location;
};

const saveContact = function (e) {
  e.preventDefault();

  const formData = {
    fullName: fullNameInput.value,
    phone: phoneNumberInput.value,
    email: emailInput.value,
    location: locationInput.value,
  };

  if (editId) {
    const contact = contacts.find((contact) => contact.id === editId);
    const editedContact = { ...contact, ...formData };
    contacts = contacts.map((contact) =>
      contact.id === editId ? { ...contact, ...editedContact } : contact,
    );
    editId = null;
  } else {
    contacts.push({
      id: contacts.length > 0 ? contacts.at(-1).id + 1 : 1,
      dateCreated: new Date().toISOString(),
      ...formData,
    });
    console.log(contacts);
  }
  inputForm.reset();
  renderContacts(contacts);
  updateLocalStorage(contacts);
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

const deleteContactByIdButton = function (id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  console.log(contacts);
  updateLocalStorage(contacts);
  renderContacts(contacts);
};

const searchContactByName = function () {
  const found = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchInput.value.toLowerCase()),
  );
  const searchResult = found.length > 0 ? found : "Contact not found";
  // console.log(`Search contact by name ${name}:`, searchResult);

  if (found.length > 0) {
    // console.log("found");
    renderContacts(found);
  } else if (found.length === 0) {
    // console.log("not found");
    list.innerHTML = `
    <div class="p-4 "><h2 class="text-gray-600 text-xl">Contact not found</h2></div>
  `;
  }
};

const searchContactById = function (contacts, id) {
  const found = contacts.find((contact) => contact.id === id);
  const searchResult = found ? found : "Contact not found";
  console.log(`Search contact by id ${id}:`, searchResult);
  return searchResult;
};

const renderContacts = function (contactArray) {
  list.innerHTML = "";
  list.innerHTML = contactArray
    .map(
      (contact) => `
               <div
                id="contact"
                class="p-6 border-b border-gray-100  transition duration-300"
              >
                <h3 class="text-xl font-semibold text-gray-800">
                  ${contact.fullName}
                </h3>
                <div class="mt-3 space-y-1 text-sm text-gray-600">
                  <p><i class="ri-phone-line"></i> ${contact.phone}</p>
                  <p><i class="ri-mail-fill"></i> ${contact.email}</p>
                  <p><i class="ri-map-pin-2-fill"></i> ${contact.location}</p>
                </div>
                <div class="text-sm mt-2">
                  <button
                    class="px-1 py-1 rounded text-green-700 border border-green-700 hover:bg-green-200 hover:cursor-pointer transition"
                    onClick='initiateUpdateContact(${contact.id})'
                  >
                    <i class="ri-edit-box-line"></i> Update
                  </button>
                  <button
                    class="px-1 py-1 rounded text-red-600 border border-red-600 hover:bg-red-200 hover:cursor-pointer transition"
                    onClick='deleteContactByIdButton(${contact.id})'
                  >
                    <i class="ri-delete-bin-6-line"></i> Delete
                  </button>
                </div>
              </div>
      `,
    )
    .join("");
};

async function getRandomContact() {
  const randomId = Math.floor(Math.random() * 208) + 1;

  const res = await fetch(`https://dummyjson.com/users/${randomId}`);
  const data = await res.json();

  const id = contacts.length > 0 ? contacts.at(-1).id + 1 : 1;
  const dateCreated = new Date().toISOString();

  const contact = {
    id,
    fullName: `${data.firstName} ${data.lastName}`,
    phone: data.phone.slice(1).replaceAll("-", "").replace(" ", ""),
    email: data.email,
    location: `${data.address.city}, ${data.address.state}`,
    dateCreated,
  };

  console.log(contact);

  contacts.push(contact);
  renderContacts(contacts);
  updateLocalStorage(contacts);
}

// Event listener
window.addEventListener("load", () => renderContacts(contacts));
inputForm.addEventListener("submit", saveContact);
searchForm.addEventListener("submit", (e) => e.preventDefault());
searchInput.addEventListener("input", searchContactByName);
