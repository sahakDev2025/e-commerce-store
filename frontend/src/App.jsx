// import './App.css'
import { Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react'
import PageLoader from './components/pageLoader'
import Layout from './components/Layout'




function App() {
  const {isLoaded}=useAuth()
  if(!isLoaded) return <PageLoader/>

  return (
    <Layout>
      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>

      <h1 className='text-lime-300 text-7xl font-bold'>Hello tailwindcss</h1>
      <button className='btn btn-primary'>Click me</button>
      <button className='btn btn-secondary'>Click me</button>
      <button className='btn btn-accent'>Click me</button>
    </Layout>
  )
}

export default App
