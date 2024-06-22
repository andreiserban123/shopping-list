const form = document.querySelector("form");

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
