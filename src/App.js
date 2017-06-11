import React, { Component } from 'react'
import Header from './components/Header'
import Post from './components/Post'
import Tabs, { Tab } from 'material-ui/Tabs'
import EmptyInfo from './components/EmptyInfo'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const styleSheet = createStyleSheet('App', theme => ({
  tabs: {
    backgroundColor: theme.palette.primary[500]
  },
  centerContent: {
    textAlign: 'center'
  },
  search: {
    maxWidth: 500,
    margin: 'auto'
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
      searchInput: '',
      filter: null,
      tab: 0
    }

    this.searchTimer = null
    this.updateFilter = () => {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.setState(previousState => {
          previousState.filter = previousState.searchInput

          return previousState
        })
      }, 1000)
    }

    this.setPostHidden = this.setPostHidden.bind(this)
    this.handleHiddenReset = this.handleHiddenReset.bind(this)
    this.setPostSaved = this.setPostSaved.bind(this)
    this.handleSearchInput = this.handleSearchInput.bind(this)
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

  handleSearchInput(event) {
    this.setState({
      searchInput: event.target.value
    })

    this.updateFilter()
  }

  // Returns a new array of Posts, after removing hidden and filtered posts
  applyFilter(posts) {
    // Simple matching function, for filtering
    function matchesSearch(text, search) {
      return text.toLowerCase().includes(search.toLowerCase())
    }

    const { hiddenPosts, filter } = this.state

    const filteredPosts = posts.filter(post => {
      if (hiddenPosts[post.id]) {
        return false
      } else if (filter && !matchesSearch(post.title, filter)) {
        return false
      }
      return true
    })

    return filteredPosts
  }

  renderPosts(posts) {
    const { savedPosts, hiddenPosts } = this.state

    return posts.map(post => (
      <Post
        key={post.id}
        setPostHidden={setHiddenTo => this.setPostHidden(post.id, setHiddenTo)}
        setPostSaved={setSavedTo => this.setPostSaved(post.id, setSavedTo, post)}
        isSaved={!!savedPosts[post.id]}
        isHidden={!!hiddenPosts[post.id]}
        {...post}
      />
    ))
  }

  renderMain() {
    const { classes } = this.props
    const { savedPosts, hiddenPosts } = this.state

    switch (this.state.tab) {
      case 0:
        const posts = this.renderPosts(this.applyFilter(this.state.posts))

        return (
          <main style={{padding: 1}}>
            <TextField
              label="Search"
              type="text"
              helperText={this.state.filter ? posts.length + ' result' + (posts.length === 1 ? '' : 's') : undefined}
              onInput={this.handleSearchInput}
              value={this.state.searchInput}
              className={classes.search}
            />
            {posts}
          </main>
        )
      case 1:
        if (Object.keys(savedPosts).length === 0) {
          return (
            <main style={{padding: 1}} className={classes.centerContent}>
              <EmptyInfo line1="You haven't saved any posts yet" />
            </main>
          )
        }
        return (
          <main style={{padding: 1}}>
            {this.renderPosts(Object.keys(savedPosts).map(postId => savedPosts[postId]))}
          </main>
        )
      case 2:
        const numHiddenPosts = Object.keys(hiddenPosts).length
        if (numHiddenPosts === 0) {
          return (
            <main style={{padding: 1}} className={classes.centerContent}>
              <EmptyInfo line1="You haven't hidden any posts yet" />
            </main>
          )
        }
        const line1 = "You've hidden " + numHiddenPosts + " post" + (numHiddenPosts === 1 ? '' : 's')
        return (
          <main style={{padding: 1}} className={classes.centerContent}>
            <EmptyInfo
              line1={line1}
            />
            <Button
              raised
              primary
              onClick={this.handleHiddenReset}
            >
              Reset
            </Button>
          </main>
        )
      default:
        throw new Error('Unknown tab state')
    }
  }

  render() {
    const { classes } = this.props

    if (this.state.loading) {
      return (
        <div>
          <Header
            loadedPosts={0}
            hiddenPosts={0}
            savedPosts={0}
          />
          <Tabs
            className={classes.tabs}
            onChange={() => {}}
            textColor="white"
            index={this.state.tab}
            centered
            disabled
          >
            <Tab label="Recent" />
            <Tab label="Saved" />
            <Tab label="Hidden" />
          </Tabs>
          <main>
            <EmptyInfo line1="Loading..." />
          </main>
        </div>
      )
    }

    const { posts, hiddenPosts, savedPosts } = this.state

    return (
      <div>
        <Header
          loadedPosts={posts.length}
          hiddenPosts={Object.keys(hiddenPosts).length}
          savedPosts={Object.keys(savedPosts).length}
        />
        <Tabs
          className={classes.tabs}
          textColor="white"
          index={this.state.tab}
          onChange={(event, index) => this.setState({tab: index})}
          centered
        >
          <Tab label="Recent" />
          <Tab label="Saved" />
          <Tab label="Hidden" />
        </Tabs>
        {this.renderMain()}
      </div>
    )
  }
}

export default withStyles(styleSheet)(App)
