import { Duck } from './Duck';

/**
 * Defines a dispatchable action
 */
export interface Action<T = undefined> {
    type: string;
    payload?: T;
}

/**
 * Defines an action creator
 */
export type PayloadAction = <T>(payload: T) => Action<T>;

/**
 * The options for the Duck
 */
export interface DuckOptions<
    StateType,
    ActionType extends string,
    ActionCreatorNames extends string,
    ActionCreatorType extends () => Record<ActionCreatorNames, PayloadAction>
> {
    namespace: string;
    storePath: string;

    initialState: StateType;
    reducer: (
        state: StateType,
        action: Action<unknown>,
        duck: Duck<
            StateType,
            ActionType,
            ActionCreatorNames,
            ActionCreatorType
        >,
    ) => StateType;
    actions: ActionType[];
    actionCreators: (
        duck: Duck<
            StateType,
            ActionType,
            ActionCreatorNames,
            ActionCreatorType
        >,
    ) => { [key in ActionCreatorNames]: PayloadAction };
}
