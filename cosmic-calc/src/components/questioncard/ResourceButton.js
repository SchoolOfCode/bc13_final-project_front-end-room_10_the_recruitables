import React from 'react'

const ResourceButton = (props) => {

  let url = props.url

  return (
    <div>
      <button className="resource-button" onClick={() => window.open(url, "_blank")}>?</button>

    </div>
  )
}

export default ResourceButton