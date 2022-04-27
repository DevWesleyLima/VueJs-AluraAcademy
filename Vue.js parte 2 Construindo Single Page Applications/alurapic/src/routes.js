const Cadastro = () => System.import('./components/cadastro/Cadastro.vue').then(m => m.default);
import Home from './components/home/Home.vue';

export const routes = [    
    { path: '/home', name: 'home', component: Home, titulo: 'Home', menu: true},
    { path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true},
    { path: '/cadastro/:id', name: 'editarCadastro', component: Cadastro, titulo: 'Editar Cadastro', menu: false},
    { path: '*', component: Home, menu: false}
];