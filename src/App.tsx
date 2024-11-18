import { useState } from "react";
import {BrowserRouter, Route, Routes, useNavigate, useParams} from "react-router-dom"
import "./App.css";
import { NotePage } from "./components/NotePage";
import { ContentPage } from "./components/ContentPage";
import { notes } from "./database/db";
import { HomePage } from "./components/HomePage";



function App() {
  const [count, setCount] = useState(0);
  const router = [{
    route: "/",
    component: <NotePage title={""}/>
  }]

  return (
    <>
    <BrowserRouter>
    {/* <HomePage/> */}
    <Routes>
      <Route path='/:foo' element={<NotePage/>}/>
      <Route path='*' element={<NotePage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
