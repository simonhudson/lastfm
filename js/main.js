$(document).ready(function() {
    doDataFetch();
});
$('.lastfm-search__form').on('submit', function() {
    doDataFetch($('#lastfm-search__user').val());
    return false;
});

function doDataFetch(user) {
    user = user ? user : 'veryconscious';
    $.when(LastFM.getUserInfo(user)).then(function(data) {
        LastFM.displayHeading(data);
        $.when(LastFM.getTopArtists(user)).then(function(data) {
            LastFM.displayTopArtists(data);
        });
    });
}