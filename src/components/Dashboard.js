import React, { Component } from "react";

import classnames from "classnames";

import Loading from'./Loading';
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];


class Dashboard extends Component {

  state = { 
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {}
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

  selectPanel(id) {
    this.setState(prev => ({
      focused: prev.focused? null : id
    }));
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) { return <Loading /> }

    const panelList = data
      .filter(elem => this.state.focused === null || this.state.focused === elem.id)
      .map(elem => { return (
        <Panel 
          key={elem.id} 
          id={elem.id}
          label={elem.label}
          value={elem.value}
          onSelect={() => this.selectPanel(elem.id)} />) })

    return (
    <main className={dashboardClasses}>
      {panelList}
    </main>
    );
  }
}

export default Dashboard;
