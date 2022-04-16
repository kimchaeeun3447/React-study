/* 사용자의 상태를 담을 user 리덕스 모듈 */
import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK'
);

//로그아웃
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

//로그인 정보 만료 대비
function checkFailureSaga() { // yield를 사용하지 않으니 제너레이터 함수 형태로 만들지 않아도됨.
    try {
        localStorage.removeItem('user'); // localstorage에서 user 정보 제거
    } catch (e) {
        console.log('localstorage is not working');
    }
}

//로그아웃
function* logoutSaga() {
    try {
        yield call(authAPI.logout); //logout API 호출
        localStorage.removeItem('user'); //localStorage에서 user를 제거
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga); //CHECK_FAILURE액션 발생 시 호출하는 함수 설정
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error
    }),
    [LOGOUT]: state => ({
        ...state,
        user: null,
    }),
  },
  initialState
);