app.controller('MainController', Main);

Main.$inject = ['ImagesFactory'];

function Main(ImgFactory) {

    var vm = this;

    initController();

    return vm;

    function initController() {
        vm.search = search;
        vm.list = ImgFactory.list();
    }

    function search(keywords) {
        if (!!keywords) {
            vm.list = ImgFactory.search(keywords);
        } else {
            vm.list = ImgFactory.list();
        }
    }

}
