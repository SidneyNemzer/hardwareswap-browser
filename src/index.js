/* global fetch */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiThemeProvider } from 'material-ui/styles'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './index.css'

injectTapEventPlugin()

function fetchPosts() {
  return new Promise((resolve, reject) => {
  fetch('https://www.reddit.com/r/hardwareswap/new.json?sort=new&limit=100')
    .then(response => response.json())
    .then(data => {
      const posts = data.data.children.map(post => {
        return {
          url: post.data.url,
          title: post.data.title,
          id: post.data.id,
          author: post.data.author
        }
      })

      resolve(posts)
    })
  })
}

ReactDOM.render(
  <MuiThemeProvider>
    <App
      fetchPosts={fetchPosts}
    />
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
