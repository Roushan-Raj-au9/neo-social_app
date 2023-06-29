import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BookmarkPage from '../pages/BookmarkPage';
import UserPage from '../pages/UserPage';

const Routing = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/home' element={<LandingPage />}/>
            <Route path='/bookmark' element={<BookmarkPage />}/>
            <Route path='/user/:id?' element={<UserPage />}/>
            <Route path='/' element={<SignIn />}/>
            <Route path='/signup' element={<SignUp />}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Routing;