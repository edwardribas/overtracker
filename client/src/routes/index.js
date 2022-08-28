import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { Finder } from '../pages/Finder';
import { UserDetails } from '../pages/UserDetails';

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Finder/>}/>
                <Route path="/user/:battleTag" element={<UserDetails/>}/>
                <Route path="/*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}