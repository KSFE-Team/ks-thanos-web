import { actions } from "kredux";

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
        undo: (action, getState, dispatch) => {
            const state = getState();
            const { operate } = state;
            const { history, operateId } = operate;

            const detail = history[operateId - 2];
            for (let modelName in detail) {
                actions[modelName].setReducers(detail[modelName])
            }

            actions.operate.setReducers({
                operateId: operateId - 1,
                isUndo: true
            });

            actions.operate.setReducers({
                undoDisable: operateId - 2 <= 0, 
                redoDisable: operateId > history.length,
            })
        },
        redo: (action, getState, dispatch) => {
            const state = getState();
            const { operate } = state;
            const { history, operateId } = operate;

            const detail = history[operateId];
            for (let modelName in detail) {
                actions[modelName].setReducers(detail[modelName])
            }
            
            actions.operate.setReducers({
                operateId: operateId + 1,
                undoDisable: operateId + 2 <= 2,
                redoDisable: operateId + 1 === history.length,
                isRedo: true
            });
        },
        save: (action, getState, dispatch) => {
            const state = getState();
            const { operate } = state;
            const { operateId } = operate;
            actions.operate.saveWithOperateId({
                operateId,
                ...action
            });
            actions.operate.end();
        },
        saveWithOperateId: (action, getState, dispatch) => {
            let { operateId, modelName, data } = action;
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
        end: (action, getState, dispatch) => {
            const state = getState();
            const history = state.operate.history;
            const operateId = state.operate.operateId + 1;

            actions.operate.setReducers({
                operateId
            });

            actions.operate.setReducers({
                undoDisable: operateId - 1 === 0, 
                redoDisable: operateId <= history.length
            });
        }
    }
}