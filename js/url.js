var Url = {

    updateUrlWithoutReload: function(newUrl, newTitle, state) {
        if (history.pushState) {
            var newTitle = newTitle ? newTitle : null,
                state = state ? state : null;
            history.pushState(state, newTitle, newUrl);
        }
    }

};