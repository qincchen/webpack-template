import React from 'react';
import _ from 'lodash';

export class TestComponent extends React.Component {

  render() {

    const list = _.map([1, 2, 3], (n) => {
      return <li key={n}>{n}</li>;
    });

    return <div>
      <h1>Hello World</h1>
      <ul>
        {list}
      </ul>
      <input type="text"/>
    </div>;
  }
}
