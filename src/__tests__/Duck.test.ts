import { Duck } from '../Duck';

describe('Duck', () => {
    it('should be instantiable', () => {
        const duck = new Duck({
            namespace: '',
            storePath: '',
            actions: [],
            actionCreators: () => ({}),
            initialState: {},
            reducer: () => ({}),
        });

        expect(duck).toBeDefined();
    });

    it('should return namespaced actions', () => {
        const namespace = 'quacked';
        const storePath = 'test';

        const duck = new Duck({
            namespace,
            storePath,
            actions: ['CREATE', 'READ', 'UPDATE', 'DELETE'],
            actionCreators: () => ({}),
            initialState: {},
            reducer: () => ({}),
        });

        expect(duck.actions.CREATE).toEqual(`${namespace}/${storePath}/CREATE`);
        expect(duck.actions.READ).toEqual(`${namespace}/${storePath}/READ`);
        expect(duck.actions.UPDATE).toEqual(`${namespace}/${storePath}/UPDATE`);
        expect(duck.actions.DELETE).toEqual(`${namespace}/${storePath}/DELETE`);
    });

    describe('reducer', () => {
        it('should be a function', () => {
            const duck = new Duck({
                namespace: '',
                storePath: '',
                actions: [],
                actionCreators: () => ({}),
                initialState: {},
                reducer: () => ({}),
            });

            expect(duck.getReducer).toBeDefined();
            expect(typeof duck.getReducer).toBe('function');
        });

        it('should return the initial state', () => {
            const initialState = {
                quacked: 'test',
            };

            const duck = new Duck({
                namespace: 'quacked',
                storePath: 'test',
                actions: [],
                initialState,
                reducer: (state, action, duck1) => state,
                actionCreators: () => ({}),
            });

            const result = duck.getReducer(undefined, { type: 'testing' });

            expect(result).toEqual(initialState);
        });

        it('should return the transformed state', () => {
            const initialState = {
                quacked: 'test',
            };

            const duck = new Duck({
                namespace: 'quacked',
                storePath: 'test',
                actions: ['UPDATE'],
                initialState,
                reducer: (state, action, duck1) => {
                    switch (action.type) {
                        case duck1.actions.UPDATE:
                            return {
                                ...state,
                                quacked: 'quacked',
                            };
                    }

                    return state;
                },
                actionCreators: () => ({}),
            });

            const result = duck.getReducer(initialState, {
                type: duck.actions.UPDATE,
            });

            expect(result).toEqual({ quacked: 'quacked' });
        });
    });
});
