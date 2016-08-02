import React, { Component } from 'react';
import TrainListItems from './TrainListItems';
import axios from 'axios';
import moment from 'moment';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.getSchedule = this.getSchedule.bind(this);
    this.state = {
      schedule: []
    };
  }
  
  componentWillMount() {
    // Will fetch the schedule and then again every 10 minutes
    this.getSchedule();
    this.timer = setInterval(() => {
      this.getSchedule();
    }, 600000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  getSchedule() {
    axios.get('http://localhost:3030/mbta-data')
    .then(response => {
      this.setState({
        schedule: response.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  render() {
    const todaysDate = new Date();
    const currentDay = moment(todaysDate).format('dddd');
    const currentDate = moment(todaysDate).format('M-D-YYYY')
    const currentTime = moment(todaysDate).format('h:mm A')
    
    return(
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th>{currentDay}</th>
              <th className="station-name" rowSpan="2" colSpan="4">North Station Train Info</th>
              <th>Current Time</th>
            </tr>
            <tr className="table-info">
              <th className="table-date">{currentDate}</th>
              <th colspan="5" className="table-time">{currentTime}</th>
            </tr>
            <tr>
              <th>Carrier</th>
              <th>Time</th>
              <th>Destination</th>
              <th>Train #</th>
              <th>Track #</th>
              <th>Status</th>
            </tr>
          </thead>
            <TrainListItems schedule={this.state.schedule} />
        </table>
      </div>
    );
  }
}