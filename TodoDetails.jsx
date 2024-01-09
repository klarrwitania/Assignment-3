import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import useFetch from "./useFetch";
import EditTodoForm from './EditTodoForm';
import React, { useState } from 'react';

export default function TodoDetails() {
    const { id } = useParams();
    const { data: todo, error, isLoading } = useFetch('http://localhost:7000/todos/' + id);
    const history = useHistory();

    const [editTodoForm, setEditTodoForm] = useState(false);

    const handleEdit = () => {
        setEditTodoForm(true);
    }

    const handleUpdate = (updatedTodo) => {
        history.push(`/todo/${updatedTodo.id}`);
    }

    const toDelete = () => {
        fetch('http://localhost:7000/todos/' + todo.id, {
            method: 'DELETE'
        }).then(() =>{
            history.push('/')
        })
    }

    return (
        <div>
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { editTodoForm ? (
                //edit form component
                <EditTodoForm todo={todo} onUpdate={handleUpdate} onCancel={() => setEditTodoForm(false)} />
                ) : ( //todo details
                <article className="m-4">
                    <h2 className="text-xl font-semibold">{ todo.title }</h2>

                    <div className="w-auto border border-gray-300 rounded-full my-4"></div>

                    <div className="text-lg font-semibold flex flex-row">
                        <p className="flex-auto w-[50%]">Priority</p>
                        <p className="flex-auto w-[50%]">Due</p>
                    </div>

                    <div className="flex flex-row mt-1">
                        <p className="flex-auto w-[50%]">{ todo.priority }</p>
                        <p className="flex-auto w-[50%]">{ todo.duedate }</p>
                    </div>

                    <p className="text-lg font-semibold mt-3">Description</p>
                    <div className="border border-gray-200 rounded-md px-2 py-1 mt-2">{ todo.description }</div>

                    {/* buttons */}
                    <div className="font-semibold text-sm flex flex-row justify-between">
                        <Link to="/">
                            <button className="bg-black text-white rounded-md py-2 px-3 mt-4">OK</button>
                        </Link>
                        <div className="space-x-3">
                            <button className="border border-red-500 text-red-500 rounded-md py-2 px-3 mt-4" onClick={toDelete}>Delete</button>
                            <button className="bg-gray-100 rounded-md py-2 px-3 mt-4" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                </article>
            )}
        </div>
    )
}