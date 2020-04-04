import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import rp from "request-promise";

import ProgressBar from './ProgressBar';
import Column from './Column.jsx';
import ResetButton from './ResetButton.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getDataFromAPI() {
        const options = { 
            method: 'GET',
            url: process.env.REACT_APP_SHEETY_API_URL+"/pots",
            headers: {
            Authorization: process.env.REACT_APP_SHEETY_AUTH,
           'Content-Type': 'application/json' 
            },
            json: true 
          };

        const data = rp(options, function (error, response, body) {
            if (error) throw new Error(error);
            return body
        })

        return data
    }

    transformInitialData(data) {
        //from the api
        // {'pots': [{'id':1,'title':'title','totalHours':0,'colour':'#hex'}]}
        //target
        // {tasks:{'onehour':{'id':'oneHour','content':'An hour', 'value':1}, ...}, 
        //   columns:{'column-1':{id:'column-1', colour: '', title: 'Hours Bar', taskIds: []}, ...} }

        const output = {
            tasks: {       
                // 'halfHour': { id: 'halfHour', content: 'Half', value:0.5}, not using as will need to change google sheets
                'oneHour': { id: 'oneHour', content: 'An hour', value:1},
                'twoHour': { id: 'twoHour', content: '2 hours', value:2},
                'threeHour': { id: 'threeHour', content: '3 hours', value:3},
                'fourHour': { id: 'fourHour', content: '4 hours', value:4},
                'sixHour': { id: 'sixHour', content: '6 hours', value:6},
                'eightHour': { id: 'eightHour', content: '8 hours', value:8},
            }, 
            columns: { 'column-1': {id:'column-1', colour: '', title: 'Hours Bar', taskIds: [ 'oneHour', 'twoHour', 'threeHour', 'fourHour','sixHour','eightHour']}
            },
            columnOrder:[]
        };

        data.pots.forEach((pot, index) => {
            const adjustedID = index +2;
            let potRecordID = 'column-'+adjustedID;
            pot.id = 'column-'+pot.id;
            pot.taskIds = [];

            output.columnOrder.push(pot.id);
            output.columns[potRecordID] = pot;
        });
        return  output
    }

    componentDidMount = async () => {
        const potsSummary = await this.getDataFromAPI();
        const initialData = this.transformInitialData(potsSummary)
        this.setState(initialData);
    }


    onDragEnd = (result) => {
        //we can see the contents of result in example-result.js
        const { source, destination, draggableId } = result;

        //if a task doesn't land on anything, do nothing
        if (!destination) { return }

        //Find where the task was picked up from and landed
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        //if the net movement is the same do nothing
        if (start === finish) { return }

        //if valid dragging and dropping throw an event which is spotted in Column.jsx and ProgressBar.jsx
        let moveEvent = new CustomEvent('dropped', {
            detail: {
                value: this.state.tasks[draggableId].value,
                destinationId: destination.droppableId,
                sourceId: source.droppableId
            }
        });
        document.dispatchEvent(moveEvent)
        return;
    }
    render() {
        if (!this.state.tasks || !this.state.columnOrder || !this.state.columns) {
            return null;
        }

        return (
            <div className='main'>
                <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                    <div className='header'>
                        <Column className="bar" key={this.state.columns['column-1']} column={this.state.columns['column-1']} tasks={this.state.columns['column-1'].taskIds.map(taskId => this.state.tasks[taskId])} />
                        <ResetButton/>
                    </div>
                        <div className='pot-container'>
                            {this.state.columnOrder.map(columnId => {
                                const column = this.state.columns[columnId];
                                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                                if (columnId === "column-1") { return null; }
                                return <Column key={column.id} column={column} tasks={tasks} colour={this.state.columns[columnId].colour} image={this.state.columns[columnId].image}/>;
                            })
                            }
                        </div>
                </DragDropContext>
                <ProgressBar initialData={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(< App />, document.getElementById('root'));