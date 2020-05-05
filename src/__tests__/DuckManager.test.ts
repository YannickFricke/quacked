import { DuckManager } from '../DuckManager';
import { Duck } from '../Duck';

describe('DuckManager', () => {
    const duck = new Duck({
        namespace: '',
        storePath: 'test',
        actions: [],
        actionCreators: () => ({}),
        initialState: {},
        reducer: () => ({}),
    });

    let duckManager: DuckManager;

    beforeEach(() => {
        duckManager = new DuckManager();
    });

    it('should be instantiable', () => {
        expect(duckManager).toBeDefined();
    });

    it('should be able to take an array of ducks while being constructed', () => {
        duckManager = new DuckManager([duck]);
    });

    it('should be able to register ducks', () => {
        duckManager.registerDuck(duck);

        expect(duckManager.getRegisteredDucks()).toContain(duck);
    });

    it('should return an object with all reducers from all registered ducks', () => {
        duckManager.registerDuck(duck);

        expect(duckManager.getReducers()).toEqual({
            test: duck.getReducer,
        });
    });
});
