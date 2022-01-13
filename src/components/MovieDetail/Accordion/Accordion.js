import React, {useState} from 'react';
import './Accordion.css';

import {isValidHttpUrl, readableNum} from '../../../Utils';


const Accordion = (props) =>{
  const [isActive, setIsActive] = useState(false);

  const renderList = () =>{
    return props.content.map((item) =>{
      return <li> {item.english_name} </li>
    })
  }

const renderContent = () => {
  if (Array.isArray(props.content)) {
    return <ul> {renderList()} </ul>
  }
  if (isValidHttpUrl(props.content)) {
    return <a href={props.content}> {props.content} </a>
  }
  if (props.title === "Budget" || props.title === "Revenue" ) {
    return <div> {readableNum(props.content)} </div>
  }
  return <> {props.content} </>
}

  return (
      <div className = "accordion-item">
        <div className = "accordion-title" onClick={() => setIsActive(!isActive)}>
          <div> {props.title} </div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div className="accordion-content">{renderContent()}</div>}
      </div>

  )
}

export default Accordion;
