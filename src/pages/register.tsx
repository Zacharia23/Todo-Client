import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useForm, SubmitHandler, set} from "react-hook-form";

type Inputs = {
    fullName: string,
    userName: string,
    email: string,
    password: string
}
const Register = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<any | null>();
    const [userName, setUsername] = useState<any | null>();
    const [email, setEmail] = useState<any | null>();
    const [password, setPassword] = useState<any | null>();
    const [loading, setLoading] = useState<any | null>(false);
    const [message, setMessage] = useState<any | null>();

    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async () => {
        setLoading(true)
        const data = JSON.stringify({
            "name": fullName,
            "username": userName,
            "email": email,
            "password" : password,
            "roles" : ["user", "moderator"]
        })

        const config = {
            method: 'POST',
            url: 'http://localhost:8000/api/v1/register_user',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        try {
            axios(config).then( async (response) => {
                setLoading(false)
                console.log(response)
                if(response.status == 200) {
                    const registerData = response.data;
                    console.log(registerData.message)
                    setMessage(registerData.message)

                    setTimeout(() => {
                        navigate('/')
                    }, 2000)

                } else {
                    setMessage(`Registration Failed`)
                    console.log(response.status)
                }
            }).catch(error => {
                setMessage(`Registration Failed`)
                console.log(error)
            })

        } catch (error) {
            setLoading(false)
            setMessage(`Registration Failed`)
            console.log(error)
        }
    }

    return (
        <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='text-center text-3xl font-bold tracking-tight text-slate-800'>
                    Sample Application
                </h2>
                <h3 className='mt-6 text-center text-lg font-normal text-slate-500'>
                    Register new account
                </h3>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-4 px-2 shadow sm:rounded-md sm:px-5'>
                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3'>
                            <div>
                                <label htmlFor='full-name' className='block text-sm font-normal text-gray-700'> Full Name </label>
                                <div className='mt-1'>
                                    <input
                                        id="full-name"
                                        name="full-name"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        placeholder='Enter full name'
                                        value={fullName}
                                        onChange={e => {setFullName(e.currentTarget.value)}}
                                        className='block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                                    />
                                </div>
                            </div>
                            <div className='mt-5 sm:mt-0'>
                                <label htmlFor='username' className='block text-sm font-normal text-gray-700'> Username </label>
                                <div className='mt-1'>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="text"
                                        required
                                        placeholder='Enter username'
                                        value={userName}
                                        onChange={e => {setUsername(e.currentTarget.value)}}
                                        className='block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                                    />
                                </div>
                            </div>

                        </div>
                        <div>
                            <label htmlFor='email' className='block text-sm font-normal text-gray-700'> Email address </label>
                            <div className='mt-1'>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder='Enter email address'
                                    value={email}
                                    onChange={e => {setEmail(e.currentTarget.value)}}
                                    className='block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className='mt-1'>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={e => {setPassword(e.currentTarget.value)}}
                                    className='block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm'
                                />
                            </div>
                        </div>
                        <div className='pt-5'>
                            <button
                                type='submit'
                                className='flex w-full justify-center rounded-sm border border-transparent bg-slate-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className='mt-3'>
                        <h3 className='mt-6 text-center text-base font-normal tracking-tight text-slate-500'>
                            Have an account? <Link to='/' className='font-medium text-slate-700 hover:cursor-pointer hover:underline'> Login Here </Link>
                        </h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register