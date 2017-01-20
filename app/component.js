import React from 'react';
// import _ from 'lodash';

export class TestComponent extends React.Component {

  render() {

    const list = [1, 2, 3].map((n) => {
      return <li key={n}>{n}</li>;
    });

    return <div className="style">
      <h1>Hello World</h1>
      <ul>
        {list}
      </ul>
      <input type="text"/>
    </div>;
  }
}

export class ClassToTreeShake {

  someMethod() {
    return 'is tree shake working?';
  }

}
