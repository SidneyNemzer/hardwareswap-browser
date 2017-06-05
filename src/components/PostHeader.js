import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('PostHeader', theme => ({
  failed: {
    color: 'gray',
    fontStyle: 'italic'
  }
  header: {
    display: 'flex',
    justifyContent: 'space-around'
  }
  faded: {
    color: 'gray'
  }
}))

const PostHeader = (props) => {
  if (!props.parsedTitle) {
    <header>
      <p className={props.classes.failed}>
        Failed to parse title
      </p>
    </header>
  }

  return (
    <header className={props.classes.header}>
      <span className={props.classes.faded}>
        Have
      </span>
      <span>
      {
        props.parsed.usaState
        ?
        props.parsed.usaState + ', '
        :
        null
      }
      {props.parsed.country}
      </span>
      <span className={props.classes.faded}>
        Want
      </span>
    </header>
  )
}

export default withStyles(styleSheet)(PostHeader)
