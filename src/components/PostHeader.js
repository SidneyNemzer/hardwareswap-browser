import React from 'react'

export default function PostHeader(props) {
  const buttonAttributes = {
    have: {
      onClick: () => props.onTitleViewChange('HAVE')
    },
    want: {
      onClick: () => props.onTitleViewChange('WANT')
    },
    fullTitle: {
      onClick: () => props.onTitleViewChange('FULL_TITLE')
    }
  }
  
  switch (props.titleView) {
    case 'HAVE':
      buttonAttributes.have.className = 'selected'
      break
      
    case 'WANT':
      buttonAttributes.want.className = 'selected'
      break
      
    default:
      buttonAttributes.fullTitle.className = 'selected'
  }
  
  if (!props.allowHaveWant) {
    return (
      <header>
        <div className="info">
          <span className="username">
            <a 
              href={'https://reddit.com/u/' + props.author}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'/u/' + props.author}
            </a>
          </span>
  
          <span 
            className="location center"
            style={{
              fontStyle: 'italic',
              cursor: 'help'
            }}
            title="The title doesn't appear to be in the format [Location] [H] Item [W] Item"
          >
            Couldn't parse title
          </span>
  
          <span className="open-reddit right">
            <a 
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open this post on reddit in a new tab"
            >
              Open in reddit 
              <img 
                style={{width: 20}}
                src="https://maxcdn.icons8.com/Share/icon/Very_Basic//external_link1600.png"
                alt="external link"
              />
            </a>
          </span>
        </div>
      </header>
    )
  }
  
  return (
    <header>
      <div className="info">
        <span className="username">
          <a 
            href={'https://reddit.com/u/' + props.author}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'/u/' + props.author}
          </a>
        </span>

        <span 
          className="location center"
          style={props.location === 'Unknown' ? {fontStyle: 'italic'} : {}}
        >
          {props.location}
        </span>

        <span className="open-reddit right">
          <a 
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open this post on reddit in a new tab"
          >
            Open in reddit 
            <img 
              style={{width: 20}}
              src="https://maxcdn.icons8.com/Share/icon/Very_Basic//external_link1600.png"
              alt="external link"
            />
          </a>
        </span>
      </div>
      
      <div className="view-options">
        <button 
          {...buttonAttributes.fullTitle}
        >
          Full Title
        </button>
        
        <button 
          {...buttonAttributes.have}
        >
          Have
        </button>
        
        <button 
          {...buttonAttributes.want}
        >
          Want
        </button>
      </div>
    </header>
  )
}