/* Used to display a messege explaining why a page is empty */
import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('EmptyInfo', theme => ({
  emptyInfo: {
    margin: '50px auto',
    maxWidth: 700,
    textAlign: 'center'
  },
  unbold: {
    fontWeight: 'normal'
  }
}))

const EmptyInfo = (props) => {

  const { classes, line1, line2 } = props

  return (
    <div className={classes.emptyInfo}>
      <h2 className={classes.unbold}>{line1}</h2>
      {line2 ? <h3 className={classes.unbold}>{line2}</h3> : undefined}
    </div>
  )
}

export default withStyles(styleSheet)(EmptyInfo)
