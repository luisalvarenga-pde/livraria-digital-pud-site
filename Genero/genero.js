import {baseUrl} from '../modulos/config.js'

const apiUrl = baseUrl + '/genero/';

const listar = Vue.extend({
    template: '#listar',
    data: function () {
        return {
            generos: [],
            palavraChave: ''
        };
    },
    computed: {
        filtrarGeneros: function () {
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

const ler = Vue.extend({
    template: '#ler',
    data: function () {
        return {
            genero: { nome: '' }
        }
    },
    mounted: async function () {
        await fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.genero = json[0];
            })
        });
    },
});

const excluir = Vue.extend({
    template: '#excluir',
    data: function () {
        return {
            genero: { nome: '' }
        }
    },
    mounted: function () {
        fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.genero = json[0];
            })
        });
    },
    methods: {
        excluir: async function () {
            await fetch(apiUrl + this.$route.params.id, { method: 'DELETE' })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('HTTP error, status = ' + response.status);
                    }
                });

            router.replace('/');
        }
    }
});

const criar = Vue.extend({
    template: '#criar',
    data: function () {
        return {
            genero: { nome: '' }
        }
    },
    methods: {
        criar: async function () {
            const genero = this.genero;

            await fetch(apiUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(genero)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
            });

            router.replace('/');
        }
    }
});

const atualizar = Vue.extend({
    template: '#atualizar',
    data: function () {
        return {
            genero: { nome: '' }
        }
    },
    mounted: function () {
        fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.genero = json[0];
            })
        });
    },
    methods: {
        atualizar: async function () {
            const genero = this.genero;

            await fetch(apiUrl + genero.idGenero, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(genero)
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
