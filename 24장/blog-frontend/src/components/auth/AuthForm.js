import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

 const AuthFormBlock = styled.div` //최상위 컴포넌트 선언 시 이름 뒤 Block이라는 단어 잘 붙임
 h3 {
   margin: 0;
   color: ${palette.gray[8]};
   margin-bottom: 1rem;
 }
`;

/**
* 스타일링된 input
*/
const StyledInput = styled.input`
 font-size: 1rem;
 border: none;
 border-bottom: 1px solid ${palette.gray[5]};
 padding-bottom: 0.5rem;
 outline: none;
 width: 100%;
 &:focus {
   color: $oc-teal-7;
   border-bottom: 1px solid ${palette.gray[7]};
 }
 & + & {
   margin-top: 1rem;
 }
`;

/**
* 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
*/
const Footer = styled.div`
 margin-top: 2rem;
 text-align: right;
 a {
   color: ${palette.gray[6]};
   text-decoration: underline;
   &:hover {
     color: ${palette.gray[9]};
   }
 }
`;

/* styled 함수를 사용하여 새로운 컴포넌트 이름으로 정의 - 상단 여백주는 방법 */
const ButtonWithMarginTop = styled(Button)`
 margin-top: 1rem;
`;

/* type props에 따라 다른 내용을 보여주도록 */
const textMap = {
 login: '로그인',
 register: '회원가입'
};

/**
* 에러를 보여줍니다
*/
const ErrorMessage = styled.div`
 color: red;
 text-align: center;
 font-size: 0.875rem;
 margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
    const text = textMap[type];
    return (
   <AuthFormBlock>
     <h3>{text}</h3>
     <form onSubmit={onSubmit}>
       <StyledInput
         autoComplete="username"
         name="username"
         placeholder="아이디"
         onChange={onChange}
         value={form.username}
       />
       <StyledInput
         autoComplete="new-password"
         name="password"
         placeholder="비밀번호"
         type="password"
         onChange={onChange}
         value={form.password}
       />
       {type === 'register' && (
           <StyledInput
             autoComplete="new-password"
             name="passwordConfirm"
             placeholder="비밀번호 확인"
             type="password"
             onChange={onChange}
             value={form.passwordConfirm}
            />
       )}
       {error && <ErrorMessage>{error}</ErrorMessage>} {/* props로 error 값을 받아 왔을 때 렌더링 */}
       <ButtonWithMarginTop cyan fullWidth style={{ marginTop: '1rem' }}>
           {text}
       </ButtonWithMarginTop> {/* Button컴포넌트에 cyan과 fullWidth라는 props를 넣어주어 다른 스타일이 적용되도록 */}
     </form>
     <Footer>
         {type === 'login' ? (
             <Link to= "/register">회원가입</Link>
         ) : (
            <Link to="/login">로그인</Link>
         )} 
     </Footer>
   </AuthFormBlock>
 );
};

export default AuthForm;