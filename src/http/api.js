/**
 * api接口统一管理
 */

import {get, post } from './index.js'

export const baseurl = "http://localhost:3000"

// 
export const getName = val => get('', val);
// 
export const postName = val => post('', val);