import { AppStateType } from "app/store"

const isLogin = (st: AppStateType) => st.auth.isLogin

export {isLogin}