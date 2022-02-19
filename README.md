## Step0. At first, we should know the order of execution in redux chain.

```
dispatch -> [middlewares] -> reducers -> store
```

## Step1. When we create a custom middleware, we should follow the following principle.

```javascript
const middleware1 = store => next => action => {};
applyMiddleware(store, middleware1, middleware2, ..);
```

## Step2. The essence of creating middlewares is to execute function after dispatch but before reducers.Hence, we can cover the 'store.dispatch' by what we want to add and then execute the old 'store.dispatch'.

``` javascript
// the old store.dispatch
const next = store.dispatch;
store.dispatch = () => {
    // TODO: execute the content of middleware function

    return next();
};
```

## Step3. On the account of the aboves, we can realize applyMiddleware like following:

```javascript
export const applyMiddleware = (store, ...middlewares) => {
    middlewares.reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    });
};
```

## codesandbox
https://codesandbox.io/s/dreamy-paper-k8hnqo?file=/src/index.js