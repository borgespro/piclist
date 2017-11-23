app.factory('ImagesFactory', ImgFactory);

ImgFactory.$inject = [];

function ImgFactory() {
    var imgFactory = {};

    imgFactory.list = list;
    imgFactory.search = search;

    return imgFactory;

    function __handleWord(word) {
        return !word ? '' : word.toLowerCase().trim();
    }

    function list() {
        return [{
            photo: "source/img/gallery/001-montanhas.jpg",
            date: "20 de Julho de 2015",
            title: "Montanhas" ,
            description: "Montanhas da Itália"
        }, {
            photo: "source/img/gallery/002-por-do-sol.jpg",
            date: "20 de julho de 2017",
            title: "Por do sol em Clingmans Dome",
            description: "Lindo por do sol nos Estados Unidos"
        }, {
            photo: "source/img/gallery/003-folhas-do-outono.jpg",
            date: "15 de outubro de 2015",
            title: "Folhas do outono",
            description: "Outono chegou na floresta"
        }, {
            photo: "source/img/gallery/004-suave-correnteza.jpg",
            date: "15 de julho de 2015",
            title: "Cachoeira",
            description: "Suave correnteza"
        }, {
            photo: "source/img/gallery/005-passaros.jpg",
            date: "12 de abril de 2015",
            title: "Pássaros",
            description: "Pássadores na cidade"
        }, {
            photo: "source/img/gallery/006-sapo-gigante.jpg",
            date: "29 de setembro de 2015",
            title: "Sapo gigante",
            description: "Sapo gigante na floresta"
        }, {
            photo: "source/img/gallery/007-cachoeira.jpg",
            date: "5 de Março de 2017",
            title: "Cachoeira",
            description: "Lindo arco-íres em cachoeira"
        }, {
            photo: "source/img/gallery/008-ceu-da-noite.jpg",
            date: "15 de março de 2017",
            title: "Céu da noite",
            description: "Vista de céu a noite"
        }, {
            photo: "source/img/gallery/009-varios-passaros.jpg",
            date: "25 de outubro de 2017",
            title: "Vários pássaros",
            description: "Grupo de pássaros voando"
        }, {
            photo: "source/img/gallery/010-flor-de-lotus.jpg",
            date: "23 de outubro de 2017",
            title: "Flor de lótus",
            description: "Flor de lótus no japão"
        }, {
            photo: "source/img/gallery/011-fogueira.jpg",
            date: "4 de fevereiro de 2016",
            title: "Fogueira",
            description: "Fogueira no frio de Sobral"
        }, {
            photo: "source/img/gallery/012-agua-viva.jpg",
            date: "21 de outubro de 2017",
            title: "Água viva",
            description: "Medusa ou água viva?"
        }, {
            photo: "source/img/gallery/013-cogumelo.jpg",
            date: "21 de outubro de 2017",
            title: "Cogumelos",
            description: "Onde está o Mário?"
        }, {
            photo: "source/img/gallery/014-corujas.jpg",
            date: "27 de junho de 2017",
            title: "Coruja",
            description: "Coruja observando Harry Potter"
        }, {
            photo: "source/img/gallery/015-labirinto.jpg",
            date: "3 de novembro de 2017",
            title: "Labirinto em casa",
            description: "Jardin em forma de labirinto"
        }, {
            photo: "source/img/gallery/016-macro.jpg",
            date: "06 de agosto de 2017",
            title: "A vida em Macro",
            description: "Macro captura de folha"
        }, {
            photo: "source/img/gallery/017-cisne.jpg",
            date: "15 de setembro de 2017",
            title: "Cisne",
            description: "Belo cisne em lago congelado"
        }, {
            photo: "source/img/gallery/018-girassol.jpg",
            date: "4 de setembro de 2017",
            title: "Girassol",
            description: "Belo girassol Amarelo"
        },];
    }

    function search(keywords) {
        return list().filter(function (item) {
            var title = __handleWord(item.title);
            var description = __handleWord(item.description);
            var handledKeyWords = __handleWord(keywords);

            return title.indexOf(handledKeyWords) !== -1 || description.indexOf(handledKeyWords) !== -1;
        });
    }
}