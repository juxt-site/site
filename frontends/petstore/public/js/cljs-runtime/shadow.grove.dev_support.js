goog.provide('shadow.grove.dev_support');
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.dev_support !== 'undefined') && (typeof shadow.grove.dev_support.perf_data_ref !== 'undefined')){
} else {
shadow.grove.dev_support.perf_data_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
shadow.grove.dev_support.safe_inc = (function shadow$grove$dev_support$safe_inc(x){
if((x == null)){
return (1);
} else {
return (x + (1));
}
});
(shadow.grove.components.ManagedComponent.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"component-env","component-env",972082179),new cljs.core.Keyword(null,"needs-render?","needs-render?",-1747719773),new cljs.core.Keyword(null,"config","config",994861415),new cljs.core.Keyword(null,"hook-values","hook-values",-630333081),new cljs.core.Keyword(null,"dirty-from-args","dirty-from-args",624621063),new cljs.core.Keyword(null,"component-name","component-name",-1318676056),new cljs.core.Keyword(null,"events","events",1792552201),new cljs.core.Keyword(null,"hooks","hooks",-413590103),new cljs.core.Keyword(null,"parent-env","parent-env",702568331),new cljs.core.Keyword(null,"current-idx","current-idx",1734114444),new cljs.core.Keyword(null,"updated-hooks","updated-hooks",1251658412),new cljs.core.Keyword(null,"destroyed?","destroyed?",1049634064),new cljs.core.Keyword(null,"suspended?","suspended?",1357440432),new cljs.core.Keyword(null,"root","root",-448657453),new cljs.core.Keyword(null,"rendered-args","rendered-args",791183829),new cljs.core.Keyword(null,"dirty-hooks","dirty-hooks",1076020543)],[this$__$1.args,this$__$1.component_env,this$__$1.needs_render_QMARK_,this$__$1.config,cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (hook){
if(cljs.core.not(hook)){
return new cljs.core.Keyword(null,"uninitialized","uninitialized",252367455);
} else {
return shadow.grove.protocols.hook_value(hook);
}
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(this$__$1.hooks))),this$__$1.dirty_from_args,this$__$1.config.component_name,this$__$1.events,cljs.core.vec(this$__$1.hooks),this$__$1.parent_env,this$__$1.current_idx,this$__$1.updated_hooks,this$__$1.destroyed_QMARK_,this$__$1.suspended_QMARK_,this$__$1.root,this$__$1.rendered_args,this$__$1.dirty_hooks]);
}));

(shadow.grove.components.ManagedComponent.prototype.cljs$core$IPrintWithWriter$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.ManagedComponent.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (component,writer,opts){
var component__$1 = this;
return cljs.core._pr_writer(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.components","ManageComponent","shadow.grove.components/ManageComponent",492790866),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(component__$1.config.component_name)], null),writer,opts);
}));
(shadow.grove.protocols.ComponentConfig.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.protocols.ComponentConfig.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"component-name","component-name",-1318676056),this$__$1.component_name,new cljs.core.Keyword(null,"hooks","hooks",-413590103),this$__$1.hooks,new cljs.core.Keyword(null,"opts","opts",155075701),this$__$1.opts,new cljs.core.Keyword(null,"render-deps","render-deps",-1158828730),this$__$1.render_deps], null);
}));
(shadow.grove.components.HookConfig.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.HookConfig.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"depends-on","depends-on",-1448442022),this$__$1.depends_on,new cljs.core.Keyword(null,"affects","affects",-1759327476),this$__$1.affects], null);
}));
(shadow.grove.components.SimpleVal.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.components.SimpleVal.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),this$__$1.val], null);
}));
(shadow.grove.impl.HookQuery.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.impl.HookQuery.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"ident","ident",-742346),this$__$1.ident,new cljs.core.Keyword(null,"query","query",-1288509510),this$__$1.query,new cljs.core.Keyword(null,"config","config",994861415),this$__$1.config,new cljs.core.Keyword(null,"query-id","query-id",1474128842),this$__$1.query_id,new cljs.core.Keyword(null,"ready?","ready?",-105765697),this$__$1.ready_QMARK_,new cljs.core.Keyword(null,"read-count","read-count",977086476),this$__$1.read_count,new cljs.core.Keyword(null,"read-keys","read-keys",-530152621),this$__$1.read_keys,new cljs.core.Keyword(null,"read-result","read-result",1229454108),this$__$1.read_result], null);
}));

