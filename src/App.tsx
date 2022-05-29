import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn/index";
import { AuthApi } from "./services/api/authApi";
import { setUserData } from "./store/ducks/user/actionCreators";
import { selectIsAuth } from "./store/ducks/user/selectors";
import { Layout } from "./pages/Layout";

function App() {
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  /*     const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
  
    const checkAuth = async () => {
      try {
        const { data } = await AuthApi.getMe();
        dispatch(setUserData(data));
        // history.replace('/home');
      } catch (error) {
        console.log(error);
      }
    }
  
    React.useEffect(() => {
      checkAuth();
    }, []);
  
    React.useEffect(() => {
      if (isAuth) {
        history.push('/home');
      }
    }, [isAuth]); */

    React.useEffect(() => {
      if (isAuth) {
        history.push('/home');
      }
    }, [isAuth]);

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Layout>
          <Route path="/" component={Home} />
        </Layout>
      </Switch>
    </div>
  );
}

export default App;
