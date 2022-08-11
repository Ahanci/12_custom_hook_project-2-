import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformedTasks= tasksObj =>{
    const loadedTasks=[];
    for (const taskKey in tasksObj){
      loadedTasks.push({id:taskKey, text: tasksObj[taskKey].text})
    }
  }

  const {isLoading, error, sendRequest:fetchTasks} =useHttp({url:'https://authentic-lotus-345401-default-rtdb.firebaseio.com/tasks.json'},transformedTasks );
       

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
