$(document).ready(function() {
    doDataFetch();
});
$('.lastfm-search__form').on('submit', function() {
    doDataFetch($('#lastfm-search__user').val(), $('#lastfm-search__fetchType').val());
    return false;
});

function doDataFetch(user, fetchType) {

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
    });
}