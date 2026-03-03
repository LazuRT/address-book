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

let contacts = loadContact();
let editId;

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

  // TODO: try out formData.entries(), to eliminate the needs to declare each form items at the top of file
  const formData = {
    fullName: fullNameInput.value,
    phone: phoneNumberInput.value,
    email: emailInput.value,
    location: locationInput.value,
  };

  if (editId) {
    // TODO: try out findIndex and mutate the contacts in place instead of wastefully using .map()
    const contact = contacts.find((contact) => contact.id === editId);
    const contactIndex = contacts.findIndex((contact) => contact.id === editId);
    contacts[contactIndex] = { ...contact, ...formData };
    // contacts = contacts.map((contact) =>
    //   contact.id === editId ? { ...contact, ...editedContact } : contact,
    // );
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

  if (found.length > 0) {
    renderContacts(found);
  } else if (found.length === 0) {
    list.innerHTML = `
    <div class="p-4 "><h2 class="text-gray-600 text-xl">Contact not found</h2></div>
  `;
  }
};

const renderContacts = function (contactArray) {
  list.innerHTML = "";
  list.innerHTML = contactArray
    .map(
      (contact) => `
               <div
                id="contact"
                class="p-6 border-b border-gray-100"
              >
                <h3 class="text-xl font-semibold text-gray-800">
                  ${contact.fullName}
                </h3>
                <div class="mt-3 space-y-1 text-sm text-gray-600 break-all">
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
