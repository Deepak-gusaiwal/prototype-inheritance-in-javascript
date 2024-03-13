let isClicked = false;
document.querySelector(".button").addEventListener("click", () => {

  !isClicked ? document.querySelector(".button").innerText +=' is starting..' : null
  isClicked = true;
});
