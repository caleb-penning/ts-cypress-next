import React, { BaseSyntheticEvent, useState } from "react"

const Todos = ({ defaultTodos = ["Make Coffee", "Log in to work"]}): JSX.Element => {
    const [newTodo, setNewTodo] = useState("")
    const [todos, setTodos] = useState(defaultTodos)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setNewTodo(value)
    }

    const handleRemove = (e: BaseSyntheticEvent) => {
        const idxToRemove = +e.target.className.split("-")[1]
        const updatedTodos = [...todos]
        updatedTodos.splice(idxToRemove, 1)
        setTodos(updatedTodos)
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (newTodo.trim().length) {
            setTodos(data => [...data, newTodo])
            setNewTodo("")
        }
        else return
    }

    return (
        <div id="todo-page">
            <ul id="todo-list">
                {todos.length ? 
                    todos.map(
                        (el, idx) => 
                        <li key={idx}>{el} {"    "}
                            <button className={`remove-${idx}`} onClick={handleRemove}>Remove</button>
                        </li>) :
                    `Add some to-dos with the form below!`}
            </ul>

            <form id="todo-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Add A Task"
                    onChange={handleChange}
                    value={newTodo}
                />
                <input 
                    type="submit" 
                    value="Submit" 
                />
            </form>
        </div>
    )
}

export default Todos