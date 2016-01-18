$(document).ready(function() {
    doDataFetch();
});
$('.lastfm-search__form').on('submit', function() {
    doDataFetch($('#lastfm-search__user').val(), $('#lastfm-search__fetchType').val());
    return false;
});

function showLoader() {
    console.log('loading');
    $('.data-area').append($('<span class="fa fa-spinner fa-spin"></span>'));
}

function removeLoader() {
    $('.data-area').find('.fa-spinner').remove();
}

function doDataFetch(user, fetchType) {

    showLoader();

    fetchType = fetchType ? fetchType : 'recentTracks';
    user = user ? user : 'veryconscious';

    $.when(LastFM.getUserInfo(user)).then(function(data) {
        LastFM.displayHeading(data);
        switch(fetchType) {
            case 'topArtists':
                $.when(LastFM.getTopArtists(user)).then(function(data) {
                    LastFM.displayTopArtists(data);
                });
            break;
            case 'recentTracks':
                $.when(LastFM.getRecentTracks(user)).then(function(data) {
                    LastFM.displayRecentTracks(data);
                });
            break;

        }
        showLoader();
        doPoll(user, fetchType);
    });
}
function doPoll() {
    setTimeout(function() {
        doDataFetch();
    }, 30000 );
}