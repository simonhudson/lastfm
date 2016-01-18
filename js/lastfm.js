var LastFM = {

    apiUrl: 'http://ws.audioscrobbler.com/2.0/?method=',
    apiKey: '116b15d2e36e42394f0b542c0dded6bd',

    getRecentTracks: function(user, limit) {
        limit = limit ? limit : 20;
        return $.ajax({
            url: LastFM.apiUrl + 'user.getrecenttracks&user=' + user + '&api_key=' + LastFM.apiKey + '&format=json&limit=' + limit,
            dataType: 'json'
        });
    },

    getTopArtists: function(user, period, limit, page) {
        period = period ? period : 'overall';
        limit = limit ? limit : 20;
        page = page ? page : 1;
        return $.ajax({
            url: LastFM.apiUrl + 'user.gettopartists&user=' + user + '&api_key=' + LastFM.apiKey + '&format=json&period=' + period + '&limit=' + limit + '&page=' + page,
            dataType: 'json'
        });
    },

    getUserInfo: function(user) {
        return $.ajax({
            url: LastFM.apiUrl + 'user.getinfo&user=' + user + '&api_key=' + LastFM.apiKey + '&format=json',
            dataType: 'json'
        });
    },

    displayHeading: function(data) {
        console.log(data);
        $('.lastfm__avatar').attr('style', '');
        $('.lastfm__heading').html('');
        if (!data.error) {
            var imgUrl = data.user.image[2]['#text'] ? data.user.image[3]['#text'] : 'imgs/placeholder-user.svg';
            $('.lastfm__heading').html(data.error ? data.message : '<a href="' + data.user.url + '">' + (data.user.realname ? data.user.realname : data.user.name) + '</a>');
            $('.lastfm__avatar').attr('style', 'background-image:url(' + imgUrl + ');');
        }
    },

    displayTopArtists: function(data) {

        clearData();
        $('.data-area').prepend($('<ul class="lastfm-data__list"></ul>'));

        var dataList = $('.lastfm-data__list'),
            listData = '';
        dataList.html('');
        dataList.siblings('p').remove();
        if (!data.error) {
            if (data.topartists.artist.length === 0) {
                dataList.before('<p>No artists to show.</p>');
            } else {
                for (var i in data.topartists.artist) {
                    var item = data.topartists.artist[i];
                    var imgUrl = item.image[2]['#text'] ? item.image[2]['#text'] : 'imgs/placeholder-note.svg';
                    listData += '<li class="lastfm-data__item"><a class="lastfm-data__link" href="' + item.url + '"><img class="img-circle lastfm-data__img" height="174" src="' + imgUrl + '" width="174" /><div class="lastfm-data__primary img-circle"><p><strong>' + item.name + '</strong><span class="lastfm-data__secondary">' + item.playcount + ' plays</span></p></div></a></li>';
                }
                dataList.append(listData);
            }
        } else {
            dataList.before('<p>Could not retrieve data.</p>');
        }
    },

    displayRecentTracks: function(data) {
        clearData();
        $('.data-area').prepend($('<ul class="lastfm-data__list"></ul>'));
        var dataList = $('.lastfm-data__list'),
            listData = '';
        dataList.html('');
        dataList.siblings('p').remove();
        if (!data.error) {
            if (data.recenttracks.track.length === 0) {
                dataList.before('<p>No recent tracks to show.</p>');
            } else {
                for (var i in data.recenttracks.track) {
                    var item = data.recenttracks.track[i];
                    var imgUrl = item.image[2]['#text'] ? item.image[2]['#text'] : 'imgs/placeholder-note.svg';
                    listData += '<li class="lastfm-data__item"><a class="lastfm-data__link" href="' + item.url + '"><img class="img-circle lastfm-data__img" height="174" src="' + imgUrl + '" width="174" /><div class="lastfm-data__primary img-circle"><p><strong>' + item.name + '</strong><span class="lastfm-data__secondary">' + item.artist['#text'] + '</span></p></div></a></li>';
                }
                dataList.append(listData);
            }
        } else {
            dataList.before('<p>Could not retrieve data.</p>');
        }
    }

};
function clearData(element) {
    $('.data-area').html('');
}