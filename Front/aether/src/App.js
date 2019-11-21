import React from 'react';
import './App.sass';
import Navbar from './Navbar';
import Result from './Result';

class App extends React.Component {
  state = {
    results: []
  };

  getResults = data => {
    this.setState({ results: data.results });
  };

  render() {
    return (
      <div>
        <Navbar results={this.getResults}></Navbar>
        <section>
          <div
            class='container'
            style={{ paddingLeft: '5rem', paddingTop: '1rem' }}
          >
            {this.state.results.length} resultados:
          </div>
          <div className='columns' style={{ marginTop: '1.2rem' }}>
            <div class='column'></div>
            <div class='column is-three-fifths'>
              {this.state.results.map((element, idx) => {
                return (
                  <Result
                    key={idx}
                    title={element.title}
                    description={element.metaDescription}
                    url={element.url}
                    href={element.href}
                    rank={element.rank}
                  ></Result>
                );
              })}
            </div>
            <div class='column'></div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
