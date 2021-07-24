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
                    import ( /* webpackChunkName: "blogHome" */ '@/views/blogHome'),
                meta: {
                    routerName: "Blog首页"
                },
            },
            {
                path: "/creepreBlog/blogArticle",
                name: 'blogArticle',
                component: () =>
                    import ( /* webpackChunkName: "blogArticle" */ '@/views/blogArticle'),
                meta: {
                    routerName: "Blog文章"
                },
            }, {
                path: "/creepreBlog/blogPhoto",
                name: 'blogPhoto',
                component: () =>
                    import ( /* webpackChunkName: "blogPhoto" */ '@/views/blogPhoto'),
                meta: {
                    routerName: "个人相册"
                },
            },
            {
                path: "/creepreBlog/blogDemo",
                name: 'blogDemo',
                component: () =>
                    import ( /* webpackChunkName: "blogDemo" */ '@/views/blogDemo'),
                meta: {
                    routerName: "个人Demo"
                },
            },
            {
                path: "/creepreBlog/blogSpare",
                name: 'blogSpare',
                component: () =>
                    import ( /* webpackChunkName: "blogSpare" */ '@/views/blogSpare'),
                meta: {
                    routerName: "备用页面"
                },
            },
            {
                path: "/creepreBlog/editInfo",
                name: 'editUserInfo',
                component: () =>
                    import ( /* webpackChunkName: "blogSpare" */ '@/components/editUserInfo'),
                meta: {
                    routerName: "修改信息"
                },
            },
            {
                path: "/creepreBlog/Photos/PhotoDetail/:id",
                name: 'PhotoDetail',
                component: () =>
                    import ( /* webpackChunkName: "PhotoDetail" */ '@/components/PhotoDetail'),
                meta: {
                    routerName: "相册详情"
                },
            },
            {
                path: '/creepreBlog/article/articleDetail/:id/users',
                name: "/articleDetail",
                component: () =>
                    import ( /* webpackChunkName: "articleDetail" */ '../components/articleDetail'), //articlePublish
                meta: {
                    routerName: "文章详情"
                },
            },
        ]
    },
    {
        path: '/creepreBlog/admin',
        name: 'admin',
        component: () =>
            import ( /* webpackChunkName: "admin" */ '@/blog_admin/admin.vue'),
        redirect: "/admin/articleManage",
        meta: {
            routerName: "管理页面"
        },
        children: [{
                path: '/admin/articlePublish',
                name: "/articlePublish",
                component: () =>
                    import ( /* webpackChunkName: "articlePublish" */ '@/blog_admin/articlePublish.vue'), //articlePublish
                meta: {
                    routerName: "文章发布"
                },
            },
            {
                path: '/admin/articleManage',
                name: "/articleManage",
                component: () =>
                    import ( /* webpackChunkName: "articleManage" */ '@/blog_admin/articleManage.vue'), //articlePublish
                meta: {
                    routerName: "文章管理"
                },
            },
            {
                path: '/admin/article/editArticle/:id',
                name: "/editArticle",
                component: () =>
                    import ( /* webpackChunkName: "editArticle" */ '@/blog_admin/adminComponents/editArticle.vue'), //articlePublish
                meta: {
                    routerName: "文章编辑"
                },
            },
            {
                path: '/admin/usersManage',
                name: "/usersManage",
                component: () =>
                    import ( /* webpackChunkName: "usersManage" */ '@/blog_admin/usersManage.vue'), //articlePublish
                meta: {
                    routerName: "用户列表管理"
                },
            },
            {
                path: '/admin/photos',
                name: "/photos",
                component: () =>
                    import ( /* webpackChunkName: "photos.vue" */ '@/blog_admin/photos.vue'), //articlePublish
                meta: {
                    routerName: "相册管理"
                },
            },
            {
                path: '/admin/videos',
                name: "/videos",
                component: () =>
                    import ( /* webpackChunkName: "videos.vue" */ '@/blog_admin/videos.vue'), //articlePublish
                meta: {
                    routerName: "视频管理"
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
        path: '/users/admin/adminLogin',
        name: 'adminLogin',
        component: () =>
            import ( /* webpackChunkName: "adminLogin" */ '@/blog_admin/adminLogin.vue'),
        meta: {
            routerName: "admin登录"
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