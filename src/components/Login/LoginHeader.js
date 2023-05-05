import { useContext, useState } from "react";
import Button from "../UI/Button";
import LoginContext from "../../context/login-context";
import styles from './LoginHeader.module.css';
import LoginModal from "./LoginModal";

function LoginHeader() {
const ctx = useContext(LoginContext);

const [isModalVisible, setIsModalVisible] = useState(false);

function loginHandler(){
    //ctx.isLoggedIn = !ctx.isLoggedIn;
    setIsModalVisible(prevState => {return !prevState});
}

    return(<div className={styles['login-area']}>
        {ctx.isLoggedIn && <p>Hi, {ctx.username}!</p>}
        <Button onClick={loginHandler}>{ctx.isLoggedIn ? 'Logout' : 'Login'}</Button>
        {isModalVisible && <LoginModal onLogin={loginHandler} />}
    </div>);
}

export default LoginHeader;