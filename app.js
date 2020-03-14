import {baseUrl} from './modulos/config.js'

const apiUrl = baseUrl + '/genero/';
const apiUrlLivro = baseUrl + '/busca/livro/genero/';
console.log(apiUrl);

const listar_genero = Vue.extend({
    template: '#listar-genero',
    data: function () {
        return {
            generos: [],
            palavraChave: ''
        };
    },
    computed: {
        listaGeneros: function () {
            return this.generos.filter((genero) => {
                return genero.nome.indexOf(this.palavraChave) > -1
            });
        }
    },
    mounted: function () {
        fetch(apiUrl).then((response) => {
            return response.json().then((json) => {
                this.generos = json;
            })
        });
    }
});

const listar_livros = Vue.extend({
    template: '#listar_livros',
    data: function () {
        return {
            livros: [],
            palavraChave: ''
        };
    },
    computed: {
        listaLivros: function () {
            return this.livros.filter((livro) => {
                return livro.nome.indexOf(this.palavraChave) > -1
            });
        }
    },
    mounted: function () {
        fetch(apiUrlLivro).then((response) => {
            return response.json().then((json) => {
                this.livros = json;
            })
        });
    }
});

const router = new VueRouter({
    routes: [
        { path: '/', component: listar_genero },
    ] 
});


const routerLivro = new VueRouter({
    routes: [
        { path: '/livros', component: listar_livros},
    ]
    
});

new Vue({router}).$mount('#app');
new Vue({routerLivro}).$mount('#listaLivros');
