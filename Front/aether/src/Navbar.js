import React, { Component } from 'react';
import axios from 'axios';
import './Navbar.css';

export default class Navbar extends Component {
  state = {
    autocomplete: [],
    query: '',
    displayBox: true
  };

  handleChange = event => {
    let query = event.target.value;
    this.setState({ query });
    if (query == '') {
      this.setState({ autocomplete: [] });
    } else {
      axios
        .get(`http://localhost:4000/search`, {
          params: {
            query: query
          }
        })
        .then(response => {
          let results = response.data.results;
          this.setState({ autocomplete: results });
        });
    }
  };

  handleBlur = () => {
    if (this.state.displayBox) {
      this.setState({ displayBox: false });
    }
  };

  handleFocus = () => {
    if (!this.state.displayBox) {
      this.setState({ displayBox: true });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let query = event.target[0].value;
    axios
      .get('http://localhost:4000/results', {
        params: {
          query
        }
      })
      .then(response => {
        this.props.results({ results: response.data.results });
      });
  };

  render() {
    return (
      <div
        style={{
          margin: '.6rem',
          padding: '2rem',
          borderBottom: '#ccc 1px solid'
        }}
      >
        <div className='columns'>
          <div className='column '>
            <div className='logo title is-3' style={{ padding: '.6rem' }}>
              Aether
            </div>
          </div>
          <div className='column is-three-quarters'>
            <span class='field'>
              <div class='control'>
                <form onSubmit={this.handleSubmit}>
                  <input
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    class='input is-medium'
                    type='text'
                    placeholder=''
                    onChange={this.handleChange}
                  ></input>
                </form>
                {this.state.displayBox && (
                  <div
                    style={{
                      border: '#ddd solid 1px',
                      position: 'absolute',
                      top: '50px',
                      background: '#fff',
                      width: '70%',
                      zIndex: '6'
                    }}
                  >
                    {this.state.autocomplete.map((val, idx) => {
                      return (
                        <div
                          style={{
                            fontWeight: 'bold',
                            padding: '.2rem'
                          }}
                          className='resultBox'
                          key={idx}
                        >
                          {this.state.query + val}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </span>
          </div>
          <div className='column'></div>
        </div>
      </div>
    );
  }
}
