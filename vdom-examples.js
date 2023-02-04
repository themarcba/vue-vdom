import { h, unmount, patch } from './vue-vdom.js';

// VDOM 1 ---------------------------------
export const vdom1 = h(
    'h1',
    { class: 'text-orange-500 text-3xl font-bold' },
    'Vue.js Amsterdam 🧡'
);

// VDOM 2 ---------------------------------
export const vdom2 = h(
    'button',
    {
        class: 'bg-gray-200 p-2 rounded',
        onClick: () => alert('🤘'),
    },
    'Click here 🎉'
);

// VDOM 3 ---------------------------------
export const vdom3 = h(
    'div',
    { class: 'bg-gray-800 rounded-full p-6' },
    h('h1', { class: 'text-6xl' }, '🍕')
);

// VDOM 4 ---------------------------------
export const vdom4 = h('div', { class: 'bg-gray-800 rounded p-4' }, [
    h('h1', { class: 'text-white text-2xl' }, 'Yummy foods'),
    h('ol', { class: 'list-decimal text-white ml-4' }, [
        h('li', null, '🍕'),
        h('li', null, '🍔'),
        h('li', null, '🌮'),
        h('li', null, '🍟'),
    ]),
]);

// VDOM 5 ---------------------------------
const ducks = h('span', { class: 'text-3xl' }, '🦆🦆🦆');
const monkeys = h('span', { class: 'text-3xl' }, '🙈🙊🙉');
const goats = h('span', { class: 'text-3xl' }, '🐐🐐🐐');
export const vdom5 = h('div', { class: 'text-center rounded p-4' }, [
    h(
        'h1',
        { class: 'text-2xl font-bold' },
        "I don't have no time for no monkey business"
    ),
    h('div', null, [ducks, monkeys, goats]),
    h(
        'button',
        {
            class: 'text-3xl bg-gray-200 p-2 rounded mt-4',
            onClick: () => unmount(monkeys),
        },
        '🚫🐒'
    ),
]);

// VDOM 7 ---------------------------------
export const vdom6 = h('div', { class: 'flex flex-col items-center' }, [
    h('h1', { class: 'font-bold' }, "It's not a bug..."),
    h('p', { class: 'text-5xl my-4' }, '🐛'),
    h(
        'button',
        {
            class: 'bg-black text-white p-2 rounded hover:bg-orange-500',
            onClick: () => patch(vdom6, vdom6_patch),
        },
        'Patch 🩹'
    ),
]);
export const vdom6_patch = h('div', { class: 'flex flex-col items-center' }, [
    h('h1', { class: 'font-bold' }, "... it's a feature!"),
    h('div', { class: 'text-5xl' }, '✨'),
    h('div', { class: 'text-5xl' }, '✨'),
    h('div', { class: 'text-5xl' }, '✨'),
    h('div', { class: 'text-5xl' }, '✨'),
]);
