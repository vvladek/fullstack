import styles from "./page.module.css"


export default async function Home() {

  const data = await fetch("http://localhost:3000/api/users", { method: "GET" })
  const users = await data.json()

  

  return (
    <div className={styles.page}>
      <p>
        {`${JSON.stringify(users)}`}
      </p>     
    </div>
  )
}
