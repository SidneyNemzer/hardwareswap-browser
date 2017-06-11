import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import PostHeader from './PostHeader'
import Button from 'material-ui/Button'

// Convert a Date to the format "10 seconds ago"
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000)
  var interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + " years"
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + " months"
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + " days"
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + " hours"
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + " minutes"
  }
  return Math.floor(seconds) + " seconds"
}

const styleSheet = createStyleSheet('Post', theme => ({
  paper: {
    maxWidth: 700,
    margin: '40px auto 0'
  },
  spread: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,

    '& span': {
      fontSize: 25,
      maxWidth: '46%'
    }
  },
  large: {
    fontSize: 25
  },
  failed: {
    textAlign: 'center',
    marginBottom: 15,
  },
  main: {
    padding: '0 20px',
    marginBottom: 15
  },
  rightAlign: {
    textAlign: 'right'
  },
  posterInfo: {
    textAlign: 'center'
  },
  footer: {
    padding: '5px 20px'
  },
  button: {
    padding: 5
  },
  link: {
    textDecoration: 'none'
  }
}))

const Post = (props) => {
  let title

  if (props.parsed.success) {
    title = (
      <div className={props.classes.spread}>
        <span>
          {props.parsed.have}
        </span>
        <span className={props.classes.rightAlign}>
          {props.parsed.want}
        </span>
      </div>
    )
  } else {
    title = (
      <div
        className={
          props.classes.failed + ' ' +
          props.classes.large
        }
      >
        {props.title}
      </div>
    )
  }

  return (
    <Paper className={props.classes.paper}>
      <PostHeader
        parsedTitle={props.parsed.success}
        _state={props.parsed.usaState}
        country={props.parsed.country}
      />
      <main className={props.classes.main}>
        {title}
        <div className={props.classes.posterInfo}>
          <a
            className={props.classes.link}
            href={"https://reddit.com/u/" + props.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"/u/" + props.author}
          </a>
          {" posted " + timeSince(props.createdUtc * 1000) + " ago"}
        </div>
      </main>
      <footer className={props.classes.footer}>
        <Button
          className={props.classes.button}
          primary
          compact
          onClick={() => window.open(props.url, '_blank')}
        >
          Open on Reddit
        </Button>
        <Button
          compact
          className={props.classes.button}
          onClick={() => props.setPostHidden(true)}
          disabled={props.isHidden}
        >
          Hide
        </Button>
        <Button
          compact
          className={props.classes.button}
          onClick={() => props.setPostSaved(!props.isSaved)}
        >
          {props.isSaved ? "Unsave" : "Save"}
        </Button>
      </footer>
    </Paper>
  )
}

export default withStyles(styleSheet)(Post)
