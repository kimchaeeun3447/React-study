/* 로그인 라우트 컴포넌트 */
import AuthTemplate from "../components/auth/AuthTemplate";
import LoginForm from "../containers/auth/LoginForm";

const LoginPage = () => {
    return (
        <AuthTemplate>
            <LoginForm />
        </AuthTemplate>
    );
};

export default LoginPage;