import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('PostHeader', theme => ({
  failed: {
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    marginBottom: 5,
    padding: '20px 20px 0'
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center'
  },
  faded: {
    color: 'gray',
    fontSize: 20
  }
}))

const PostHeader = (props) => {
  if (!props.parsedTitle) {
    return (
      <header
        className={
          props.classes.header + ' ' +
          props.classes.center
        }
      >
        <span
          className={props.classes.failed}
          title="The title doesn't appear to be in the correct format: [state-country][H] have [W] want"
        >
          Failed to parse title
        </span>
      </header>
    )
  }

  return (
    <header
      className={
        props.classes.header + ' ' +
        props.classes.spaceBetween
      }
    >
      <span className={props.classes.faded}>
        Have
      </span>
      <span>
      {
        props._state
        ?
        props._state + ', '
        :
        null
      }
      {props.country}
      </span>
      <span className={props.classes.faded}>
        Want
      </span>
    </header>
  )
}

export default withStyles(styleSheet)(PostHeader)
