import React from 'react';
import Dropzone from 'react-dropzone';

import IPFS from 'ipfs';
import Buffer from 'buffer';

class Basic extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      node:  new IPFS({
        repo: String(Math.random() + Date.now())
      }),

    }
  }

  componentDidMount () {
        this.state.node.on('ready', () => {
          console.log('IPFS node is ready')
        })
      }

  onDrop(files) {
    this.setState({
      files
    });
  }

  handleClick = () => {
    alert(this.state.files[0])
    this.state.node.files.add(new this.state.node.types.Buffer('Hello world!'), function(err, files) {
      console.log(files);
    })
  }

  render() {
    return (
      <section>
      <h2>Decentralized Cloud 2.0</h2>
      <div className="dropzone">
      <Dropzone onDrop={this.onDrop.bind(this)}>
      </Dropzone>
      </div>
      <aside>
      <h2>Dropped files</h2>
      <ul>
      {
        this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
      }
      </ul>
      </aside>
      <button onClick={this.handleClick}>
      Upload Files!!
      </button>
      </section>
    );
  }
}

<Basic />

export default Basic;
