import React, {useState} from 'react';
import './Accordion.css';


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
