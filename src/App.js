import React, { useEffect, useState } from 'react'
import "./App.css"
import TodoInput from './components/TodoInput'
import Todolist from './components/TodoList';

const getLocalItems = () => {
  let list = localStorage.getItem('Todoitems');
  console.log(list);

  if(list) {
    return JSON.parse(localStorage.getItem('Todoitems'));
  }
  else{
    return [];
  }
}

function App() {
  const [listTodo,setListTodo]=useState(getLocalItems());
  let addList = (inputText)=>{
    if(inputText!=='')
      setListTodo([...listTodo,inputText]);
  }
  const deleteListItem = (key)=>{
    let newListTodo = [...listTodo];
    newListTodo.splice(key,1)
    setListTodo([...newListTodo])
  }

  useEffect(()=>{
    localStorage.setItem('Todoitems', JSON.stringify(listTodo))
  },[listTodo]);

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList}/>
        <h1 className="app-heading">TODO</h1>
        <hr/>
        {listTodo.map((listItem,i)=>{
          return (
            <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
          )
        })}
      </div>
    </div>
  )
}

export default App
