import React from 'react'

import Headline from './headline'
import ArticlesView from '../article/articlesView'

const Main = () => (
    // This is the main view.
    // On this view we display the user's avatar, their headline,
    // their feed of articles (with a search fiilter),
    // and their list of followers.
    <div className="container">
        
        <div className="row">
            <div className="col-xs-4 col-sm-4">

                <Headline/>

                <div className="well">
                  <div>
                    <h4> Friends </h4>
                    <img id="profilePic1"  src="http://i0.kym-cdn.com/photos/images/facebook/000/993/875/084.png" className="img-thumbnail" height="100" width="100"/>
                    <label>Nick Young</label><br/>
                    <p>Status: What???</p>
                    <input type="button" value="Unfollow" id="unfollow_btn" className="btn btn-default"/>

                    <br/><br/><br/>
                    <img id="profilePic2"  src="https://cdn0.vox-cdn.com/thumbor/4yH57idbOaL-LGNl_FwhHW_ufKM=/0x97:2002x1432/1310x873/cdn0.vox-cdn.com/uploads/chorus_image/image/50131761/usa-today-8861436.0.jpg" className="img-thumbnail" height="100" width="100"/>
                    <label>Jeremy Lin</label><br/>
                    <p>Status: Is my haircut awesome?</p>
                    <input type="button" value="Unfollow" id="unfollow_btn" className="btn btn-default"/>

                    <br/><br/><br/>
                    <img id="profilePic3"  src="http://az616578.vo.msecnd.net/files/2016/01/17/635886557531071372-1009885900_tumblr_static_bdj3tvirs5k4wgww44sc8k4kc.jpg" className="img-thumbnail" height="100" width="100"/>
                    <label>Barney Stinson</label><br/>
                    <p>Status: It's going to be Legen... wait for it... dary!</p>
                    <input type="button" value="Unfollow" id="unfollow_btn" className="btn btn-default"/>

                    <br/><br/><br/>
                    <img id="profilePic4"  src="https://lh5.googleusercontent.com/-89xTT1Ctbrk/AAAAAAAAAAI/AAAAAAAABcc/Kg0vilTzpKI/photo.jpg" className="img-thumbnail" height="100" width="100"/>
                    <label>Elon Musk</label><br/>
                    <p>Status: Never told you I am working on the IM suit.</p>
                    <input type="button" value="Unfollow" id="unfollow_btn" className="btn btn-default"/>
                  </div>

                  <div className="form-group">
                    <br/><br/>
                    <input type="text" className="form-control" placeholder = "Add friends to follow here" size="30"/>
                    <input type="button" value="Add" id="search_btn" className="btn btn-default"/>
                  </div>
                </div>

            </div>

            <div className="col-xs-8 col-sm-8">
                <ArticlesView/>
            </div>
        </div>
    </div>
)

export default Main



/** WEBPACK FOOTER **
 ** ./src/components/main/main.js
 **/