 //fix?
 var giphys = ['Cats', 'Dogs', 'Birds'];

  function displayGiphy() {
    var giphy = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      var results = response.data;

      for (i=0; i<10; i++) {
        var gifDiv = $('<div>');
        var rating = results[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        var gifImage = $('<img>');
        gifImage.attr('src', results[i].images.fixed_height_still.url);
        gifImage.attr('data-state', 'still');
        gifImage.attr('data-still', results[i].images.fixed_height_still.url);
        gifImage.attr('data-animate', results[i].images.fixed_height.url);
        gifImage.addClass('theGIF');
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);
        $('#giphyView').prepend(gifDiv);
      }
    });
  }

  function renderButtons() {
    $('#buttons').empty();

    for (var i=0; i<giphys.length; i++) {
      var a = $('<button>');
      a.addClass('giphy');
      a.attr('data-name', giphys[i]);
      a.text(giphys[i]);
      $('#buttons').append(a);
    }
  }

  $('#searchButton').on('click', function(event) {
    event.preventDefault();
    var giphy = $('#giphyInput').val().trim();
    giphys.push(giphy);
    renderButtons();
  });

  $(document).on('click', '.theGIF', function() {
    var state = $(this).attr('data-state');
    console.log('state: ' +state);

    if (state === 'still') {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


  $(document).on('click', '.giphy', displayGiphy);

  renderButtons();