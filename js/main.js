$(document).ready(function() {
    var user = 'veryconscious';
    $.when(LastFM.getUserInfo(user)).then(function(data) {
        LastFM.displayHeading(data);
        $.when(LastFM.getTopArtists(user, '12month')).then(function(data) {
            LastFM.displayTopArtists(data);
        });
    });
});