import React, { Component } from 'react';
// import logo from './logo.svg';
// import DatePicker from 'react-datepicker'
import './App.css';
import { history } from './data'

const Video = (props) =>
  <div key={props.title}>
    <ul>
      <li>
        <p><a href={props.url}>{props.title}</a></p>
      </li>
      <li>
        <p>{props.timestamp}</p>
      </li>
      {/* <li>
        <iframe title={props.title} src={props.url} height="200" width="300"/>
      </li> */}
    </ul>
  </div>

const VideoList = (props) =>
  <div className="VideoList">
    {
      props.data.map(
        video => <Video title={video.title}
          timestamp={video.timestamp}
          url={video.url} />)
    }
  </div>

class Filter extends Component {
  render() {
    return (
      <div className="TextSearch">
        <p>Title Search:</p>
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      data: null,
      filterString: null,
    }
  }

  componentDidMount() {
    this.setState({ data: history })
  }

  render() {
    const data = this.state.data
    const filterString = this.state.filterString
    const filteredData =
      filterString && filterString.length > 0 ?
        data.filter(video => video.title.includes(this.state.filterString)) : data
    const filteredCount = filteredData ? filteredData.length : -1

    console.log(filteredCount)

    return (
      <div className="App">
        <div className="Navigation">
          {/* <DatePicker selected={this.state.date}/> */}
          <Filter onTextChange={text => this.setState({ filterString: text })} />
          {
            data ?
              <VideoList data={filteredData} /> :
              <div></div>
          }
        </div>
        <div>
          {/* Put filteredCount here */}
        </div>
      </div>
    );
  }
}

export default App;
