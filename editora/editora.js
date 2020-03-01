import {baseUrl} from '../modulos/config.js'

const apiUrl = baseUrl + '/editora/';

const listar = Vue.extend({
    template: '#listar',
    data: function () {
        return {
            editoras: [],
            palavraChave: ''
        };
    },
    computed: {
        filtrarEditoras: function () {
            return this.editoras.filter((editora) => {
                return editora.nome.indexOf(this.palavraChave) > -1
            });
        }
    },
    mounted: function () {
        fetch(apiUrl).then((response) => {
            return response.json().then((json) => {
                this.editoras = json;
            })
        });
    }
});

const ler = Vue.extend({
    template: '#ler',
    data: function () {
        return {
            editora: { nome: '', cnpj: '' }
        }
    },
    mounted: async function () {
        await fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.editora = json[0];
            })
        });
    },
});

const excluir = Vue.extend({
    template: '#excluir',
    data: function () {
        return {
            editora: { nome: '', cnpj: '' }
        }
    },
    mounted: function () {
        fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.editora = json[0];
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
            editora: { nome: '', cnpj: '' }
        }
    },
    methods: {
        criar: async function () {
            const editora = this.editora;

            await fetch(apiUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(editora)
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
            editora: { nome: '', cnpj: '' }
        }
    },
    mounted: function () {
        fetch(apiUrl + this.$route.params.id, { method: 'GET' }).then((response) => {
            return response.json().then((json) => {
                this.editora = json[0];
            })
        });
    },
    methods: {
        atualizar: async function () {
            const editora = this.editora;

            await fetch(apiUrl + editora.idEditora, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(editora)
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
