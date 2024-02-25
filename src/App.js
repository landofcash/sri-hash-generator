import React, { Component } from 'react';
import DragNDrop from './DragNDrop';
import './App.css';
import {getBase64HashFromUrl, getResourceHTML, getBase64HashFromFile, getResourceIncludesHTML, parseUrlComment} from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      sha256: false,
      sha384: false,
      sha512: true,
      returnAsIncludes: true,
      resource: '',
      submitting: false,
    };
  }
  generate(getHash) {
    this.setState({
      submitting: true,
      resource: '',
    });
    let me = this;
    getHash().then((result) => {
          let res = '';
          result.items.forEach((item) => {
            if(me.state.returnAsIncludes){
              res+=getResourceIncludesHTML(item.url, item.hash)+`${item.comment}\r\n `;
            } else{
              res+=getResourceHTML(item.url, item.hash)+`${item.comment}\r\n`;
            }
          });
          this.setState({
            resource:res,
            submitting: false,
          });
        },
        () => {
          this.setState({
            submitting: false,
          });
        },
      );
  }
  getTypes() {
    return [
      this.state.sha256 && 'sha256',
      this.state.sha384 && 'sha384',
      this.state.sha512 && 'sha512',
    ].filter(_ => _);
  }
  onCopy = () => {
    if (navigator.clipboard) {
      this.setState({ submitting: true });
      navigator.clipboard
        .writeText(this.state.resource)
        .then(
          () => {
            alert('copied to clipboard');
            this.setState({ submitting: false });
          },
          () => {
            this.setState({ submitting: false });
          },
        );
    }
  }
  onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const types = this.getTypes();
    this.generate(() => {
      let res = {items:[]};
      res.push({hash:getBase64HashFromFile(types, file), url:`./${file.name}`, comment:''});
      return res;
    });
  }
  onHashTypeChange = (e) => {
    const type = e.target.id;
    this.setState({ [type]: !this.state[type] });
  }
  onUrlChange = (e) => {
    this.setState({
      url: e.target.value,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.submitting) return;
    const url = this.state.url.trim();
    if (!url) return;
    const types = this.getTypes();
    let urls = url.replace('\r','').split('\n');

    this.generate(() => {
      return new Promise((resolve, reject) => {
        let result = {items:[]};
        let promises = [];
        urls.forEach((urlItem)=>{
          let urlComment= parseUrlComment(urlItem);
          let p = getBase64HashFromUrl(types, urlComment.url)
              .then((res)=>result.items.push({url:urlComment.url, hash:res, comment:urlComment.comment}));
          promises.push(p);
        });
        Promise.all(promises).then(() => resolve(result));
      });
    });
  }
  render() {
    const { url, sha256, sha384, sha512, returnAsIncludes, submitting, resource } = this.state;
    const isValid = url.trim().length > 0 && (sha256 || sha384 || sha512);
    return (
      <DragNDrop onDrop={this.onDrop} className="container">
        <main>
          <h1>Subresource Integrity (SRI) Generator</h1>
          <form onSubmit={this.onSubmit}>
            <div className="field-group">
              <p><label htmlFor="input">Enter url or drop file below</label></p>
              <textarea id="input" value={url} onChange={this.onUrlChange} rows="10" cols="150" />
            </div>
            <div className="field-group">
              <input id="sha256" type="checkbox" checked={sha256} onChange={this.onHashTypeChange} />
              <label htmlFor="sha256">sha256</label>
              <input id="sha384" type="checkbox" checked={sha384} onChange={this.onHashTypeChange} />
              <label htmlFor="sha384">sha384</label>
              <input id="sha512" type="checkbox" checked={sha512} onChange={this.onHashTypeChange} />
              <label htmlFor="sha512">sha512</label>
              <input id="returnAsIncludes" type="checkbox" checked={returnAsIncludes} onChange={this.onHashTypeChange} />
              <label htmlFor="returnAsIncludes">Return As Includes</label>
            </div>
            <button type="submit" disabled={!isValid || submitting}>Generate</button>
          </form>
          <section>
            <span style={{whiteSpace: 'pre', fontFamily: 'monospace', display: 'block', unicodeBidi: 'embed'}}>{resource}</span>
          </section>
          <div className="operation">
            <button aria-label="copy generated HTML with integrity" onClick={this.onCopy} className="btn-copy" disabled={!resource}>
              Copy
            </button>
          </div>
        </main>
        <footer>
          <span>© 2018 LaySent.</span>
          <a href="https://github.com/laysent/sri-hash-generator">Github</a>
        </footer>
      </DragNDrop>
    );
  }
}
export default App;
