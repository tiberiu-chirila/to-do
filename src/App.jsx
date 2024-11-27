import { useState, useEffect } from "react";
import { addItem, updateItemCheck, deleteItem, streamItems } from "./rtdbCalls";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { upload } from "./storage";

function App() {
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl = await upload(file, fileName);
    addItem(content, imageUrl);

    setContent("");
    setFile(null);
    setFileName("");
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
          required
        />
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="file name"
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Add</button>
      </form>
      {list.map((item) => (
        <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px", marginBottom: "4px" }}>
          <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id, !item.checked)} />
          <img src={item.imageUrl} alt="Image not found." />
          <span>{item.content}</span>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
