import React from 'react'
import Statistic from './Statistic'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('Header', theme => ({
  header: {
    backgroundColor: theme.palette.primary[500],
    color: 'white',
    padding: 20,
    textAlign: 'center'
  },
  statsBar: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  link: {
    color: theme.palette.accent['A400'],
  },
  what: {
    position: 'absolute',
    right: 10,
    top: 10
  }
}))

const Header = (props) => (
  <header className={props.classes.header}>
    <h1>
      <a
        className={props.classes.link}
        href="https://reddit.com/r/hardwareswap"
        target="_blank"
        title="Open /r/hardwareswap in a new tab"
        rel="noopener noreferrer"
      >
        /r/hardwareswap
      </a>
      &nbsp;Browser
    </h1>
    <div className={props.classes.statsBar}>
      <Statistic
        number={props.loadedPosts}
        label="Loaded Posts"
      />
      <Statistic
        number={props.savedPosts}
        label="Saved Posts"
      />
      <Statistic
        number={props.hiddenPosts}
        label="Hidden Posts"
      />
      <a
        className={
          props.classes.link + ' ' +
          props.classes.what
        }
        href="https://github.com/SidneyNemzer/hardwareswap-browser#readme"
        target="_blank"
        rel="noopener noreferrer"
      >
        What's this?
      </a>
    </div>
  </header>
)

export default withStyles(styleSheet)(Header)