(shadow.grove.impl.HookQuery.prototype.cljs$core$IPrintWithWriter$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.impl.HookQuery.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){
var this$__$1 = this;
return cljs.core._pr_writer(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove","QueryHook","shadow.grove/QueryHook",1456984261),this$__$1.query_id,this$__$1.ident,this$__$1.query], null),writer,opts);
}));
(shadow.arborist.TreeRoot.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.arborist.TreeRoot.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"container","container",-1736937707),this$__$1.container,new cljs.core.Keyword(null,"env","env",-1815813235),this$__$1.env,new cljs.core.Keyword(null,"root","root",-448657453),this$__$1.root], null);
}));
(Map.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(Map.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,k){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,k,this$__$1.get(k));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),this$__$1.keys()));
}));
(Set.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(Set.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s,v){
return cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(s,v);
}),cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY),this$__$1.values()));
}));
(shadow.grove.db.ident.Ident.prototype.clojure$core$protocols$Datafiable$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.db.ident.Ident.prototype.clojure$core$protocols$Datafiable$datafy$arity$1 = (function (this$){
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [shadow.grove.db.ident_key(this$__$1),shadow.grove.db.ident_val(this$__$1)], null);
}));

/**
* @constructor
*/
shadow.grove.dev_support.IdentFormatter = (function (){
});
(shadow.grove.dev_support.IdentFormatter.prototype.header = (function (obj){
var self__ = this;
var this$ = this;
if(shadow.grove.db.ident_QMARK_(obj)){
return ["span","#gbd/ident [",["object",({"object": shadow.grove.db.ident_key(obj)})]," ",["object",({"object": shadow.grove.db.ident_val(obj)})],"]"];
} else {
return null;
}
}));

(shadow.grove.dev_support.IdentFormatter.prototype.hasBody = (function (obj){
var self__ = this;
var this$ = this;
return false;
}));

(shadow.grove.dev_support.IdentFormatter.prototype.body = (function (m){
var self__ = this;
var this$ = this;
return null;
}));

(shadow.grove.dev_support.IdentFormatter.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(shadow.grove.dev_support.IdentFormatter.cljs$lang$type = true);

(shadow.grove.dev_support.IdentFormatter.cljs$lang$ctorStr = "shadow.grove.dev-support/IdentFormatter");

(shadow.grove.dev_support.IdentFormatter.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.dev-support/IdentFormatter");
}));

/**
 * Positional factory function for shadow.grove.dev-support/IdentFormatter.
 */
shadow.grove.dev_support.__GT_IdentFormatter = (function shadow$grove$dev_support$__GT_IdentFormatter(){
return (new shadow.grove.dev_support.IdentFormatter());
});

