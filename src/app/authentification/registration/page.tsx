import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export default function Registration() {

  async function createUser(formData: FormData) {
    "use server"
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const res = await fetch("http://localhost:3000/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
    if (res.ok) {
      revalidatePath("/")
      redirect("/")
    } else {
      console.log(1)
    }

  }

  return (
    <form action={createUser}>
      <input type="text" name="username" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Create</button>
    </form>
  )
}