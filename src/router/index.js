import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/Errors/NotFound.vue'
import EntriesList from '../views/Entries/EntriesList.vue'
import EntryCreate from '../views/Entries/CreateEntry.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Not Found',
        component: NotFound,
    },
    {
        path: '/entries',
        name: 'entries.index',
        component: EntriesList,
    },
    {
        path: '/',
        name: 'entries.create',
        component: EntryCreate,
    },
]

const router = new VueRouter({
    routes,
})

export default router
