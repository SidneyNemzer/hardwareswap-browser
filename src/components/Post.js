import React, { Component } from 'react'
import PostHeader from './PostHeader'

const postRegex = /\[([^-]+)-?([^\]]*)\]\s?\[H\]([^[\]]+)\[W\]\s?(.+)/

class Post extends Component {
  constructor(props) {
    super(props)
    
    this.parsedTitle = false
    const result = postRegex.exec(this.props.title)
    if (result) {
      this.country = result[1]
      this.usaState = result[2]
      this.have = result[3]
      this.want = result[4]
      this.parsedTitle = true
    }
    
    if (this.parsedTitle) {
      this.state = {
        currentView: 'HAVE',
      }
    } else {
      this.state = {
        currentView: 'FULL_TITLE',
      }
    }
    
    this.handleTitleViewChange = this.handleTitleViewChange.bind(this)
  }
  
  handleTitleViewChange(newTitleView) {
    if (!this.parsedTitle) {
      newTitleView = 'FULL_TITLE'
    }
    this.setState({
      currentView: newTitleView
    })
  }
  
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