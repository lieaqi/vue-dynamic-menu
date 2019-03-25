export default [
{
    "title": "测试菜单1号",
    "name": "testMenu1",
    "path": "/testMenu1",
    "icon": "icon-yiwurenyuan",
    "show": true,
    "children": [
    {
        "title": "测试菜单1-1号",
        "name": "testMenu1-1",
        "path": "/testMenu1/testMenu1-1",
        "show": true
    }]
},
{
    "title": "测试菜单2号",
    "name": "testMenu2",
    "path": "/testMenu2",
    "icon": "icon-yiwurenyuan",
    "show": true,
    "children": [
    {
        "title": "测试菜单2-1号",
        "name": "testMenu2-1",
        "path": "/testMenu2/testMenu2-1",
        "show": true
    },
    {
        "title": "测试菜单2-2号",
        "name": "testMenu2-2",
        "path": "/testMenu2/testMenu2-2/:id?",
        "show": true
    }]
}]