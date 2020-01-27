import React from 'react';

import {formatDate} from "./utils/datePickerConversion.js"


export default class DayDisplay extends React.Component {
   
    componentDidMount(){
        const dayToBeCompleted = new Date();
        const dateInUI = document.querySelector('input[type="date"]');
        dateInUI.value=formatDate(dayToBeCompleted);
    }

    render() {
        return (
            <input type="date" class="datePicker" min="2020-01-01" max="2100-01-01"></input>

        )
    }
}