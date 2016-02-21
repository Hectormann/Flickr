var flickr = {};
flickr.gallery = [];

(function () {

    window.onload = function () {

        if (window.location.hash) {
            var hashTemp = window.location.hash;
            window.location.hash = null;
            window.location.hash = hashTemp;
        } else {
            window.location.hash = '#/Start/';
        }

        addEventListenerToElements();
    }


    flickr.initializeSearchPage = function () {

        document.getElementById("search-input").focus();
    };


    flickr.initializeGalleryPage = function () {

        var galleryImages = document.getElementById('gallery-images');

        while (galleryImages.firstChild) {
            galleryImages.removeChild(galleryImages.firstChild);
        }

        renderImages(flickr.gallery, 'gallery-images');
    };


    flickr.onClickImageContainer = function (e) {

        if (window.location.hash === '#/Search/') {

            var isInGallery = updateGalley(e);

            addBorderToImageContainer(e, isInGallery);            

        } else {

            showLargeImageInGallery(e);
        }
    }


    function showLargeImageInGallery(e) {

        document.getElementById("gallery-image-large").setAttribute("class", "");

        if (e.target.className === 'image-container' || e.target.className === 'image-container selected-image') {

            document.getElementById("gallery-image-large-src").setAttribute("src", e.target.childNodes[0].currentSrc);

        } else {

            document.getElementById("gallery-image-large-src").setAttribute("src", e.target.currentSrc);

        }
    }


    function addBorderToImageContainer(e, isInGallery) {

        if (isInGallery) {

            if (e.target.className === 'image-container selected-image') {
                e.target.classList.remove("selected-image");
            }
            else {
                e.target.parentNode.classList.remove("selected-image");
            }

        } else {

            if (e.target.className === 'image-container') {
                e.target.classList.add("selected-image");
            }
            else {
                e.target.parentNode.classList.add("selected-image");
            }
        }
    }


    function updateGalley(e) {

        var src;

        if (e.target.className === 'image-container' || e.target.className === 'image-container selected-image') {

            src = e.target.childNodes[0].currentSrc;

        } else {

            src = e.target.currentSrc;
        }

        var isInGallery = flickr.gallery.some(function (element, index, array) {
            return element === src;
        });

        if (isInGallery) {

            var index = flickr.gallery.indexOf(src);

            if (index != -1) {

                flickr.gallery.splice(index, 1);
            }

        } else {

            flickr.gallery.push(src);
        }

        return isInGallery;
    }


    function addEventListenerToElements() {

        document.getElementById("gallery-image-large").addEventListener("click", closeLargeImage);

        var searchInputElement = document.getElementById("search-input");

        searchInputElement.addEventListener("keypress", function (event) {

            if (event.keyCode == 13)
                searchFlickr();
        });

    }


    function searchFlickr() {

        var loader = document.getElementById('loader');
        loader.classList.remove("hidden");     

        var searchImages = document.getElementById('search-images');

        while (searchImages.firstChild) {
            searchImages.removeChild(searchImages.firstChild);
        }

        var searchText = document.getElementById("search-input").value;

        flickr.searchFlickr(searchText).then(function (response) {

            loader.classList.add("hidden");

            var linkBottom = document.getElementById('link-bottom');
            linkBottom.classList.remove("hidden");

            var images = flickr.getImages(response);
            console.log(images);
            renderImages(images, 'search-images');


        }, function (error) {
            loader.classList.add("hidden");
            console.error("No images found!", error);
        });

    }


    function renderImages(imageUrls, divElement) {

        imageUrls.forEach(function (url) {
            appendImageAndContainerToDiv(url, divElement);
        });
    }

    function appendImageAndContainerToDiv(url, divElement) {

        var div = document.getElementById(divElement);
        var containerElement = document.createElement('div');
        var imageElement = document.createElement('img');

        containerElement.setAttribute("class", "image-container");

        imageElement.setAttribute("src", url);
        imageElement.setAttribute("class", "image");

        containerElement.appendChild(imageElement);
        div.appendChild(containerElement);

        containerElement.addEventListener("click", flickr.onClickImageContainer);
    }


    function closeLargeImage() {

        document.getElementById("gallery-image-large").setAttribute("class", "hidden");
    }

})();

