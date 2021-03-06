import { ActionTypes } from 'utils/constants';
import hashObject from 'utils/hash-object';

const initialState = {
    open: false,
    saving: false,
    bulkEdit: false,
    itemFingerprint: null
};

function itemModalCreator(id) {
    return function itemModal(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.EDIT_ITEM}_${id}`:
            case `${ActionTypes.OPEN_ITEM_DIALOG}_${id}`: {
                const itemFingerprint = hashObject(action.payload);

                return {
                    ...state,
                    open: true,
                    itemFingerprint
                };
            }
            case `${ActionTypes.CLOSE_ITEM_DIALOG}_${id}`: {
                return {
                    ...state,
                    open: false,
                    error: null,
                    bulkEdit: false
                };
            }
            case `${ActionTypes.APPLY_BULK_EDIT}_${id}`: {
                return {
                    ...state,
                    bulkEdit: true,
                    open: true
                };
            }
            case `${ActionTypes.VALIDATION_CHECK}_${id}`: {
                return {
                    ...state,
                    validationErrors: action.payload
                };
            }
            case `${ActionTypes.SAVE_BULK_EDIT}_${id}_PENDING`:
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_PENDING`:
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_PENDING`: {
                return {
                    ...state,
                    saving: true
                };
            }
            case `${ActionTypes.SAVE_BULK_EDIT}_${id}_FULFILLED`:
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_FULFILLED`: {
                return {
                    ...state,
                    saving: false,
                    open: false
                };
            }
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_FULFILLED`: {
                const newId = action.payload.data;

                if (newId) {
                    return {
                        ...state,
                        saving: false,
                        open: false
                    };
                } else {
                    return {
                        ...state,
                        saving: false,
                        error: true
                    };
                }
            }
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_REJECTED`:
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_REJECTED`: {
                return {
                    ...state,
                    saving: false,
                    error: true
                };
            }
            default: {
                return state;
            }
        }
    }
}

export default itemModalCreator;