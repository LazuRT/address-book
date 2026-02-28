const updateLocalStorage = function (contactArr) {
  localStorage.setItem("contacts", JSON.stringify(contactArr));
};

const loadContact = function () {
  const localStorageContacts = JSON.parse(localStorage.getItem("contacts"));
  return localStorageContacts ? localStorageContacts : [];
};
