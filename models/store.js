export const store = (namespace, data) => {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }
    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
};
//# sourceMappingURL=store.js.map