export interface MenuConfig {
    name: string,
    path: string,
    icon?: string,
    children?: MenuConfig[]
}
/**
 * 菜单配置
 */
const menuList = [
    {
        name: '我的模版',
        path: '/'
    }
];
export default menuList;
