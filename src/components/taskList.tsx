
const todoItems = [
    {
        id: 1,
        title: 'Lorem Ipsum Odolor Siet Ipsum',
        addedDate: 'Thu, 21st Jan 2023 08:00AM',
        status: 'Priority High',
        description: 'Lorem ipsum dolor sit amet consectetur. Euismod fermentum venenatis nec condimentum id malesuada eu.',
        taskItems: [
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: false},
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: true},
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: false}
        ]
    },
    {
        id: 2,
        title: 'Siet Lorem Ipsum Odolor Ipsum',
        addedDate: 'Thu, 23st Jan 2023 09:00PM',
        status: 'Priority Normal',
        description: 'Lorem ipsum dolor sit amet consectetur. Euismod fermentum venenatis nec condimentum id malesuada eu.',
        taskItems: [
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: false},
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: true},
            {name: 'Lorem ipsum dolor sit amet consectetur.', completed: false}
        ]
    }
]
const TaskList = () => {
    return (
        <div className='antialiased'>
            <p className='font-medium text-lg text-slate-500 uppercase border-b border-gray-200'>Your Todos </p>
            <div className='mt-3'>
                <p className='text-sm font-medium text-slate-400'> Personal Todos </p>
            </div>
            {todoItems.map(item => (
                <div key={item.id} className='bg-gray-50 mt-2 rounded-sm p-3'>
                    <div className='flex items-start justify-start'>
                        <div className='bg-gray-200 px-3 py-1 rounded-sm text-lg font-medium text-slate-500'>{item.id}</div>
                        <div className='flex flex-col ml-3'>
                            <span className='text-lg text-slate-600 font-medium'> {item.title} </span>
                            <span className='text-xs text-slate-400 font-medium'>
                            {item.addedDate} •
                        <span className='text-xs text-red-600 font-medium uppercase hover:cursor-pointer'> {item.status} </span>
                        </span>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <p className='text-sm font-medium text-gray-400'>
                            {item.description}
                        </p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-medium text-sm text-slate-400 uppercase'> Task Items </p>
                        <ul className='text-sm font-normal mt-2 text-slate-500 hover:cursor-pointer'>
                            {item.taskItems.map(_item => (
                                <li>
                                    <div className='flex items-center'>
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded-sm border-gray-300 text-slate-600 focus:ring-slate-500 focus:ring-1"
                                        />
                                        <label className='ml-2'>{_item.name}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
            <div className='mt-3'>
                <p className='text-sm font-medium text-slate-400'> Invited Todos </p>

            </div>
        </div>
    )
}

export default TaskList