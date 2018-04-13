export const store = (namespace: string, data?: any) => {
	if (data) {
		return localStorage.setItem(namespace, JSON.stringify(data));
	}

	const store = localStorage.getItem(namespace);
	return (store && JSON.parse(store)) || [];
};
