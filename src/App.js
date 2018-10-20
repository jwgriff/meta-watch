import React, { Component } from 'react';
import './App.css';
import { history } from './data'

const textFilter = (video, property, filterStr) => {
  return filterStr && filterStr.length > 0 && video[property] ?
    video[property].includes(filterStr) : true
}

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

const Filter = (props) =>
  <div className="TextSearch">
    <p>{props.label}:</p>
    <input type="text" onKeyUp={event => props.onTextChange(event.target.value)} />
  </div>


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      filterString: null,
      dateString: null,
    }
  }

  componentDidMount() {
    this.setState({ data: history })
  }

  render() {
    const data = this.state.data
    const dateString = this.state.dateString
    const filterString = this.state.filterString

    const filteredData = data ?
      data
        .filter(video => textFilter(video, 'title', filterString))
        .filter(video => textFilter(video, 'timestamp', dateString))
      : []
    const filteredCount = filteredData ? filteredData.length : -1

    return (
      <div className="App">
        <div className="Navigation">
          <Filter label="Filter Date" onTextChange={text => this.setState({ dateString: text })} />
          <Filter label="Filter Title" onTextChange={text => this.setState({ filterString: text })} />
          <div className="FilteredCount">Number of results: {filteredCount}</div>
          {
            data ?
              <VideoList data={filteredData} /> :
              <div></div>
          }

        </div>
      </div>
    );
  }
}

export default App;
