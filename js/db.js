function db_getSongReviews(songSpotifyID){
    var orderBy;
    var filter = $('#songReviewFilter').val();
    switch(parseInt(filter)){
        case 1 : orderBy = 'rank';
            break;
        case 2 : orderBy = 'posted';
            break;
    };


    var args = {
        spotifyId:songSpotifyID,
        orderBy: orderBy
    };

    $.getJSON("db/getReview.php",args,
        function(data){
            dsp_db_songReviews(data);
            db_getAverageSongRating(songInfo.spotifyID);
            console.log("DB - getSongReviews - success");
        },
        function(data){
            alert("DB doesn't work");
        })

}

function dsp_db_songReviews(reviews){
    var $songReviewsList = $('#songReviewsList');

    //clear first
    $songReviewsList.html("");

    if(reviews.length==0){
        $songReviewsList.html("No reviews available");
    }

    var reviewRatings = [];

    for (var i=0; i< reviews.length; i++){
        var review = reviews[i];

        //show only the reviews that contain text
        if(review.text!="") {
            var template = $('#songReviewTemplate').html();
            var output;

            output = Mustache.render(template, review);

            $songReviewsList.append(output);




            reviewRatings.push(review.rating);




        }
    }

    $('.reviewRating').barrating('show', {
            theme: 'bars-square',
            showValues: true,
            showSelectedRating: false,
            readonly: true,
        }
    );

    // have to be set after barrating is initialised
    for(var k = 0 ; k<reviewRatings.length; k++){
        var rating = reviewRatings[k];
        var selector = '.reviewRating:eq('+k+')';
        //todo consider better way
        //$(selector) select").val(reviewRatings[k]);
        $(selector).barrating('set',rating);
    }
    refreshContentReviewMouseover();
}

function db_addSongReview(spotifyID,text,rating){

    var args = {
        spotifyId:spotifyID,
        review: text,
        rating: rating
    };

    $.getJSON("db/addReview.php",args,
        function(){
            db_getSongReviews(songInfo.spotifyID);
        },
        function(data){
            alert("DB doesn't work");
        })
}

function db_getAverageSongRating(spotifyID){
    var args = {
        spotifyId: spotifyID
    };


    $.getJSON("db/getAverageReviewRating.php",args,
        function(data){
            dsp_db_averageSongRating(data);
        },
        function(data){
            alert("average rating fetch failed");
        });
}

function dsp_db_averageSongRating(averageSongRating){
    var avg = averageSongRating[0].averageRating;
    var reviewCount = averageSongRating[0].count; // todo: use

    var avgRound = Math.round(avg);
    if(avg==null){
        // do nothing
    }else {
        $('#avgSongRating').barrating('set', avgRound);
    }
}

function db_voteForReview(reviewID, vote){
    var args = {
        review_id: reviewID,
        vote: vote
    };

    $.getJSON("db/voteReview.php",args,
        function(){
            db_getSongReviews(songInfo.spotifyID);
        },
        function(){
            alert("DB doesn't work");
        })
}

function db_getContent(spotifyID){
    var filter = $('#userLinkedContent-cat-filter').val();
    var orderByRaw =$('#contentOrderBy').val();
    var orderBy;
    switch(parseInt(orderByRaw)){
        case 1 : orderBy = 'rank';
            break;
        case 2 : orderBy = 'posted';
            break;
    };

    var args = {
        spotifyId:spotifyID,
        filter: filter,
        orderBy: orderBy
    };

    $.getJSON("db/getContent.php",args,
        function(data){
            dsp_db_content(data);
        },
        function(data){
            alert("DB doesn't work");
        })
}

function dsp_db_content(data){
    var $contentList = $('#contentList');

    //clear first
    $contentList.html("");

    if(data.length==0){
        $contentList.html("No content available");
    }

    for (var i=0; i< data.length; i++) {
        var content = data[i];

        var template;
        var output;
        switch(content.category){
            case 'live':
                template = $('#contentTemplate-live').html();
            break;
            case 'behind the scenes':
                template = $('#contentTemplate-bts').html();
                break;
            case 'remix':
                template = $('#contentTemplate-remix').html();
                break;
            case 'cover':
                template = $('#contentTemplate-cover').html();
                break;
            case 'article':
                template = $('#contentTemplate-article').html();
                break;
            case 'review':
                template = $('#contentTemplate-review').html();
                break;
            case 'other':
                template = $('#contentTemplate-other').html();
                break;
        }

        output = Mustache.render(template,content);

        $contentList.append(output);

    }
    refreshContentReviewMouseover()
}

function db_addContent(spotifyID, link, description, category, title){
    var args = {
        spotifyId:spotifyID,
        link: link,
        description: description,
        title: title,
        category: category
    };

    $.getJSON("db/addContent.php",args,
        function(){
            db_getContent(songInfo.spotifyID);
        },
        function(data){
            alert("DB doesn't work");
        })
}


function db_voteForContent(contentID, vote){
    var args = {
        content_id: contentID,
        vote: vote
    };

    $.getJSON("db/voteContent.php",args,
        function(){
            db_getContent(songInfo.spotifyID);
        },
        function(){
            alert("DB doesn't work");
        })
}