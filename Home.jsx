import TodoList from "../components/TodoList";
import useFetch from "../components/useFetch";

export default function Home() {
    const { data: todos, isLoading, error } = useFetch('http://localhost:7000/todos');

    return (
        <div>
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {todos && <TodoList todos={todos} title="Todo Lists" />}  
        </div>
    )
}