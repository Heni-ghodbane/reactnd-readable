import React from 'react'

export default ({ match }) => (
  <div>
    <h3>
      Post with Id <code>{match.params.id}</code> was not found.
    </h3>
  </div>
)
