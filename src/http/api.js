/**
 * api接口统一管理
 */

import {get, post } from './index.js'

/**
 * @param baseUrl
 */
export const BASEURL = "http://localhost:3000"

/**
 * @Types  管理员
 * @method 管理员登录
 * @param {Object} username
 * @param {Object} password
 */
export const blogAdminLogin = val => post('/blogApi/admin/adminUserCheck', val);
/**
 * @method 管理员是否登录
 * @param {Object} admin_id
 */
export const adminIsLogined = val => post('/blogApi/admin/adminIsLogined', val);
/**
 * @method 获取管理员账号
 * @param {Object} 无
 */
export const getAdminAcc = val => get('/blogApi/getAdminAccount', val);
/**
 * @method 退出管理
 * @param {Object} 
 */
export const outAdmin = val => post('/blogApi/admin/adminExit', val);
/**
 * @method 获取所有用户信息
 * @param {Object} 无 
 */
export const getUser = val => get('/blogApi/admin/getUser', val);
/**
 * @method 删除用户
 * @param {Object} username
 */
export const deleteUser = val => post('/blogApi/admin/deleteUser', val);
/**
 * @method 上传Demo
 * @param {Object} admin_id
 * @param {Object} video_pic
 * @param {Object} video_url
 */
export const upBlogVideo = val => post('/blogApi/video/sendVideo', val);
/**
 * @method 获取Demo
 * @param {Object} page
 * @param {Object} pageSize
 */
export const getBlogVideo = val => get('/blogApi/video/getVideo', val);
/**
 * @method 上传相册
 * @param {Object} admin_id
 * @param {Object} brief
 * @param {Object} username
 * @param {Object} imgsrc
 */
export const upBlogPhotos = val => post('/blogApi/photo/sendPhotos', val);
/**
 * @method 获取相册
 * @param {Object} page
 * @param {Object} pageSize
 */
export const getPhotos = val => get('/blogApi/photo/getPhoto', val);
/**
 * @method 获取相册
 * @param {Object} page
 * @param {Object} pageSize
 */
export const getPhotoDetail = val => post('/blogApi/photo/getPhotoById', val);

/**
 * @Types  用户
 * @method 获取验证码
 * @param {Object} email
 */
export const getEmailCode = val => post('/blogApi/users/sendEmail', val);
/**
 * @method 注册
 * @param {Object} username
 * @param {Object} password
 * @param {Object} email
 * @param {Object} emailCode
 */
export const userRegister = val => post('/blogApi/users/login', val);
/**
 * @method 获取用户信息
 * @param {Object} token
 */
export const getuserInfo = val => post('/blogApi/users/getUserInfo', val);
/**
 * @method 修改用户信息
 * @param {Object} token
 * @param {Object} username
 * @param {Object} introduction
 * @param {Object} circleUrl
 */
export const editUserInfo = val => post('/blogApi/users/editUser', val);
/**
 * @method 获取音乐
 * @param {number} id
 */
export const getBlogMusic = val => post('/blogApi/music/getMusic', val);
/**
 * @method 上传文章
 * @param {number} admin_id ---------------管理员id
 * @param {string} title    ---------------文章标题
 * @param {string} brief    ---------------文章简介
 * @param {string} category ---------------分类
 * @param {object} img      ---------------文章封面
 * @param {string} label    ---------------标签
 * @param {string} content  ---------------内容
 * @param {string} name     ---------------管理员name
 * @param {string} avatar   ---------------管理员头像
 */
export const upArticle = val => post('/blogApi/article/articlePublish', val);
/**
 * @method 获取文章
 * @param {number} page ---------------管理员id
 * @param {number} pageSize ---------------管理员id
 */
export const getAllArticle = val => get('/blogApi/article/getArticle', val);
/**
 * @method 删除文章
 * @param {number} article_id ---------------文章id
 */
export const deleteArticle = val => post('/blogApi/article/deleteMessage', val);
/**
 * @method 获取此id的文章
 * @param {number} article_id ---------------文章id
 */
export const byIdGetArticle = val => get('/blogApi/article/getArticleByid', val);
/**
 * @method 获取近期的文章
 * @param {number} 无
 */
export const getRecentArticle = val => get('/blogApi/article/getRecentArticle', val);
/**
 * @method 更新文章
 * @param {number} admin_id ---------------管理员id
 * @param {string} title    ---------------文章标题
 * @param {string} brief    ---------------文章简介
 * @param {string} category ---------------分类
 * @param {object} img      ---------------文章封面
 * @param {string} label    ---------------标签
 * @param {string} content  ---------------内容
 * @param {number} article_id  ---------------文章id
 */
export const updateArticle = val => post('/blogApi/article/articleUpdate', val);