goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_20006 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_20006(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_20007 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_20007(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__19195 = coll;
var G__19196 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__19195,G__19196) : shadow.dom.lazy_native_coll_seq.call(null,G__19195,G__19196));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__19226 = arguments.length;
switch (G__19226) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__19248 = arguments.length;
switch (G__19248) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__19253 = arguments.length;
switch (G__19253) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__19261 = arguments.length;
switch (G__19261) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__19274 = arguments.length;
switch (G__19274) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__19300 = arguments.length;
switch (G__19300) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e19305){if((e19305 instanceof Object)){
var e = e19305;
return console.log("didnt support attachEvent",el,e);
} else {
throw e19305;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__19306 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__19307 = null;
var count__19308 = (0);
var i__19309 = (0);
while(true){
if((i__19309 < count__19308)){
var el = chunk__19307.cljs$core$IIndexed$_nth$arity$2(null,i__19309);
var handler_20030__$1 = ((function (seq__19306,chunk__19307,count__19308,i__19309,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__19306,chunk__19307,count__19308,i__19309,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_20030__$1);


var G__20031 = seq__19306;
var G__20032 = chunk__19307;
var G__20033 = count__19308;
var G__20034 = (i__19309 + (1));
seq__19306 = G__20031;
chunk__19307 = G__20032;
count__19308 = G__20033;
i__19309 = G__20034;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19306);
if(temp__5804__auto__){
var seq__19306__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19306__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19306__$1);
var G__20035 = cljs.core.chunk_rest(seq__19306__$1);
var G__20036 = c__5568__auto__;
var G__20037 = cljs.core.count(c__5568__auto__);
var G__20038 = (0);
seq__19306 = G__20035;
chunk__19307 = G__20036;
count__19308 = G__20037;
i__19309 = G__20038;
continue;
} else {
var el = cljs.core.first(seq__19306__$1);
var handler_20039__$1 = ((function (seq__19306,chunk__19307,count__19308,i__19309,el,seq__19306__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__19306,chunk__19307,count__19308,i__19309,el,seq__19306__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_20039__$1);


var G__20040 = cljs.core.next(seq__19306__$1);
var G__20041 = null;
var G__20042 = (0);
var G__20043 = (0);
seq__19306 = G__20040;
chunk__19307 = G__20041;
count__19308 = G__20042;
i__19309 = G__20043;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__19318 = arguments.length;
switch (G__19318) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__19336 = cljs.core.seq(events);
var chunk__19337 = null;
var count__19338 = (0);
var i__19339 = (0);
while(true){
if((i__19339 < count__19338)){
var vec__19350 = chunk__19337.cljs$core$IIndexed$_nth$arity$2(null,i__19339);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19350,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19350,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__20055 = seq__19336;
var G__20056 = chunk__19337;
var G__20057 = count__19338;
var G__20058 = (i__19339 + (1));
seq__19336 = G__20055;
chunk__19337 = G__20056;
count__19338 = G__20057;
i__19339 = G__20058;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19336);
if(temp__5804__auto__){
var seq__19336__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19336__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19336__$1);
var G__20059 = cljs.core.chunk_rest(seq__19336__$1);
var G__20060 = c__5568__auto__;
var G__20061 = cljs.core.count(c__5568__auto__);
var G__20062 = (0);
seq__19336 = G__20059;
chunk__19337 = G__20060;
count__19338 = G__20061;
i__19339 = G__20062;
continue;
} else {
var vec__19360 = cljs.core.first(seq__19336__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19360,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19360,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__20063 = cljs.core.next(seq__19336__$1);
var G__20064 = null;
var G__20065 = (0);
var G__20066 = (0);
seq__19336 = G__20063;
chunk__19337 = G__20064;
count__19338 = G__20065;
i__19339 = G__20066;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__19367 = cljs.core.seq(styles);
var chunk__19368 = null;
var count__19369 = (0);
var i__19370 = (0);
while(true){
if((i__19370 < count__19369)){
var vec__19384 = chunk__19368.cljs$core$IIndexed$_nth$arity$2(null,i__19370);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19384,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19384,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__20070 = seq__19367;
var G__20071 = chunk__19368;
var G__20072 = count__19369;
var G__20073 = (i__19370 + (1));
seq__19367 = G__20070;
chunk__19368 = G__20071;
count__19369 = G__20072;
i__19370 = G__20073;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19367);
if(temp__5804__auto__){
var seq__19367__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19367__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19367__$1);
var G__20078 = cljs.core.chunk_rest(seq__19367__$1);
var G__20079 = c__5568__auto__;
var G__20080 = cljs.core.count(c__5568__auto__);
var G__20081 = (0);
seq__19367 = G__20078;
chunk__19368 = G__20079;
count__19369 = G__20080;
i__19370 = G__20081;
continue;
} else {
var vec__19389 = cljs.core.first(seq__19367__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19389,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19389,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__20085 = cljs.core.next(seq__19367__$1);
var G__20086 = null;
var G__20087 = (0);
var G__20088 = (0);
seq__19367 = G__20085;
chunk__19368 = G__20086;
count__19369 = G__20087;
i__19370 = G__20088;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__19405_20092 = key;
var G__19405_20093__$1 = (((G__19405_20092 instanceof cljs.core.Keyword))?G__19405_20092.fqn:null);
switch (G__19405_20093__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_20099 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_20099,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_20099,"aria-");
}
})())){
el.setAttribute(ks_20099,value);
} else {
(el[ks_20099] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__19454){
var map__19457 = p__19454;
var map__19457__$1 = cljs.core.__destructure_map(map__19457);
var props = map__19457__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19457__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__19460 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19460,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19460,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19460,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__19464 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__19464,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__19464;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__19476 = arguments.length;
switch (G__19476) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__19490){
var vec__19493 = p__19490;
var seq__19494 = cljs.core.seq(vec__19493);
var first__19495 = cljs.core.first(seq__19494);
var seq__19494__$1 = cljs.core.next(seq__19494);
var nn = first__19495;
var first__19495__$1 = cljs.core.first(seq__19494__$1);
var seq__19494__$2 = cljs.core.next(seq__19494__$1);
var np = first__19495__$1;
var nc = seq__19494__$2;
var node = vec__19493;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__19497 = nn;
var G__19498 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__19497,G__19498) : create_fn.call(null,G__19497,G__19498));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__19501 = nn;
var G__19502 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__19501,G__19502) : create_fn.call(null,G__19501,G__19502));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__19509 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19509,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19509,(1),null);
var seq__19512_20103 = cljs.core.seq(node_children);
var chunk__19513_20104 = null;
var count__19514_20105 = (0);
var i__19515_20106 = (0);
while(true){
if((i__19515_20106 < count__19514_20105)){
var child_struct_20107 = chunk__19513_20104.cljs$core$IIndexed$_nth$arity$2(null,i__19515_20106);
var children_20108 = shadow.dom.dom_node(child_struct_20107);
if(cljs.core.seq_QMARK_(children_20108)){
var seq__19572_20109 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_20108));
var chunk__19574_20110 = null;
var count__19575_20111 = (0);
var i__19576_20112 = (0);
while(true){
if((i__19576_20112 < count__19575_20111)){
var child_20113 = chunk__19574_20110.cljs$core$IIndexed$_nth$arity$2(null,i__19576_20112);
if(cljs.core.truth_(child_20113)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_20113);


var G__20114 = seq__19572_20109;
var G__20115 = chunk__19574_20110;
var G__20116 = count__19575_20111;
var G__20117 = (i__19576_20112 + (1));
seq__19572_20109 = G__20114;
chunk__19574_20110 = G__20115;
count__19575_20111 = G__20116;
i__19576_20112 = G__20117;
continue;
} else {
var G__20118 = seq__19572_20109;
var G__20119 = chunk__19574_20110;
var G__20120 = count__19575_20111;
var G__20121 = (i__19576_20112 + (1));
seq__19572_20109 = G__20118;
chunk__19574_20110 = G__20119;
count__19575_20111 = G__20120;
i__19576_20112 = G__20121;
continue;
}
} else {
var temp__5804__auto___20122 = cljs.core.seq(seq__19572_20109);
if(temp__5804__auto___20122){
var seq__19572_20123__$1 = temp__5804__auto___20122;
if(cljs.core.chunked_seq_QMARK_(seq__19572_20123__$1)){
var c__5568__auto___20124 = cljs.core.chunk_first(seq__19572_20123__$1);
var G__20125 = cljs.core.chunk_rest(seq__19572_20123__$1);
var G__20126 = c__5568__auto___20124;
var G__20127 = cljs.core.count(c__5568__auto___20124);
var G__20128 = (0);
seq__19572_20109 = G__20125;
chunk__19574_20110 = G__20126;
count__19575_20111 = G__20127;
i__19576_20112 = G__20128;
continue;
} else {
var child_20129 = cljs.core.first(seq__19572_20123__$1);
if(cljs.core.truth_(child_20129)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_20129);


var G__20130 = cljs.core.next(seq__19572_20123__$1);
var G__20131 = null;
var G__20132 = (0);
var G__20133 = (0);
seq__19572_20109 = G__20130;
chunk__19574_20110 = G__20131;
count__19575_20111 = G__20132;
i__19576_20112 = G__20133;
continue;
} else {
var G__20134 = cljs.core.next(seq__19572_20123__$1);
var G__20135 = null;
var G__20136 = (0);
var G__20137 = (0);
seq__19572_20109 = G__20134;
chunk__19574_20110 = G__20135;
count__19575_20111 = G__20136;
i__19576_20112 = G__20137;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_20108);
}


var G__20138 = seq__19512_20103;
var G__20139 = chunk__19513_20104;
var G__20140 = count__19514_20105;
var G__20141 = (i__19515_20106 + (1));
seq__19512_20103 = G__20138;
chunk__19513_20104 = G__20139;
count__19514_20105 = G__20140;
i__19515_20106 = G__20141;
continue;
} else {
var temp__5804__auto___20142 = cljs.core.seq(seq__19512_20103);
if(temp__5804__auto___20142){
var seq__19512_20143__$1 = temp__5804__auto___20142;
if(cljs.core.chunked_seq_QMARK_(seq__19512_20143__$1)){
var c__5568__auto___20144 = cljs.core.chunk_first(seq__19512_20143__$1);
var G__20145 = cljs.core.chunk_rest(seq__19512_20143__$1);
var G__20146 = c__5568__auto___20144;
var G__20147 = cljs.core.count(c__5568__auto___20144);
var G__20148 = (0);
seq__19512_20103 = G__20145;
chunk__19513_20104 = G__20146;
count__19514_20105 = G__20147;
i__19515_20106 = G__20148;
continue;
} else {
var child_struct_20149 = cljs.core.first(seq__19512_20143__$1);
var children_20150 = shadow.dom.dom_node(child_struct_20149);
if(cljs.core.seq_QMARK_(children_20150)){
var seq__19578_20151 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_20150));
var chunk__19580_20152 = null;
var count__19581_20153 = (0);
var i__19582_20154 = (0);
while(true){
if((i__19582_20154 < count__19581_20153)){
var child_20155 = chunk__19580_20152.cljs$core$IIndexed$_nth$arity$2(null,i__19582_20154);
if(cljs.core.truth_(child_20155)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_20155);


var G__20156 = seq__19578_20151;
var G__20157 = chunk__19580_20152;
var G__20158 = count__19581_20153;
var G__20159 = (i__19582_20154 + (1));
seq__19578_20151 = G__20156;
chunk__19580_20152 = G__20157;
count__19581_20153 = G__20158;
i__19582_20154 = G__20159;
continue;
} else {
var G__20160 = seq__19578_20151;
var G__20161 = chunk__19580_20152;
var G__20162 = count__19581_20153;
var G__20163 = (i__19582_20154 + (1));
seq__19578_20151 = G__20160;
chunk__19580_20152 = G__20161;
count__19581_20153 = G__20162;
i__19582_20154 = G__20163;
continue;
}
} else {
var temp__5804__auto___20164__$1 = cljs.core.seq(seq__19578_20151);
if(temp__5804__auto___20164__$1){
var seq__19578_20165__$1 = temp__5804__auto___20164__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19578_20165__$1)){
var c__5568__auto___20166 = cljs.core.chunk_first(seq__19578_20165__$1);
var G__20167 = cljs.core.chunk_rest(seq__19578_20165__$1);
var G__20168 = c__5568__auto___20166;
var G__20169 = cljs.core.count(c__5568__auto___20166);
var G__20170 = (0);
seq__19578_20151 = G__20167;
chunk__19580_20152 = G__20168;
count__19581_20153 = G__20169;
i__19582_20154 = G__20170;
continue;
} else {
var child_20171 = cljs.core.first(seq__19578_20165__$1);
if(cljs.core.truth_(child_20171)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_20171);


var G__20172 = cljs.core.next(seq__19578_20165__$1);
var G__20173 = null;
var G__20174 = (0);
var G__20175 = (0);
seq__19578_20151 = G__20172;
chunk__19580_20152 = G__20173;
count__19581_20153 = G__20174;
i__19582_20154 = G__20175;
continue;
} else {
var G__20176 = cljs.core.next(seq__19578_20165__$1);
var G__20177 = null;
var G__20178 = (0);
var G__20179 = (0);
seq__19578_20151 = G__20176;
chunk__19580_20152 = G__20177;
count__19581_20153 = G__20178;
i__19582_20154 = G__20179;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_20150);
}


var G__20180 = cljs.core.next(seq__19512_20143__$1);
var G__20181 = null;
var G__20182 = (0);
var G__20183 = (0);
seq__19512_20103 = G__20180;
chunk__19513_20104 = G__20181;
count__19514_20105 = G__20182;
i__19515_20106 = G__20183;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__19604 = cljs.core.seq(node);
var chunk__19605 = null;
var count__19606 = (0);
var i__19607 = (0);
while(true){
if((i__19607 < count__19606)){
var n = chunk__19605.cljs$core$IIndexed$_nth$arity$2(null,i__19607);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__20184 = seq__19604;
var G__20185 = chunk__19605;
var G__20186 = count__19606;
var G__20187 = (i__19607 + (1));
seq__19604 = G__20184;
chunk__19605 = G__20185;
count__19606 = G__20186;
i__19607 = G__20187;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19604);
if(temp__5804__auto__){
var seq__19604__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19604__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19604__$1);
var G__20188 = cljs.core.chunk_rest(seq__19604__$1);
var G__20189 = c__5568__auto__;
var G__20190 = cljs.core.count(c__5568__auto__);
var G__20191 = (0);
seq__19604 = G__20188;
chunk__19605 = G__20189;
count__19606 = G__20190;
i__19607 = G__20191;
continue;
} else {
var n = cljs.core.first(seq__19604__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__20192 = cljs.core.next(seq__19604__$1);
var G__20193 = null;
var G__20194 = (0);
var G__20195 = (0);
seq__19604 = G__20192;
chunk__19605 = G__20193;
count__19606 = G__20194;
i__19607 = G__20195;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__19624 = arguments.length;
switch (G__19624) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__19636 = arguments.length;
switch (G__19636) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__19654 = arguments.length;
switch (G__19654) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___20212 = arguments.length;
var i__5770__auto___20213 = (0);
while(true){
if((i__5770__auto___20213 < len__5769__auto___20212)){
args__5775__auto__.push((arguments[i__5770__auto___20213]));

var G__20214 = (i__5770__auto___20213 + (1));
i__5770__auto___20213 = G__20214;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__19708_20215 = cljs.core.seq(nodes);
var chunk__19709_20216 = null;
var count__19710_20217 = (0);
var i__19711_20218 = (0);
while(true){
if((i__19711_20218 < count__19710_20217)){
var node_20219 = chunk__19709_20216.cljs$core$IIndexed$_nth$arity$2(null,i__19711_20218);
fragment.appendChild(shadow.dom._to_dom(node_20219));


var G__20220 = seq__19708_20215;
var G__20221 = chunk__19709_20216;
var G__20222 = count__19710_20217;
var G__20223 = (i__19711_20218 + (1));
seq__19708_20215 = G__20220;
chunk__19709_20216 = G__20221;
count__19710_20217 = G__20222;
i__19711_20218 = G__20223;
continue;
} else {
var temp__5804__auto___20224 = cljs.core.seq(seq__19708_20215);
if(temp__5804__auto___20224){
var seq__19708_20225__$1 = temp__5804__auto___20224;
if(cljs.core.chunked_seq_QMARK_(seq__19708_20225__$1)){
var c__5568__auto___20226 = cljs.core.chunk_first(seq__19708_20225__$1);
var G__20227 = cljs.core.chunk_rest(seq__19708_20225__$1);
var G__20228 = c__5568__auto___20226;
var G__20229 = cljs.core.count(c__5568__auto___20226);
var G__20230 = (0);
seq__19708_20215 = G__20227;
chunk__19709_20216 = G__20228;
count__19710_20217 = G__20229;
i__19711_20218 = G__20230;
continue;
} else {
var node_20232 = cljs.core.first(seq__19708_20225__$1);
fragment.appendChild(shadow.dom._to_dom(node_20232));


var G__20233 = cljs.core.next(seq__19708_20225__$1);
var G__20234 = null;
var G__20235 = (0);
var G__20236 = (0);
seq__19708_20215 = G__20233;
chunk__19709_20216 = G__20234;
count__19710_20217 = G__20235;
i__19711_20218 = G__20236;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq19691){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq19691));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__19750_20238 = cljs.core.seq(scripts);
var chunk__19751_20239 = null;
var count__19752_20240 = (0);
var i__19753_20241 = (0);
while(true){
if((i__19753_20241 < count__19752_20240)){
var vec__19768_20242 = chunk__19751_20239.cljs$core$IIndexed$_nth$arity$2(null,i__19753_20241);
var script_tag_20243 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19768_20242,(0),null);
var script_body_20244 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19768_20242,(1),null);
eval(script_body_20244);


var G__20246 = seq__19750_20238;
var G__20247 = chunk__19751_20239;
var G__20248 = count__19752_20240;
var G__20249 = (i__19753_20241 + (1));
seq__19750_20238 = G__20246;
chunk__19751_20239 = G__20247;
count__19752_20240 = G__20248;
i__19753_20241 = G__20249;
continue;
} else {
var temp__5804__auto___20251 = cljs.core.seq(seq__19750_20238);
if(temp__5804__auto___20251){
var seq__19750_20252__$1 = temp__5804__auto___20251;
if(cljs.core.chunked_seq_QMARK_(seq__19750_20252__$1)){
var c__5568__auto___20253 = cljs.core.chunk_first(seq__19750_20252__$1);
var G__20254 = cljs.core.chunk_rest(seq__19750_20252__$1);
var G__20255 = c__5568__auto___20253;
var G__20256 = cljs.core.count(c__5568__auto___20253);
var G__20257 = (0);
seq__19750_20238 = G__20254;
chunk__19751_20239 = G__20255;
count__19752_20240 = G__20256;
i__19753_20241 = G__20257;
continue;
} else {
var vec__19771_20258 = cljs.core.first(seq__19750_20252__$1);
var script_tag_20259 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19771_20258,(0),null);
var script_body_20260 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19771_20258,(1),null);
eval(script_body_20260);


var G__20261 = cljs.core.next(seq__19750_20252__$1);
var G__20262 = null;
var G__20263 = (0);
var G__20264 = (0);
seq__19750_20238 = G__20261;
chunk__19751_20239 = G__20262;
count__19752_20240 = G__20263;
i__19753_20241 = G__20264;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__19774){
var vec__19775 = p__19774;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19775,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19775,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__19783 = arguments.length;
switch (G__19783) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__19788 = cljs.core.seq(style_keys);
var chunk__19789 = null;
var count__19790 = (0);
var i__19791 = (0);
while(true){
if((i__19791 < count__19790)){
var it = chunk__19789.cljs$core$IIndexed$_nth$arity$2(null,i__19791);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__20266 = seq__19788;
var G__20267 = chunk__19789;
var G__20268 = count__19790;
var G__20269 = (i__19791 + (1));
seq__19788 = G__20266;
chunk__19789 = G__20267;
count__19790 = G__20268;
i__19791 = G__20269;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__19788);
if(temp__5804__auto__){
var seq__19788__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19788__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__19788__$1);
var G__20270 = cljs.core.chunk_rest(seq__19788__$1);
var G__20271 = c__5568__auto__;
var G__20272 = cljs.core.count(c__5568__auto__);
var G__20273 = (0);
seq__19788 = G__20270;
chunk__19789 = G__20271;
count__19790 = G__20272;
i__19791 = G__20273;
continue;
} else {
var it = cljs.core.first(seq__19788__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__20274 = cljs.core.next(seq__19788__$1);
var G__20275 = null;
var G__20276 = (0);
var G__20277 = (0);
seq__19788 = G__20274;
chunk__19789 = G__20275;
count__19790 = G__20276;
i__19791 = G__20277;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k19795,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__19804 = k19795;
var G__19804__$1 = (((G__19804 instanceof cljs.core.Keyword))?G__19804.fqn:null);
switch (G__19804__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k19795,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__19805){
var vec__19806 = p__19805;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19806,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19806,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__19794){
var self__ = this;
var G__19794__$1 = this;
return (new cljs.core.RecordIter((0),G__19794__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this19796,other19797){
var self__ = this;
var this19796__$1 = this;
return (((!((other19797 == null)))) && ((((this19796__$1.constructor === other19797.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19796__$1.x,other19797.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19796__$1.y,other19797.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19796__$1.__extmap,other19797.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k19795){
var self__ = this;
var this__5350__auto____$1 = this;
var G__19809 = k19795;
var G__19809__$1 = (((G__19809 instanceof cljs.core.Keyword))?G__19809.fqn:null);
switch (G__19809__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k19795);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__19794){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__19810 = cljs.core.keyword_identical_QMARK_;
var expr__19811 = k__5352__auto__;
if(cljs.core.truth_((pred__19810.cljs$core$IFn$_invoke$arity$2 ? pred__19810.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__19811) : pred__19810.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__19811)))){
return (new shadow.dom.Coordinate(G__19794,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__19810.cljs$core$IFn$_invoke$arity$2 ? pred__19810.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__19811) : pred__19810.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__19811)))){
return (new shadow.dom.Coordinate(self__.x,G__19794,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__19794),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__19794){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__19794,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__19800){
var extmap__5385__auto__ = (function (){var G__19820 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__19800,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__19800)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__19820);
} else {
return G__19820;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__19800),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__19800),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k19827,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__19831 = k19827;
var G__19831__$1 = (((G__19831 instanceof cljs.core.Keyword))?G__19831.fqn:null);
switch (G__19831__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k19827,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__19832){
var vec__19833 = p__19832;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19833,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19833,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__19826){
var self__ = this;
var G__19826__$1 = this;
return (new cljs.core.RecordIter((0),G__19826__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this19828,other19829){
var self__ = this;
var this19828__$1 = this;
return (((!((other19829 == null)))) && ((((this19828__$1.constructor === other19829.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19828__$1.w,other19829.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19828__$1.h,other19829.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this19828__$1.__extmap,other19829.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k19827){
var self__ = this;
var this__5350__auto____$1 = this;
var G__19844 = k19827;
var G__19844__$1 = (((G__19844 instanceof cljs.core.Keyword))?G__19844.fqn:null);
switch (G__19844__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k19827);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__19826){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__19845 = cljs.core.keyword_identical_QMARK_;
var expr__19846 = k__5352__auto__;
if(cljs.core.truth_((pred__19845.cljs$core$IFn$_invoke$arity$2 ? pred__19845.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__19846) : pred__19845.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__19846)))){
return (new shadow.dom.Size(G__19826,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__19845.cljs$core$IFn$_invoke$arity$2 ? pred__19845.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__19846) : pred__19845.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__19846)))){
return (new shadow.dom.Size(self__.w,G__19826,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__19826),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__19826){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__19826,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__19830){
var extmap__5385__auto__ = (function (){var G__19853 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__19830,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__19830)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__19853);
} else {
return G__19853;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__19830),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__19830),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__20302 = (i + (1));
var G__20303 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__20302;
ret = G__20303;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__19858){
var vec__19859 = p__19858;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19859,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19859,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__19863 = arguments.length;
switch (G__19863) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__20312 = ps;
var G__20313 = (i + (1));
el__$1 = G__20312;
i = G__20313;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__19872 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19872,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19872,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19872,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__19875_20316 = cljs.core.seq(props);
var chunk__19876_20317 = null;
var count__19877_20318 = (0);
var i__19878_20319 = (0);
while(true){
if((i__19878_20319 < count__19877_20318)){
var vec__19893_20320 = chunk__19876_20317.cljs$core$IIndexed$_nth$arity$2(null,i__19878_20319);
var k_20321 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19893_20320,(0),null);
var v_20322 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19893_20320,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_20321);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_20321),v_20322);


var G__20323 = seq__19875_20316;
var G__20324 = chunk__19876_20317;
var G__20325 = count__19877_20318;
var G__20326 = (i__19878_20319 + (1));
seq__19875_20316 = G__20323;
chunk__19876_20317 = G__20324;
count__19877_20318 = G__20325;
i__19878_20319 = G__20326;
continue;
} else {
var temp__5804__auto___20327 = cljs.core.seq(seq__19875_20316);
if(temp__5804__auto___20327){
var seq__19875_20328__$1 = temp__5804__auto___20327;
if(cljs.core.chunked_seq_QMARK_(seq__19875_20328__$1)){
var c__5568__auto___20329 = cljs.core.chunk_first(seq__19875_20328__$1);
var G__20330 = cljs.core.chunk_rest(seq__19875_20328__$1);
var G__20331 = c__5568__auto___20329;
var G__20332 = cljs.core.count(c__5568__auto___20329);
var G__20333 = (0);
seq__19875_20316 = G__20330;
chunk__19876_20317 = G__20331;
count__19877_20318 = G__20332;
i__19878_20319 = G__20333;
continue;
} else {
var vec__19908_20334 = cljs.core.first(seq__19875_20328__$1);
var k_20335 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19908_20334,(0),null);
var v_20336 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19908_20334,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_20335);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_20335),v_20336);


var G__20337 = cljs.core.next(seq__19875_20328__$1);
var G__20338 = null;
var G__20339 = (0);
var G__20340 = (0);
seq__19875_20316 = G__20337;
chunk__19876_20317 = G__20338;
count__19877_20318 = G__20339;
i__19878_20319 = G__20340;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__19932 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19932,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19932,(1),null);
var seq__19935_20341 = cljs.core.seq(node_children);
var chunk__19937_20342 = null;
var count__19938_20343 = (0);
var i__19939_20344 = (0);
while(true){
if((i__19939_20344 < count__19938_20343)){
var child_struct_20345 = chunk__19937_20342.cljs$core$IIndexed$_nth$arity$2(null,i__19939_20344);
if((!((child_struct_20345 == null)))){
if(typeof child_struct_20345 === 'string'){
var text_20353 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_20353),child_struct_20345].join(''));
} else {
var children_20354 = shadow.dom.svg_node(child_struct_20345);
if(cljs.core.seq_QMARK_(children_20354)){
var seq__19959_20355 = cljs.core.seq(children_20354);
var chunk__19961_20356 = null;
var count__19962_20357 = (0);
var i__19963_20358 = (0);
while(true){
if((i__19963_20358 < count__19962_20357)){
var child_20359 = chunk__19961_20356.cljs$core$IIndexed$_nth$arity$2(null,i__19963_20358);
if(cljs.core.truth_(child_20359)){
node.appendChild(child_20359);


var G__20360 = seq__19959_20355;
var G__20361 = chunk__19961_20356;
var G__20362 = count__19962_20357;
var G__20363 = (i__19963_20358 + (1));
seq__19959_20355 = G__20360;
chunk__19961_20356 = G__20361;
count__19962_20357 = G__20362;
i__19963_20358 = G__20363;
continue;
} else {
var G__20364 = seq__19959_20355;
var G__20365 = chunk__19961_20356;
var G__20366 = count__19962_20357;
var G__20367 = (i__19963_20358 + (1));
seq__19959_20355 = G__20364;
chunk__19961_20356 = G__20365;
count__19962_20357 = G__20366;
i__19963_20358 = G__20367;
continue;
}
} else {
var temp__5804__auto___20369 = cljs.core.seq(seq__19959_20355);
if(temp__5804__auto___20369){
var seq__19959_20370__$1 = temp__5804__auto___20369;
if(cljs.core.chunked_seq_QMARK_(seq__19959_20370__$1)){
var c__5568__auto___20371 = cljs.core.chunk_first(seq__19959_20370__$1);
var G__20372 = cljs.core.chunk_rest(seq__19959_20370__$1);
var G__20373 = c__5568__auto___20371;
var G__20374 = cljs.core.count(c__5568__auto___20371);
var G__20375 = (0);
seq__19959_20355 = G__20372;
chunk__19961_20356 = G__20373;
count__19962_20357 = G__20374;
i__19963_20358 = G__20375;
continue;
} else {
var child_20376 = cljs.core.first(seq__19959_20370__$1);
if(cljs.core.truth_(child_20376)){
node.appendChild(child_20376);


var G__20377 = cljs.core.next(seq__19959_20370__$1);
var G__20378 = null;
var G__20379 = (0);
var G__20380 = (0);
seq__19959_20355 = G__20377;
chunk__19961_20356 = G__20378;
count__19962_20357 = G__20379;
i__19963_20358 = G__20380;
continue;
} else {
var G__20381 = cljs.core.next(seq__19959_20370__$1);
var G__20382 = null;
var G__20383 = (0);
var G__20384 = (0);
seq__19959_20355 = G__20381;
chunk__19961_20356 = G__20382;
count__19962_20357 = G__20383;
i__19963_20358 = G__20384;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_20354);
}
}


var G__20385 = seq__19935_20341;
var G__20386 = chunk__19937_20342;
var G__20387 = count__19938_20343;
var G__20388 = (i__19939_20344 + (1));
seq__19935_20341 = G__20385;
chunk__19937_20342 = G__20386;
count__19938_20343 = G__20387;
i__19939_20344 = G__20388;
continue;
} else {
var G__20389 = seq__19935_20341;
var G__20390 = chunk__19937_20342;
var G__20391 = count__19938_20343;
var G__20392 = (i__19939_20344 + (1));
seq__19935_20341 = G__20389;
chunk__19937_20342 = G__20390;
count__19938_20343 = G__20391;
i__19939_20344 = G__20392;
continue;
}
} else {
var temp__5804__auto___20393 = cljs.core.seq(seq__19935_20341);
if(temp__5804__auto___20393){
var seq__19935_20394__$1 = temp__5804__auto___20393;
if(cljs.core.chunked_seq_QMARK_(seq__19935_20394__$1)){
var c__5568__auto___20395 = cljs.core.chunk_first(seq__19935_20394__$1);
var G__20396 = cljs.core.chunk_rest(seq__19935_20394__$1);
var G__20397 = c__5568__auto___20395;
var G__20398 = cljs.core.count(c__5568__auto___20395);
var G__20399 = (0);
seq__19935_20341 = G__20396;
chunk__19937_20342 = G__20397;
count__19938_20343 = G__20398;
i__19939_20344 = G__20399;
continue;
} else {
var child_struct_20409 = cljs.core.first(seq__19935_20394__$1);
if((!((child_struct_20409 == null)))){
if(typeof child_struct_20409 === 'string'){
var text_20410 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_20410),child_struct_20409].join(''));
} else {
var children_20411 = shadow.dom.svg_node(child_struct_20409);
if(cljs.core.seq_QMARK_(children_20411)){
var seq__19965_20415 = cljs.core.seq(children_20411);
var chunk__19967_20416 = null;
var count__19968_20417 = (0);
var i__19969_20418 = (0);
while(true){
if((i__19969_20418 < count__19968_20417)){
var child_20419 = chunk__19967_20416.cljs$core$IIndexed$_nth$arity$2(null,i__19969_20418);
if(cljs.core.truth_(child_20419)){
node.appendChild(child_20419);


var G__20420 = seq__19965_20415;
var G__20421 = chunk__19967_20416;
var G__20422 = count__19968_20417;
var G__20423 = (i__19969_20418 + (1));
seq__19965_20415 = G__20420;
chunk__19967_20416 = G__20421;
count__19968_20417 = G__20422;
i__19969_20418 = G__20423;
continue;
} else {
var G__20424 = seq__19965_20415;
var G__20425 = chunk__19967_20416;
var G__20426 = count__19968_20417;
var G__20427 = (i__19969_20418 + (1));
seq__19965_20415 = G__20424;
chunk__19967_20416 = G__20425;
count__19968_20417 = G__20426;
i__19969_20418 = G__20427;
continue;
}
} else {
var temp__5804__auto___20428__$1 = cljs.core.seq(seq__19965_20415);
if(temp__5804__auto___20428__$1){
var seq__19965_20429__$1 = temp__5804__auto___20428__$1;
if(cljs.core.chunked_seq_QMARK_(seq__19965_20429__$1)){
var c__5568__auto___20430 = cljs.core.chunk_first(seq__19965_20429__$1);
var G__20432 = cljs.core.chunk_rest(seq__19965_20429__$1);
var G__20433 = c__5568__auto___20430;
var G__20434 = cljs.core.count(c__5568__auto___20430);
var G__20435 = (0);
seq__19965_20415 = G__20432;
chunk__19967_20416 = G__20433;
count__19968_20417 = G__20434;
i__19969_20418 = G__20435;
continue;
} else {
var child_20439 = cljs.core.first(seq__19965_20429__$1);
if(cljs.core.truth_(child_20439)){
node.appendChild(child_20439);


var G__20440 = cljs.core.next(seq__19965_20429__$1);
var G__20441 = null;
var G__20442 = (0);
var G__20443 = (0);
seq__19965_20415 = G__20440;
chunk__19967_20416 = G__20441;
count__19968_20417 = G__20442;
i__19969_20418 = G__20443;
continue;
} else {
var G__20444 = cljs.core.next(seq__19965_20429__$1);
var G__20445 = null;
var G__20446 = (0);
var G__20447 = (0);
seq__19965_20415 = G__20444;
chunk__19967_20416 = G__20445;
count__19968_20417 = G__20446;
i__19969_20418 = G__20447;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_20411);
}
}


var G__20448 = cljs.core.next(seq__19935_20394__$1);
var G__20449 = null;
var G__20450 = (0);
var G__20451 = (0);
seq__19935_20341 = G__20448;
chunk__19937_20342 = G__20449;
count__19938_20343 = G__20450;
i__19939_20344 = G__20451;
continue;
} else {
var G__20452 = cljs.core.next(seq__19935_20394__$1);
var G__20453 = null;
var G__20454 = (0);
var G__20455 = (0);
seq__19935_20341 = G__20452;
chunk__19937_20342 = G__20453;
count__19938_20343 = G__20454;
i__19939_20344 = G__20455;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___20463 = arguments.length;
var i__5770__auto___20464 = (0);
while(true){
if((i__5770__auto___20464 < len__5769__auto___20463)){
args__5775__auto__.push((arguments[i__5770__auto___20464]));

var G__20470 = (i__5770__auto___20464 + (1));
i__5770__auto___20464 = G__20470;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq19973){
var G__19975 = cljs.core.first(seq19973);
var seq19973__$1 = cljs.core.next(seq19973);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19975,seq19973__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__19985 = arguments.length;
switch (G__19985) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__16075__auto___20477 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__16076__auto__ = (function (){var switch__15952__auto__ = (function (state_19990){
var state_val_19991 = (state_19990[(1)]);
if((state_val_19991 === (1))){
var state_19990__$1 = state_19990;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_19990__$1,(2),once_or_cleanup);
} else {
if((state_val_19991 === (2))){
var inst_19987 = (state_19990[(2)]);
var inst_19988 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_19990__$1 = (function (){var statearr_19992 = state_19990;
(statearr_19992[(7)] = inst_19987);

return statearr_19992;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_19990__$1,inst_19988);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__15953__auto__ = null;
var shadow$dom$state_machine__15953__auto____0 = (function (){
var statearr_19993 = [null,null,null,null,null,null,null,null];
(statearr_19993[(0)] = shadow$dom$state_machine__15953__auto__);

(statearr_19993[(1)] = (1));

return statearr_19993;
});
var shadow$dom$state_machine__15953__auto____1 = (function (state_19990){
while(true){
var ret_value__15954__auto__ = (function (){try{while(true){
var result__15955__auto__ = switch__15952__auto__(state_19990);
if(cljs.core.keyword_identical_QMARK_(result__15955__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__15955__auto__;
}
break;
}
}catch (e19995){var ex__15956__auto__ = e19995;
var statearr_19996_20480 = state_19990;
(statearr_19996_20480[(2)] = ex__15956__auto__);


if(cljs.core.seq((state_19990[(4)]))){
var statearr_19998_20481 = state_19990;
(statearr_19998_20481[(1)] = cljs.core.first((state_19990[(4)])));

} else {
throw ex__15956__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__15954__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20482 = state_19990;
state_19990 = G__20482;
continue;
} else {
return ret_value__15954__auto__;
}
break;
}
});
shadow$dom$state_machine__15953__auto__ = function(state_19990){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__15953__auto____0.call(this);
case 1:
return shadow$dom$state_machine__15953__auto____1.call(this,state_19990);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__15953__auto____0;
shadow$dom$state_machine__15953__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__15953__auto____1;
return shadow$dom$state_machine__15953__auto__;
})()
})();
var state__16077__auto__ = (function (){var statearr_19999 = f__16076__auto__();
(statearr_19999[(6)] = c__16075__auto___20477);

return statearr_19999;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__16077__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
