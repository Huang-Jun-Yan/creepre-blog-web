import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
        path: '/',
        name: 'blogIndex',
        component: () =>
            import ( /* webpackChunkName: "blogIndex" */ '@/views/blogIndex'),
        redirect: "/creepreBlog/blogHome",
        meta: {
            routerName: "Blog首页"
        },
        children: [{
                path: "/creepreBlog/blogHome",
                name: 'blogHome',
                component: () =>
                    import ( /* webpackChunkName: "blogHome" */ '../views/blogHome'),
                meta: {
                    routerName: "Blog首页"
                },
            },
            {
                path: "/creepreBlog/blogArticle",
                name: 'blogArticle',
                component: () =>
                    import ( /* webpackChunkName: "blogArticle" */ '../views/blogArticle'),
                meta: {
                    routerName: "Blog文章"
                },
            }, {
                path: "/creepreBlog/blogPhoto",
                name: 'blogPhoto',
                component: () =>
                    import ( /* webpackChunkName: "blogPhoto" */ '../views/blogPhoto'),
                meta: {
                    routerName: "个人相册"
                },
            },
            {
                path: "/creepreBlog/blogDemo",
                name: 'blogDemo',
                component: () =>
                    import ( /* webpackChunkName: "blogDemo" */ '../views/blogDemo'),
                meta: {
                    routerName: "个人Demo"
                },
            },
            {
                path: "/creepreBlog/blogSpare",
                name: 'blogSpare',
                component: () =>
                    import ( /* webpackChunkName: "blogSpare" */ '../views/blogSpare'),
                meta: {
                    routerName: "备用页面"
                },
            },
        ]
    },
    {
        path: '/users/blogLogin',
        name: 'blogLogin',
        component: () =>
            import ( /* webpackChunkName: "blogLogin" */ '@/views/blogLogin'),
        meta: {
            routerName: "Blog登录"
        }
    },
    {
        path: '/users/blogRegister',
        name: 'blogRegister',
        component: () =>
            import ( /* webpackChunkName: "blogRegister" */ '@/views/blogRegister'),
        meta: {
            routerName: "Blog注册"
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 路由拦截
router.beforeEach((to, from, next) => {
    next()
});

export default router;