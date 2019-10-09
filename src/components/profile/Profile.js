import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

// Author: Scott Silver
// Purpose: Render 'My Profile' Page with links to add new payment form.

const Profile = props => {
  return (
    <React.Fragment>
      <a href="/payment/create">
        <h4>Add New Payment Type</h4>
      </a>
    </React.Fragment>
  );
};
export default withRouter(Profile);
