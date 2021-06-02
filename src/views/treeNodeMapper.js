// import { v4 as uuidv4 } from 'uuid';
function mapNode(dataItem, toName, toNodeKey, toChildren) {
    const children = toChildren(dataItem);
    const node = {
        title: toName(dataItem),
        item: dataItem,
        id: toNodeKey(dataItem),
    };
    if (children) {
        node.children = children.map(nextDataItem => mapNode(nextDataItem, toName, toNodeKey, toChildren));
    }
    return node;
}

function defaultToName(dataItem) {
    return dataItem && dataItem.name ? dataItem.name : '';
}

function defaultToChildren(dataItem) {
    return dataItem && dataItem.children ? dataItem.children : [];
}

function defualtToNodeKey(dataItem) {
    return dataItem && dataItem.id ? dataItem.id : '';
}

export function normalizeTree(dataSource, opts = {}) {
    const toName = opts.toName || defaultToName,
        toChildren = opts.toChildren || defaultToChildren,
        toNodeKey = opts.toNodeKey || defualtToNodeKey;
    if (Array.isArray(dataSource)) {
        return dataSource.map(dataItem => mapNode(dataItem, toName, toNodeKey, toChildren));
    } else if (dataSource) {
        return mapNode(dataSource, toName, toNodeKey, toChildren);
    }
    return null;
}
