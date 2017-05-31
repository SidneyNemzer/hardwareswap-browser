import React, { Component } from 'react'

class CollapsedPosts extends Component {
  constructor() {
    super()
    
    this.state = {
      collapsed: true
    }
  }
  
  render() {
    if (this.state.collapsed) {
      return (
        <section
          className="post-group"
          onClick={() => this.setState({collapsed: false})}
          style={{
            cursor: 'pointer'
          }}
        >
          {this.props.children.length + ' hidden posts - reveal'}
        </section>
      )
    }
    
    
    
    return (
      <section 
        className="post-group"
        style={{
          borderLeft: '2px solid black'
        }}
      >
        <span
          onClick={() => this.setState({collapsed: true})}
          style={{
            cursor: 'pointer'
          }}
        >
          Collapsed Group - hide?
        </span>
        {this.props.children}
      </section>
    )
  }
}

export default CollapsedPosts