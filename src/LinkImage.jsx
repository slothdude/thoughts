//component taken from:
//https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const LinkImage = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props
  return (
    <img
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

LinkImage.propTypes = {
  to: PropTypes.string.isRequired,
}

export default withRouter(LinkImage)
