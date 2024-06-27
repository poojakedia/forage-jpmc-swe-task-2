import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // showGraph- boolean value to render graph
      showGraph: false,
    };
    this.updateState = this.updateState.bind(this);
    
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    //check if showGraph is set to true and render to correspond
    if(this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }
  /** 
   *  Update state with server data 
   */
  updateState(){
    DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Update the state with new data from the server and rendering the graph 
      this.setState({ data: serverResponds, showGraph: true });
    });
  }

  /**
   * Get new data from server and update the state with the new data
   */
  
  getDataFromServer() {
    //update data continuously using setInterval
    let x = 0;
    //x is a counter variable that measures the iterations of how often the data is fetched
    const intervalID = setInterval(()=>{
      this.updateState();
      x++;
      if(x>1000){
        //while the data has been fetched less than 1000 times it continues to fetch at 100 ms intervals
        clearInterval(intervalID);
      }
    }
    , 100);
  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
