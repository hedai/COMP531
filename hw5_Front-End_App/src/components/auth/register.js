import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { register } from './authActions'

class Register extends Component {

    componentDidUpdate() {
        if (this.props.error.length == 0) {
            this.email.value = null
            this.phone.value = null
            this.birth.value = null
            this.zipcode.value = null
            this.password.value = null
            this.pwconf.value = null
        }
    }

    render() { return (
        <div className="col-sm-8">
            <label id="indexRegister"><font size="5">Register Now</font></label><br/>
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                    username:this.username.value,
                    email:this.email.value,
                    phone:this.phone.value,
                    birth:this.birth.value,
                    zipcode:this.zipcode.value,
                    password:this.password.value,
                    pwconf:this.pwconf.value
                }
                this.props.dispatch(register(payload))
            }}>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="username">Account Name</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="username" type="text" ref={(node) => this.username = node } placeholder="account name"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="email">Email Address</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="email" type="email" ref={(node) => this.email = node } placeholder="email address"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="phone">Phone Number</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="phone" type="tel" ref={(node) => this.phone = node } placeholder="123-123-1234"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="birth">Date of Birth</label>
                    <div className="col-sm-9">
                    <input className="form-control" id="birth" type="date" ref={(node) => this.birth = node } placeholder="mm/dd/yyyy"/>
                    </div>
                </div>                
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="zipcode">Zipcode</label>
                    <div className="col-sm-9">
                    <input className="form-control"id="zipcode" type="zipcode" ref={(node) => this.zipcode = node } placeholder="77005"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="password">Password</label>
                    <div className="col-sm-9">
                    <input className="form-control"id="password" type="password" ref={(node) => this.password = node } placeholder="password"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 form-control-label" htmlFor="pwconf">Confirmation</label>
                    <div className="col-sm-9">
                    <input className="form-control"id="pwconf" type="password" ref={(node) => this.pwconf = node } placeholder="password confirmation"/>
                    </div>
                </div>
                <div className="form-group row">
                    <span className="col-sm-3 form-control-label"></span>
                    <div className="col-sm-9">
                        <button className="btn btn-primary" id="submitButton" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )}
}

export default connect()(Register)



/** WEBPACK FOOTER **
 ** ./src/components/auth/register.js
 **/