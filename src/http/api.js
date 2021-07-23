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