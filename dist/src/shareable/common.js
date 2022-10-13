export const forKey = (obj, callback) => {
    Object.keys(obj).forEach(callback);
};
export const tryGet = (accessor, fallback) => {
    try {
        return accessor();
    }
    catch {
        return fallback;
    }
};
export default {
    forKey,
    tryGet,
};
//# sourceMappingURL=common.js.map