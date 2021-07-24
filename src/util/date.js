/** 
 * 时间戳格式化函数 
 * @param  {string} timestamp
 */
export const getDate = (timestamp) => {
    let date = new Date(parseInt(timestamp));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date1 = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (parseInt(second) < 10) {
        second = '0' + second;
    }
    return year + "-" + month + "-" + date1 + "-" + hour + ":" + minute + ":" + second;
}