import React from "react";

function ErrorMsg({ msg }) {
  return <p>{msg}</p>;
}

export default React.memo(ErrorMsg);
