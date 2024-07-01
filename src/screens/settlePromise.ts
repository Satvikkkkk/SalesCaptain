export const settlePromise = (promise) => {
    return promise
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }));
};
