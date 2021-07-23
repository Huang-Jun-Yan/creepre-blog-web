// 刷新页面
export const reload = (path, time) => {
    let tiemr;
    if (tiemr) {
        clearTimeout(tiemr);
    }
    tiemr = setTimeout(() => {
        location.reload(path);
    }, time)
};