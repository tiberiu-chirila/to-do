import { useState, useEffect } from "react";
import { addItem, updateItemCheck, deleteItem, streamItems } from "./rtdbCalls";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    streamItems((items) => {
      setList(items);
    });
  }, []);

  const userId = sessionStorage.getItem("userId");
  const userAlias = sessionStorage.getItem("alias");

  if (!userId) {
    navigate("/");
  }

  const handleCreate = () => {
    addItem(content);
    setContent("");
  };

  const handleCheck = (id, checked) => {
    updateItemCheck(id, checked);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <div style={{ width: "900px" }}>
      <span>Hi, {userAlias}</span>
      <h1>To Do List</h1>
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={() => handleCreate()}>Add</button>
      {list.map((item) => (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id, !item.checked)} />
          <span>{item.content}</span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
