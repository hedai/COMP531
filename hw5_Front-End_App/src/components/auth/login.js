import React from 'react'
import { connect } from 'react-redux'

import { localLogin, googleLogin, facebookLogin } from './authActions'

const Login = ({dispatch}) => {
    let username, password
    return (
        <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9">

                <div className="form-inline">
                    <label className="col-sm-3 form-control-label" for="loginUsername">username</label>
                    <input className="form-control" id="loginUsername" type="text" placeholder="username"
                        ref={(node) => { username = node }} />
                </div>
                <div className="form-inline">
                    <label className="col-sm-3 form-control-label" for="loginPassword">password</label>
                    <input className="form-control" id="loginPassword" type="password" placeholder="password"
                        ref={(node) => { password = node }} />
                </div>
                <div className="form-inline">&nbsp;</div>
                <div className="form-inline">
                    <span className="col-sm-3 form-control-label"></span>
                    <input className="btn btn-primary" type="button" value="Log In"
                        onClick={() => { dispatch(localLogin(username.value, password.value)) }}/>

                    <span className="btn btn-danger" onClick={() => { dispatch(googleLogin()) }}>
                        <span className="fa fa-google-plus"></span> Google+
                    </span>

                    <span className="btn btn-primary" onClick={() => { dispatch(facebookLogin()) }}>
                        <span className="fa fa-facebook"></span> Facebook
                    </span>
                </div>
            </div>
            <div className="col-sm-3"></div>
        </div>
    )
}

export default connect()(Login)



/** WEBPACK FOOTER **
 ** ./src/components/auth/login.js
 **/