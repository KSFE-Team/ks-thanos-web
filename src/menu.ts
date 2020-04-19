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
        name: '页面管理',
        path: '/'
    },
    {
        name: '模版管理',
        path: '/myTemplate'
    }
];
export default menuList;
