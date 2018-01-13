import React, { Component } from 'react'
import Header from './components/Header'
import PageTitle from './components/PageTitle'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PageTitle title="Login to IMU" />

        <div className="">
          <div className="py-4 container">
            <div className="row py-2">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">Login</div>
                  <div className="card-body">
                    <form className="" method="post" action="app.html">
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group py-2">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group py-2">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                    <hr className="mt-" />
                    <p>
                      If you don\'t have an account, please
                      <a href="signup.html">sign-up here</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2 bg-secondary">
            <div className="container">
              <div className="row">
                <div className="col-md-12 my-3 text-center text-light">
                  <p className="">
                    © Copyright 2018 Fida International - All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
