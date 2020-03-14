import {baseUrl} from './modulos/config.js'

const apiUrl = baseUrl + '/genero/';
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

const router = new VueRouter({
    routes: [
        { path: '/', component: listar_genero },
    ]
});

new Vue({router}).$mount('#app');
