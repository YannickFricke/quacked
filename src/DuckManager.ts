import { Duck } from './Duck';

type DuckType = Duck<any, any, any, any>;

/**
 * Manages a list of ducks
 */
export class DuckManager {
    /**
     * Contains all registered ducks
     */
    public registeredDucks: DuckType[];

    /**
     * Constructs a new instance of the DuckManager
     *
     * @param initialDucks The initial ducks
     */
    constructor(initialDucks: DuckType[] = []) {
        this.registeredDucks = initialDucks;
    }

    /**
     * Registers a new duck
     * @param duck The duck to register
     */
    public registerDuck(duck: DuckType) {
        this.registeredDucks.push(duck);
    }

    /**
     * Returns all registered ducks
     */
    public getRegisteredDucks() {
        return this.registeredDucks;
    }

    /**
     * Combines the reducers of all ducks an returns an object
     * which can be used in redux's `combineReducers` function
     *
     * You can also pass the result of this function as single object to the
     * `combineReducers` function when you don't have any other reducers
     */
    public getReducers(): Record<
        this['registeredDucks'][number]['storePath'],
        ReturnType<this['registeredDucks'][number]['getReducer']>
    > {
        return this.registeredDucks.reduce((acc, registeredDuck) => {
            return {
                ...acc,
                [registeredDuck.storePath]: registeredDuck.getReducer,
            };
        }, {} as ReturnType<this['getReducers']>);
    }
}
