import './TaskList.css'
import TaskCard from '../components/TaskCard'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TaskList() {
    const [tasks, setTasks] = useState([])
    const [taskName, setTaskName] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); //create or edit
    const [currentTask, setCurrentTask] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/todos')
            .then(res => {
                if (res?.data) {
                    setTasks(res?.data?.todos)
                }
            })
            .catch(error => {
                console.error('Failed to load tasks:', error.message)
            })
    }, [])


    const handleEdit = (task) => {
        setModalType('edit');
        setShowModal(true);
        setCurrentTask(task);
        setTaskName(task.title)
    }

    const handleDelete = async (task) => {
        await axios.delete(`/todos/${task._id}`);
        setTasks(prev => prev.filter(t => t._id !== task._id))
    }

    const handleCreate = () => {
        setModalType('create');
        setCurrentTask(null);
        setTaskName('');
        setShowModal(true)
    }

    const handleSubmit = async () => {
        if (modalType === 'edit') {
            const res = await axios.patch(`/todos/${currentTask._id}`, {
                title: taskName
            })
            const updatedTodo = res.data.updatedTodo;
            setTasks(prev => prev.map((task) => (
                task._id === updatedTodo._id ? updatedTodo : task
            )))
        } else if (modalType === 'create') {
            const res = await axios.post('/todos', { title: taskName })
            const newTask = res.data.newTodo
            setTasks(prev => [...prev, newTask])
        }
        setShowModal(false);
        setTaskName('');
        setCurrentTask(null);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    }
    const username = JSON.parse(localStorage.getItem('user'))?.user?.username || 'randomUser'
    return (
        <>
            <div id="ancestorContainer" className="ancestorContainer">
                <div id="header" className='header'>
                    My Tasks
                    <button onClick={handleCreate} className="createTaskButton">Create Task</button>
                    <button onClick={handleLogout} className='logoutButton'>Logout</button>
                    Logged in user: {username}
                </div>
                {tasks.length > 0 ? (
                    tasks?.map((task, index) => (
                        <TaskCard key={index} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                ) : (
                    <div id='noTasks' className='noTasks'> No Task to display</div>
                )}
                {showModal && (
                    <div id='modalOverlay' className='modalOverlay'>
                        <div id='modalContent' className='modalContent'>
                            <h2>{modalType === 'edit' ? 'Edit Task' : 'Create Task'}</h2>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Enter task name"
                            />
                            <div id="modalButtons" className='modalButtons'>
                                <button onClick={handleSubmit} id='modalButton' className='modalButton'>Submit</button>
                                <button onClick={() => setShowModal(false)} id='modalButton' className='modalButton'>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}