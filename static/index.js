/**
 * Created by makaimark on 2016.10.08..
 */

function tableWriter(result) {
    var table = document.getElementById("table");
    var data = ["name", "diameter", "climate", "gravity", "terrain", "surface_water", "population", "residents"];
    for (var i = 0; i < result["results"].length; i++) {
        var row = table.insertRow(i + 1);
        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = result["results"][i][data[j]];
        }
        var cell_residents = row.insertCell(7);
        if (result["results"][i]["residents"].length == 0) {
            cell_residents.innerHTML = "No known residents";
        } else {
            var bt = document.createElement('input');
            bt.type = "button";
            bt.value = "residents";
            bt.setAttribute("id", i + 2);
            bt.setAttribute("class", "btn btn-primary");
            bt.setAttribute("data-toggle", "modal");
            bt.setAttribute("data-target", "#residentsModal");
            cell_residents.appendChild(bt);
        }
    }
}

function loadResidents (id) {
    console.log(id);
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            // var next = result["next"];
            // $("#next").attr("href", next);
            // var previous = result["previous"];
            // $("#previous").attr("href", previous);
            tableWriter(result);
            }

    };
    $(".btn").click( function (event) {
        loadResidents(event.target.id);
    });
    xhttp.open("GET", "https://swapi.co/api/planets/", true);
    xhttp.send();
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/",
        dataType: "jsonp",
        success: loadDoc()
    });
    // $("#next").click(loadDoc);
    // $("#previous").click(loadDoc);
});


