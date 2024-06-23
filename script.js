const form = document.querySelector("form");
const listItems = document.querySelector(".items");
const itemFilter = document.querySelector("#filter");
const textBox = document.querySelector("#filter");
const formBtn = form.querySelector("button");
let isEditMode = false;

function addItemToDOM(value) {
  const li = document.createElement("li");
  const txt = document.createTextNode(value);
  li.appendChild(txt);

  const btn = document.createElement("button");
  btn.className = "remove-item btn-link text-red";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  btn.appendChild(i);

  li.appendChild(btn);
  listItems.appendChild(li);
}

// Add items
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#item-input");

  // Validate input
  if (input.value === "") {
    alert("Please add an item");
    return;
  }
  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = listItems.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);

    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(input.value)) {
      alert("That item already exists!");
      input.value = "";
      return;
    }
  }
  addItemToDOM(input.value);

  addItemToStorage(input.value);

  input.value = ""; // Clear the input field
  checkUI();
});

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Get all the items
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// Delete items from list
function removeItemFromStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  const filteredItemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(filteredItemsFromStorage));
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove from DOM
    item.remove();

    // Remove from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
}

function setItemToEdit(item) {
  listItems
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  isEditMode = true;
  const input = document.querySelector("#item-input");
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.background = "#228B22";
  input.value = item.textContent;
}

function onClickItem(e) {
  if (e.target.nodeName === "I") {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

listItems.addEventListener("click", onClickItem);

// Clear items
const clearItems = document.querySelector("#clear");
clearItems.addEventListener("click", () => {
  while (listItems.firstChild) {
    listItems.removeChild(listItems.firstChild);
  }
  localStorage.removeItem("items");
  checkUI();
});

textBox.addEventListener("input", (e) => {
  const filterText = e.target.value.toLowerCase();
  const lis = document.querySelectorAll("ul li");
  lis.forEach((li) => {
    const itemText = li.innerText.toLowerCase();
    if (itemText.includes(filterText)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
});

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function checkUI() {
  const input = document.querySelector("#item-input");
  input.value = "";
  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    clearItems.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearItems.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.background = "#333";
  isEditMode = false;
}

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((i) => {
    addItemToDOM(i);
  });
  checkUI();
}

document.addEventListener("DOMContentLoaded", displayItems);

checkUI();
