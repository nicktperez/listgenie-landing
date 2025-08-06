
function captureEmail(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  alert("Thanks for joining the waitlist, " + email + "!");
  document.getElementById("email").value = "";
  return false;
}
