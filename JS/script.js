// Hämta tidigare gäster från localStorage
let guests = JSON.parse(localStorage.getItem("guests")) || [];

// Visar feedbackmeddelande (grönt, rött eller orange)
function showFeedback(message, type = "success") {
  const $feedback = $("#feedback");
  $feedback
    .text(message)
    .removeClass()
    .addClass(`alert-${type}`)
    .hide()
    .fadeIn();

  setTimeout(() => {
    $feedback.fadeOut();
  }, 2000);
}

// Visar listan med gäster
function displayGuests() {
  const $guestList = $("#guestList");
  const $guestCount = $("#guestCount");

  $guestList.empty();

  guests.forEach(function(name, index) {
    const $li = $("<li>").text(name);
    const $deleteBtn = $("<button>").text("Ta bort");

    // Ta bort-knappens funktion
    $deleteBtn.on("click", function () {
      guests.splice(index, 1);
      localStorage.setItem("guests", JSON.stringify(guests));
      displayGuests();
      showFeedback("Namnet har tagits bort.", "warning");
    });

    $li.append($deleteBtn);
    $guestList.append($li);
  });

  $guestCount.text("Antal gäster: " + guests.length);
}

// När formuläret skickas
$("#guestForm").on("submit", function (e) {
  e.preventDefault();
  const name = $("#guestName").val().trim();

  if (name !== "") {
    if (guests.includes(name)) {
      showFeedback("Namnet finns redan i listan!", "danger");
      return;
    }

    guests.push(name);
    localStorage.setItem("guests", JSON.stringify(guests));
    displayGuests();
    $("#guestName").val("");
    showFeedback("Namnet har lagts till!", "success");
  }
});

// Visa lista direkt när sidan laddas
$(document).ready(function () {
  displayGuests();
});