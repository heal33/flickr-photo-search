
$(document).ready(function() {
  
  //delay function
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
   };  
  })();
  
  
  //search for word on keyup
  $('form').keyup(function() {
    
    //adds a delay before searching so user has time to complete typing a tag
    delay(function(){
     
    var $searchTerm = $("#search");
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var animal = $searchTerm.val();
    var flickrOptions = {
      tags: animal,
      format: "json"
    };
     
    //callback function - get photos from flickr 
    function displayPhotos(data) {
      var photoHTML = '<ul>';
      
      //loop and create li for each photo
      $.each(data.items,function(i,photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="thumbnail">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      }); // end each
      
      photoHTML += '</ul>';
      
      //writes the final HTML to div
      $('#photos').html(photoHTML);
    }
      
    //ajax
    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    
    //delay for keyup
    }, 500 );
    
  });
  

}); // end ready