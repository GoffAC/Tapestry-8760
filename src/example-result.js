const result = {
    draggableId: 'what was dragged',
    type: 'TYPE',
    reason: 'DROP', //or 'CANCEL'
    source: {
        droppableId: 'column-1', //where ya come from
        index: 0, //what order it was
    },
    destination: {
        droppableId: 'column-2', //where did ya go
        index: 1, //where in the order you are now
    } ,
}