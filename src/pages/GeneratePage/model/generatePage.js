import { actions } from 'kredux';

export default {
    namespace: 'generatePage',
    initialState: {
        count: 0
    },
    reducers: {
        insertComponent: (payload, getState, dispatch) => {
            const state = getState();
            const { generatePage } = state;
            let { count } = generatePage;
            count += 1;

            actions.generatePage.setReducers({
                count
            });

            actions.operate.save({
                modelName: 'generatePage',
                data: {
                    count
                },
            });
        }
    }
}