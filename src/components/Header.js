import React, { Component } from 'react'

class Header extends Component {
  render() {
    if (this.props.loading) {
      return (
        <header className='top'>
          <h1>
            <a 
              href="https://reddit.com/r/hardwareswap" 
              target="_blank" 
              title="Open /r/hardwareswap in a new tab"
              rel="noopener noreferrer"
            >
              /r/hardwareswap&nbsp;
            </a>
            Browser
          </h1>
          <div className="info">
            Loading...
          </div>
          <input
            className="search"
            placeholder="search..."
            disabled
          />
        </header>
      )  
    }
    
    return (
      <header className='top'>
        <h1>
          <a 
            href="https://reddit.com/r/hardwareswap" 
            target="_blank" 
            title="Open /r/hardwareswap in a new tab"
            rel="noopener noreferrer"
          >
            /r/hardwareswap&nbsp;
          </a> 
          Browser
        </h1>
        <div className="info">
          <span className="loaded-posts">
            Loaded Posts: {this.props.loadedPosts}
          </span>
          <span className="hidden-posts">
            Hidden Posts:&nbsp;
            <span className="data">
              {this.props.hiddenPosts.manual + this.props.hiddenPosts.filtered}
            </span>
            &nbsp;
            <span className="details">
              (
              <span 
                className="data"
                style={{
                  cursor: 'pointer'
                }}
                title="Click to reset hidden posts"
                onClick={this.props.handleHiddenReset}
              >
                {this.props.hiddenPosts.manual} manual
              </span>
              ,&nbsp;
              <span className="data">
                {this.props.hiddenPosts.filtered} filtered
              </span>
              )
            </span>
          </span>
        </div>
        <input
          className="search"
          placeholder="search..."
          onInput={this.props.handleSearch}
        />
      </header>
    )
  }
}

export default Header