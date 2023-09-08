goog.provide('shadow.grove.history');
shadow.grove.history.init_BANG_ = (function shadow$grove$history$init_BANG_(rt_ref,p__21775){
var map__21776 = p__21775;
var map__21776__$1 = cljs.core.__destructure_map(map__21776);
var config = map__21776__$1;
var start_token = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__21776__$1,new cljs.core.Keyword(null,"start-token","start-token",-722174320),"/");
var path_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__21776__$1,new cljs.core.Keyword(null,"path-prefix","path-prefix",-1210521238),"");
var use_fragment = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__21776__$1,new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),false);
var root_el = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21776__$1,new cljs.core.Keyword(null,"root-el","root-el",1068654895));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",path_prefix)) || (((typeof path_prefix === 'string') && (((clojure.string.starts_with_QMARK_(path_prefix,"/")) && ((!(clojure.string.ends_with_QMARK_(path_prefix,"/")))))))))){
} else {
throw (new Error("Assert failed: (or (= \"\" path-prefix) (and (string? path-prefix) (str/starts-with? path-prefix \"/\") (not (str/ends-with? path-prefix \"/\"))))"));
}

if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/",start_token)) || (((clojure.string.starts_with_QMARK_(start_token,"/")) && ((!(clojure.string.ends_with_QMARK_(start_token,"/")))))))){
} else {
throw (new Error("Assert failed: (or (= \"/\" start-token) (and (str/starts-with? start-token \"/\") (not (str/ends-with? start-token \"/\"))))"));
}

var get_token = (function (){
if(cljs.core.not(use_fragment)){
var path = window.location.pathname;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(path,path_prefix)){
return "/";
} else {
if(clojure.string.starts_with_QMARK_(path,path_prefix)){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(path,cljs.core.count(path_prefix));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("path did not match path prefix",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",-188191168),path,new cljs.core.Keyword(null,"path-prefix","path-prefix",-1210521238),path_prefix], null));

}
}
} else {
var hash = window.location.hash;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(hash,"")){
return "/";
} else {
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(window.location.hash,((1) + cljs.core.count(path_prefix)));
}
}
});
var trigger_route_BANG_ = (function (){
var token = get_token();
var tokens = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(token,(1)),/\//);
return shadow.grove.run_tx_BANG_(rt_ref,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("ui","route!","ui/route!",-1286903988),new cljs.core.Keyword(null,"token","token",-1211463215),token,new cljs.core.Keyword(null,"tokens","tokens",-818939304),tokens], null));
});
var first_token = get_token();
shadow.arborist.attributes.add_attr(new cljs.core.Keyword("ui","href","ui/href",-793802206),(function (env,node,oval,nval){
if(cljs.core.truth_(nval)){
if(clojure.string.starts_with_QMARK_(nval,"/")){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([":ui/href must start with / got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(nval)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),nval], null));
}

return (node.href = (cljs.core.truth_(use_fragment)?["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(nval)].join(''):[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1((((!(clojure.string.ends_with_QMARK_(path_prefix,"/"))))?nval:cljs.core.subs.cljs$core$IFn$_invoke$arity$2(nval,(1))))].join('')));
} else {
return null;
}
}));

shadow.grove.events.reg_fx(rt_ref,new cljs.core.Keyword("ui","redirect!","ui/redirect!",532592738),(function (p__21782,p__21783){
var map__21784 = p__21782;
var map__21784__$1 = cljs.core.__destructure_map(map__21784);
var env = map__21784__$1;
var transact_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21784__$1,new cljs.core.Keyword(null,"transact!","transact!",-822725810));
var map__21785 = p__21783;
var map__21785__$1 = cljs.core.__destructure_map(map__21785);
var token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21785__$1,new cljs.core.Keyword(null,"token","token",-1211463215));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__21785__$1,new cljs.core.Keyword(null,"title","title",636505583));
if(clojure.string.starts_with_QMARK_(token,"/")){
} else {
throw (new Error("Assert failed: (str/starts-with? token \"/\")"));
}

window.history.pushState(null,(function (){var or__5045__auto__ = title;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return document.title;
}
})(),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(token)].join(''));

var tokens = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(token,(1)),/\//);
return setTimeout((function (){
var G__21786 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("ui","route!","ui/route!",-1286903988),new cljs.core.Keyword(null,"token","token",-1211463215),token,new cljs.core.Keyword(null,"tokens","tokens",-818939304),tokens], null);
return (transact_BANG_.cljs$core$IFn$_invoke$arity$1 ? transact_BANG_.cljs$core$IFn$_invoke$arity$1(G__21786) : transact_BANG_.call(null,G__21786));
}),(0));
}));

trigger_route_BANG_();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(rt_ref,(function (rt){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(rt,new cljs.core.Keyword("shadow.grove.history","config","shadow.grove.history/config",201020746),config),new cljs.core.Keyword("shadow.grove.runtime","env-init","shadow.grove.runtime/env-init",2005185019),cljs.core.conj,(function (env){
if(cljs.core.truth_(use_fragment)){
} else {
(function (){var or__5045__auto__ = root_el;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return document.body;
}
})().addEventListener("click",(function (e){
if((((e.button === (0))) && (cljs.core.not((function (){var or__5045__auto__ = e.shiftKey;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = e.metaKey;
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
var or__5045__auto____$2 = e.ctrlKey;
if(cljs.core.truth_(or__5045__auto____$2)){
return or__5045__auto____$2;
} else {
return e.altKey;
}
}
}
})())))){
var temp__5804__auto__ = (function (){var G__21787 = e;
var G__21787__$1 = (((G__21787 == null))?null:G__21787.target);
if((G__21787__$1 == null)){
return null;
} else {
return G__21787__$1.closest("a");
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var a = temp__5804__auto__;
var href = a.getAttribute("href");
var a_target = a.getAttribute("target");
if(cljs.core.truth_((function (){var and__5043__auto__ = href;
if(cljs.core.truth_(and__5043__auto__)){
return ((cljs.core.seq(href)) && (((clojure.string.starts_with_QMARK_(href,path_prefix)) && ((a_target == null)))));
} else {
return and__5043__auto__;
}
})())){
e.preventDefault();

window.history.pushState(null,document.title,href);

return trigger_route_BANG_();
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
}));
}

if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("/",first_token)) && (cljs.core.seq(start_token)))){
window.history.replaceState(null,document.title,[(cljs.core.truth_(use_fragment)?"#":null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_token)].join(''));
} else {
}

window.addEventListener("popstate",(function (e){
return trigger_route_BANG_();
}));

if(cljs.core.truth_(use_fragment)){
window.addEventListener("hashchange",(function (e){
return trigger_route_BANG_();
}));
} else {
}

return env;
}));
}));
});

//# sourceMappingURL=shadow.grove.history.js.map
