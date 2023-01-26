import React from 'react'
import "./resourceButton.css"

const ResourceButton = (props) => {

  let url = props.url

  return (
    <div className ="resource-button-Div">
      <button className="resource-button" onClick={() => window.open(url, "_blank")}>Want to learn more?</button>

    </div>
  )
}

export default ResourceButton