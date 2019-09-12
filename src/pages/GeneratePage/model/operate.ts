import { actions } from 'kredux';

export default {
    namespace: 'operate',
    initialState: {
        operateId: 0,
        history: [],
        isUndo: false,
        undoDisable: true,
        isRedo: false,
        redoDisable: true
    },
    reducers: {
        undo: (action, getState) => {
            const state = getState();
            const { operate } = state;
            const { history, operateId } = operate;

            const detail = history[operateId - 2];
            for (const modelName in detail) {
                actions[modelName].setReducers(detail[modelName]);
            }

            actions.operate.setReducers({
                operateId: operateId - 1,
                isUndo: true
            });

            actions.operate.setReducers({
                undoDisable: operateId - 2 <= 0,
                redoDisable: operateId > history.length,
            });
        },
        redo: (action, getState) => {
            const state = getState();
            const { operate } = state;
            const { history, operateId } = operate;

            const detail = history[operateId];
            for (const modelName in detail) {
                actions[modelName].setReducers(detail[modelName]);
            }

            actions.operate.setReducers({
                operateId: Number(operateId) + 1,
                undoDisable: Number(operateId) + 2 <= 2,
                redoDisable: Number(operateId) + 1 === history.length,
                isRedo: true
            });
        },
        save: (action, getState) => {
            const state = getState();
            const { operate } = state;
            const { operateId } = operate;
            actions.operate.saveWithOperateId({
                operateId,
                ...action
            });
            actions.operate.end();
        },
        saveWithOperateId: (action, getState) => {
            const { operateId, modelName, data } = action;
            const state = getState();

            const { operate } = state;
            let { history } = operate;

            if (operateId < history.length) {
                history = history.slice(0, operateId);
            }

            if (!history[operateId]) {
                history[operateId] = {};
            }

            history[operateId][modelName] = data;

            actions.operate.setReducers({
                history
            });
        },
        end: (action, getState) => {
            const state = getState();
            const history = state.operate.history;
            const operateId = Number(state.operate.operateId) + 1;

            actions.operate.setReducers({
                operateId
            });

            actions.operate.setReducers({
                undoDisable: operateId - 1 === 0,
                redoDisable: operateId <= history.length
            });
        }
    }
};
