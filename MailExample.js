import React, { useState } from 'react'
import ReactDOMServer from  'react-dom/server'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './MailExample.css'


export default (props) => {

    const [contentCopied, setContentCopied] = useState(false)

    const copyContent = () => {
        setContentCopied(true)
        setTimeout(() => setContentCopied(false), 1800)
    }

    let staticContent = ReactDOMServer.renderToStaticMarkup(props.content)
    staticContent = staticContent.replace(/<\s*br(\/)?\s*>/g, '\n')
    staticContent = staticContent.replace(/<\s*(\/)?\s*(div|p)\s*>/g,'\n')
    staticContent = staticContent.replace(/<\/?((?!<).)*>/gm, '')

    return (
        <React.Fragment>
          <div className='example'>
              <span className='actions'>
                  <a href={`mailto:${encodeURI(props.mailto)}?subject=${encodeURI(props.subject)}&body=${encodeURI(staticContent)}`} data-tooltip='Αποστολή E-mail'>
                      <span className='far fa-envelope'></span>
                  </a>
                  <CopyToClipboard text={staticContent} >
                      <button onClick={copyContent} data-tooltip='Αντιγραφή περιεχομένου'><span className="far fa-copy"></span></button>
                  </CopyToClipboard>
              </span>
          <h4 className='mail-subject'>{props.subject}</h4>
          {props.content}
          <div id='copiedNotification' className={`${contentCopied === true ? 'show disappeared' : ''}`}>Copied Content</div>
        </div>
      </React.Fragment>
    )
}
