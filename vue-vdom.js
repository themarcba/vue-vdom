// Create a virtual node
export function h(tag, props, children) {
    return { tag, props, children };
}

// tag: h1
// props: { class: 'text-red-500'}
// children: 'Hello'
// Add a virtual node onto the DOM
export function mount(vnode, container) {
    const el = document.createElement(vnode.tag);
    vnode.el = el;

    // Handle props
    for (const key in vnode.props) {
        // key: class
        // vnode.props[key]: 'text-red-500
        if (key.startsWith('on')) {
            // When it's an event
            // onClick => click
            const eventName = key.slice(2).toLowerCase();
            el.addEventListener(eventName, vnode.props[key]);
        } else {
            // When it's a regular attribute
            el.setAttribute(key, vnode.props[key]);
        }
    }

    // Add children
    if (typeof vnode.children === 'string') {
        // Text
        el.textContent = vnode.children;
    } else if (Array.isArray(vnode.children)) {
        // Array of vnodes
        vnode.children.forEach(child => mount(child, el));
    } else {
        // Single vnode
        mount(vnode.children, el);
    }

    // Add to real DOM
    container.appendChild(el);
}

// Remove a vnode from the real DOM
export function unmount(vnode) {
    vnode.el.parentNode.removeChild(vnode.el);
}

// Check for differences and apply changes
// (very simplified version)
export function patch(vnode1, vnode2) {
    const el = vnode1.el;
    vnode2.el = el;
    if (typeof vnode2.children === 'string') {
        el.textContent = vnode2.children;
    } else {
        // Assume an array of h()
        for (let i = 0; i < vnode2.children.length; i++) {
            patch(vnode1.children[i], vnode2.children[i]);
        }
    }
}
