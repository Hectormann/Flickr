(function () {

    var page;

    var pages = ['start-page', 'search-page', 'gallery-page'];
  
    window.addEventListener('hashchange', function () {

        if (window.location.hash === '#/Start/') {

            addHiddenPageClass();
            removeHiddenPageClass('start-page');          
        }

        if (window.location.hash === '#/Search/') {

            addHiddenPageClass();
            removeHiddenPageClass('search-page');
            flickr.initializeSearchPage();           
        }

        if (window.location.hash === '#/Gallery/') {

            addHiddenPageClass();
            removeHiddenPageClass('gallery-page');
            flickr.initializeGalleryPage();
        }

    });

    function addHiddenPageClass() {

        pages.forEach(function (p) {

            page = document.getElementById(p);
            page.classList.add("hidden");

        });
    }

    function removeHiddenPageClass(pageElement) {

        page = document.getElementById(pageElement);
        page.classList.remove("hidden");
    }

})();





