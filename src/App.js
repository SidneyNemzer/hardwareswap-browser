import React, { Component } from 'react'
import Header from './components/Header'
import Post from './components/Post'
import CollapsedPosts from './components/CollapsedPosts'
import { withTheme } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import EmptyInfo from './components/EmptyInfo'

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
      if (setHiddenTo === true) {
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
      let visibility = {
        visible: true,
        reason: null
      }

      if (hiddenPosts[post.id]) {
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
          setPostHidden={setHiddenTo => this.setPostHidden(post.id, setHiddenTo)}
          setPostSaved={setSavedTo => this.setPostSaved(post.id, setSavedTo, post)}
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

    // Build main content based on the selected tab
    let mainContent
    switch (this.state.tab) {
      case 0:
        mainContent = groupedElements
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
      <div>
        <Header
          loadedPosts={posts.length}
          hiddenPosts={Object.keys(hiddenPosts).length}
          filteredPosts={filteredOut}
          savedPosts={Object.keys(savedPosts).length}
        />
        <Tabs
          style={{
            backgroundColor: this.props.theme.palette.primary[500]
          }}
          textColor="white"
          index={this.state.tab}
          onChange={(event, index) => this.setState({tab: index})}
          centered
        >
          <Tab label="Recent" />
          <Tab label="Saved" />
          <Tab label="Hidden" />
        </Tabs>
        <main style={{
          backgroundColor: this.props.theme.palette.grey[200],
          padding: 1
        }}>
          {mainContent}
        </main>
      </div>
    )
  }
}

export default withTheme(App)
