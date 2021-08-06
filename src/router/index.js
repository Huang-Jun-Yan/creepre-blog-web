import { createRouter, createWebHashHistory } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getAdminAcc } from "../http/api";
import { getStorage } from "../util/Storage";

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
                    routerName: "Blog首页",
                    requireAuth: false
                },
            },
            {
                path: "/creepreBlog/blogArticle",
                name: 'blogArticle',
                component: () =>
                    import ( /* webpackChunkName: "blogArticle" */ '@/views/blogArticle'),
                meta: {
                    routerName: "Blog文章",
                    requireAuth: false
                },
            }, {
                path: "/creepreBlog/blogPhoto",
                name: 'blogPhoto',
                component: () =>
                    import ( /* webpackChunkName: "blogPhoto" */ '@/views/blogPhoto'),
                meta: {
                    routerName: "个人相册",
                    requireAuth: false
                },
            },
            {
                path: "/creepreBlog/blogDemo",
                name: 'blogDemo',
                component: () =>
                    import ( /* webpackChunkName: "blogDemo" */ '@/views/blogDemo'),
                meta: {
                    routerName: "私人视频",
                    requireAuth: false
                },
            },
            {
                path: "/creepreBlog/blogSpare",
                name: 'blogSpare',
                component: () =>
                    import ( /* webpackChunkName: "blogSpare" */ '@/views/blogSpare'),
                meta: {
                    routerName: "备用页面",
                    requireAuth: false
                },
            },
            {
                path: "/creepreBlog/editInfo",
                name: 'editUserInfo',
                component: () =>
                    import ( /* webpackChunkName: "blogSpare" */ '@/components/editUserInfo'),
                meta: {
                    routerName: "修改信息",
                    requireAuth: false
                },
            },
            {
                path: "/creepreBlog/Photos/PhotoDetail/:id",
                name: 'PhotoDetail',
                component: () =>
                    import ( /* webpackChunkName: "PhotoDetail" */ '@/components/PhotoDetail'),
                meta: {
                    routerName: "相册详情",
                    requireAuth: false
                },
            },
            {
                path: '/creepreBlog/article/articleDetail/:id/users',
                name: "/articleDetail",
                component: () =>
                    import ( /* webpackChunkName: "articleDetail" */ '@/components/articleDetail'), //articlePublish
                meta: {
                    routerName: "文章详情",
                    requireAuth: false
                },
            },
            {
                path: '/creepreBlog/messageBoard',
                name: "/message_board",
                component: () =>
                    import ( /* webpackChunkName: "message_board" */ '@/views/message_board'), //articlePublish
                meta: {
                    routerName: "留言板",
                    requireAuth: false
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
            routerName: "管理页面",
            requireAuth: true
        },
        children: [{
                path: '/admin/articlePublish',
                name: "/articlePublish",
                component: () =>
                    import ( /* webpackChunkName: "articlePublish" */ '@/blog_admin/articlePublish.vue'), //articlePublish
                meta: {
                    routerName: "文章发布",
                    requireAuth: true
                },
            },
            {
                path: '/admin/articleManage',
                name: "/articleManage",
                component: () =>
                    import ( /* webpackChunkName: "articleManage" */ '@/blog_admin/articleManage.vue'), //articlePublish
                meta: {
                    routerName: "文章管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/article/editArticle/:id',
                name: "/editArticle",
                component: () =>
                    import ( /* webpackChunkName: "editArticle" */ '@/blog_admin/adminComponents/editArticle.vue'), //articlePublish
                meta: {
                    routerName: "文章编辑",
                    requireAuth: true
                },
            },
            {
                path: '/admin/usersManage',
                name: "/usersManage",
                component: () =>
                    import ( /* webpackChunkName: "usersManage" */ '@/blog_admin/usersManage.vue'), //articlePublish
                meta: {
                    routerName: "用户列表管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/photosManage',
                name: "/photosManage",
                component: () =>
                    import ( /* webpackChunkName: "photosManage" */ '@/blog_admin/photosManage.vue'), //photosManage
                meta: {
                    routerName: "相册管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/videoManage',
                name: "/videoManage",
                component: () =>
                    import ( /* webpackChunkName: "videoManage" */ '@/blog_admin/videoManage.vue'), //videoManage
                meta: {
                    routerName: "视频管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/photos',
                name: "/photos",
                component: () =>
                    import ( /* webpackChunkName: "photos.vue" */ '@/blog_admin/photos.vue'), //articlePublish
                meta: {
                    routerName: "相册管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/videos',
                name: "/videos",
                component: () =>
                    import ( /* webpackChunkName: "videos.vue" */ '@/blog_admin/videos.vue'), //articlePublish
                meta: {
                    routerName: "视频管理",
                    requireAuth: true
                },
            },
            {
                path: '/admin/musics',
                name: "/musics",
                component: () =>
                    import ( /* webpackChunkName: "musics.vue" */ '@/blog_admin/musics.vue'), //articlePublish
                meta: {
                    routerName: "音乐管理",
                    requireAuth: true
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
            routerName: "Blog登录",
            requireAuth: false
        }
    },
    {
        path: '/users/admin/adminLogin',
        name: 'adminLogin',
        component: () =>
            import ( /* webpackChunkName: "adminLogin" */ '@/blog_admin/adminLogin.vue'),
        meta: {
            routerName: "admin登录",
            requireAuth: true
        }
    },
    {
        path: '/users/blogRegister',
        name: 'blogRegister',
        component: () =>
            import ( /* webpackChunkName: "blogRegister" */ '@/views/blogRegister'),
        meta: {
            routerName: "Blog注册",
            requireAuth: false
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: "404",
        component: () =>
            import ( /* webpackChunkName: "blogRegister" */ '@/views/NoFind'),
        meta: {
            routerName: "404页面",
            requireAuth: false
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 路由拦截
router.beforeEach(async(to, from, next) => {
    const res = await getAdminAcc();
    if (to.matched.some(item => item.meta.requireAuth)) {
        res.data.list.forEach(item => {
            if (item.admin_id && item.username == getStorage("blogUserInfo").username) {
                next()
            } else {
                next({
                    path: "/"
                })
                ElMessage.warning('你不是管理员，不要乱跑哦●ω●');
            }
        })

    } else {
        next()
    }
});

export default router;