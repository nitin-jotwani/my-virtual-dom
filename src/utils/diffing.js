import { renderVDOM } from './vDOM';

export const diff = (dom, vnode, parent) => {
    if (dom) {
        // console.log('inside dom dude', vnode.children.length, dom.childNodes.length)
        if (typeof vnode === 'string') {
            dom.nodeValue = vnode

            return dom
        }
        if (typeof vnode.nodeName === 'function') {
            const component = new vnode.nodeName(vnode.attrs)
            const rendered = component.render(component.props, component.state)

            diff(dom, rendered)
            return dom
        }
        // Naive check for number of chilren of vNode and dom
        if (vnode.children.length !== dom.childNodes.length) {
            console.log(renderVDOM(vnode.children[vnode.children.length - 1]))
            dom.appendChild(
                // render only the last child
                renderVDOM(vnode.children[vnode.children.length - 1])
            )
        }

        // run diffing for children
        dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]))

        return dom
    } else {
        const newDom = renderVDOM(vnode);
        console.log('heree', vnode, parent)
        parent.appendChild(newDom);
        console.log('heree2')
        return newDom;
    }
}