import React from 'react'

export default function Loading (props) {
  return (
    <div className="loading-wrapper">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
