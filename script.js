const form = document.querySelector("form");
const listItems = document.querySelector(".items");

// add items
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector("#item-input");

  //validate input
  if (input.value === "") {
    alert("Please add an item");
    return;
  }

  const value = input.value;
  input.value = ""; // Clear the input field

  const list = document.querySelector("ul");

  const li = document.createElement("li");
  const txt = document.createTextNode(value);
  li.appendChild(txt);

  const btn = document.createElement("button");
  btn.className = "remove-item btn-link text-red";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  btn.appendChild(i);

  li.appendChild(btn);
  console.log(li);
  list.appendChild(li);
});

// delete items from list

function removeItem(e) {
  if (e.target.nodeName === "I") {
    const li = e.target.closest("li");
    li.remove();
  }
}

listItems.addEventListener("click", removeItem);

// clear items
const clearItems = document.querySelector("#clear");
clearItems.addEventListener("click", () => {
  const ul = document.querySelector("ul");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});
