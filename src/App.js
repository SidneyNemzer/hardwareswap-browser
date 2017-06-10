import React, { Component } from 'react'
import Header from './components/Header'
import Post from './components/Post'
import Tabs, { Tab } from 'material-ui/Tabs'
import EmptyInfo from './components/EmptyInfo'
import { withStyles, createStyleSheet } from 'material-ui/styles'

const styleSheet = createStyleSheet('App', theme => ({
  body: {
    backgroundColor: theme.palette.grey[200]
  },
  tabs: {
    backgroundColor: theme.palette.primary[500]
  }
}))

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      hiddenPosts: {},
      savedPosts: {},
      loading: true,
      error: null,
      filter: null,
      tab: 0
    }

    this.setPostHidden = this.setPostHidden.bind(this)
    this.handleHiddenReset = this.handleHiddenReset.bind(this)
    this.setPostSaved = this.setPostSaved.bind(this)
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

  handleHiddenReset() {
    this.setState({
      hiddenPosts: {}
    })
  }

  setPostHidden(id, setHiddenTo) {
    this.setState(previousState => {
      if (setHiddenTo) {
        previousState.hiddenPosts[id] = true
      } else {
        delete previousState.hiddenPosts[id]
      }

      return previousState
    })
  }

  setPostSaved(id, setSavedTo, post) {
    this.setState(previousState => {
      if (setSavedTo) {
        previousState.savedPosts[id] = post
      } else {
        delete previousState.savedPosts[id]
      }

      return previousState
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
          <main>
            <EmptyInfo line1="Loading..." />
          </main>
        </div>
      )
    }

    const { posts, hiddenPosts, filter, savedPosts } = this.state

    // Simple matching function, for filtering
    function matchesSearch(text, search) {
      return text.toLowerCase().includes(search.toLowerCase())
    }

    // Turn post objects into post elements
    let filteredOut = 0
    const postElements = posts.map(post => {
      if (hiddenPosts[post.id]) {
        return undefined
      } else if (filter && !matchesSearch(post.title, filter)) {
        filteredOut++
        return undefined
      }

      return (
        <Post
          key={post.id}
          setPostHidden={setHiddenTo => this.setPostHidden(post.id, setHiddenTo)}
          setPostSaved={setSavedTo => this.setPostSaved(post.id, setSavedTo, post)}
          {...post}
        />
      )
    })

    // Build main content based on the selected tab
    let mainContent
    switch (this.state.tab) {
      case 0:
        mainContent = postElements
        break
      case 1:
        mainContent = (
          <EmptyInfo line1="You haven't saved any posts yet" />
        )
        break
      case 2:
        mainContent = (
          <EmptyInfo line1="You haven't hidden any posts yet" />
        )
        break
      default:
        throw new Error('Unknown tab state')
    }

    return (
      <div className={this.props.classes.body}>
        <Header
          loadedPosts={posts.length}
          hiddenPosts={Object.keys(hiddenPosts).length}
          filteredPosts={filteredOut}
          savedPosts={Object.keys(savedPosts).length}
        />
        <Tabs
          className={this.props.classes.tabs}
          textColor="white"
          index={this.state.tab}
          onChange={(event, index) => this.setState({tab: index})}
          centered
        >
          <Tab label="Recent" />
          <Tab label="Saved" />
          <Tab label="Hidden" />
        </Tabs>
        <main style={{padding: 1}}>
          {mainContent}
        </main>
      </div>
    )
  }
}

export default withStyles(styleSheet)(App)
