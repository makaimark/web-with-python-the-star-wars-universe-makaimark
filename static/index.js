/**
 * Created by makaimark on 2016.10.08..
 */

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var result = JSON.parse(this.responseText);
        var next = result["next"];
        var table = document.getElementById("table");

        for ( var i = 0; i < result["results"].length; i++){
            var row = table.insertRow(i+1);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = result["results"][i]["name"];
            var cell1 = row.insertCell(1);
            cell1.innerHTML = result["results"][i]["diameter"];
            var cell2 = row.insertCell(2);
            cell2.innerHTML = result["results"][i]["climate"];
            var cell3 = row.insertCell(3);
            cell3.innerHTML = result["results"][i]["gravity"];
            var cell4 = row.insertCell(4);
            cell4.innerHTML = result["results"][i]["terrain"];
            var cell5 = row.insertCell(5);
            cell5.innerHTML = result["results"][i]["surface_water"];
            var cell6 = row.insertCell(6);
            cell6.innerHTML = result["results"][i]["population"];
            var cell7 = row.insertCell(7);
            cell7.innerHTML = "Residents";
                // result["results"][i]["residents"];
        }
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


