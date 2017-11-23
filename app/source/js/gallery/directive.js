app.directive('gallery', Gallery);

Gallery.$inject = [];
GalleryController.$inject = ['$scope'];

function Gallery() {

    return {
        restrict: 'E',
        scope: {
            list: '='
        },
        templateUrl: '/inc/gallery.html',
        controller: GalleryController
    }
}

function GalleryController($scope) {

}
