const namespace = "userInfo";
/**
 * @method 存
 */
export const setStorage = function(type, value) {
        let storage = localStorage.getItem(namespace);
        if (!storage) {
            storage = {};
        } else {
            storage = JSON.parse(storage);
        }
        storage[type] = value;
        localStorage.setItem(namespace, JSON.stringify(storage));
    }
    /**
     * @method 取
     */
export const getStorage = function(type, def) {
        let storage = localStorage.getItem(namespace);
        if (!storage) {
            return def;
        }
        storage = JSON.parse(storage);
        let result = storage[type];
        return result || def;
    }
    /**
     * @method 删
     */
export const removeStorage = function(type) {
    return localStorage.removeItem(type);
}