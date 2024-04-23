import "./App.css";
import Input from "./comp/Input/Input";
import List from "./comp/List/List";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="main">
      <div className="con">
        <h1>Tasks</h1>
        <Input />
        <List />
      </div>
    </div>
  );
}

export default App;
