import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import axios from 'axios'
import Home from './pages/Home'
import AddPage from './pages/AddPage'
import ViewPage from './pages/ViewPage'
import DeletePage from './pages/DeletePage'
import UpdatePage from './pages/UpdatePage'
import PutPage from './pages/PutPage'
import IndexPage from './pages/IndexPage'
import ListDropPage from './pages/ListDropPage'
import OthersPage from './pages/OthersPage'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Indo-Pak Conflict Missiles Tracker</h1>
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* for add one, add many = 2*/}
          <Route path='/add' element={<AddPage/>} />
          {/* for find, findone, find limit, find skip, sort, distinct, count by label operations testing = 7 */}
          <Route path='/view' element={<ViewPage/>} />
          {/* for delete one, delete many, find one and delete = 3 */}
          <Route path="/delete" element={<DeletePage/>} />
          {/* for update one, update many, find one and update = 3*/}
          <Route path='/update' element={<UpdatePage/>} />
          {/* for replace one, find one and replace = 2 */}
          <Route path='/put' element={<PutPage/>} />
          {/* for create index, get index, delete index = 3 */}
          <Route path='/index' element={<IndexPage/>} />
          {/* for list collections, drop collection of missles = 2*/}
          <Route path='/list_drop' element={<ListDropPage/>} />
          {/* for aggregate, rename collection = 2 */}
          <Route path='/others' element={<OthersPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
