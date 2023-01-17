import React, { useState, useEffect } from "react";

const onDelete = () => {
    window.location = "#/delete";
  };

export const Renting = (props) => {
    return(
<button className="btn btn-outline-info btn-lg btn-block" onClick={() => { onDelete() }}>Delete an Account</button>
        
    );
}
export default Renting;