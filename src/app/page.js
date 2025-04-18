"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import sun from "../../public/assets/icon-sun.svg";
import moon from "../../public/assets/icon-moon.svg";
import check from "../../public/assets/icon-check.svg";
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      setTodos([...todos, { text: value.trim(), done: false }]);

      setValue("");
    }
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true; // all
  });

  const toggleDone = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-indigo-950">
      <nav className="bg-[url(../../public/assets/bg-desktop-dark.jpg)] h-70 bg-center bg-cover">
        <div className="py-17 max-w-xl justify-between flex m-auto  items-center">
          <h1 className="text-amber-50 text-5xl tracking-[1.3rem] font-bold">
            TODO
          </h1>
        </div>
      </nav>
      <div className=" flex flex-col gap-3 left-120 absolute top-40">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Add TODO..."
            type="text"
            value={value}
            onChange={handleChange}
            className="bg-blue-950 p-3 text-amber-50 font-medium w-xl"
          />
        </form>
        <div className="relative flex flex-col gap-2">
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`bg-blue-950 p-3 flex gap-4 items-center text-amber-50 font-medium justify-between text-[1.1rem] 
              ${todo.done ? "line-through opacity-50" : ""}`}
            >
              <Image
                src={check}
                alt="check icon"
                onClick={() => toggleDone(index)}
                className={`w-10 h-5 border-2-white active:has-hover:bg-white ${
                  todo.done ? "line-through opacity-50" : ""
                }`}
              />
              {todo.text}
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-400 hover:text-red-600 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </div>
        {todos.length >= 1 && (
          <div className="flex justify-center gap-4 text-amber-50 font-medium">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "underline" : ""}
            >
              All TODOs
            </button>
            <button
              onClick={() => setFilter("active")}
              className={filter === "active" ? "underline" : ""}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("done")}
              className={filter === "done" ? "underline" : ""}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
