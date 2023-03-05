import { AppStateType } from "app/store"

const initialized = (st: AppStateType) => st.app.initialized
const requestStatus = (st: AppStateType) => st.app.requestStatus
const error = (st: AppStateType) => st.app.error

export {initialized, requestStatus, error}