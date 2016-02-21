(function () {

    flickr.searchFlickr = function(searchText) {

        searchText = formatSearchText(searchText);

        var url = "https://api.flickr.com/services/rest/?format=json&sort=random&method=flickr.photos.search&text=" + searchText + "&per_page=12&api_key=3f18d2758c8280ec4961af1b6a116bfc";

        var promise = new Promise(function (resolve, reject) {

            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {

                if (request.readyState == 4 && request.status == 200) {

                    resolve(request.response);
                }
            };

            request.open("GET", url, true);
            //request.setRequestHeader('Content-type', 'charset=utf-8')
            request.send();
        });

        return promise;
    }


    flickr.getImages = function (responseText) {

        var json = parseToJson(responseText);
        return getArrayWithUrls(json);
    }


    function formatSearchText(searchText) {

        return searchText.replace(/\s+/g, '+').toLowerCase();
    }


    function parseToJson(responseText) {

        responseText = responseText.replace('jsonFlickrApi(', '');
        responseText = responseText.substring(0, responseText.length - 1);
        responseText = JSON.parse(responseText);

        return responseText;
    }


    function getArrayWithUrls(response) {

        return response.photos.photo.map(function (picture) {

            return "http://farm" + picture.farm + ".staticflickr.com/" + picture.server + "/" + picture.id + "_" + picture.secret + ".jpg";

        });
    }

})();