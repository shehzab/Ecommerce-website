import { useState, useEffect } from "react"
import { Link , redirect, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../../redux/api/usersApislice"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login,{isLoading}] = useLoginMutation();

  const {userInfo} = useSelector(state => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)

  const redirect = sp.get('redirect') || '/'

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
}, [navigate, redirect , userInfo])

 
  const submitHandler = async (e)=>{
    e.preventDefault()
    try{
      const res = await login({email,password}).unwrap()
      console.log(res)
      dispatch(setCredentials({...res}))
    }catch(error){
      toast.error(error?.data?.message || error.message)
    }
  }



  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">SignIn </h1>

          <form onSubmit={submitHandler}  className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white ">
                Email Address
                </label>
            
              <input 
                type="email" 
                id="email" 
                className="mt-1 p-1 border rounded w-auto"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              
            </div>
            
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-white ">
                Password
                </label>
            
          <input 
            type="password" 
            id="password" 
            className="mt-1 p-1 border rounded w-auto"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          
            </div>

          <button disabled={isLoading} type="submit" 
            className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer ">
                
                  {isLoading ? "Signing In...": "Sign In" }

            </button>

            {isLoading && <Loader/>}

          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer ? {" "}
              <Link to={redirect ? '/register?redirect=${redirect}': '/register' }className="text-red-500 hover:underline">Register</Link>
            </p>
          </div>

        </div>

        <img
          src="https://img.freepik.com/free-photo/beautiful-anime-character-cartoon-scene_23-2151035157.jpg?t=st=1725903971~exp=1725907571~hmac=5c7f2a5c21331c74ca47647f3d65fc64423ee58893f3e041f71edc3a1500a6f3&w=740"
          alt=""
          className="h-[45rem] w-auto xl:block md:hidden sm:hidden rounded-lg"
        />

      </section>

    </div>
  )
}
export default Login