// Create virtual node
export function h(tag, props, children) {
  // Return the virtual node
  return {
    tag,
    props,
    children,
  };
}

// Mount a virtual node to the DOM
export function mount(vnode, container) {
  // Create the element
  const el = document.createElement(vnode.tag);
  vnode.el = el;

  // Set properties & event listeners
  for (const key in vnode.props) {
    if (key.startsWith("on")) {
      // Handle event listeners
      // key = onClick
      // key.slice(2).toLowerCase = click
      // vnode.props[key] = function
      el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key]);
    } else {
      // Handle attributes
      el.setAttribute(key, vnode.props[key]);
    }
  }

  // Create a document fragment to hold the children before appending to the actual DOM
  const fragment = document.createDocumentFragment();

  // Handle children
  if (typeof vnode.children === "string") {
    el.textContent = vnode.children;
  } else if (Array.isArray(vnode.children)) {
    // If children is an array, recursively mount each child to the fragment
    for (let i = 0, len = vnode.children.length; i < len; i++) {
      mount(vnode.children[i], fragment);
    }
  } else {
    // If children is a single virtual node, mount it to the fragment
    mount(vnode.children, el);
  }

  // Append the fragment with children to the actual DOM element
  el.appendChild(fragment);
  // Mount to the DOM
  container.appendChild(el);
}

// Unmount a virtual node from the DOM
export function unmount(vnode) {
  vnode.el.parentNode.removeChild(vnode.el);
}

// Take 2 virtual nodes, compare & figure out what's the difference
export function patch(n1, n2) {
  const el = (n2.el = n1.el);

  // Case where the nodes are of different tags
  if (n1.tag !== n2.tag) {
    mount(n2, el.parentNode);
    unmount(n1);
  }

  // Case where the nodes are of the same tag
  else {
    // New virtual node has string children
    if (typeof n2.children === "string") {
      el.textContent = n2.children;
    }

    // New virtual node has array children
    else {
      // Old virtual node has string children
      if (typeof n1.children === "string") {
        el.textContent = "";
        n2.children.forEach((child) => mount(child, el));
      }

      // Case where the new vnode has string children
      else {
        const c1 = n1.children;
        const c2 = n2.children;
        const commonLength = Math.min(c1.length, c2.length);

        // Patch the children both nodes have in common
        for (let i = 0; i < commonLength; i++) {
          patch(c1[i], c2[i]);
        }

        // Old children was longer
        // Remove the children that are not "there" anymore
        if (c1.length > c2.length) {
          c1.slice(c2.length).forEach((child) => {
            unmount(child);
          });
        }

        // Old children was shorter
        // Add the newly added children
        else if (c2.length > c1.length) {
          c2.slice(c1.length).forEach((child) => {
            mount(child, el);
          });
        }
      }
    }
  }
}
