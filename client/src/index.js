import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import createUser from './routing/createUser'
import login from './routing/login'
import * as serviceWorker from './serviceWorker'

const routing = (
    <Router>
        <div>
            <Route path="/" component={createUser} />
            <Route path="/login" component={login} />
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