var temp__5804__auto___13524 = goog.global.devtoolsFormatters;
if(cljs.core.truth_(temp__5804__auto___13524)){
var f_13525 = temp__5804__auto___13524;
var G__13447_13526 = f_13525;
G__13447_13526.push((new shadow.grove.dev_support.IdentFormatter()));

} else {
}
shadow.grove.dev_support.find_owning_component = (function shadow$grove$dev_support$find_owning_component(e){
var current = e.target;
while(true){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("#comment",current.nodeName);
if(and__5043__auto__){
return current.shadow$instance;
} else {
return and__5043__auto__;
}
})())){
return current.shadow$instance;
} else {
var temp__5806__auto__ = current.previousSibling;
if((temp__5806__auto__ == null)){
var temp__5808__auto__ = current.parentNode;
if((temp__5808__auto__ == null)){
return null;
} else {
var parent = temp__5808__auto__;
var G__13527 = parent;
current = G__13527;
continue;
}
} else {
var prev = temp__5806__auto__;
var G__13528 = prev;
current = G__13528;
continue;
}
}
break;
}
});
shadow.grove.dev_support.select_element = (function shadow$grove$dev_support$select_element(){
var border_highlight = (function (){var G__13478 = document.createElement("div");
goog.style.setStyle(G__13478,({"border": "1px solid red", "position": "absolute", "pointer-events": "none", "z-index": "1000", "top": "0px", "left": "0px", "width": "0px", "height": "0px"}));

return G__13478;
})();
var highlight_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var mouse_hook_STAR_ = (function shadow$grove$dev_support$select_element_$_mouse_hook_STAR_(e){
var temp__5808__auto__ = shadow.grove.dev_support.find_owning_component(e);
if((temp__5808__auto__ == null)){
return null;
} else {
var component = temp__5808__auto__;
if((component === cljs.core.deref(highlight_ref))){
return null;
} else {
cljs.core.reset_BANG_(highlight_ref,component);

var marker_before = shadow.arborist.protocols.dom_first(component);
var nodes = (function (){var current = marker_before.nextSibling;
var nodes = cljs.core.PersistentVector.EMPTY;
while(true){
if((current.shadow$instance === component)){
return nodes;
} else {
var G__13529 = current.nextSibling;
var G__13530 = ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(current.nodeType,(1)))?nodes:cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nodes,current));
current = G__13529;
nodes = G__13530;
continue;
}
break;
}
})();
if(cljs.core.seq(nodes)){
var start = cljs.core.first(nodes);
var end = cljs.core.last(nodes);
var start_box = goog.style.getBounds(start);
var end_box = goog.style.getBounds(end);
var style = ({"top": [cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_box.top),"px"].join(''), "left": [cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_box.left),"px"].join(''), "height": [cljs.core.str.cljs$core$IFn$_invoke$arity$1(((end_box.top + end_box.height) - start_box.top)),"px"].join(''), "width": [cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_box.width),"px"].join('')});
return goog.style.setStyle(border_highlight,style);
} else {
return null;
}
}
}
});
var mouse_hook = goog.functions.throttle(mouse_hook_STAR_,(100));
var overlay = (function (){var G__13482 = document.createElement("div");
goog.style.setStyle(G__13482,({"position": "absolute", "pointer-events": "none", "z-index": "10000", "top": "0px", "left": "0px", "bottom": "0px", "right": "0px"}));

return G__13482;
})();
var all_your_clicks = (function (e){
e.preventDefault();

border_highlight.remove();

document.removeEventListener("mousemove",mouse_hook);

var temp__5808__auto__ = cljs.core.deref(highlight_ref);
if((temp__5808__auto__ == null)){
return null;
} else {
var selected = temp__5808__auto__;
console.log("selected",selected);

return cljs.core.tap_GT_(selected);
}
});
document.body.appendChild(border_highlight);

document.addEventListener("mousemove",mouse_hook);

return window.addEventListener("click",all_your_clicks,({"once": true, "capture": true}));
});
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.dev_support !== 'undefined') && (typeof shadow.grove.dev_support.keyboard_hook !== 'undefined')){
} else {
shadow.grove.dev_support.keyboard_hook = (function (){
window.addEventListener("keydown",(function (e){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e.key,"S");
if(and__5043__auto__){
var and__5043__auto____$1 = e.ctrlKey;
if(cljs.core.truth_(and__5043__auto____$1)){
return e.shiftKey;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
})())){
return shadow.grove.dev_support.select_element();
} else {
return null;
}
}));

return true;
})()
;
}

//# sourceMappingURL=shadow.grove.dev_support.js.map
