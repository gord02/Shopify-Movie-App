(this.webpackJsonpmovie_awards=this.webpackJsonpmovie_awards||[]).push([[0],{37:function(e,t,i){},56:function(e,t,i){},62:function(e,t,i){"use strict";i.r(t);var n=i(1),a=i(0),s=i.n(a),o=i(28),c=i.n(o),r=(i(37),i(11)),l=i(12),d=i(14),m=i(13),h=i(8),j=i(29),b=i.n(j),u=(i(56),function(e){Object(d.a)(i,e);var t=Object(m.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).searchMovie=n.searchMovie.bind(Object(h.a)(n)),n.displaySearchResults=n.displaySearchResults.bind(Object(h.a)(n)),n.condition=n.condition.bind(Object(h.a)(n)),n.nominate=n.nominate.bind(Object(h.a)(n)),n.displayNominationList=n.displayNominationList.bind(Object(h.a)(n)),n.removeNomination=n.removeNomination.bind(Object(h.a)(n)),n.state={inputData:"",movies:[],nominations:[],isNominee:!0,isSearched:!1,animationCondition:""},n}return Object(l.a)(i,[{key:"componentDidMount",value:function(){var e=JSON.parse(sessionStorage.getItem("nominations"));null!==e&&this.setState({nominations:e})}},{key:"searchMovie",value:function(e){var t=this;e.preventDefault();var i=this.movieTitleInput.value;this.setState({InputData:i});var n="https://www.omdbapi.com/?"+("s="+i.replace(" ","+")+"&apikey=e36df1a5&");b.a.get(n).then((function(e){for(var i=e.data.Search,n=0;n<i.length;n++)i[n].isNominee=!1;for(var a=0;a<i.length;a++)for(var s=0;s<t.state.nominations.length;s++)if(t.state.nominations[s].imdbID===i[a].imdbID){t.setState({isSearched:!0}),i[a]=t.state.nominations[a];break}t.setState({movies:i})}))}},{key:"condition",value:function(){alert("You are limited to 5 nominations")}},{key:"displaySearchResults",value:function(){var e=this,t=this.state.movies;return Object(n.jsx)(s.a.Fragment,{children:Object(n.jsx)("div",{className:"container",children:Object.keys(t).map((function(i,a){return Object(n.jsx)("ul",{children:Object(n.jsxs)("li",{id:t[i].imdbID,children:[Object(n.jsxs)("h5",{id:"inline",children:[" ",t[i].Title," "]}),Object(n.jsxs)("h5",{id:"inline",children:[" (",t[i].Year,") "]}),!1!==t[i].isNominee?Object(n.jsx)("p",{}):Object(n.jsx)("button",{onClick:function(){5===e.state.nominations.length?e.condition():e.nominate(a)},id:"margin8",children:"Nominate"})]},t[i].imdbID)},t[i].imdbID)}))})})}},{key:"nominate",value:function(e){var t=this;this.setState((function(t){var i=Object.assign({},t.movies);return i[e].isNominee=!0,{movies:i}}),(function(){t.updateList(e)}))}},{key:"updateList",value:function(e){var t=this.state.movies;this.setState({nominations:this.state.nominations.concat([t[e]])})}},{key:"removeNomination",value:function(e){var t=this.state.nominations;t.splice(e,1),this.setState({nominations:t}),this.setState((function(e){var t=Object.assign({},e.movie);return t.isNominee=!1,{movie:t}}))}},{key:"displayNominationList",value:function(){var e=this,t=this.state.nominations,i=t.length;return Object(n.jsxs)(s.a.Fragment,{children:[5===i?Object(n.jsx)("div",{className:"container",id:"backgroundColor",children:Object(n.jsx)("h5",{className:"display-5",children:"You have nominated 5 movies"})}):Object(n.jsx)("p",{}),Object.keys(t).map((function(i,a){return Object(n.jsxs)("ul",{children:[Object(n.jsxs)("li",{id:t[i].imdbID,children:["  ",t[i].Title," (",t[i].Year,") "]},t[i].imdbID),Object(n.jsx)("button",{onClick:function(){e.removeNomination(i)},id:"marginBottom8 inline",children:" Remove "})]},t[i].imdbID)}))]})}},{key:"componentDidUpdate",value:function(){sessionStorage.setItem("nominations",JSON.stringify(this.state.nominations))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(s.a.Fragment,{children:[Object(n.jsx)("div",{className:"container",children:Object(n.jsx)("h1",{id:"container",children:"The Shoppies"})}),Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)("div",{className:"row",children:Object(n.jsx)("div",{className:"col",id:"grid",children:Object(n.jsx)("form",{onSubmit:function(t){e.searchMovie(t)},children:Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{htmlFor:"exampleInputEmail1",id:"block marginBottom1 title",children:"Movie Title"}),Object(n.jsx)("input",{id:"inline width96p margin0 title",type:"name",className:"form-control","aria-describedby":"MovieTitle",placeholder:"Enter movie title",ref:function(t){e.movieTitleInput=t},required:!0}),Object(n.jsxs)("button",{type:"submit",className:"btn btn-primary",id:"inline",children:[" ",Object(n.jsx)("i",{id:"inline",className:"fas fa-search"})]})]})})})}),Object(n.jsxs)("div",{className:"row",children:[Object(n.jsxs)("div",{className:"col",id:"grid",children:[0===Object.keys(this.state.movies).length?Object(n.jsx)("h2",{id:"margin4",children:"Results"}):Object(n.jsxs)("h2",{id:"margin4",children:['Results for "',this.state.InputData,'"']}),this.displaySearchResults()]}),Object(n.jsxs)("div",{className:"col",id:"grid",children:[Object(n.jsx)("h2",{id:"title marginBottom0",children:"Nominations"}),Object(n.jsx)("small",{id:"marginTop0",children:"Only 5 nominations can be made"}),this.displayNominationList()]})]})]})]})}}]),i}(a.Component)),v=i(30),O=i(2),p=function(e){Object(d.a)(i,e);var t=Object(m.a)(i);function i(){return Object(r.a)(this,i),t.apply(this,arguments)}return Object(l.a)(i,[{key:"render",value:function(){return Object(n.jsx)(s.a.Fragment,{children:Object(n.jsx)(v.a,{children:Object(n.jsx)(O.c,{children:Object(n.jsx)(O.a,{path:"/",component:u})})})})}}]),i}(a.Component),f=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,63)).then((function(t){var i=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;i(e),n(e),a(e),s(e),o(e)}))};c.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(p,{})}),document.getElementById("root")),f()}},[[62,1,2]]]);
//# sourceMappingURL=main.1d12b6bf.chunk.js.map