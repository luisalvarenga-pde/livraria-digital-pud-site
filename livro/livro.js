import {baseUrl} from '../modulos/config.js'

const apiUrl = baseUrl + '/livro/';


const listar = Vue.extend({
    template: '#listar',
    data: function () {
        return {
            livros: [],
            palavraChave: ''
        };
    },
    computed: {
        filtrarLivros: function () {
            return this.livros.filter( (livro) => {
                return livro;//.nome.indexOf(this.palavraChave) > -1
            });
        }
    },
    mounted: function () {
        fetch(apiUrl).then((response) => {
            return response.json().then((json) => {
                this.livros = json;
            })
        });
    }
});

const ler = Vue.extend({
    template: '#ler',
    data: function () {
        return {
            livro: { nome: '', autor: '', descricao: '', genero: '',
            paginas: '', isbn: '', ano: '', edicao: '', editora: '' }
        }
    },
    mounted: async function () {
        await fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.livro = json[0];
            })
        });
    },
});

const criar = Vue.extend({
    template: '#criar',
    data: function () {
        return {
            livro: { nome: '', autor: '', descricao: '', genero: '',
            paginas: '', isbn: '', ano: '', edicao: '', editora: '' }
        }
    },
    methods: {
        criar: async function () {
            const livro = this.livro;

            await fetch(apiUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(livro)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
            });

            router.replace('/');
        }
    }
});

const router = new VueRouter({
    routes: [
        { path: '/criar', component: criar, name: 'criar' },
        { path: '/', component: listar },
        { path: '/:id', component: ler, name: 'ler' },
        { path: '/:id/alterar', component: atualizar, name: 'atualizar' },
        { path: '/:id/excluir', component: excluir, name: 'excluir' },
    ]
});

new Vue({router}).$mount('#app');

