import RandomCardGame from "./components/RandomCard";
import BinarySearchGame from "./components/BinarySearchGame";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<RandomCardGame />} />
        <Route path="/binary-search" element={<BinarySearchGame />} />
      </Routes>
    </Router>
  );
}

export default App;
