import {Link} from "react-router-dom";
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {Fragment} from "react";
const Header = () => {
    return (
        <div className='bg-white antialiased'>
            <nav className='mx-auto max-w-7xl px-6 lg:px-8' aria-label='Top'>
                <div className='flex w-full items-center justify-between border-b border-gray-200 py-3'>
                    <div className='flex items-center'>
                        <Link to='/home' className='font-medium text-2xl text-slate-700 uppercase tracking-tight'> TSK Tasks </Link>
                    </div>
                    <div className='hidden sm:block ml-10 space-x-4'>
                        <Menu as='div' className='relative inline-block px-3 text-left'>
                            <div>
                                <Menu.Button className='group w-full rounded-sm px-2 py-1 text-left text-sm font-medium text-slate-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-gray-100'>
                                    <span className='flex w-full items-center justify-between'>
                                        <span className='flex min-w-0 items-center justify-between space-x-3'>
                                            <div className='h-10 w-10 flex-shrink rounded-full bg-gray-100' />
                                            <span className='flex min-w-0 flex-1 flex-col'>
                                                <span className='truncate text-sm font-medium text-slate-600'>Adam F. Sandberg </span>
                                                <span className='truncate text-sm text-slate-400'>a.sandberg</span>
                                            </span>
                                        </span>
                                        <ChevronDownIcon className='h-5 w-5 ml-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500' aria-hidden='true' />
                                    </span>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-sm bg-white shadow-md ring-1 ring-slate-500 ring-opacity-5 focus:outline-none'>
                                    <Menu.Item
                                    >
                                        <a className='block px-4 py-2 text-sm hover:cursor-pointer text-slate-400 font-medium'> View Profile </a>
                                    </Menu.Item>
                                    <Menu.Item
                                    >
                                        <Link to='/' className='block px-4 py-2 text-red-500 font-medium text-sm hover:cursor-pointer'> Logout </Link>
                                    </Menu.Item>
                                </Menu.Items>

                            </Transition>
                        </Menu>
                    </div>
                    {/*    Mobile Menu */}
                    <div className='sm:hidden flex item-center'>
                        <Menu as='div' className='relative ml-3'>
                            <div>
                                <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus-ring-offset-2'>
                                    <span className='sr-only'>Open user menu </span>
                                    <div className='h-8 w-8 rounded-full bg-gray-100' />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-sm bg-white shadow-md ring-1 ring-slate-500 ring-opacity-5 focus:outline-none'>
                                    <Menu.Item
                                    >
                                        <a className='block px-4 py-2 text-sm hover:cursor-pointer text-slate-400 font-medium'> View Profile </a>
                                    </Menu.Item>
                                    <Menu.Item
                                    >
                                        <Link to='/' className='block px-4 py-2 text-red-500 font-medium text-sm hover:cursor-pointer'> Logout </Link>
                                    </Menu.Item>
                                </Menu.Items>

                            </Transition>
                        </Menu>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header