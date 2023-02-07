import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import useStorage from "../hooks/use-storage";
import axios from "axios";
import {ShareIcon} from "@heroicons/react/24/solid";

const TaskList = () => {

    const [loading, setLoading] = useState(false)
    const [listData, setListData] = useState([] as any[])

    useEffect(() => {
        getUserTask()
    }, [])

    const getUserTask = () => {
        const userId = useStorage().getItem("userId")
        const data = JSON.stringify({
            userid: userId,
        });

        const config = {
            method: "POST",
            url: "http://localhost:8000/api/v1/get_user_todos",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            axios(config).then(async (response) => {
                console.log(response.data)
                if (response.status == 200) {
                    console.log(response.data.data)
                    setListData(response.data.data)
                } else {
                    setListData([])
                }
            })

        } catch (error) {
            setListData([])
            console.log(error)
        }

    }

    return (
        <div className='antialiased'>
            <p className='font-medium text-lg text-slate-500 uppercase border-b border-gray-200'>Your Todos </p>
            <div className='mt-3'>
                <p className='text-sm font-medium text-slate-400'> Personal Todos </p>
            </div>
            <div>
                {listData.map((item:any, idx:any) => {
                    if (item.todo) {
                        return (
                            <Disclosure as='div' key={item.todo._id} className='bg-gray-50 mt-2 rounded-sm p-3'>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button className='flex w-full items-start justify-between text-left'>
                                            <div className='flex w-full items-start justify-start'>
                                                <div className='bg-gray-200 px-3 py-1 rounded-sm text-lg font-medium text-slate-500'>{idx}</div>
                                                <div className='flex flex-col ml-3'>
                                                <span
                                                    className='text-lg text-slate-600 font-medium'> {item.todo.title} </span>
                                                    <span className='text-xs text-slate-400 font-medium'>{item.todo.time} •
                                                      <span className='text-xs text-red-600 font-medium uppercase hover:cursor-pointer'> {item.todo.priority} </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='ml-10'>
                                                {open ? (<ChevronUpIcon className='h-6 w-6 text-gray-400' aria-hidden='true'/>) : (
                                                    <ChevronDownIcon className='h-6 w-6 text-gray-400' aria-hidden='true'/>)}
                                            </div>
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className='mt-3 flex justify-between items-center'>
                                                <p className='text-sm font-medium text-gray-400'>
                                                    {item.todo.description}
                                                </p>
                                                <ShareIcon className='h-5 w-5 p-0.5 rounded-md bg-white text-gray-400 hover:cursor-icon' />
                                            </div>
                                            <div className='mt-3'>
                                                <p className='font-medium text-sm text-slate-400 uppercase'> ToDo
                                                    Items </p>
                                                <ul className='text-sm font-normal mt-2 text-slate-500 hover:cursor-pointer'>
                                                    {item.todo.items.map((_item:any, idx:any) => (
                                                        <li key={idx}>
                                                            <div className='flex items-center'>
                                                                <input
                                                                    id="remember-me"
                                                                    name="remember-me"
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded-sm border-gray-300 text-slate-600 focus:ring-slate-500 focus:ring-1"
                                                                />
                                                                <label className='ml-2'>{_item.item}</label>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        )
                    }
                })}
            </div>
            <div className='mt-3'>
                <p className='text-sm font-medium text-slate-400'> Invited Todos </p>

            </div>
        </div>
    )
}

export default TaskList