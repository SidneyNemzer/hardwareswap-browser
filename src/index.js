/* global fetch */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiThemeProvider } from 'material-ui/styles'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './index.css'

injectTapEventPlugin()

const postRegex = /\[([^-]+)-?([^\]]*)\]\s?\[H\]([^[\]]+)\[W\]\s?(.+)/

function fetchPosts() {
  return new Promise((resolve, reject) => {
  fetch('https://www.reddit.com/r/hardwareswap/new.json?sort=new&limit=100')
    .then(response => response.json())
    .then(data => {
      const posts = data.data.children.map(post => {
        const { url, title, id, author, created_utc, link_flair_css_class } = post.data
        const decodedTitle = title.replace(/&amp;/g, '&')

        const parsed = {
          success: false
        }
        const result = postRegex.exec(decodedTitle)
        if (result) {
          parsed.success = true
          parsed.country = result[1]
          parsed.usaState = result[2]
          parsed.have = result[3]
          parsed.want = result[4]
        }

        return {
          url,
          title: decodedTitle,
          parsed,
          id,
          author,
          createdUtc: created_utc,
          flair: link_flair_css_class
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
