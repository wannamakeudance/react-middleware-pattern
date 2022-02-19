export const applyMiddleware = (store, ...middlewares) => {
    middlewares.reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    });
};