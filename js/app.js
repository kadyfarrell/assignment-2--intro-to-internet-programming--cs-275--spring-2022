function whiteRice() {
  var text = document.getElementById("recipeOne");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}
function caliRice() {
  var text = document.getElementById("recipeTwo");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

document
.getElementById('rice')
.addEventListener('keyup', function (e) {
  let value = Number(e.target.value)
  document.getElementById('result').innerHTML = value * 2
  document.getElementById('softResult').innerHTML = value * 2.5
})


