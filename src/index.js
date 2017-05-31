/* global fetch */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

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
  <App 
    fetchPosts={fetchPosts}
  />, 
  document.getElementById('root')
)
registerServiceWorker()
