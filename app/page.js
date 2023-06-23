'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const newTodo = {
      id: todos.length + 1,
      text: formData.todo,
      done: false,
    };
    addTodo(newTodo);
    e.target.reset();
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      }),
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>My todo list</header>

      <section className={styles.section}>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id} className={styles.todoItems}>
              {todo.text}
              <button type="button">remove</button>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  handleToggleTodo(todo.id);
                }}
              />
            </li>
          ))}
        </ul>
      </section>
      <footer className={styles.footer}>
        <form action="#" onSubmit={handleAddTodo}>
          <label htmlFor="todo">Todo</label>
          <input type="text" name="todo" placeholder="add todo" />
          <button type="submit">add</button>
        </form>
      </footer>
    </main>
  );
}
