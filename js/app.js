//searchbar Handler
$(function(){
    var searchField = $('#query');
    var icon = $ ('#search-btn');

//Foucus Event Handler
    $(searchField).on('focus',function(){
        $(this).animate({
            width: '100%'
        },400);
        $(icon).animate({
            right:'10px'
        },400);
    });

//Blur Event Handler    
    $(searchField).on('blur',function(){
        if(searchField.val() ==''){
            $(searchField).animate({
                width: '45%'
            },400,function(){});
            $(icon).animate({
                right: '565px'
            },400,function(){}); 
        }
    });
    $ ('#search-form').submit(function(e){
        e.preventDefault();
    });
})

function search(){
    // clear Resuls
    $('#results').html('');
    $('#buttons').html('');

    //get form input
    q = $ ('#query').val();

    //run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
           part: 'snippet, id',
           q: q,
           type: 'video',
           key: 'AIzaSyDRQL9wMtM6y4eKIKErZy3QmuyVPt5P-XU'},
           function (data){
               var nextPageToken = data.nextPageToken;
               var prevPageToken = data.prevPageToken;

               // Log Data
               console.log(data);
               
               $.each(data.items, function(i, item){
                    // Get Output
                    var output = getOutput(item);

                 // Display Results
                 $('#results').append(output);
               });

               var buttons = getButtons(prevPageToken, nextPageToken);
               $('#buttons').append(buttons);
           } 
    );
}

// Next Page Function
function nextPage(){
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');

     // clear Resuls
     $('#results').html('');
     $('#buttons').html('');
 
     //get form input
     q = $ ('#query').val();
 
     //run get request on API
     $.get(
         "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDRQL9wMtM6y4eKIKErZy3QmuyVPt5P-XU'},
            function (data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
 
                // Log Data
                console.log(data);
                
                $.each(data.items, function(i, item){
                     // Get Output
                     var output = getOutput(item);
 
                  // Display Results
                  $('#results').append(output);
                });
 
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            } 
     ); 
}

// Prev Page Function
function prevPage(){
    var token = $('#prev-button').data('token');
    var q = $('#prev -button').data('query');

     // clear Resuls
     $('#results').html('');
     $('#buttons').html('');
 
     //get form input
     q = $ ('#query').val();
 
     //run get request on API
     $.get(
         "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDRQL9wMtM6y4eKIKErZy3QmuyVPt5P-XU'},
            function (data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
 
                // Log Data
                console.log(data);
                
                $.each(data.items, function(i, item){
                     // Get Output
                     var output = getOutput(item);
                    //  var youtubeMovie = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' + item.id.videoId +'</a>';
                    //  var searchMe = '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img class="uthumb" src="' + youtubeImage + '"></a>';
 
                  // Display Results
                  $('#results').append(output);
                //   $('#results').append(searchMe);
                });
 
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            } 
     ); 
}

// Build Output 
function getOutput(item){
    var videoId = item.id.videoId;
    var titel = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoData = item.snippet.publishedAt;

    // Build Output String
    var output = '<li>' + 
    '<div class="list-left">' +
    '<img src="'+ thumb +'">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+titel+'</a></h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoData+'</small>'+ 
    '<p>'+description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    '';   
    return output ; 
}

//Build the buttons
function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnoutput = '<div class = "btton-container">'+
        '<button id="next-button" class="paging-button" data-token="' + nextPageToken+'" data-query="'+q+'"'+ 
        'onclick="nextPage();">Next Page</button></div>';                
    }else{
        var btnoutput = '<div class = "btton-container">'+
        '<button id="prev-button" class="paging-button" data-token="' + prevPageToken+'" data-query="'+q+'"'+ 
        'onclick="prevPage();">Prev Page</button>' + 
        '<button id="next-button" class="paging-button" data-token="' + nextPageToken+'" data-query="'+q+'"'+ 
        'onclick="nextPage();">Next Page</button></div>';
    }
    return btnoutput;
}




