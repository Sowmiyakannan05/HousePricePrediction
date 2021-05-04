function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
        return parseInt(i) + 1;
      }
    }
    return -1; 
}


  
function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
      if (uiBHK[i].checked) {
        return parseInt(i) + 1;
      }
    }
    return -1; 
}
  
function onClickedEstimatePrice() {
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    //var url = "/api/predict_home_price";
    var url = "http://127.0.0.1:5000/predict_home_price";
    $.post(
      url,
      {
        total_sqft: parseFloat(sqft.value),
        location: location.value,
        bhk: bhk,
        bath: bathrooms,
      },
      function (data, status) {
        if(data.estimated_price>0){
        estPrice.innerHTML =
          "<h2>Estimated Price : " +data.estimated_price + " Lakhs</h2>";
        }
        else{
          estPrice.innerHTML =
          "<h2>House is not available for this requirement</h2>";
        }
      }
    );
}


function onPageLoad() {
 // var url="/api/get_location_name";
   var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data, status) {
      if (data) {
        var locations = data.locations;
        var uiLocations = document.getElementById("uiLocations");
        $("#uiLocations").empty();
        for (var i in locations) {
          var opt = new Option(locations[i]); 
          $("#uiLocations").append(opt);
        }
      }
    });
    $.get(url, function (data, status) {
      if (data) {
        var locations = data.locations;
        var uiLocations1 = document.getElementById("uiLocations1");
        $("#uiLocations1").empty();
        for (var i in locations) {
          var opt = new Option(locations[i]); 
          $("#uiLocations1").append(opt);
        }
      }
    });
  }

  window.onload = onPageLoad;


  