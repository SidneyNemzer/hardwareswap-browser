import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'

const Statistic = (props) => {
  const { muiTheme } = props
  
  const containerStyle = {
    margin: '0px 10px'
  }
  
  const numberStyle = {
    fontSize: '1.4em'
  }
  
  const labelStyle = {
    color: muiTheme.palette.primary3Color
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

export default muiThemeable()(Statistic)