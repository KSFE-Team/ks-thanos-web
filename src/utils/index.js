// 生成随机码
export const getUniqueID = () => {
    return Math.random().toString(36).substring(2);
};