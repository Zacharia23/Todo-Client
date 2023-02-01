import Layout from "../components/layout";
import NewTask from "../components/newTask";
import TaskList from "../components/taskList";

const Home = () => {
    return (
        <Layout>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-10 antialiased'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6'>
                    <NewTask/>
                    <TaskList/>
                </div>
            </div>
        </Layout>
    )
}

export default Home