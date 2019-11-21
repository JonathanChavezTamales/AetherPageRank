import React, { Component } from 'react';

export default class Result extends Component {
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <h4 className='title is-4' style={{ marginBottom: '.3rem' }}>
          <a href={this.props.href}>{this.props.title}</a>
        </h4>
        <small style={{ color: '#227a0c', fontSize: '1.1rem' }}>
          {this.props.url}
        </small>
        <small style={{ float: 'right' }}>
          <strong>Pagerank: </strong>
          {this.props.rank}
        </small>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
