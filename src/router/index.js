import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/Errors/NotFound.vue'
import Home from '../views/Home.vue'
import CreateArticle from '../views/Articles/CreateArticle.vue'
import ArticleCard from '../views/Articles/ArticleCard.vue'
import EditArticle from '../views/Articles/EditArticle.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Not Found',
        component: NotFound,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/articles/create',
        name: 'articles.create',
        component: CreateArticle,
    },
    {
        path: '/articles/:id',
        name: 'articles.show',
        component: ArticleCard,
    },
    {
        path: '/articles/:id/edit',
        name: 'articles.edit',
        component: EditArticle,
    },
]

const router = new VueRouter({
    routes,
})

export default router
