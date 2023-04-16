import styles from './Wrapper.module.css';

function Wrapper(props){
    const classes = `${styles.wrapper} ${props.className}`
    return <div className={classes}>{props.children}</div>
}

export default Wrapper;