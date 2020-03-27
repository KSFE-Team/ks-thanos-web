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
        name: '现有页面',
        path: ''
    },
    {
        name: '现有模版', // 我的模版
        path: 'myTemplate'
    }
];
export default menuList;
