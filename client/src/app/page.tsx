import styles from "./page.module.css"


export default async function Home() {

  const data = await fetch("http://localhost:3001/users")
  const users = await data.json()

  async function createUser(formData: FormData) {
    "use server"
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    await fetch(`http://localhost:3001/users/add?username=${username}&email=${email}&password=${password}`)
  }

  return (
    <div className={styles.page}>
      <p>
        {`${JSON.stringify(users)}`}
      </p>
      <form action={createUser}>
        <input type="text" name="username" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
