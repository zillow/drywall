export default (obj, NAMESPACE) => ({
    ...obj,
    NAMESPACE,
    ns() {
        return this[this.NAMESPACE] || {};
    },
});
