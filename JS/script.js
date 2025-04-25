// Hämtar tidigare gäster från localStorage, eller  startar den  med tom lista om ingen finns i listan
let guests = JSON.parse(localStorage.getItem("guests")) || [];

// Funktion för att visa feedbackmeddelande t.ex. "Namnet har lagts till!"
function showFeedback(message, type = "success") {
  const $feedback = $("#feedback"); // Hittar elementet med id="feedback"

  $feedback
    .text(message)               // Visa textmeddelandet
    .removeClass()               // Ta bort gamla klasser (om någon fanns)
    .addClass(`alert-${type}`)   // Lägg till ny klass beroende på typ (t.ex. alert-success)
    .hide()                      // Göm elementet först
    .fadeIn();                   // Visa det med fade-effekt

  setTimeout(() => {
    $feedback.fadeOut();         // Göm feedback efter 2 sekunder
  }, 2000);
}

// Funktion som visar gästlistan på sidan
function displayGuests() {
  const $guestList = $("#guestList");     // Hitta UL-listan där gäster ska visas
  const $guestCount = $("#guestCount");   // Hitta elementet som visar antalet gäster

  $guestList.empty(); // Tömmer hela listan först för att börja om från början

  // Loopar igenom alla namn i arrayen "guests"
  guests.forEach(function(name, index) {
    const $li = $("<li>").text(name);           // Skapar en lista <li> med namnet
    const $deleteBtn = $("<button>").text("Ta bort"); // Skapar en knapp med texten "Ta bort"

    // När man klickar på "Ta bort"-knappen
    $deleteBtn.on("click", function () {
      guests.splice(index, 1);                                // Tar bort namnet från arrayen
      localStorage.setItem("guests", JSON.stringify(guests)); // Sparar ändringen i localStorage
      displayGuests();                                        // Ritar om listan
      showFeedback("Namnet har tagits bort.", "warning");     // Visar varningsmeddelande
    });

    $li.append($deleteBtn);  // Lägger till knappen i <li>-elementet
    $guestList.append($li);  // Lägger till <li> i listan (<ul>)
  });

  $guestCount.text("Antal gäster: " + guests.length); // Uppdaterar antal gäster
}

//  formuläret skickas in (tryck på lägg till-knappen)
$("#guestForm").on("submit", function (e) {
  e.preventDefault(); // Hindrar sidan från att laddas om (e är förkortning för event)

  const name = $("#guestName").val().trim(); // Hämtar text från inputfältet och tar bort mellanslag

  if (name !== "") { // Om namnet inte är tomt
    if (guests.includes(name)) { // Om namnet redan finns i listan
      showFeedback("Namnet finns redan i listan!", "danger"); // Visar rött felmeddelande
      return; // Stoppar 
    }

    guests.push(name); // Lägger till namnet i arrayen
    localStorage.setItem("guests", JSON.stringify(guests)); // Sparae uppdaterade listan
    displayGuests(); // Ritar upp listan på nytt
    $("#guestName").val(""); // Tömmer inputfältet
    showFeedback("Namnet har lagts till!", "success"); // Visar grönt meddelande
  }
});

// När sidan är färdigladdad
$(document).ready(function () {
  displayGuests(); // Visar listan direkt
});
