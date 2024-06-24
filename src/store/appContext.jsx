import React, { createContext, useReducer, useContext } from "react";
import getState from "./flux";

export const Context = createContext(null);

const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        const initialState = getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updatedStore => setState({
                store: Object.assign(state.store, updatedStore),
                actions: { ...state.actions }
            })
        });

        const [state, setState] = useReducer(
            (prevState, newState) => ({ ...prevState, ...newState }),
            initialState
        );

        const { store, actions } = state;

        return (
            <Context.Provider value={{ store, actions }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export const useAppContext = () => useContext(Context);

export default injectContext;
