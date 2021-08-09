export const countDown = (time, speed) => {
    let con;
    setInterval(() => {
        if (time <= 60) {
            time--;
            con = `${time}后重试`
        } else if (time >= 0) {
            con = `发送验证码`
        }
    }, speed);
    return con;
};