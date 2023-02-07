import {LockClosedIcon} from "@heroicons/react/20/solid";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import useStorage from "../hooks/use-storage";

type Inputs = {
    userName: string,
    loginPass: string
}
const getToken = () => {
    return useStorage().getItem("token");
}
const Login = () => {

    const navigate = useNavigate();
    const {setItem, getItem} = useStorage()
    const [userName, setUsername] = useState<any | null>();
    const [loginPass, setLoginPass] = useState<any | null>();
    const [loading, setLoading] = useState<any | null>(false)
    const [message, setMessage] = useState<any | null>();

    const token = getToken()

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async () => {
        setLoading(true)
        const data = JSON.stringify({
            "username": userName,
            "password" : loginPass,
        })

        const loginConfig = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/user_login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        try {
            axios(loginConfig).then( async (loginResponse) => {
                setLoading(false)
                if(loginResponse.status == 200) {
                    const loginData = loginResponse.data.data;

                    setItem("token", loginData.token, "session")
                    setItem("username", loginData.username)
                    setItem("userId", loginData.id)
                    setItem("email", loginData.email)

                    setTimeout(() => {
                        navigate('/home')
                    }, 2000)


                } else {
                    setMessage(`Login Failed`)
                    console.log(loginResponse.status)
                }
            }).catch(error => {
                setMessage(`Login Failed`)
                console.log(error)
            })

        } catch (error) {
            setLoading(false)
            setMessage(`Login Failed`)
            console.log(error)
        }
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 antialiased'>
            <div className='w-full max-w-md space-y-8'>
                <div>
                    <h2 className='text-center text-3xl font-bold tracking-tight text-slate-800'>
                        Sample Application
                    </h2>
                    <h3 className='mt-6 text-center text-lg font-normal text-slate-500'>
                        Sign in to your account
                    </h3>
                </div>
                <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                    <input type='hidden' name='remember' defaultValue="true" />
                    <div className='-space-y-px'>
                        <div>
                            <label className='sr-only' htmlFor='user-name'> Email address </label>
                            <input
                                id="user-name"
                                name="username"
                                type="text"
                                autoComplete="text"
                                required
                                value={userName}
                                onChange={e => {setUsername(e.currentTarget.value)}}
                                className="relative block w-full appearance-none rounded-none rounded-t-sm border border-gray-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                                placeholder="Enter Username"
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='sr-only'> Password </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={loginPass}
                                onChange={e => {setLoginPass(e.currentTarget.value)}}
                                className="relative block w-full appearance-none rounded-none rounded-b-sm border border-gray-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                                placeholder="Enter Password"
                            />
                        </div>
                        <div className='pt-3 flex items-center justify-between'>
                            <div className='flex items-center'>
                                <input
                                    id='remember-me'
                                    name='remember-me'
                                    type='checkbox'
                                    className='h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500'
                                />
                                <label htmlFor='remember-me' className='ml-2 block text-sm text-slate-900'> Remember me </label>
                            </div>
                            <div className='text-sm'>
                                <a className='font-medium text-slate-600 hover:text-slate-500 hover:cursor-pointer'> Forgot your password?  </a>
                            </div>
                        </div>
                        <div className='pt-10'>
                            <button
                                type='submit'
                                className='group relative flex w-full justify-center rounded-sm border border-transparent bg-slate-600 py-3 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'>
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                    <LockClosedIcon className='h-5 w-5 text-slate-500 group-hover:text-slate-400' aria-hidden='true'/>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
                <h3 className='mt-6 text-center text-base font-normal tracking-tight text-slate-500'>
                    Dont have an account? <Link to='/register' className='font-medium text-slate-700 hover:cursor-pointer hover:underline'> Register Here </Link>
                </h3>
            </div>
        </div>
    )
}

export default Login
