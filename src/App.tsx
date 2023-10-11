import { Button, MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import "./App.css"
import api from "./app/api"
import authSlice from "./app/authSlice"
import { useAppDispatch, useAppSelector } from "./app/hooks"

const loginFormData = {
  user: {
    email: "exampleuser2351@example.com",
    password: "exampleuser2351",
  },
}

function App() {
  const [login, { isLoading }] = api.endpoints.login.useMutation()
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.auth.user)

  return (
    <MantineProvider>
      {userInfo ? (
        <div>Hello, {userInfo.username}.</div>
      ) : (
        <div>Please click login</div>
      )}
      <Button loading={isLoading} onClick={() => login(loginFormData)}>
        Login
      </Button>
      <Button onClick={() => dispatch(authSlice.actions.logout())}>
        Logout
      </Button>
      <Button onClick={() => dispatch(authSlice.actions.sampleError())}>
        Throw Error
      </Button>
    </MantineProvider>
  )
}

export default App
