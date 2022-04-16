/* 루트 리듀서 */
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    write,
});

// 프로젝트의 rootSaga
export function* rootSaga() {
    yield all([authSaga(), userSaga(), writeSaga()]);
}

export default rootReducer;