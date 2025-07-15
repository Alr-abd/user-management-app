import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { addUser, removeUser, updateUser } from "./store/userSlice";
import { nanoid } from "nanoid";

function App() {
  const users = useSelector((s: RootState) => s.userState.users);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const handleAdd = () => {
    if (!name.trim() || !email.trim()) {
      setError("نام و ایمیل نمی‌توانند خالی باشند.");
      setSuccess("");
      return;
    }

    if (!email.includes("@")) {
      setError("ایمیل نامعتبر است.");
      setSuccess("");
      return;
    }

    dispatch(addUser({ id: nanoid(), name, email }));
    setName("");
    setEmail("");
    setError("");
    setSuccess("کاربر با موفقیت اضافه شد!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          افزودن کاربر جدید
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            onClick={handleAdd}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            افزودن کاربر
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 space-y-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h4>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:bg-blue-50 font-medium px-2 py-1 rounded-lg transition cursor-pointer"
                onClick={() => {
                  setCurrentUser(user);
                  setEditModal(true);
                }}
              >
                ویرایش
              </button>
              <button
                onClick={() => dispatch(removeUser(user.id))}
                className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition cursor-pointer"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      {editModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">ویرایش کاربر</h3>
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
            <input
              type="email"
              className="w-full p-2 mb-3 border rounded"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  if (!currentUser.name.trim() || !currentUser.email.trim()) {
                    setError("نام و ایمیل نمی‌توانند خالی باشند.");
                    setSuccess("");
                    return;
                  }

                  if (!currentUser.email.includes("@")) {
                    setError("ایمیل نامعتبر است.");
                    setSuccess("");
                    return;
                  }

                  dispatch(updateUser(currentUser));
                  setName("");
                  setEmail("");
                  setError("");
                  setSuccess("کاربر با موفقیت اضافه شد!");
                  setEditModal(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
