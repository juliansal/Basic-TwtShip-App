$(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $('.twt-container').empty();
    console.log(formData);
    sendAJAX(formData);
  });

  function sendAJAX(fData) {
    $.ajax({
      url: 'get_tweets.php',
      type: 'GET',
      data: fData,
      success: function(response) {
        if (typeof response.errors === 'undefined' || response.errors.length < 1) {
          console.log(response);
          traverseJSON(response);
        } else {
          $('.tweets-container').text('Response error');
        }
      },
      error: function(errors) {
        $('.tweets-container p:first').text('Request error');
      }
    });
  }

  var $results = $("#results");

  function twtObject(name, text, link) {
    var twt = [
      "<div class='row twt-container'>",
      "<div class='col s12 m12'>",
      "<div class='card twt-box darken-1'>",
      "<div class='card-content white-text'>",
      "<div class='row'>",
      "<div class='col s4 m4'>",
      "<p class='card-title'><span class='twt-name'>" + name + "</span></p>",
      "</div>",
      "<div class='col s6 m6'>",
      "<p class='card-title'><span class='twt-handle'>" + "handle" + "</span></p>",
      "</div>",
      "<div class='col s2 m2'>",
      "<p class='card-title right twt-date'>" + "date" + "</p>",
      "</div></div>",
      "<p class='twt-text'>" + text + "</p>",
      "<a class='twt-link' target='_blank' href=" + link +">" + link + "</a>",
      "</div></div></div></div>"
    ];
    twt = twt.join(" ");

    return twt;
  }

  function traverseJSON(response) {

    if (typeof response === 'object') {
      $.each(response, function(i, obj) {
        if (i === 0 && typeof obj === 'object') {
          link = obj.url;
        }
        if (i === "user" && typeof obj === 'object') {
          name = obj.name;
          text = response.text;

          twt = twtObject(name, text, link);
          $results.append(twt);
        }
        traverseJSON(obj);

      });
    }
  }

});
