import { createPortal }from 'react-dom'

import {Component} from 'react';
import './Modal.css';

const modalRoot = document.getElementById( 'modal' );

class Modal extends Component {
  constructor(props){
    super(props)
    this.element = document.createElement('div');
    this.element.className = "modal"
  }

  componentDidMount() {
     modalRoot.appendChild( this.element );
  }

  componentWillUnmount() {
      modalRoot.removeChild( this.element );
   }

   render() {
      return createPortal(this.props.children, this.element );
   }
}


export default Modal;
