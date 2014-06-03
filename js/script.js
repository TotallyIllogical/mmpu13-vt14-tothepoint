$(document).ready(function(){

  var getMovies = function(){

    var film = $('#term').val();

    if(film == ''){
      // Om en inte skriver något i sökfältet skrivs det här medelandet ut
      $('.result').html('<div class="row"><div class="large-12 columns"><div class="panel wrapper"><div class="row"><div class="large-12 columns"><h3>Please type something in the searchfield.</h3></div></div></div></div></div>');

    } else {
      
      // Rensar resultat-rutan
      $(".result").empty();

      // Använder tmdb sök-api för att hitta filmer vars titel matchar det som eftersöks
      $.getJSON("http://api.themoviedb.org/3/search/movie?query=" + film + "&api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {

        // Kollar så att results eller pages inte är tomma
        if (json.total_results != 0 || json.total_pages != 0){

          // Bestämmer att 5 resltat ska visas
          for(var i = 0; i < 5; i++){

            // Sätter den nuvarande filmens id-nummer som variabeln movieid
            var movieid = json.results[i].id;

            // Populera result-rutan (Dear f-ing Bob, the amount of code...)
            $('.result').append('<div id="'+movieid+'" class="row"><div class="large-12 columns"><div class="panel wrapper"><div class="row"><div class="large-4 medium-4 columns poster"></div><article class="large-8 medium-8 columns"><h2 class="title"></h2><h3 class="org-title orgTitle"></h3><p class="description"></p><h4>Information</h4><strong>Released:</strong> <div class="info release"></div><strong>Runtime:</strong> <div class="info runtime"></div><strong>Language:</strong> <div class="info language"></div><br><strong>Genre:</strong> <div class="info genre"></div><br><strong>Director:</strong> <div class="info director"></div><br><strong>Writer:</strong> <div class="info writer"></div><br><strong>Starring:</strong> <div class="info starring"></div><div class="buttons-wrapper"><div class="read-more"></div><div class="trailer"></div></div></article><!-- .8-columns --></div><!-- .row --><div class="row"><div class="large-12 columns"><table class="responsive table-wrapper"><thead><tr><th class="center strong">Source</th><th class="center"><a href="http://www.themoviedb.org/" target="_blank"><img src="img/tmdb.png" alt="The Movie Database" class="logo"></a></th> <th class="center"><a href="http://www.imdb.com/" target="_blank"><img src="img/imdb.png" alt="IMDb" class="logo"></a></th><th class="center"><a href="http://www.rottentomatoes.com/" target="_blank"><img src="img/rottentomatoes.png" alt="Rotten Tomatoes" class="logo"></a></th></tr></thead><tbody><tr><td class="center strong">Maximum</td><td class="center">10</td><td class="center">10</td><td class="center">100%</td></tr><tr><td class="center strong">Rating</td><td class="rating center tmdb-score"></td><td class="rating center imdb-score"></td><td class="rating center rt-score"></td></tr></tbody></table></div><!-- .row --></div><!-- .large-12 columns --></div><!-- .panel-wrapper --></div><!-- .large-12 columns --></div><!-- .row -->');
   
            // Den här getJSON hämtar basinformation så som titel, synopsis och poster
            $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {
              
              // Definerar om variabel movieid till den nuvarandre idn
              movieid = json.id;

              // Hämtar poster eller movie-placeholder-image
              if (json.poster_path) {
                $('#'+movieid).find('.poster').html('<h2 class="loading"></h2><img id="thePoster" src=http://image.tmdb.org/t/p/w500/' + json.poster_path + ' />');
              } else {
                $('#'+movieid).find('.poster').html('<h2 class="loading"></h2><img id="thePlaceHolderImg" src=img/movie-placeholder.png' + ' />');
              }

              // Lägger in filmtitel
              $('#'+movieid).find('.title').append('<h3>' + json.title + '</h3>');

              // Kollar om orginal titel finns och skriver ut den i sådanna fall
              if (json.title != json.original_title) {
                $('#'+movieid).find('.orgTitle').html('<h5>' + json.original_title + ' <em>(original title)</em>' + '</h5>');
              }
              
              // Tar in filmens beskrivning och kortar ner den om den är mer än 370 tecken                            
              var words = json.overview;
              words = words.substr(0,370);

              // Lägger till tre punkter om texten är 370 tecken lång
              if(words.length == 370){
                words += "...";
              }

              // Lägger in den nedkortade filmbeskrivningen
              $('#'+movieid).find('.description').html(words);

              // Lägger till "read more"-knappen och länkar till filmens tmdb-sida
              $('#'+movieid).find('.read-more').html( ' <a href="https://www.themoviedb.org/movie/' + movieid + '" class="button" target="_blank">Read more &raquo;</a>');

              // Hämtar filmens trailer
                function setTrailer(movieid,node) { 
                  $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "/videos?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {
                    $(node).html( ' <a href="http://www.youtube.com/watch?v=' + json.results[0].key + '" class="button" target="_blank">Watch trailer &raquo;</a>');                            
                  });
              };
              setTrailer(movieid, $('#'+movieid).find('.trailer'));

              // Skapar en tom array
              var languages = [];
              // Lägger in värdena från spoken_languages i den tomma arrayen som skapades innan
              $.each(json.spoken_languages, function( index, value ) {
                languages.push(value.name);
              });
              // Skriver ut 'nothing found' om inga språk hittas
              if(languages.length == 0){
                languages.push("Nothing found");
              }
              // Gör om arrayen till en sträng och döper om den
              var languagelist = languages.join(", ");
              // Skriver ut languagelist
              $( '#'+movieid).find('.language' ).append( document.createTextNode(languagelist));

              // Hämtar ut release date
              $('#'+movieid).find('.release').html(json.release_date);

              // Hämtar ut speltiden
              $('#'+movieid).find('.runtime').html(json.runtime + " min");

              // Skapar en tom array
              var genres = [];
              // Lägger in värdena i den tomma arrayen vi skapade raden ovanför
              $.each(json.genres, function( index, value ) {
                genres.push(value.name);
                return genres;
              });
              if(genres.length == 0){
                genres.push("No genre found");
              }
              // Gör om innehållet i arrayen till en sträng
              var genrelist = genres.join(" / ");
              // Lägger in genrena
              $('#'+movieid).find('.genre').append( document.createTextNode( genrelist ) );

              // Hämtar ut filmens tmdb-poäng
              $('#'+movieid).find('.tmdb-score').html('<a href="https://www.themoviedb.org/movie/' + movieid + '" target="_blank">' + json.vote_average + '</a>');

              // Hämtar en ny json från en annan källa med hjälp av imdb_id:t från den förra json
              var imdbId = json.imdb_id;
              function setImdbScore(imbdId, node){
               $.getJSON("http://www.omdbapi.com/?i=" + imdbId, function(json){
                 $(node).html('<a href="http://www.imdb.com/title/' + imdbId + '" target="_blank">' + json.imdbRating + '</a>');
               }); 
              };
              setImdbScore(json.imdb_id, $("#"+movieid).find('.imdb-score')); 

              // Döper om json.imdb_id
              var imdbIDwithLetters = json.imdb_id;
              // Tar bort de första två tecknena i värdet
              var theImdbId = imdbIDwithLetters.substring(2);

              function setRtScore(imdbRtId, node) { 
                // Tar in parameten datan från ajax-hämtningen
                function rtScoring(data) {
                  // Döper om det vi vill använda
                  var theRTscore = data.ratings.critics_score;
                  // Skriver ut filmens RT-poäng
                  $(node).html('<a href="http://www.rottentomatoes.com/m/' + data.id + '" target="_blank">' + theRTscore + '% </a>');
                };

                // Skapar en jsonp utifrån RT's (Rotten Tomatoes) API och om den är en "success" så kör den funktionen rtScoring
                $.ajax({
                  url: "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?apikey=hsvze4vnd8ks2kptercdh6sq&type=imdb&id=" + encodeURI(theImdbId),
                  dataType: "jsonp",
                  success: rtScoring
                });
              };
              setRtScore(theImdbId, $('#'+movieid).find('.rt-score'));
            });

            // Den här getJSON hämtar rollistan, manusförfattare och regisör
            $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "/casts?api_key=c9ec56f0f1ccf916a4baa2b711e5ce29", function(json) {

              // Skapar massa tomma arrayer
              var directors = [];
              var writers =[];
              var movieid = json.id;

              // Går igenom alla rader i crew och tar de som matchar
              $.each(json.crew, function( index, value ) {
                if(value.job == "Director"){
                  directors.push(value.name);
                }

                // Begränsar antalet namn
                if(value.job == "Writer" && writers.length < 2){
                  writers.push(value.name);
                }
                if(writers.length < 2){
                  if(value.job == "Author"){
                    writers.push(value.name);
                  }
                }
                if(writers.length < 2){
                  if(value.job == "Screenplay"){
                    writers.push(value.name);
                  }
                }
              });

              if(directors.length == 0){
                directors.push("No name found");
              }
              // Gör om directors-arrayen till en sträng 
              var directorlist = directors.join(", ");
              // Hämtar directors 
              $('#'+movieid).find('.director').append(document.createTextNode(directorlist));

              // Kollar om writers-arrayen är tom
              if(writers.length == 0){
                writers.push("No name found");
              }
              // Gör om arrayen till en sträng
              var writerslist = writers.join(", ");
              // Skriver ut strängen
              $( '#'+movieid).find('.writer' ).append(document.createTextNode(writerslist));

              // Skapar en tom array
              var actornames = [];
              // Skapar variabeln limit som ska definieras i if-satsen nedan
              var limit;
              // Sätter längden på limit
              if (json.cast.length < 5){
                limit = json.cast.length;
              }
              else{
                limit = 5;
              }

              // Hämtar ut skådespelarnamnen och pushar in dem i den tomma arrayen
              for(var i = 0; i < limit; i++){
                actornames.push(json.cast[i].name);
              }

              if(actornames.length == 0){
                actornames.push("No name found");
              }              
              // Gör om arrayen till en sträng
              var actorlist = actornames.join(", ");
              // Skriver ut strängen
              $('#'+movieid).find('.starring').append(document.createTextNode(actorlist));
            });
          };
        } else {

          // Om inga filmresultat hittas skrivs detta ut
          $('.result').html('<div class="row"><div class="large-12 columns"><div class="panel wrapper"><div class="row"><div class="large-12 columns"><h3>We are afraid nothing was found for that search.</h3></div></div></div></div></div>');
        }
      });
    }
  return false;
  };

  $('#search').click(getMovies);
  $('#term').keyup(function(event){
    if(event.keyCode == 13){
      getMovies();
    }
  });

});