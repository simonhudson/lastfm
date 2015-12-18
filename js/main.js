$(document).ready(function() {
    var user = 'veryconscious';
    $.when(LastFM.getUserInfo(user)).then(function(data) {
        LastFM.displayHeading(data);
        $.when(LastFM.getTopArtists(user, '12month')).then(function(data) {
            LastFM.displayTopArtists(data);
        });
    });
});

// $('.lastfm-search__form').on('submit', function() {
//     var user = $('#lastfm-search__user').val();
//     // $.when(LastFM.getUserInfo(user)).then(function(data) {
//     //     //LastFM.displayHeading(data);
//     //     Url.updateUrlWithoutReload(data.user.name);
//     // });
//     $.when(LastFM.getRecentTracks(user)).then(function(data) {
//         LastFM.displayRecentTracks(data);
//     });
//     return false;
// });