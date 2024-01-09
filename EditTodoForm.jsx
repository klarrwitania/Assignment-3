import { useState } from "react";

export default function EditTodoForm({ todo, onUpdate, onCancel }) {
    const [editedTodo, setEditedTodo] = useState({
        title: todo.title,
        priority: todo.priority,
        duedate: todo.duedate,
        description: todo.description,
      });

      const handleUpdate = () => {
        fetch(`http://localhost:7000/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTodo),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('Failed to update todo');
            }
            return response.json();
        })
        .then((updatedTodo) => {
            onUpdate(updatedTodo);
        })
        .catch((error) => {
            console.error(error.message);
        });
      };

    return(
        <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                value={editedTodo.title}
                onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
            />

            <label htmlFor="priority">Priority</label>
            <select 
                name="priority" 
                id="priority"
                required
                value={editedTodo.priority}
                onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })}
                defaultValue={'DEFAULT'}
                className="border border-gray-200 rounded-md px-3.5 py-2">

                <option value="DEFAULT" disabled defaultValue>Select todo priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label htmlFor="duedate">Due Date</label>
            <input 
                type="date"
                id="duedate"
                name="duedate" //placeholder gimana?
                required
                value={editedTodo.duedate}
                onChange={(e) => setEditedTodo({ ...editedTodo, duedate: e.target.value })}
                className="border border-gray-200 rounded-md px-3.5 py-2" />

            <label htmlFor="description">Description</label>
            <textarea 
                name="description" 
                id="description" 
                required
                value={editedTodo.description}
                onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                cols="30" 
                rows="3"
                placeholder="Type todo description here."
                className="border border-gray-200 rounded-md px-3.5 py-2"></textarea>

            <button onClick={handleUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
                </div>
    )
}