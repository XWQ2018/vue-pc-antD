export default {
    beforeMount(el, binding, vnode, prevVnode) {
        el.style.background = binding.value;
    },
    mounted(el, binding) {},
    beforeUpdate() {}, // 新
    updated() {},
    beforeUnmount() {}, // 新
    unmounted() {},
};
