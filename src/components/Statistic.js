import React from 'react'
import { withTheme } from 'material-ui/styles'

const Statistic = (props) => {
  const { theme } = props

  const containerStyle = {
    margin: '0px 10px'
  }

  const numberStyle = {
    fontSize: '1.4em'
  }

  const labelStyle = {
    color: theme.palette.grey['400']
  }

  return (
    <span style={containerStyle}>
      <div style={numberStyle}>
        {props.number}
      </div>
      <div style={labelStyle}>
        {props.label}
      </div>
    </span>
  )
}

export default withTheme(Statistic)
