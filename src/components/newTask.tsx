import {ChangeEvent, Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDownIcon, PlusIcon} from "@heroicons/react/20/solid";
import {MinusCircleIcon} from "@heroicons/react/24/outline"
import {SubmitHandler, useForm} from "react-hook-form";
import useStorage from "../hooks/use-storage";
import axios from "axios";

const priority = [
    {id: 1, name: 'High', color: ''},
    {id: 2, name: 'Normal', color: ''},
    {id: 3, name: 'Low', color: ''},
]

type Inputs = {
    userName: string,
    loginPass: string
}

const NewTask = () => {
    const [selectedPriority, setPriority] = useState(priority[1]);
    const [taskItems, setTaskItems] = useState([{ item: "" }]);

    const [taskTitle, setTaskTitle] = useState<any | null>();
    const [taskDesc, setTaskDesc] = useState<any | null>();
    const [taskDate, setTaskDate] = useState<any | null>();
    const [taskTime, setTaskTime] = useState<any | null>();
    const [message, setMessage] = useState<any | null>();
    const [loading, setLoading] = useState<any | null>();

    const onChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const items = [...taskItems];
        items[idx]["item"] = e.target.value;
        setTaskItems(items);
    };

    const addItem = () => {
        setTaskItems([...taskItems, { item: ""}]);
    };
    const removeItem = (idx: number) => {
        const tmp = [...taskItems];
        tmp.splice(idx, 1);
        setTaskItems(tmp);
    };

    const {handleSubmit, watch, formState: {errors}} = useForm<Inputs>()

    const userId = useStorage().getItem("userId");
    const token = useStorage().getItem("token");

    const onSubmit: SubmitHandler<Inputs> = async () => {
        const data = JSON.stringify({
            "id": userId,
            "title": taskTitle,
            "priority" : selectedPriority.name,
            "description":taskDesc,
            "date":taskDate,
            "time":taskTime,
            "items":taskItems
        })

        console.log(data)

        const taskConfig = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/api/v1/save_todo',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        }

        try {
            axios(taskConfig).then( async (taskResponse) => {
                setLoading(false)
                if(taskResponse.data.status == 200) {
                    setMessage(taskResponse.data.message)
                }
                window.location.reload()
            }).catch(error => {
                setMessage(`Failed to save todo`)
                console.log(error)
            })

        } catch (error) {
            setLoading(false)
            setMessage(`Failed to save todo`)
            console.log(error)
        }
    }


    return (
        <div className='antialiased flex flex-col overflow-hidden'>
            <div className='sticky'>
                <p className='font-medium text-lg text-slate-500 uppercase border-b border-gray-200'>Add New Task </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full max-h-[45vh] overflow-y-auto mt-3 grid grid-cols-1 gap-y-3 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-4'>
                        <label htmlFor='task-title' className='block text-sm font-medium text-slate-400'> Task Title </label>
                        <div className='mt-1'>
                            <input
                                type='text'
                                name='task-title'
                                id='task-title'
                                autoComplete='title'
                                placeholder='Enter Task Title'
                                required
                                value={taskTitle}
                                onChange={e => {setTaskTitle(e.currentTarget.value)}}
                                className='block w-full rounded-sm border-slate-200 focus:border-slate-300 focus:ring-slate-300 sm:text-sm'
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-2'>
                            <Listbox value={selectedPriority} onChange={setPriority}>
                            <Listbox.Label htmlFor='set-priority' className='block text-sm font-medium text-slate-400'> Set Priority </Listbox.Label>
                            <Listbox.Button className='relative mt-1 w-full cursor-default rounded-sm border border-slate-200 py-2 pl-3 pr-10 text-left shadow-sm focus:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-300 sm:text-sm'>
                                <span className='block truncate'>{selectedPriority.name}</span>
                                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-[170px] overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                    {priority.map(item => (
                                        <Listbox.Option key={item.id} value={item} className='relative cursor-default select-none py-2 pl-3 pr-9'>
                                            {item.name}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>

                            </Transition>
                        </Listbox>
                    </div>
                    <div className='sm:col-span-6'>
                        <label className='block text-sm font-medium text-slate-400'> Task Description </label>
                        <div className='mt-1'>
                        <textarea
                            id='description'
                            name='description'
                            rows={3}
                            value={taskDesc}
                            onChange={e => {setTaskDesc(e.currentTarget.value)}}
                            className='block w-full rounded-sm border-slate-200 focus:border-slate-300 focus:ring-slate-300 sm:text-sm'
                            placeholder='Enter description value'
                        >
                        </textarea>
                        </div>
                    </div>
                    <div className='sm:col-span-3'>
                        <label className='block text-sm font-medium text-slate-400'> Task Date </label>
                        <div className='mt-1'>
                            <input
                                type='date'
                                name='task-date'
                                id='task-date'
                                autoComplete='text'
                                placeholder='Enter Date'
                                value={taskDate}
                                onChange={e => {setTaskDate(e.currentTarget.value)}}
                                className='block w-full rounded-sm border-slate-200 focus:border-slate-300 focus:ring-slate-300 sm:text-sm'
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-3'>
                        <label className='block text-sm font-medium text-slate-400'> Task Time </label>
                        <div className='mt-1'>
                            <input
                                type='datetime-local'
                                name='task-time'
                                id='task-time'
                                autoComplete='text'
                                placeholder='Enter Time'
                                value={taskTime}
                                onChange={e => {setTaskTime(e.currentTarget.value)}}
                                className='block w-full rounded-sm border-slate-200 focus:border-slate-300 focus:ring-slate-300 sm:text-sm'
                            />
                        </div>
                    </div>
                    <div className='sm:col-span-6'>
                        <div className='flex items-center justify-between'>
                            <div className=''>
                                <label className='block text-sm font-medium text-slate-400'> Task Item </label>
                            </div>
                            <div className='cursor-pointer' onClick={addItem}>
                                <label className='inline-flex items-center text-sm font-medium text-slate-400 uppercase hover:cursor-pointer hover:text-slate-500'> <PlusIcon className='h-5 w-5'/>  Add Item </label>
                            </div>
                        </div>
                        {taskItems.map((itm, idx) => {
                            return (
                                <div key={idx} className="relative mb-2">
                                    <input
                                        type='text'
                                        key={idx}
                                        name='task-title'
                                        id='task-title'
                                        autoComplete='title'
                                        placeholder='Task item'
                                        value={itm.item}
                                        onChange={e => onChange(e, idx)}
                                        className='block w-full rounded-sm border-slate-200 focus:border-slate-200 focus:ring-slate-200 sm:text-sm'
                                    />
                                    <button key={`btn-${idx}`} className="rounded-sm sm:text-sm absolute top-0 bottom-0 right-3" onClick={() => taskItems.length == 1 ? null : removeItem(idx)} >
                                        <MinusCircleIcon className='h-5 w-5 text-red-500' />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='sticky mt-10 border-t border-gray-200'>
                    <div className='flex items-center justify-end mt-3'>
                        <button type='submit' className='inline-flex items-center rounded-sm border border-transparent bg-slate-600 px-12 py-3 text-base font-medium leading-4 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'>
                            Submit Task
                        </button>
                    </div>
                </div>
            </form>


        </div>
    )
}

export default NewTask