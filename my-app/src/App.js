import { Route, Routes } from "react-router-dom";

import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import './App.css'
function App() {
  return (
    <div className="app__container">
      <h1>ברוכים הבאים לאפלקציית החלפת הספרים של גן ורד</h1>

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/EditBook" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;
