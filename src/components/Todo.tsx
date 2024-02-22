import React, { useEffect, useState } from 'react';
import Moon from '../assets/icon-moon.svg';
import Sun from '../assets/icon-sun.svg';
import Bglight from '../assets/bg-desktop-light.jpg';
import Bgdark from '../assets/bg-desktop-dark.jpg';
import Cross from '../assets/icon-cross.svg';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '../helpers/StrictModeDroppable';

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [currentType, setCurrentType] = useState('All');
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const filteredTasks = currentType === 'All' ? tasks : currentType === 'Active' ? tasks.filter(task => !task.isCompleted) : tasks.filter(task => task.isCompleted);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const newTask: Task = {
      id: Math.random(),
      text,
      isCompleted: false
    };

    setTasks([...tasks, newTask]);
    setText('');
  };

  const handleCheckbox = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    }));
  };

  const handleDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleFilter = (type: string) => {
    setCurrentType(type);
  };

  const handleClear = () => {
    setTasks([]);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);    
    items.splice(result.destination.index, 0, reorderedItem);    
    setTasks(items);
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="w-full h-screen bg-bgColor">
      <div className='h-[280px] bg-center' style={{ backgroundImage: `url(${theme === 'light' ? Bglight : Bgdark})` }}>
        <div className='flex justify-center items-center pt-1'>
          <div className='md:w-[36rem] w-96'>
            <div className='flex justify-between items-center pt-16'>
              <h1 className='font-sans text-[#fff] font-bold text-4xl tracking-[.3em] uppercase'>Todo</h1>
              <img src={`${theme === 'light' ? Moon : Sun}`} alt="moon icon" className='cursor-pointer' onClick={handleToggleTheme} />
            </div>
            <form className='bg-cardColor w-full rounded-md px-5 py-4 flex items-center mt-10 border border-cardColor' onSubmit={handleSubmit}>
              <div className='rounded-full w-[23px] h-[23px] border border-bgColor dark:border-textColor pr-5' />
              <input type="text" placeholder='Create a new todo...' className='border-0 focus:ring-0 w-full pl-0 text-darkTextColor ml-5 bg-cardColor'
                value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
            </form>
            {tasks.length > 0 && (
              <>
                <div className='bg-cardColor w-full rounded-md flex flex-col items-start mt-5 shadow-2xl'>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='w-full'>
                          {filteredTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                              {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <div className='flex items-center border-b border-bgColor dark:border-textColor p-5 relative justify-between cursor-auto'>
                                    <div className='text-darkTextColor'>
                                      <input type="checkbox" name="checkbox" className='mr-5 focus:ring-0 focus:ring-offset-0 checkbox border border-textColor'
                                        checked={task.isCompleted} onChange={() => handleCheckbox(task.id)} />
                                      <label className={`cursor-pointer text-lg ${task.isCompleted === true ? 'line-through text-textColor' : ''}`}
                                        onClick={() => handleCheckbox(task.id)}>{task.text}</label>
                                    </div>
                                    <img src={Cross} alt="cross img" className='cursor-pointer' onClick={() => handleDelete(task.id)} />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div className='flex justify-between items-center p-5 w-full text-textColor'>
                    <p>{tasks.length} {`${tasks.length > 1 ? 'items' : 'item'} left`}</p>
                    <div className='absolute -bottom-20 left-0 w-full rounded-md px-5 py-4 shadow-md md:py-0 md:static md:rounded-0 md:shadow-none md:w-[200px]'>
                      <div className='flex gap-5 justify-center font-semibold'>
                        <button onClick={() => handleFilter('All')} className='hover:text-darkTextColor transition duration-500'>All</button>
                        <button onClick={() => handleFilter('Active')} className='hover:text-darkTextColor'>Active</button>
                        <button onClick={() => handleFilter('Completed')} className='hover:text-darkTextColor'>Completed</button>
                      </div>
                    </div>
                    <button onClick={handleClear} className='hover:text-darkTextColor'>Clear Completed</button>
                  </div>
                </div>
                <p className='text-center text-textColor md:mt-10 md:static absolute right-0 left-0 -bottom-32'>Drag and drop to reorder list</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
