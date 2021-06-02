export const ParentPropsMixins = {
    computed: {
        parentProps() {
            let p = this.$parent;
            while (p && !p.$options.selectWrapper) {
                p = p.$parent;
            }
            return p ? p.$props : {};
        },
        mode() {
            return this.parentProps.mode;
        },
    },
};
