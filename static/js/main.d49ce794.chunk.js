(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t){},102:function(e,t){},137:function(e,t){},138:function(e,t){},184:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),o=n(81),i=n.n(o),c=(n(90),n(82)),s=n(26),u=n(27),l=n(29),h=n(28),f=n(30),p=n(83),g=n.n(p),d=(n(92),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).onDragEnter=function(){n.setState({dragging:!0})},n.onDragOver=function(e){e.preventDefault()},n.onDragLeave=function(e){e.target===n.div&&n.setState({dragging:!1})},n.onDrop=function(e){e.preventDefault(),e.stopPropagation(),n.setState({dragging:!1}),"function"===typeof n.props.onDrop&&n.props.onDrop(e)},n.state={dragging:!1},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{onDragEnter:this.onDragEnter,onDragOver:this.onDragOver,onDragLeave:this.onDragLeave,onDrop:this.onDrop,className:g()(this.props.className,this.state.dragging&&"dragging"),ref:function(t){e.div=t}},this.props.children)}}]),t}(r.a.Component)),m=(n(94),n(12)),v=n.n(m),b=n(31),y=n(84),w=n.n(y);function E(e){return k.apply(this,arguments)}function k(){return(k=Object(b.a)(v.a.mark(function e(t){var n,a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.text();case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function D(e,t){return w.a.createHash(e).update(t,"utf8").digest("base64")}function S(){return(S=Object(b.a)(v.a.mark(function e(t,n){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(n);case 2:return a=e.sent,e.abrupt("return",t.map(function(e){return"".concat(e,"-").concat(D(e,a))}).join(" "));case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function j(e){return new Promise(function(t,n){var a=new FileReader;a.onload=function(e){t(e.target.result)},a.onerror=n,a.onabort=n,a.readAsText(e)})}function O(){return(O=Object(b.a)(v.a.mark(function e(t,n){var a;return v.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(n);case 2:return a=e.sent,e.abrupt("return",t.map(function(e){return"".concat(e,"-").concat(D(e,a))}).join(" "));case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var x=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).onCopy=function(){navigator.clipboard&&(n.setState({submitting:!0}),navigator.clipboard.writeText(n.state.resource).then(function(){alert("copied to clipboard"),n.setState({submitting:!1})},function(){n.setState({submitting:!1})}))},n.onDrop=function(e){e.preventDefault();var t=e.dataTransfer.files[0];if(t){var a=n.getTypes();n.generate(function(){return function(e,t){return O.apply(this,arguments)}(a,t)},"./".concat(t.name))}},n.onHashTypeChange=function(e){var t=e.target.id;n.setState(Object(c.a)({},t,!n.state[t]))},n.onUrlChange=function(e){n.setState({url:e.target.value})},n.onSubmit=function(){if(!n.state.submitting){var e=n.state.url.trim();if(e){var t=n.getTypes();n.generate(function(){return function(e,t){return S.apply(this,arguments)}(t,e)},e)}}},n.state={url:"",sha256:!1,sha384:!0,sha512:!1,resource:"",submitting:!1},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"generate",value:function(e,t){var n=this;this.setState({submitting:!0,resource:""}),e().then(function(e){n.setState({resource:function(e,t){return function(e){return e.indexOf(".css")>0}(e)?'<link href="'.concat(e,'" rel="stylesheet" integrity="').concat(t,'" crossorigin="anonymous" />'):'<script type="text/javascript" src="'.concat(e,'" integrity="').concat(t,'" crossorigin="anonymous"><\/script>')}(t,e),submitting:!1})},function(){n.setState({submitting:!1})})}},{key:"getTypes",value:function(){return[this.state.sha256&&"sha256",this.state.sha384&&"sha384",this.state.sha512&&"sha512"].filter(function(e){return e})}},{key:"render",value:function(){var e=this.state,t=e.url,n=e.sha256,a=e.sha384,o=e.sha512,i=e.submitting,c=e.resource,s=t.trim().length>0&&(n||a||o);return r.a.createElement(d,{onDrop:this.onDrop,className:"container"},r.a.createElement("main",null,r.a.createElement("h1",null,"Subresource Integrity (SRI) Generator"),r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"field-group"},r.a.createElement("p",null,r.a.createElement("label",{htmlFor:"input"},"Enter url or drop file below")),r.a.createElement("input",{id:"input",type:"text",value:t,onChange:this.onUrlChange})),r.a.createElement("div",{className:"field-group"},r.a.createElement("input",{id:"sha256",type:"checkbox",checked:n,onChange:this.onHashTypeChange}),r.a.createElement("label",{htmlFor:"sha256"},"sha256"),r.a.createElement("input",{id:"sha384",type:"checkbox",checked:a,onChange:this.onHashTypeChange}),r.a.createElement("label",{htmlFor:"sha384"},"sha384"),r.a.createElement("input",{id:"sha512",type:"checkbox",checked:o,onChange:this.onHashTypeChange}),r.a.createElement("label",{htmlFor:"sha512"},"sha512")),r.a.createElement("button",{type:"submit",disabled:!s||i},"Generate")),r.a.createElement("section",null,r.a.createElement("button",{"aria-label":"generated integrity hash",onClick:this.onCopy},c))),r.a.createElement("footer",null,r.a.createElement("span",null,"\xa9 2018 LaySent."),r.a.createElement("a",{href:"https://github.com/laysent"},"Github")))}}]),t}(a.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(x,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/sri-hash-generator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/sri-hash-generator","/service-worker.js");C?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):T(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):T(t,e)})}}()},85:function(e,t,n){e.exports=n(184)},90:function(e,t,n){},92:function(e,t,n){},94:function(e,t,n){}},[[85,2,1]]]);
//# sourceMappingURL=main.d49ce794.chunk.js.map