goog.provide('shadow.arborist.attributes');
goog.scope(function(){
  shadow.arborist.attributes.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof shadow !== 'undefined') && (typeof shadow.arborist !== 'undefined') && (typeof shadow.arborist.attributes !== 'undefined') && (typeof shadow.arborist.attributes.attr_handlers !== 'undefined')){
} else {
shadow.arborist.attributes.attr_handlers = ({});
}
shadow.arborist.attributes.vec__GT_class = (function shadow$arborist$attributes$vec__GT_class(v){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s,c){
if(cljs.core.not(c)){
return s;
} else {
if(cljs.core.not(s)){
return c;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(c)].join('');

}
}
}),null,v);
});
shadow.arborist.attributes.map__GT_class = (function shadow$arborist$attributes$map__GT_class(m){
return cljs.core.reduce_kv((function (s,k,v){
if(cljs.core.not(v)){
return s;
} else {
if(cljs.core.not(s)){
if((k instanceof cljs.core.Keyword)){
return k.cljs$core$INamed$_name$arity$1(null);
} else {
return k;
}
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((((k instanceof cljs.core.Keyword))?k.cljs$core$INamed$_name$arity$1(null):k))].join('');

}
}
}),null,m);
});
shadow.arborist.attributes.add_attr = (function shadow$arborist$attributes$add_attr(kw,handler){
if((kw instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? kw)"));
}

if(cljs.core.fn_QMARK_(handler)){
} else {
throw (new Error("Assert failed: (fn? handler)"));
}

return shadow.arborist.attributes.goog$module$goog$object.set(shadow.arborist.attributes.attr_handlers,kw.fqn,handler);
});
shadow.arborist.attributes.dom_attribute_QMARK_ = (function shadow$arborist$attributes$dom_attribute_QMARK_(name){
return ((clojure.string.starts_with_QMARK_(name,"data-")) || (clojure.string.starts_with_QMARK_(name,"aria-")));
});
shadow.arborist.attributes.set_dom_attribute = (function shadow$arborist$attributes$set_dom_attribute(node,prop_name,nval){
if(typeof nval === 'string'){
return node.setAttribute(prop_name,nval);
} else {
if(typeof nval === 'number'){
return node.setAttribute(prop_name,nval);
} else {
if((nval == null)){
return node.removeAttribute(prop_name);
} else {
if(nval === false){
return node.removeAttribute(prop_name);
} else {
if(nval === true){
return node.setAttribute(prop_name,"");
} else {
return node.setAttribute(prop_name,nval);

}
}
}
}
}
});
shadow.arborist.attributes.set_style_property = (function shadow$arborist$attributes$set_style_property(node,prop_name,nval){
if((nval == null)){
return node.style.removeProperty(prop_name);
} else {
return node.style.setProperty(prop_name,nval);
}
});
shadow.arborist.attributes.wrap_stop_BANG_ = (function shadow$arborist$attributes$wrap_stop_BANG_(target){
return (function (e){
e.stopPropagation();

e.preventDefault();

return target(e);
});
});
shadow.arborist.attributes.wrap_stop = (function shadow$arborist$attributes$wrap_stop(target){
return (function (e){
e.stopPropagation();

return target(e);
});
});
shadow.arborist.attributes.wrap_prevent_default = (function shadow$arborist$attributes$wrap_prevent_default(target){
return (function (e){
e.preventDefault();

return target(e);
});
});
shadow.arborist.attributes.make_attr_handler = (function shadow$arborist$attributes$make_attr_handler(key){
var prop_name = key.name;
var prop_ns = key.ns;
if(shadow.arborist.attributes.dom_attribute_QMARK_(prop_name)){
return (function (env,node,oval,nval){
return shadow.arborist.attributes.set_dom_attribute(node,prop_name,nval);
});
} else {
if(("style" === prop_ns)){
return (function (env,node,oval,nval){
return shadow.arborist.attributes.set_style_property(node,prop_name,nval);
});
} else {
if(cljs.core.truth_(prop_ns)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["namespaced attribute without setter: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"attr","attr",-604132353),key], null));
} else {
if(clojure.string.starts_with_QMARK_(prop_name,"on-")){
var event = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(prop_name,(3));
var ev_key = ["__shadow$",event].join('');
return (function (env,node,oval,nval){
var temp__5804__auto___11531 = shadow.arborist.attributes.goog$module$goog$object.get(node,ev_key);
if(cljs.core.truth_(temp__5804__auto___11531)){
var ev_fn_11532 = temp__5804__auto___11531;
node.removeEventListener(event,ev_fn_11532);
} else {
}

if((!((nval == null)))){
var ev_handler = new cljs.core.Keyword("shadow.arborist.protocols","dom-event-handler","shadow.arborist.protocols/dom-event-handler",-755471285).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_(ev_handler)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("missing dom-event-handler!",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"env","env",-1815813235),env,new cljs.core.Keyword(null,"event","event",301435442),event,new cljs.core.Keyword(null,"node","node",581201198),node,new cljs.core.Keyword(null,"value","value",305978217),nval], null));
}

if(goog.DEBUG){
ev_handler.shadow$arborist$protocols$IHandleDOMEvents$validate_dom_event_value_BANG_$arity$4(null,env,event,nval);
} else {
}

var m_QMARK_ = cljs.core.map_QMARK_(nval);
var ev_fn = (function (dom_event){
return ev_handler.shadow$arborist$protocols$IHandleDOMEvents$handle_dom_event_BANG_$arity$5(null,env,event,nval,dom_event);
});
var ev_opts = ({});
var ev_fn__$1 = (((!(m_QMARK_)))?ev_fn:(function (){var map__11461 = nval;
var map__11461__$1 = cljs.core.__destructure_map(map__11461);
var capture = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","capture","e/capture",-677031226));
var signal = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","signal","e/signal",-1984951554));
var prevent_default = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","prevent-default","e/prevent-default",813416704));
var rate_limit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","rate-limit","e/rate-limit",1748081857));
var debounce = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","debounce","e/debounce",-871550403));
var stop_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","stop!","e/stop!",726634536));
var passive = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","passive","e/passive",252884107));
var stop = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","stop","e/stop",-2140915081));
var once = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","once","e/once",-262568708));
var throttle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__11461__$1,new cljs.core.Keyword("e","throttle","e/throttle",-1860340685));
if(cljs.core.truth_(once)){
shadow.arborist.attributes.goog$module$goog$object.set(ev_opts,"once",true);
} else {
}

if(cljs.core.truth_(passive)){
shadow.arborist.attributes.goog$module$goog$object.set(ev_opts,"passive",true);
} else {
}

if(cljs.core.truth_(capture)){
shadow.arborist.attributes.goog$module$goog$object.set(ev_opts,"capture",true);
} else {
}

if(cljs.core.truth_(signal)){
shadow.arborist.attributes.goog$module$goog$object.set(ev_opts,"signal",true);
} else {
}

var G__11468 = ev_fn;
var G__11468__$1 = (cljs.core.truth_(debounce)?goog.functions.debounce(G__11468,debounce):G__11468);
var G__11468__$2 = (cljs.core.truth_(throttle)?goog.functions.debounce(G__11468__$1,throttle):G__11468__$1);
var G__11468__$3 = (cljs.core.truth_(rate_limit)?goog.functions.debounce(G__11468__$2,rate_limit):G__11468__$2);
var G__11468__$4 = (cljs.core.truth_(prevent_default)?shadow.arborist.attributes.wrap_prevent_default(G__11468__$3):G__11468__$3);
var G__11468__$5 = (cljs.core.truth_(stop)?shadow.arborist.attributes.wrap_stop(G__11468__$4):G__11468__$4);
if(cljs.core.truth_(stop_BANG_)){
return shadow.arborist.attributes.wrap_stop_BANG_(G__11468__$5);
} else {
return G__11468__$5;
}
})());
node.addEventListener(event,ev_fn__$1,ev_opts);

return shadow.arborist.attributes.goog$module$goog$object.set(node,ev_key,ev_fn__$1);
} else {
return null;
}
});
} else {
var prop = goog.string.toCamelCase(prop_name);
return (function (env,node,oval,nval){
if(new cljs.core.Keyword("dom","svg","dom/svg",856951640).cljs$core$IFn$_invoke$arity$1(env)){
return shadow.arborist.attributes.set_dom_attribute(node,key.name,nval);
} else {
return shadow.arborist.attributes.goog$module$goog$object.set(node,prop,nval);
}
});

}
}
}
}
});
shadow.arborist.attributes.set_attr = (function shadow$arborist$attributes$set_attr(env,node,key,oval,nval){
if((key instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? key)"));
}

var handler = shadow.arborist.attributes.goog$module$goog$object.get(shadow.arborist.attributes.attr_handlers,key.fqn);
if(handler){
return handler(env,node,oval,nval);
} else {
var handler__$1 = shadow.arborist.attributes.make_attr_handler(key);
shadow.arborist.attributes.goog$module$goog$object.set(shadow.arborist.attributes.attr_handlers,key.fqn,handler__$1);

return handler__$1(env,node,oval,nval);
}
});
shadow.arborist.attributes.add_attr(new cljs.core.Keyword(null,"for","for",-1323786319),(function (env,node,oval,nval){
return (node.htmlFor = nval);
}));
shadow.arborist.attributes.add_attr(new cljs.core.Keyword(null,"style","style",-496642736),(function (env,node,oval,nval){
if((((oval == null)) && ((nval == null)))){
return new cljs.core.Keyword(null,"empty","empty",767870958);
} else {
if(cljs.core.map_QMARK_(nval)){
return cljs.core.reduce_kv((function (_,k,v){
return shadow.arborist.attributes.set_style_property(node,k.cljs$core$INamed$_name$arity$1(null),v);
}),null,nval);
} else {
if(typeof nval === 'string'){
return (node.style.cssText = nval);
} else {
if((!((!((nval == null)))))){
return (node.style.cssText = "");
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid value for :style",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"node","node",581201198),node,new cljs.core.Keyword(null,"val","val",128701612),nval], null));

}
}
}
}
}));
shadow.arborist.attributes.add_attr(new cljs.core.Keyword(null,"class","class",-2030961996),(function (env,node,oval,nval){
var sval = (((nval == null))?"":((typeof nval === 'string')?nval:((cljs.core.vector_QMARK_(nval))?(function (){var temp__5802__auto__ = shadow.arborist.attributes.vec__GT_class(nval);
if(cljs.core.truth_(temp__5802__auto__)){
var s = temp__5802__auto__;
return s;
} else {
return "";
}
})():((cljs.core.map_QMARK_(nval))?(function (){var temp__5802__auto__ = shadow.arborist.attributes.map__GT_class(nval);
if(cljs.core.truth_(temp__5802__auto__)){
var s = temp__5802__auto__;
return s;
} else {
return "";
}
})():(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid value for :class",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"node","node",581201198),node,new cljs.core.Keyword(null,"val","val",128701612),nval], null))})()
))));
if(new cljs.core.Keyword("dom","svg","dom/svg",856951640).cljs$core$IFn$_invoke$arity$1(env)){
return node.setAttribute("class",sval);
} else {
return (node.className = sval);
}
}));
shadow.arborist.attributes.add_attr(new cljs.core.Keyword("dom","ref","dom/ref",1289472705),(function (env,node,oval,nval){
if((nval == null)){
return cljs.core.vreset_BANG_(oval,null);
} else {
if((!((nval == null)))){
return cljs.core.vreset_BANG_(nval,node);
} else {
return null;

}
}
}));
/**
 * merge attributes from old/new attr maps
 */
shadow.arborist.attributes.merge_attrs = (function shadow$arborist$attributes$merge_attrs(env,node,old,new$){
cljs.core.reduce_kv((function (_,key,nval){
var oval = cljs.core.get.cljs$core$IFn$_invoke$arity$2(old,key);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(nval,oval)){
return shadow.arborist.attributes.set_attr(env,node,key,oval,nval);
} else {
return null;
}
}),null,new$);

return cljs.core.reduce_kv((function (_,key,oval){
if(cljs.core.contains_QMARK_(new$,key)){
return null;
} else {
return shadow.arborist.attributes.set_attr(env,node,key,oval,null);
}
}),null,old);
});
/**
 * initial set attributes from key/val map
 */
shadow.arborist.attributes.set_attrs = (function shadow$arborist$attributes$set_attrs(env,node,attrs){
return cljs.core.reduce_kv((function (_,key,val){
return shadow.arborist.attributes.set_attr(env,node,key,null,val);
}),null,attrs);
});

//# sourceMappingURL=shadow.arborist.attributes.js.map
