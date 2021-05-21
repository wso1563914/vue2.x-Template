// export { default as SidebarMenu } from './lib/SideBar/SidebarMenu.vue';
// export { default as ISidebarMenu } from './lib/SideBarIview/SidebarMenu.vue';
// export { default as TopMenu } from './lib/TopMenu/TopMenu.vue';
// export { default as UserDropdown } from './lib/TopMenu/UserDropdown.vue';

// export SidebarMenu from './lib/SideBar/SidebarMenu.vue';
import ISidebarMenu from './lib/SideBarIview/index';
// export TopMenu from './lib/TopMenu/TopMenu.vue';
// export UserDropdown from './lib/TopMenu/UserDropdown.vue';

const components = [ISidebarMenu],
    install = function (Vue) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });
    };

if (typeof window !== 'undefined' && window.Vue) {
    install(Vue);
}

export default {
    install,
    ...components,
};
