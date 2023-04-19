import { useContext } from "react";
import Button from "../UI/Button";
import LoginContext from "../../context/login-context";
import styles from './LoginHeader.module.css';

function LoginHeader() {
const ctx = useContext(LoginContext);

function isLoggedChangeHandler(){
    ctx.isLoggedIn = !ctx.isLoggedIn;
}

    return(<div className={styles['login-area']}>
        {ctx.isLoggedIn && <p>Hi, {ctx.username}!</p>}
        <Button onClick={isLoggedChangeHandler}>{ctx.isLoggedIn ? 'Logout' : 'Login'}</Button>
    </div>);
}

export default LoginHeader;