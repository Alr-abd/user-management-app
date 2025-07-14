import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { addUser, removeUser } from './store/userSlice';
import { nanoid } from 'nanoid';

function App() {
  const users = useSelector((s: RootState) => s.userState.users);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAdd = () => {
    if (!name || !email) return;
    dispatch(addUser({ id: nanoid(), name, email }));
    setName('');
    setEmail('');
  };
  return (

    <div className="max-w-xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-bold text-center mb-6">User management</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="flex-1 px-3 py-2 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="flex-1 px-3 py-2 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* 👥 User List */}
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center p-3 bg-gray-50 border rounded shadow">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => dispatch(removeUser(user.id))}
              className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default App
