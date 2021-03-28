import produce, { Draft } from 'immer';

import { Action } from './actions';
import {
    descriptors, DRAFT_STATE, errors, INTERVAL, State,
} from './types';

export function die(error: keyof typeof errors, ...args: any[]): never {
    const e = errors[error];
    const msg = !e
        ? 'unknown error nr: ' + error
        : typeof e === 'function'
            // @ts-ignore
            ? e.apply(null, args as any) : e;
    throw new Error(`[function] ${msg}`);
}

function assertUnrevoked(state: any) {
    // eslint-disable-next-line no-underscore-dangle
    if (state.revoked_) die(1, JSON.stringify(state));
}

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
                state.stories[0].alias = alias;
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

export function proxyProperty(
    prop: string | number,
    enumerable: boolean,
): PropertyDescriptor {
    let desc = descriptors[prop];
    if (desc) {
        desc.enumerable = enumerable;
    } else {
        // eslint-disable-next-line no-multi-assign
        descriptors[prop] = desc = {
            configurable: true,
            enumerable,
            get(this: any) {
                const state = this[DRAFT_STATE];
                assertUnrevoked(state);
                // @ts-ignore
                return objectTraps.get(state, prop);
            },
            set(this: any, value) {
                const state = this[DRAFT_STATE];
                assertUnrevoked(state);
                // @ts-ignore
                objectTraps.set(state, prop, value);
            },
        };
    }
    return desc;
}
