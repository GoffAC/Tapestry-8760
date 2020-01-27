import React from 'react';
import {Droppable} from 'react-beautiful-dnd';

import Task from './Task';
import DayDisplay from './DayDisplay';

export default class Column extends React.Component {
  constructor (props) {
    super(props);
    //to keep count 
    this.state = {counter:0};
  }

  componentDidMount() {
    document.addEventListener('dropped', this.spottedDrop);
  }

  spottedDrop = (event) => {
    let newTotal = this.state.counter;
    let newState = 0;
    
    if ( event.detail.destinationId === this.props.column.id) {
      //if it is the hours bar don't show a total
      if ( event.detail.destinationId === 'column-1'){ return; };
      
      newTotal = newTotal + event.detail.value;
      newState = {
        ...this.state, counter: newTotal, id: event.detail.destinationId,
      }
      this.setState(newState);
    }
    
    if ( event.detail.sourceId === this.props.column.id ) {

      newTotal -= event.detail.value;
      
      if (newTotal < 0 ){return}
      newState = {
        ...this.state, counter: newTotal, id: event.detail.sourceId,
      }
      this.setState(newState);
    }
    
    return;
  }

  render() {

    const divNameValue = (!this.props.className) ? '': '--'+this.props.className; 
    const colour =  (this.props.colour) ? `${this.props.colour}80` : '' ;
    const {image} = this.props;

    return (
      <div className ={'pot' + divNameValue.toString()} 
        style={{backgroundImage:`url(${image})`,backgroundSize:"cover",backgroundPosition:"center"}}
        >
      <div className="pot-content"  
        style={{backgroundColor:colour}}
        >
        <h3 className='pot__title'>{(this.props.column.title === 'Hours Bar' ? '' : this.props.column.title)} </h3>
        {(this.props.column.title === 'Hours Bar' ?  <DayDisplay /> : '')}
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div className={'pot__space' + divNameValue}
            
              ref={provided.innerRef}
              {...provided.droppableProps} 
              isDraggingOver={snapshot.isDraggingOver}
              >
              {this.props.tasks.map((task, index) => 
                  <Task key={task.id} task={task} index={index} />
              )}
              {provided.placeholder}
          </div> )}
        </Droppable>
      </div>
      </div>
    )
  }
}
