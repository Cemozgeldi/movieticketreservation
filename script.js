const container = document.querySelector(".container"); //selects the container class
const count = document.getElementById("count"); //selects the count id
const total = document.getElementById("total"); //selects the total id
const select = document.getElementById("movie"); //selects the movie id
const seats = document.querySelectorAll(".seat:not(.reserved)"); //selects the seats class
container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});
function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  const selectedSeatsArr = []; //array to store the selected seats
  const seatsArr = []; //array to store all the seats

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  }); //pushes the selected seats to the array

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  }); //pushes all the seats to the array

  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  }); //returns the index of the selected seats

  let selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}
function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(selectedSeatIndexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatIndexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
