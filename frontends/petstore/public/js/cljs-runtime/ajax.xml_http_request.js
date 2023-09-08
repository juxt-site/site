goog.provide('ajax.xml_http_request');
ajax.xml_http_request.ready_state = (function ajax$xml_http_request$ready_state(e){
var G__22504 = e.target.readyState;
var fexpr__22503 = new cljs.core.PersistentArrayMap(null, 5, [(0),new cljs.core.Keyword(null,"not-initialized","not-initialized",-1937378906),(1),new cljs.core.Keyword(null,"connection-established","connection-established",-1403749733),(2),new cljs.core.Keyword(null,"request-received","request-received",2110590540),(3),new cljs.core.Keyword(null,"processing-request","processing-request",-264947221),(4),new cljs.core.Keyword(null,"response-ready","response-ready",245208276)], null);
return (fexpr__22503.cljs$core$IFn$_invoke$arity$1 ? fexpr__22503.cljs$core$IFn$_invoke$arity$1(G__22504) : fexpr__22503.call(null,G__22504));
});
ajax.xml_http_request.append = (function ajax$xml_http_request$append(current,next){
if(cljs.core.truth_(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(next)].join('');
} else {
return next;
}
});
ajax.xml_http_request.process_headers = (function ajax$xml_http_request$process_headers(header_str){
if(cljs.core.truth_(header_str)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (headers,header_line){
if(cljs.core.truth_(goog.string.isEmptyOrWhitespace(header_line))){
return headers;
} else {
var key_value = goog.string.splitLimit(header_line,": ",(2));
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(headers,(key_value[(0)]),ajax.xml_http_request.append,(key_value[(1)]));
}
}),cljs.core.PersistentArrayMap.EMPTY,header_str.split("\r\n"));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});
ajax.xml_http_request.xmlhttprequest = (((typeof goog !== 'undefined') && (typeof goog.global !== 'undefined') && (typeof goog.global.XMLHttpRequest !== 'undefined'))?goog.global.XMLHttpRequest:(((typeof require !== 'undefined'))?(function (){var req = require;
return (req.cljs$core$IFn$_invoke$arity$1 ? req.cljs$core$IFn$_invoke$arity$1("xmlhttprequest") : req.call(null,"xmlhttprequest")).XMLHttpRequest;
})():null));
(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxImpl$_js_ajax_request$arity$3 = (function (this$,p__22519,handler){
var map__22520 = p__22519;
var map__22520__$1 = cljs.core.__destructure_map(map__22520);
var uri = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22520__$1,new cljs.core.Keyword(null,"uri","uri",-774711847));
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22520__$1,new cljs.core.Keyword(null,"method","method",55703592));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22520__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22520__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22520__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(0));
var with_credentials = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__22520__$1,new cljs.core.Keyword(null,"with-credentials","with-credentials",-1163127235),false);
var response_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__22520__$1,new cljs.core.Keyword(null,"response-format","response-format",1664465322));
var this$__$1 = this;
(this$__$1.withCredentials = with_credentials);

(this$__$1.onreadystatechange = (function (p1__22516_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"response-ready","response-ready",245208276),ajax.xml_http_request.ready_state(p1__22516_SHARP_))){
return (handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(this$__$1) : handler.call(null,this$__$1));
} else {
return null;
}
}));

this$__$1.open(method,uri,true);

(this$__$1.timeout = timeout);

var temp__5804__auto___22547 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(response_format);
if(cljs.core.truth_(temp__5804__auto___22547)){
var response_type_22548 = temp__5804__auto___22547;
(this$__$1.responseType = cljs.core.name(response_type_22548));
} else {
}

var seq__22522_22549 = cljs.core.seq(headers);
var chunk__22523_22550 = null;
var count__22524_22551 = (0);
var i__22525_22552 = (0);
while(true){
if((i__22525_22552 < count__22524_22551)){
var vec__22532_22554 = chunk__22523_22550.cljs$core$IIndexed$_nth$arity$2(null,i__22525_22552);
var k_22555 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22532_22554,(0),null);
var v_22556 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22532_22554,(1),null);
this$__$1.setRequestHeader(k_22555,v_22556);


var G__22558 = seq__22522_22549;
var G__22559 = chunk__22523_22550;
var G__22560 = count__22524_22551;
var G__22561 = (i__22525_22552 + (1));
seq__22522_22549 = G__22558;
chunk__22523_22550 = G__22559;
count__22524_22551 = G__22560;
i__22525_22552 = G__22561;
continue;
} else {
var temp__5804__auto___22562 = cljs.core.seq(seq__22522_22549);
if(temp__5804__auto___22562){
var seq__22522_22563__$1 = temp__5804__auto___22562;
if(cljs.core.chunked_seq_QMARK_(seq__22522_22563__$1)){
var c__5568__auto___22564 = cljs.core.chunk_first(seq__22522_22563__$1);
var G__22565 = cljs.core.chunk_rest(seq__22522_22563__$1);
var G__22566 = c__5568__auto___22564;
var G__22567 = cljs.core.count(c__5568__auto___22564);
var G__22568 = (0);
seq__22522_22549 = G__22565;
chunk__22523_22550 = G__22566;
count__22524_22551 = G__22567;
i__22525_22552 = G__22568;
continue;
} else {
var vec__22536_22569 = cljs.core.first(seq__22522_22563__$1);
var k_22570 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22536_22569,(0),null);
var v_22571 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__22536_22569,(1),null);
this$__$1.setRequestHeader(k_22570,v_22571);


var G__22573 = cljs.core.next(seq__22522_22563__$1);
var G__22574 = null;
var G__22575 = (0);
var G__22576 = (0);
seq__22522_22549 = G__22573;
chunk__22523_22550 = G__22574;
count__22524_22551 = G__22575;
i__22525_22552 = G__22576;
continue;
}
} else {
}
}
break;
}

this$__$1.send((function (){var or__5045__auto__ = body;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());

return this$__$1;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxRequest$_abort$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.abort();
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$ = cljs.core.PROTOCOL_SENTINEL);

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_body$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.response;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.status;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_status_text$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.statusText;
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_all_headers$arity$1 = (function (this$){
var this$__$1 = this;
return ajax.xml_http_request.process_headers(this$__$1.getAllResponseHeaders());
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_get_response_header$arity$2 = (function (this$,header){
var this$__$1 = this;
return this$__$1.getResponseHeader(header);
}));

(ajax.xml_http_request.xmlhttprequest.prototype.ajax$protocols$AjaxResponse$_was_aborted$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),this$__$1.readyState);
}));

//# sourceMappingURL=ajax.xml_http_request.js.map
