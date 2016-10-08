/**
 * Created by makaimark on 2016.10.08..
 */

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "https://swapi.co/api/planets/", true);
  xhttp.send();
}


$(document).ready(function () {
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:5000/",
    dataType: "jsonp",
    success: loadDoc(),
})
});


