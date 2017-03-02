import React from 'react'
import { connect } from 'react-redux'

import { localLogin, facebookLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (
        <div className="row">
            
            <div className="col-sm-9">
                <div>&nbsp;</div>
                <div className="form-group row">
                    <label className="col-sm-4 form-control-label" htmlFor="loginUsername">username</label>
                    <div className="col-sm-8">
                    <input className="form-control" id="loginUsername" type="text" placeholder="username"
                        ref={(node) => { username = node }} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 form-control-label" htmlFor="loginPassword">password</label>
                    <div className="col-sm-8">
                    <input className="form-control" id="loginPassword" type="password" placeholder="password"
                        ref={(node) => { password = node }} />
                    </div>
                </div>
                <div className="form-group row">
                    <span className="col-sm-4 form-control-label"></span>
                    <div className="col-sm-8">
                        <input className="btn btn-primary" type="button" value="Log In" id="loginBtn"
                            onClick={() => { dispatch(localLogin(username.value, password.value)) }}/>
                        <div className="row">&nbsp;</div>
                        <span className="btn btn-primary" onClick={() => { dispatch(facebookLogin()) }}>
                            <span className="fa fa-facebook"></span> Facebook
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-sm-3"></div>
        </div>
    )
}

export default connect()(Login)