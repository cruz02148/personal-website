import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

export default class TrainListItems extends Component {
  constructor(props) {
    super(props);
    this.checkTime = this.checkTime.bind(this);
    this.orderSchedule = this.orderSchedule.bind(this);
    this.getUniqueList = this.getUniqueList.bind(this);
  }
  checkTime(time) {
    const currentTime = Number(Date.now());
    return currentTime >= time.ScheduledTime;
  }
  
  orderSchedule(a,b) {
    const first = a.ScheduledTime;
    const second = b.ScheduledTime;
    if (first < second) {
      return -1;
    } else if (first > second) {
      return 1;
    } else {
      return 0;
    }
  }
  
  renderSchedule() {
    let { schedule } = this.props;
    schedule.sort(this.orderSchedule).filter(this.checkTime)
    
    return this.getUniqueList(schedule).map(train => {
      return (
        <tr key={train.Trip}>
          <td>MBTA</td>
          <td>{moment.unix(train.ScheduledTime).format('h:mm A')}</td>
          <td>{train.Destination}</td>
          <td>{train.Trip}</td>
          <td>{train.Track ? train.Track : "TBD"}</td>
          <td>{train.Lateness > 0 ? `${Math.round(train.Lateness/60)} MIN DELAY` : train.Status}</td>
        </tr>
      );
    })
  }
  
  getUniqueList(sch) {
    return _.uniqBy(sch, route => {
      return route.Destination;
    });
  }
  render() {
    return (
      <tbody>
        {this.renderSchedule()}
      </tbody>   
    );
  }
}
