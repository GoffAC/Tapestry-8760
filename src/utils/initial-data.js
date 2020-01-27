const initialData = {
    tasks: {
        // 'halfHour': { id: 'halfHour', content: 'Half', value:0.5}, not using as will need to change google sheets
        'oneHour': { id: 'oneHour', content: 'An hour', value:1},
        'twoHour': { id: 'twoHour', content: '2 hours', value:2},
        'threeHour': { id: 'threeHour', content: '3 hours', value:3},
        'fourHour': { id: 'fourHour', content: '4 hours', value:4},
        'sixHour': { id: 'sixHour', content: '6 hours', value:6},
        'eightHour': { id: 'eightHour', content: '8 hours', value:8},
  
    },
    columns: {
        'column-1': {id:'column-1', colour: '', title: 'Hours Bar', taskIds: [ 'oneHour', 'twoHour', 'threeHour', 'fourHour','sixHour','eightHour']},
        'column-2': {id:'column-2', colour: '#0E1428', image:'sleep.png', title: 'Sleep', taskIds: []},
        'column-3': {id:'column-3', colour: '#7D7E75', image:'work-for-me.png', title: 'Work for Me', taskIds: []},
        'column-4': {id:'column-4', colour: '#454545', image:'other-work.png', title: 'Other Work', taskIds: []},
        'column-5': {id:'column-5', colour: '#934B00', image:'travel.png', title: 'Travel', taskIds: []},
        'column-6': {id:'column-6', colour: '#bb30cc', image:'emma.png', title: 'Emma', taskIds: []},
        'column-7': {id:'column-7', colour: '#4416d0', image:'triathlon.png', title: 'Triathlon', taskIds: []},
        'column-8': {id:'column-8', colour: '#ff0000', dontColour: true, image:'youtube.png', title: 'Youtube', taskIds: []},
        'column-9': {id:'column-9', colour: '#ff4301', dontColour:true, image:'reddit.png', title: 'Reddit', taskIds: []},
        'column-10': {id:'column-10', colour: '#4D9DE0', image:'buddies.png', title: 'Buddies', taskIds: []},
        'column-11': {id:'column-11', colour: '#00FFFF', image:'no-idea.png', title: 'No Idea', taskIds: []},
        'column-16': {id:'column-16', colour: '#F78154', image:'family.png', title: 'Family', taskIds: []},
        'column-15': {id:'column-15', colour: '#F3CA40', image:'admin.png', title: 'Admin', taskIds: []},
        'column-12': {id:'column-12', colour: '#38A700', image:'coding.png', title: 'Coding', taskIds: []},
        'column-13': {id:'column-13', colour: '#5DFDCB', image:'korean.png', title: 'Korean', taskIds: []},
        'column-14': {id:'column-14', colour: '#31D843', image:'learning.png', title: 'Learning', taskIds: []},
        'column-17': {id:'column-17', colour: '#285238', image:'ML.png', title: 'ML', taskIds: []},
    },
    columnOrder: ['column-1', 'column-2', 'column-3','column-4', 'column-5', 'column-6','column-7', 'column-8', 'column-9','column-10', 'column-11', 'column-12','column-13', 'column-14', 'column-15','column-16', 'column-17',]
}

export default initialData;