import Navbar from './components/Navbar'
import './App.css';
import {BrowserRouter,Routes ,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import YourPosts from './pages/YourPosts';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import Singlepage from './Singlepage';
function App() {

let store=useContext(AuthContext)
console.log(store)
let value=store.userDetail.login
console.log(value)



  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
          <Routes>
            {value &&<Route path='/'  element={<Home/>}/>}
             {!value && <Route path='/'  element={<Navigate to={'/login'}/>}/>}
              <Route path='/register'  element={<Signup/>}/>
           { value &&  <Route path='/login'  element={<Navigate to={'/'}/>}/>}
          { !value &&   <Route path='/login'  element={<Login/>}/>}
             { value && <Route path='/yourblog'  element={<YourPosts/>}/>}
           {  ! value && <Route path='/yourblog'  element={<Navigate to={'/login'}/>}/>}
           <Route path='/single' element={<Singlepage/>}></Route>

          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
