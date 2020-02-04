import React from "react";
import rp from "request-promise";
import {incrementAndFormatDate} from "./utils/datePickerConversion.js"

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, records: [], ledger: [], date:""};
  }

  componentDidMount() {
    document.addEventListener("dropped", this.spottedDrop);

    var dateInUI = document.querySelector('input[type="date"]');
    const newState = { ...this.state };
    newState.date = dateInUI.value;
    this.setState(newState);
  };

  getDbRowFromDate() {
    var dateInUI = document.querySelector('input[type="date"]');
    const dateObject = new Date(dateInUI.value);

    const isLeapYear = function() {
      var year = dateObject.getFullYear();
      if((year & 3) !== 0) return false;
      return ((year % 100) !== 0 || (year % 400) === 0);
    };

    const getDOY = function() {
        var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        var mn = dateObject.getMonth();
        var dn = dateObject.getDate();
        var dayOfYear = dayCount[mn] + dn;
        if(mn > 1 && isLeapYear()) dayOfYear++;
        return dayOfYear;
    };

    //add that day value (plus one) to the url
    const targetLineInDB = 1 + getDOY();

    return targetLineInDB;
  }

  convertRecordsIntoSchema(records) {
    const numbersArray = ['zero', 'one','two','three','four','five','six', 'seven','eight','nine','ten','eleven','twelve', 'thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twentyone','twentytwo','twentythree']; //etc

    //example records [{num:8, name: "Travel", colour: '#aaeeff},{...}]
    let output = {}
    let j = 0; //counting through numbersarray
    records.forEach((record) => {
      for (let i = 0; i < record.num; i++) {
        output[numbersArray[j]] =  record.name;
        j++;
      }
    });
    return output
    //example output {zero: 'Travel',one:'Travel',...}
  }

  postDataToAPI(records) {
    const targetLineInDB = this.getDbRowFromDate();
    const payload = this.convertRecordsIntoSchema(records)

    var options = { 
      method: 'PUT',
      url: process.env.REACT_APP_SHEETY_API_URL+"records/"+targetLineInDB,
      headers: {
      Authorization: process.env.REACT_APP_SHEETY_AUTH,
     'Content-Type': 'application/json' 
      },
      body: {
        record: payload
      },
      json: true 
    };

    rp(options, function (error, response, body) {
      if (error) throw new Error(error);
    })
  };

  spottedDrop = event => {
    const column = event.detail.destinationId;
    const category = this.props.initialData.columns[column].title;
    const colour = this.props.initialData.columns[column].colour;
    const value = event.detail.value;
    const newState = { ...this.state };
    
    //if the added will go over a day break into two records
    if (newState.total + value > 24) {

      //split the block into the datasets
      const remainder = newState.total + value - 24;
      const split = value - remainder;
      
      //split the records for convience and then send 
      newState.records.push({ num: split, name: category, colour: colour });
      this.postDataToAPI(newState.records)

      //empty the daily record and add the remaining hours
      newState.records = [];
      newState.records.push({ num: remainder, name: category, colour: colour });
      newState.total += value - 24;

      //also autoincrement the state.date for the next api call 
      newState.date=incrementAndFormatDate(newState.date);
      //and update the UI
      var dateInUI = document.querySelector('input[type="date"]');
      dateInUI.value = newState.date;

      //then update all changes
      this.setState(newState);

    } else {
      newState.total += value;
      newState.records.push({ num: value, name: category, colour: colour });
      this.setState(newState);
    }
  };

  render() {
    return (
      <div className="timeline">
        <div className="progress-bar">
          {this.state.records.map(record => {
            let width = (100 * record.num) / 24;
            const divStyle = {
              width: width + "%",
              backgroundColor: record.colour
            };
            return (
              <div className="progress-bar__block" style={divStyle}>
                <span className="progress-bar__block-text">
                  {width < 3 ? "" : record.name}
                </span>
              </div>
            );
          })}
        </div>
          <hr className='striped-border'/>
          <div className='timeline-label'>
            <div className='timeline__label-12am'>12am</div>
            <div className='timeline__label-4am'>4am</div>
            <div className='timeline__label-8am'>8am</div>
            <div className='timeline__label-12pm'>12pm</div>
            <div className='timeline__label-4pm'>4pm</div>
            <div className='timeline__label-8pm'>8pm</div>
            <div className='timeline__label-12eve'>12pm</div>
          </div>
        </div>
      
    );
  }
}
