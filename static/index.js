/**
 * Created by makaimark on 2016.10.08..
 */

function residentsWriter(result) {
    var table = document.getElementById("residentsTable");
    var data = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
    var row = table.insertRow();
    row.setAttribute("class", "resident");
    for (var i = 0; i < 8; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = result[data[i]];
    }
}

function tableWriter(result) {
    $(".data_row").empty();
    var listOfResidents = {};
    var table = document.getElementById("table");
    var data = ["name", "diameter", "climate", "gravity", "terrain", "surface_water", "population", "residents"];
    for (var i = 0; i < result["results"].length; i++) {
        var row = table.insertRow(i + 1);
        row.setAttribute("class", "data_row");
        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = result["results"][i][data[j]];
        }
        var cell_residents = row.insertCell(7);
        if (result["results"][i]["residents"].length == 0) {
            cell_residents.innerHTML = "No known residents";
        } else {
            listOfResidents[i + 2] = result["results"][i]["residents"];
            var bt = document.createElement('input');
            bt.type = "button";
            bt.value = result["results"][i]["residents"].length + " residents";
            bt.setAttribute("id", i + 2);
            bt.setAttribute("class", "btn btn-primary resident_button");
            bt.setAttribute("data-toggle", "modal");
            bt.setAttribute("data-target", "#residentsModal");
            cell_residents.appendChild(bt);
        }
    }
    return listOfResidents;
}

function loadResidents(id, listOfResidents) {
    $(".resident").empty();
    for (var resident = 0; resident < listOfResidents[id].length; resident++) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                residentsWriter(result);
            }
        };
        xhttp.open("GET", listOfResidents[id][resident], true);
        xhttp.send();
    }
}

function clickOnResidentsButtonEventHandler(id, listOfResidents) {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/",
        dataType: "jsonp",
        success: loadResidents(id, listOfResidents)
    });
}

function clickOnNextPreviousButtons(url) {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/",
        dataType: "jsonp",
        success: loadDoc(url)
    });
}

function loadDoc(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.status == 200) {
            var result = JSON.parse(this.responseText);
            var next = result["next"];
            var previous = result["previous"];
            var listOfResidents = tableWriter(result);
        }

        $(".resident_button").click(function (event) {
            clickOnResidentsButtonEventHandler(event.target.id, listOfResidents);
        });
        if ( next == null ){
            document.getElementById("next").isDisabled = true;
        } else {
            document.getElementById("next").setAttribute("onclick", 'clickOnNextPreviousButtons("' + next + '")');
            document.getElementById("next").isDisabled = false;
        }
        if ( previous == null ){
            document.getElementById("previous").isDisabled = true;
        } else {
            document.getElementById("previous").setAttribute("onclick", 'clickOnNextPreviousButtons("' + previous + '")');
            document.getElementById("previous").isDisabled = false;
        }

    };
    xhttp.open("GET", url, false);
    xhttp.send();
}

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/",
        dataType: "jsonp",
        success: loadDoc("https://swapi.co/api/planets/")
    });
});


