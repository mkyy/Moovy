"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[550],{7550:function(e,n,t){t.r(n);var i=t(1413),a=t(885),r=t(2791),o=t(803),l=t(6015),c=t(4565),d=t(5953),s=t(1044),u=t(8660),f=t(8371),h=t(2869),m=t(184);n.default=function(){var e=(0,r.useContext)(h.y),n=(0,r.useState)(null),t=(0,a.Z)(n,2),v=t[0],x=t[1],p=s.ZP.create({baseURL:"http://ec2-18-228-24-92.sa-east-1.compute.amazonaws.com:8080/"}),b=function(n){p.delete("api/movie",{data:{imdbID:n.imdbID}}).then((function(){var t=null===v||void 0===v?void 0:v.filter((function(e){return e.imdbID!==n.imdbID}));null===e||void 0===e||e.handleAlert(!1,n.Title),x(null!==t&&void 0!==t?t:v)})).catch((function(e){return console.log(e)}))};return(0,r.useEffect)((function(){p.get("api/movies").then((function(e){if(e.data.length<1)return x(null);var n=e.data;x(n.map((function(e){return(0,i.Z)((0,i.Z)({},e),{},{onLibrary:!0})})))}))}),[]),(0,m.jsxs)(o.Z,{children:[(0,m.jsx)(l.Z,{mb:3,pr:2,display:"flex",justifyContent:"space-between",children:(0,m.jsx)(c.Z,{variant:"h1",children:"My Library"})}),(0,m.jsxs)(d.ZP,{container:!0,spacing:2,children:[!v&&(0,m.jsxs)(l.Z,{width:"300px",display:"flex",flexDirection:"column",alignItems:"center",mx:"auto",children:[(0,m.jsx)(u.Z,{}),(0,m.jsx)(c.Z,{variant:"body2",children:"It looks like there are no movies in your library! Search for a movie you have watched and add it here!"})]}),null===v||void 0===v?void 0:v.map((function(e){return(0,m.jsx)(d.ZP,{item:!0,xs:12,sm:6,md:3,children:(0,m.jsx)(f.Z,{movieData:e,handleToggle:b})},e.imdbID)}))]})]})}}}]);
//# sourceMappingURL=550.5e26fc3a.chunk.js.map