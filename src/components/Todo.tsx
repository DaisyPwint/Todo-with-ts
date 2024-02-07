import { useState } from 'react';
import Moon from '../assets/icon-moon.svg'
import Bglight from '../assets/bg-desktop-light.jpg'
import Cross from '../assets/icon-cross.svg';

type Tasks = {
  id: number,
  text: string,
  isCompleted: boolean
}

const Todo = () => {
  const [tasks,setTasks] = useState<Tasks[]>([]);
  const [text, setText] = useState('');
  const [currentType, setCurrentType] = useState('All');
  
  const filteredTasks = currentType === 'All' ? tasks : currentType === 'Active' ? tasks.filter(task => !task.isCompleted) :  tasks.filter(task => task.isCompleted) ;

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(text === "") return;

    const newTask = {
      id: Math.random(),
      text,
      isCompleted: false
    }
    
    setTasks([...tasks,newTask]);
    setText('');
  }

  const handleCheckbox = (taskId:number) => {
    setTasks(tasks.map(task => {
      if(task.id === taskId){
        task.isCompleted = !task.isCompleted;
        }
        return task
    }
    ))
  }

  const handleDelete = (taskId:number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  const handleFilter = (type: string) => {
    setCurrentType(type);
  }

  const handleClear = () => {
    setTasks([]);
  }

  return (
    <div className='h-screen w-full bg-[hsl(235, 21%, 11%)]'>
      <div className="w-full h-[350px] bg-cover bg-center" style={{backgroundImage: `url(${Bglight})`}} />
      <div className='md:w-[36rem] w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex justify-between items-center'>
                <h1 className='font-sans text-white font-bold text-4xl tracking-[.3em] uppercase'>Todo</h1>
                <img src={Moon} alt="moon icon" className='cursor-pointer' />
            </div>
            <form className='bg-white w-full rounded-md px-5 py-4 flex items-center mt-10 border border-gray-300' onSubmit={handleSubmit}>
              <div className='rounded-full w-[23px] h-[23px] border border-gray-300 pr-5' />
              <input type="text" placeholder='Create a new todo...' className='border-0 focus:ring-0 w-full pl-0 text-gray-500 ml-5' 
              value={text} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
            </form>
            {
              tasks.length > 0 && (
                <div className='bg-white w-full rounded-md flex flex-col items-start mt-5 shadow-2xl'>
                  {
                    filteredTasks.map((task,index) => (
                      <div key={index} className='flex items-center border-b border-gray-300 w-full p-5 px relative justify-between
                      '>
                        <div className='text-gray-500'>
                          <input type="checkbox" name="checkbox" className='mr-5 focus:ring-0 focus:ring-offset-0 checkbox' checked={task.isCompleted} onChange={() => handleCheckbox(task?.id)} />
                          <label className={`cursor-pointer text-lg ${task.isCompleted === true ? 'line-through text-gray-300': ''}`} onClick={() => handleCheckbox(task?.id)}>{task.text}</label>
                        </div>
                        <img src={Cross} alt="cross img" className='cursor-pointer' onClick={() => handleDelete(task.id)} />
                      </div>
                    ))
                  }
                  <div className='flex justify-between items-center p-5 w-full text-gray-400'>
                    <p>{tasks.length} {`${tasks.length > 1 ? 'items' : 'item'} left`}</p>
                    <div className='absolute -bottom-20 left-0 bg-white w-full rounded-md px-5 py-4 shadow-md md:py-0 md:static md:rounded-0 md:shadow-none md:w-[200px]'>
                      <div className='flex gap-5 justify-center'>
                        <button onClick={() => handleFilter('All')}>All</button>
                        <button onClick={() => handleFilter('Active')}>Active</button>
                        <button onClick={() => handleFilter('Completed')}>Completed</button>
                      </div>
                    </div>
                    <button onClick={handleClear}>Clear Completed</button>
                  </div>
                </div>
              )
            }  
            <p className='text-center text-gray-400 md:mt-10 md:static absolute right-0 left-0 -bottom-32'>Drag and drop to reorder list</p>
      </div>
    </div>
  )
}

export default Todo


