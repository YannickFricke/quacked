import { Action, DuckOptions, PayloadAction } from './types';
import { getNamespacedAction } from './utilities';

export class Duck<
    StateType,
    ActionType extends string,
    ActionCreatorNames extends string,
    ActionCreatorType extends () => Record<ActionCreatorNames, PayloadAction>
> {
    public readonly storePath: string;

    private readonly initialState: StateType;

    private readonly reducer: (
        state: StateType,
        action: Action,
        duck: this,
    ) => StateType;

    public readonly actions: Record<ActionType, string>;

    public readonly actionCreators: {
        [key in ActionCreatorNames]: PayloadAction;
    };

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

    public getReducer(state: StateType | undefined, action: Action) {
        if (state === undefined) {
            state = this.initialState;
        }

        return this.reducer(state, action, this);
    }
}
