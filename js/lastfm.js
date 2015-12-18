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
        user = user ? user : 'veryconscious';
        return $.ajax({
            url: LastFM.apiUrl + 'user.getinfo&user=' + user + '&api_key=' + LastFM.apiKey + '&format=json',
            dataType: 'json'
        });
    },

    displayHeading: function(data) {
        $('.lastfm__avatar').attr('src', '');
        if (!data.error) {
            // $('.lastfm__heading').before('<img class="lastfm__avatar" src="" />');
            $('.lastfm__heading').html(data.error ? data.message : '<a href="' + data.user.url + '">' + data.user.realname + '</a>');
            $('.lastfm__avatar').attr('src', data.user.image[2]['#text']);
        }
    },

    displayTopArtists: function(data) {
        var dataList = $('.lastfm-top-artists__list'),
            listData = '';
        dataList.html('');
        if (!data.error) {
            for (var i in data.topartists.artist) {
                var item = data.topartists.artist[i];
                var imgUrl = item.image[2]['#text'] ? item.image[2]['#text'] : 'imgs/placeholder-note.svg';
                listData += '<li class="lastfm-top-artists__item"><a class="lastfm-top-artists__link" href="' + item.url + '"><img class="img-circle lastfm-top-artists__img" src="' + imgUrl + '" /><div class="lastfm-top-artists__name img-circle"><p>' + item.name + '</p></div></a></li>';
            }
        }
        dataList.append(listData);
    }

};