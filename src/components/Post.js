import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import PostHEader from './PostHeader'

const Post = (props) => {
  return (
    <Paper>
      <PostHeader
        parsedTitle={props.parsed.success}
        state={props.usaState}
        country={props.country}
      />
      <main>

      </main>
      <footer>

      </footer>
    </Paper>
  )
}

class Post extends Component {
  render() {
    const { title, author, url, visibility } = this.props

    if (!visibility.visible) {
      if (visibility.reason === 'manual') {
        return (
          <section
            className="post collapsed openable"
            onClick={() => this.props.setPostHidden(false)}
          >
            <footer>
              This post was manually hidden -&nbsp;
              <span className="show">
                show
              </span>
              ?
            </footer>
          </section>
        )
      } else {
        return (
          <section
            className="post collapsed"
          >
            <footer>
              This post was hidden by your search filter
            </footer>
          </section>
        )
      }
    }

    // Build location string
    let location = ''
    if (this.parsedTitle) {
      if (this.usaState) {
        location += this.usaState + ', '
      }
      location += this.country
    }

    // Render the selected title
    let curTitle
    switch (this.state.currentView) {
      case 'HAVE':
        curTitle = this.have
        break

      case 'WANT':
        curTitle = this.want
        break

      default:
        curTitle = title
    }

    return (
      <section className="post">
        <PostHeader
          author={author}
          location={location}
          url={url}
          titleView={this.state.currentView}
          onTitleViewChange={this.handleTitleViewChange}
          allowHaveWant={this.parsedTitle}
        />

        <main>
          <h1>
            {curTitle}
          </h1>
        </main>

        <footer>
          <button
            className="hide"
            onClick={() => this.props.setPostHidden(true)}
          >
            Hide
          </button>
        </footer>
      </section>
    )
  }
}

export default Post
