import navConfig from '../nav.config.json';

const LOAD_MAP = name => {
    return r => require.ensure([], () => r(require(`../views/${name}.vue`)));
};

const load = function (path) {
    return LOAD_MAP(path);
};

const LOAD_DOCS_MAP = path => {
    return r => require.ensure([], () => r(require(`../docs${path}.md`)));
};

const loadDocs = function (path) {
    return LOAD_DOCS_MAP(path);
};
const registerRoute = navConfig1 => {
    let route = [];

    navConfig1.forEach((nav, index) => {
        route.push({
            path: '/component',
            redirect: '/component/installation',
            component: load('component'),
            children: [],
        });
        if (nav.href) {
            return;
        }
        if (nav.groups) {
            nav.groups.forEach(group => {
                group.list.forEach(nav1 => {
                    addRoute(nav1, index);
                });
            });
        } else if (nav.children) {
            nav.children.forEach(nav1 => {
                addRoute(nav1, index);
            });
        } else {
            addRoute(nav, index);
        }
    });
    function addRoute(page, index) {
        const component = page.path === '/changelog' ? load('changelog') : loadDocs(page.path);
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description,
            },
            name: 'component-' + (page.title || page.name),
            component: component.default || component,
        };

        route[index].children.push(child);
    }

    return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function () {
    let indexRoute = {
        path: '/', // 首页
        name: 'index',
        component: load('component'),
    };

    return [indexRoute];
};

route = route.concat(generateMiscRoutes());

route = route.concat([
    {
        path: '/',
    },
    {
        path: '*',
        redirect: '/',
    },
]);

export default route;
