/**
 * Returns a namespaced action
 * @param namespace The namespace of the action
 * @param store The name of the slice which will be handled
 * @param actionName The name of the action
 */
export const getNamespacedAction = (
    namespace: string,
    store: string,
    actionName: string,
) => [namespace, store, actionName].join('/');
