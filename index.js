let isClicked = false;
document.querySelector(".button").addEventListener("click", () => {
  !isClicked
    ? (document.querySelector(".button").innerText += " is starting..")
    : null;
  isClicked = true;
});

// question 3
let form = document.querySelector("form");
let inputs = form.querySelectorAll("input");
console.log(inputs);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputs[0].value || !inputs[1].value) {
    alert("form inputs are invalid");
  } else {
    alert("form is submitted successfully");
    inputs[0].value = inputs[1].value  = ""
  }
});
