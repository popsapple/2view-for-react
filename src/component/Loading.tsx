import styles from "./Loading.module.scss"
export function Loading() {
    return <div className={`loadingbox ${styles.Loading}`}>
       <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
    </div>
}