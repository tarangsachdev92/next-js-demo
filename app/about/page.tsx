export const dynamic = "force-dynamic";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default async function AboutPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await res.json();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 p-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-900/90">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Todos
        </h1>

        <ul className="space-y-3">  
          {todos.slice(0, 10).map((todo) => (
            <li
              key={todo.id}
              className="rounded-2xl border border-slate-200/80 bg-slate-100 px-4 py-3 text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <span>{todo.title}</span>
              <span className="ml-3 text-lg">
                {todo.completed ? "✅" : "❌"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}