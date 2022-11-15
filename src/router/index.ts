import { createRouter, createWebHistory } from 'vue-router';

import PageProfile from '@/views/PageProfile.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'profile',
            component: PageProfile
        },

        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        {
            path: '/projects',
            name: 'projects',

            component: () => import('../views/PageProjects.vue')
        },

        {
            path: '/highlight',
            name: 'highlight',

            component: () => import('../views/PageHighlight.vue')
        }
    ]
});

export default router;
