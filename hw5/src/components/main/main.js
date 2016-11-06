import React from 'react'

import Headline from './headline'
import Following from './following'
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

                <Following/>

            </div>

            <div className="col-xs-8 col-sm-8">
                <ArticlesView/>
            </div>
        </div>
    </div>
)

export default Main