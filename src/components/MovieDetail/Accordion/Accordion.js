import React, {useState} from 'react';
import './Accordion.css';


const Accordion = (props) =>{
  const [isActive, setIsActive] = useState(false);

  function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
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
