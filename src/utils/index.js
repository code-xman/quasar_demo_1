/*
 * @Author: xiangjie 
 * @Date: 2021-05-10 10:40:52 
 * @Last Modified by: xiangjie
 * @Last Modified time: 2021-05-10 11:42:15
 */

import XEUtils from 'xe-utils'
import { Notify } from 'quasar'

/***
 * 按值而非引用复制对象
 * @param {*} data 传入的DATA
 * @returns 返回的对象
 */
const copy = data => {
  return XEUtils.clone(data, true)
}

/**
 * 提示
 * @param {String} type 类型
 * @param {String} message 提示信息
 * @param {String} color 颜色
 */
const notify = ({ type, message, color }) => {
  Notify.create({
    type,
    color: color || type,
    message,
    actions: [{ icon: 'close', color: 'white' }]
  })
}

/**
 * 金额格式化
 * @param {*} money 金额
 * @param {*} icon 金额符号
 * @return {*} 格式化后的金额
 */
const formatMoney = (money, icon) => {
  const res = XEUtils.commafy(money, { digits: 2 })
  return icon ? `${icon}${res}` : `${res}`
}

export { copy, notify, formatMoney }