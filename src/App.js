import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Buffer from 'buffer';
import webtorrent from 'webtorrent';

import Ipfs from 'ipfs';

import logo from './logo.svg';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      web: [],
      node:  new Ipfs({
        repo: String(Math.random() + Date.now())
      }),
      client: new webtorrent(),
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
    for (let i = 0; i < this.state.files.length; i ++) {
      console.log(this.state.files[i]);
      this.state.client.seed(this.state.files[i], (torrent) => {
        console.log('torrent', torrent);
        torrent.files[0].getBuffer((err, buffer) => {
          this.state.node.files.add(buffer, (err, files) => {
            let web = ['https://ipfs.io/ipfs/' + files[0].hash];
            this.setState({web});
            fetch('http://enigmatic-reaches-70184.herokuapp.com/search/ello', {
              headers: {
                "accept": "application/json"
              },
              method: "GET",
              mode:"no-cors",

            })

            .then((response) => {
              debugger
              return  response.text()
            })
            .then((response) => {
              debugger
              return
            })

            .catch((error) => {
              console.error(error);
            });
          })
        })
      })
    }
  }

  render() {
    return (
      <div className="container">
      <section>
      <h1> SnapCloud </h1>

      <div className="dropzone">
      <Dropzone onDrop={this.onDrop.bind(this)}>
      <p>Try dropping your file here.</p>
      </Dropzone>
      </div>
      <aside>
      <br /><br/>
      <h4>Dropped HTML file</h4>
      <ul>
      {
        this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
      }
      </ul>
      </aside>
      <button onClick={this.handleClick}>
      Upload file!!
      </button>
      <br />
      <a href={this.state.web[0]}>{this.state.web.map((el) => el)}</a>
      </section>
      <br />
      <br />
      </div>
    );
  }
}

<App />

export default App;
