import { hot } from 'react-hot-loader/root';
import React from 'react';
import routes from '../../routes';
import { useRoutes } from 'hookrouter';
import firebase from '../../firebase';
import styles from './styles.css';

// авторизуем пользователя анонимно
firebase.signInAnonymously();

const App = () => {
    const route = useRoutes(routes);

    return (
        <div className={styles.root}>
            {route || <div>404 PAGE</div>}
        </div>
    );
};

export default hot(App);
