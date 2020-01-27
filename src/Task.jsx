import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


export default class Task extends React.Component {
    
    render() {
        return (
            <Draggable 
              
              draggableId={this.props.task.id} 
              index={this.props.index}
              >
                {(provided, snapshot) => (
                <div className="pot__task"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps} 
                isDragging={snapshot.isDragging}
                >
                    {this.props.task.content} 
                </div>
                )}
            </Draggable>
        )
    }
}