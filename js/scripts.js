$(document).ready(function () {
  console.log('scripts loaded');

  var url1 = 'http://api.open-notify.org/iss-now.json?callback='; //calling the API
  var html = '';
  var locations = [];

  geo(); // calling geo function

  function geo() {
    setInterval(function () {
      $.ajax({
        url: url1, success: function (data) {
          var latitude = data.iss_position.latitude;
          var longitude = data.iss_position.longitude;
          var url2 = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + latitude + '&' + 'lon=' + longitude; //entering the geo coordinaties 
          var check = undefined;

          console.log(latitude); //checking for connection
          console.log(longitude);

          $.ajax({
            url: url2, success: function (info) {

              console.log(info.address);
              //checking that the info recieved is not undefined
              if (info.address == check) {
                html += '<div class="ocean">The space station is currently over an ocean </div>';
              } else if (info.address.city == check) {
                html += '<div class="country">The space station is currently over ' + info.address.country + '</div>';
              } else {
                html += '<div class="both">The space station is currently over ' + info.address.city + ', ' + info.address.country + '</div>';
              }

              $('#target').html(html);
            }
          }); // end of ajax call to wiki open tree

        }
      }); // end of ajax call to satelite coordinates

    }, 5000);
  }




}); //end of ready function
