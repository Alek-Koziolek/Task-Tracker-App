import Button from "../UI/Button";
import Wrapper from "../UI/Wrapper";
import styles from "./LoginForm.module.css";
import Input from "../UI/Input";

function LoginForm(props) {

function submitFormHandler(event){
    event.preventDefault();
    props.onLogin();
}

  return (
    <Wrapper className={styles['login-form']}>
      <form onSubmit={submitFormHandler}>
        <h2>Login</h2>
        <div>
          <Input id="username" label="Username:" type="text" />
          <Input id="password" label="Password:" type="password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Wrapper>
  );
}

export default LoginForm;
