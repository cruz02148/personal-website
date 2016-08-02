import React, { Component } from 'react';
import TrainListItems from './TrainListItems';
import axios from 'axios';
import moment from 'moment';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.getSchedule = this.getSchedule.bind(this);
    this.getTime = this.getTime.bind(this);
    this.state = {
      schedule: [],
      date: '',
    };
  }
  
  componentWillMount() {
    // Will fetch the schedule/time and then again every 10 minutes/1 minute
    this.getSchedule();
    this.getTime();
    this.boardTimer = setInterval(() => {
      this.getSchedule();
    }, 600000);
    this.timer = setInterval(() => {
      this.getTime();
    }, 60000)
  }
  
  componentWillUnmount() {
    clearInterval(this.boardTimer);
    clearInterval(this.timer);
  }
  
  getSchedule() {
    axios.get('http://www.michaelgcruz.com/mbta-data')
    .then(response => {
      this.setState({
        schedule: response.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  getTime() {
    const newDate = new Date();
    this.setState({
      date: newDate,
    })
  }
  render() {
    const currentDay = moment(this.state.date).format('dddd');
    const currentDate = moment(this.state.date).format('M-D-YYYY');
    let currentTime = moment(this.state.date).format('h:mm A');
        
    return(
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-info">
              <th>{currentDay}</th>
              <th className="station-name" rowSpan="2" colSpan="4">North Station Train Board</th>
              <th>Current Time</th>
            </tr>
            <tr className="table-info">
              <th className="table-date">{currentDate}</th>
              <th colSpan="5" className="table-time">{currentTime}</th>
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