import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import Auth from "./components/Auth/Auth";
import Main from "./components/Main";
import Initializing from "./components/Initializing";
import {signInRoute} from "./data/refs";
import {getAuth} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./data/redux/auth-reducer";

const App = () => {
    const user = getAuth().currentUser
    const dispatch = useDispatch()
    const initializing = useSelector(state => state.auth.initializing)

    useEffect(() => {
        checkAuth({dispatch})
    }, [user])

    if (initializing) {
        return <Initializing/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={signInRoute}
                       element={<Auth/>}/>
                <Route path={'*'} element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
