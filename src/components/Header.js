import React, { Component } from 'react'
import { withTheme } from 'material-ui/styles'
import Statistic from './Statistic'

class Header extends Component {
  render() {
    const { theme } = this.props

    const headerStyle = {
      backgroundColor: theme.palette.primary[500],
      color: 'white',
      padding: 20
    }

    const headingStyle = {
      textAlign: 'center'
    }

    const infoBarStyle = {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center'
    }

    if (this.props.loading) {
      return (
        <header style={headerStyle}>
          <h1 style={headingStyle}>
            <a
              href="https://reddit.com/r/hardwareswap"
              target="_blank"
              title="Open /r/hardwareswap in a new tab"
              rel="noopener noreferrer"
            >
              /r/hardwareswap
            </a>
            &nbsp;Browser
          </h1>
          <div style={infoBarStyle}>
            Loading...
          </div>
        </header>
      )
    }

    return (
      <header style={headerStyle}>
        <h1 style={headingStyle}>
          <a
            href="https://reddit.com/r/hardwareswap"
            target="_blank"
            title="Open /r/hardwareswap in a new tab"
            rel="noopener noreferrer"
          >
            /r/hardwareswap
          </a>
          &nbsp;Browser
        </h1>
        <div style={infoBarStyle}>
          <Statistic
            number={this.props.loadedPosts}
            label="Loaded Posts"
          />
          <Statistic
            number={this.props.hiddenPosts}
            label="Hidden Posts"
          />
          <Statistic
            number={this.props.savedPosts}
            label="Saved Posts"
          />
          <Statistic
            number={this.props.filteredPosts}
            label="Filtered Posts"
          />
        </div>
      </header>
    )
  }
}

export default withTheme(Header)
