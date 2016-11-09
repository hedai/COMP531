import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addFollower, delFollower, dispatch } from './followingActions'

const Follower = ({name, avatar, headline, dispatch}) => (
    <div className="row followers" name="follower">
        <div>&nbsp;</div>
        <img className="img-thumbnail" height="100" width="100" src={ avatar }/>
        <strong id="followerName">{ name }</strong><br/>
        <div><em>{ headline }</em></div>
        <div>
            <input type="button" value="Unfollow" id="unfollowBtn" className="btn btn-warning" onClick={() => { dispatch(delFollower(name)) }}></input>
        </div>
    </div>
)

Follower.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    headline: PropTypes.string,
    dispatch: PropTypes.func.isRequired
}

class Following extends Component {
    render() { return (
        <div>
            <div className="col-sm-2">&nbsp;</div>
            <div className="col-sm-8 well">
                { Object.keys(this.props.followers).sort().map((f) => this.props.followers[f]).map((follower) =>
                    <Follower key={follower.name}
                        name={follower.name} avatar={follower.avatar} headline={follower.headline}
                        dispatch={this.props.dispatch} />
                )}
                <div className="row">&nbsp;</div>
                <div className="row">
                    <input className="form-control" type="text"
                        placeholder="add a follower" id="addFollowerText"
                        ref={(node) => this.newFollower = node }
                        onChange={(e) => {
                            this.forceUpdate()
                        }}/>
                { !(this.newFollower && this.newFollower.value && this.newFollower.value.length > 0) ? '' :
                    <input className="btn btn-primary" type="button" id="addFollowerBtn"
                        onClick={() => {
                            this.props.dispatch(addFollower(this.newFollower.value))
                            this.newFollower.value = ''
                            this.forceUpdate()
                        }}
                        value="add follower"/>
                }
                { this.props.error.length == 0 ? '' :
                    <div className="alert alert-danger">
                        { this.props.error }
                    </div>
                }
                </div>
            </div>
            <div className="col-sm-2">&nbsp;</div>
        </div>
    )}
}

Following.propTypes = {
    error: PropTypes.string.isRequired,
    followers: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            error: state.common.error,
            followers: state.followers.followers
        }
    }
)(Following)