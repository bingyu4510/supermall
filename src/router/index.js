import Vue from 'vue'
import Router from 'vue-router'

const Cart = () =>
    import ('../views/cart/Cart');
const Category = () =>
    import ('../views/category/Category');
const Home = () =>
    import ('../views/home/Home');
const Porfile = () =>
    import ('../views/profile/Profile');
const Detail = () =>
    import ('../views/detail/Detail');

Vue.use(Router);
const router = new Router({
    routes: [{
        path: '',
        redirect: "/home"
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/profile',
        component: Porfile
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/detail/:id',
        component: Detail
    }],
    mode: "history",

});
export default router;