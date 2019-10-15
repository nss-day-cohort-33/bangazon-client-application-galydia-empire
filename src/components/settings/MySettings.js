import React from "react"
import { withRouter } from "react-router-dom";

const Settings = props => {

    //Author: Sam Birky
    //Purpose: Show payment types button
    //Methods: Displays payment types button

    return (
            <React.Fragment>
                <a href="/paymenttypes">
                    <h4>Payment Types</h4>
                </a>
            </React.Fragment>
    )
}

export default withRouter(Settings);