import { Action, DuckOptions, PayloadAction } from './types';
import { getNamespacedAction } from './utilities';

/**
 * The duck represents a slice of a redux state with actions and their creators
 */
export class Duck<
    StateType,
    ActionType extends string,
    ActionCreatorNames extends string,
    ActionCreatorType extends () => Record<ActionCreatorNames, PayloadAction>
> {
    /**
     * The path where the duck should be located in the root reducer
     */
    public readonly storePath: string;

    /**
     * The initial state of the duck
     */
    private readonly initialState: StateType;

    /**
     * The reducer of the duck
     */
    private readonly reducer: (
        state: StateType,
        action: Action,
        duck: this,
    ) => StateType;

    /**
     * The defined actions for this duck
     */
    public readonly actions: Record<ActionType, string>;

    /**
     * The action creators of this duck
     * Every action creator is a function which returns an redux action
     */
    public readonly actionCreators: {
        [key in ActionCreatorNames]: PayloadAction;
    };

    /**
     * Constructs a new duck
     *
     * @param options The options for the duck
     */
    constructor(
        options: DuckOptions<
            StateType,
            ActionType,
            ActionCreatorNames,
            ActionCreatorType
        >,
    ) {
        this.storePath = options.storePath;
        this.initialState = options.initialState;
        this.reducer = options.reducer;
        this.actions = options.actions.reduce((acc, actionName) => {
            return {
                ...acc,
                [actionName]: getNamespacedAction(
                    options.namespace,
                    options.storePath,
                    actionName,
                ),
            };
        }, {} as this['actions']);
        this.actionCreators = options.actionCreators(this);

        this.getReducer = this.getReducer.bind(this);
    }

    /**
     * Returns the redux reducer for this duck
     *
     * @param state The state slice which is manged by the duck
     * @param action The dispatched action
     */
    public getReducer(state: StateType | undefined, action: Action) {
        if (state === undefined) {
            state = this.initialState;
        }

        return this.reducer(state, action, this);
    }
}
