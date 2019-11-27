export const vDOM = (nodeName, attrs, ...children) => {
    return {
        nodeName,
        attrs,
        children
    }
}

// renderVDom — turns virtual DOM into DOM element
export const renderVDOM = vnode => {
    let el

    const { nodeName, attrs, children } = vnode

    if (vnode.split) return document.createTextNode(vnode)

    if (typeof nodeName === 'string') {
        el = document.createElement(nodeName)

        for (let key in attrs) {
            el.setAttribute(key, attrs[key])
        }
    } else if (typeof nodeName === 'function') { // here is our `People`
        // initiate our component
        const component = new nodeName(attrs)
        el = renderVDOM(
            component.render(component.props, component.state)
        )
        // save DOM reference to `base` field as in `renderComponent`
        component.base = el
    }
    // recursively do this to all of its children
    (children || []).forEach(child => el.appendChild(renderVDOM(child)))

    return el
}