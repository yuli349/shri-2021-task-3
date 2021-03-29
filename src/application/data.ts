import produce, { Draft } from 'immer';

import { Action } from './actions';
import { INTERVAL, State } from './types';

export const observer = produce((state: Draft<State>, action: Action) => {
    switch (action.type) {
        case 'timer':
            if (!state.pause) {
                state.progress += INTERVAL;
            }
            break;
        case 'prev':
            state.pause = false;
            state.progress = 0;
            state.index = Math.max(state.index - 1, 0);
            break;
        case 'next':
            if (state.index + 1 < state.stories.length) {
                state.index++;
                state.progress = 0;
            } else {
                state.pause = true;
            }

            break;
        case 'restart':
            state.pause = false;
            state.progress = 0;
            state.index = 0;
            break;
        case 'update':
            // eslint-disable-next-line no-case-declarations
            const { alias, data } = action.data;

            if (alias) {
                state.stories[state.index].alias = alias;
            }

            if (data) {
                Object.assign(state.stories[state.index].data, data);
            }

            break;
        case 'theme':
            state.theme = action.theme;
            break;
        default:
            break;
    }
    return state;
});
