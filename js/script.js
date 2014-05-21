$(document).ready(function(){

   $('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });

   var getPoster = function(){

        var film = $('#term').val();

         if(film == ''){
            // Om en personen inte skrivit något ska det här medelandet skrivas ut
            $('#poster').html("<h2 class='loading'>Please type something in the searchfield.</h2>");

         } else {
            //Använder tmdb sök-api för att hitta filmer vars titel matchar det som eftersöks
            $.getJSON("http://api.themoviedb.org/3/search/movie?query=" + film + "&api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {

              if (json != "Not Found"){
                // Använd id från sök-api:n för att hämta resten av informationen med hjälp av huvud-api:n, se nedan
                var movieid= json.results[0].id;
                $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {

                  $('#poster').html('<h2 class="loading"></h2><img id="thePoster" src=http://image.tmdb.org/t/p/w500/' + json.poster_path + ' />'); //Här behövs det en if-sats som hämtar en placeholder bild ifall den poster inte hittas

                  $('#title').html('<h3>' + json.title + '</h3>');
                  // Här ska alternativ titlar skrivas ut
                  $('#description').html(json.overview + '<br>&raquo; <a href="https://www.themoviedb.org/movie/' + movieid + '">Read more</a>'); //Här behöver vi sätta in så "read more" länken öppnar en ny sida
                  $('#genre').html(json.genres[0].name); //behövs en loop här eftersom de flesta filmer har med än en genre
                  $('#release').html(json.release_date);
                  $('#language').html(json.spoken_languages[0].name); //behövs en loop här eftersom en film kan har flera språk
                  $('#runtime').html(json.runtime);
                  $('#score').html(json.vote_average);

                });
                // Den här biten fungerar inte
                $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "casts?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json2) {
                  console.log(json2);
                  $('#starring').html(json2[0].name); //Här behövs en loop för att hämta antalet skådespelarnamn du önskar
                });
                } else {
                   $.getJSON("http://api.themoviedb.org/3/search/movie?query=" + film + "&api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {
                      console.log(json);
                      $('#poster').html('<h2 class="loading">We are afraid nothing was found for that search.</h2>');
                   });
                }
             });

          }

        return false;
   }

   $('#search').click(getPoster);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getPoster();
       }
   });

});