import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'

let ErrorMessage = ({error, success}) => (
    <div className="row">
        { error.length == 0 ? '' :
            <div className="alert alert-danger">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="errorMessage">{ error }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
        { success.length == 0 ? '' :
            <div className="alert alert-success">
                <div className="col-sm-1"></div>
                <div className="col-sm-10" id="successMessage">{ success }</div>
                <div className="col-sm-1"></div>
                <div className="row">&nbsp;</div>
            </div>
        }
    </div>
)
ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
ErrorMessage = connect((state) => {
    return { error: state.common.error, success: state.common.success }
})(ErrorMessage)

const Landing = () => (
    <div className="container-fluid">
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        
        <div className="jumbotron">
            <div className="container">
                <div className="row row-header">
                    <div className="text-center">
                        <h1><strong>Welcome to Ricebook!</strong></h1>
                            <p>Where amazing happens.</p>
                    </div>
                </div>
            </div>
        </div>

        <ErrorMessage/>

        <div className="container">
            <div className="row">

                <div className="col-xs-6 col-md-6">
                    <div className="well">
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <Register/>
                            <div className="col-sm-2"></div>
                        </div>
                    </div>
                </div>

                <div className="col-xs-6 col-md-6">
                    <div className="well">
                        <div className="row">
                            <div className="col-sm-2">&nbsp;</div>
                            <div className="col-sm-8">
                                <label id="indexLogin"><font size="5">User Login</font></label><br/>
                                <Login/>
                            </div>
                            <div className="col-sm-2"></div>
                        </div>                    

                        

                        <div className="row">&nbsp;</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
)

export default Landing



/** WEBPACK FOOTER **
 ** ./src/components/auth/landing.js
 **/