import React, { Component } from 'react'
import Header from './components/Header'
import Post from './components/Post'
import CollapsedPosts from './components/CollapsedPosts'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Tabs, Tab } from 'material-ui/Tabs'

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      hidden: {},
      savedPosts: {},
      loading: true,
      error: null,
      filter: null
    }
    
    this.handlePostHidden = this.handlePostHidden.bind(this)
    this.handleHiddenReset = this.handleHiddenReset.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  
  componentDidMount() {
    this.props.fetchPosts()
      .then(posts => {
        this.setState({
          posts: posts,
          loading: false
        })
      })
  }
  
  handlePostHidden(id, setHiddenTo) {
    this.setState(previousState => {
      if (setHiddenTo === true) {
        previousState.hidden[id] = true  
      } else {
        delete previousState.hidden[id]
      }
      
      
      return previousState
    })
  }
  
  handleHiddenReset() {
    this.setState({
      hidden: {}
    })
  }
  
  handleSearch(event) {
    const newValue = event.target.value
    
    this.setState({
      filter: newValue !== '' ? newValue : null
    })
  }
  
  render() {
    
    if (this.state.loading) {
      return (
        <div>
          <Header
            loading={true}
          />
          <main className='top'>
            <div className='loading'>
              Fetching posts...
            </div>
          </main>
        </div>
      )
    }
    
    const { posts, hidden, filter, savedPosts } = this.state
    
    // Simple matching function, for filtering
    function matchesSearch(text, search) {
      return text.toLowerCase().includes(search.toLowerCase())
    }
    
    // Turn post objects into post elements
    let filteredOut = 0
    const postElements = posts.map(post => {
      let visibility = {
        visible: true,
        reason: null
      }
      
      if (hidden[post.id]) {
        visibility.visible = false
        visibility.reason = 'manual'
      } else if (filter && !matchesSearch(post.title, filter)) {
        visibility.visible = false
        visibility.reason = 'filtered'
        filteredOut++
      }
      
      return (
        <Post
          visibility={visibility}
          key={post.id}
          setPostHidden={setHiddenTo => this.handlePostHidden(post.id, setHiddenTo)}
          {...post}
        />
      )
    })
    
    // Group hidden posts
    const groupedElements = []
    let currentPostGroup = []
    
    function pushPostGroup() {
      if (currentPostGroup.length === 1) {
        groupedElements.push(currentPostGroup[0])
        
        currentPostGroup = []
      } else if (currentPostGroup.length > 0) {
        groupedElements.push(
          <CollapsedPosts key={currentPostGroup.reduce((accumulator, post) => accumulator + post.id, '')}>
            {currentPostGroup}
          </CollapsedPosts>
        )
        
        currentPostGroup = []
      }
    }
    
    postElements.forEach((post, index) => {
      if (!post.props.visibility.visible) {
        currentPostGroup.push(post)
      } else {
        // This post is visible, end the group (if there is one)
        pushPostGroup()
        
        groupedElements.push(post)
      }
      
      if (index === postElements.length - 1) {
        pushPostGroup()
      }
    })
    
    const pageStyle = {
      backgroundColor: this.props.muiTheme.palette.canvasColor
    }

    return (
      <div>
        <Header
          loadedPosts={posts.length}
          hiddenPosts={Object.keys(hidden).length}
          filteredPosts={filteredOut}
          savedPosts={Object.keys(savedPosts).length}
        />
        <Tabs
          tabItemContainerStyle={{
            width: 700
          }}
          style={{
            backgroundColor: this.props.muiTheme.palette.primary1Color
          }}
        >
          <Tab label="All">
            <main style={pageStyle}>
              {groupedElements}
            </main>
          </Tab>
          <Tab label="Saved">
            You haven't saved any posts yet!
          </Tab>
          <Tab label="Hidden">
            You haven't hidden any posts yet!
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default muiThemeable()(App)
