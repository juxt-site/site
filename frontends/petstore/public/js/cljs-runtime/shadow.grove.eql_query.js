goog.provide('shadow.grove.eql_query');
shadow.grove.eql_query.lazy_seq_QMARK_ = (function shadow$grove$eql_query$lazy_seq_QMARK_(thing){
return (((thing instanceof cljs.core.LazySeq)) && ((!(cljs.core.realized_QMARK_(thing)))));
});
if((typeof shadow !== 'undefined') && (typeof shadow.grove !== 'undefined') && (typeof shadow.grove.eql_query !== 'undefined') && (typeof shadow.grove.eql_query.attr !== 'undefined')){
} else {
shadow.grove.eql_query.attr = (function (){var method_table__5642__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5643__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5644__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5645__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5646__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword("shadow.grove.eql-query","default","shadow.grove.eql-query/default",1209436522)], null),new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__12462 = cljs.core.get_global_hierarchy;
return (fexpr__12462.cljs$core$IFn$_invoke$arity$0 ? fexpr__12462.cljs$core$IFn$_invoke$arity$0() : fexpr__12462.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("shadow.grove.eql-query","attr"),(function (env,db,current,query_part,params){
return query_part;
}),new cljs.core.Keyword("shadow.grove.eql-query","default","shadow.grove.eql-query/default",1209436522),hierarchy__5646__auto__,method_table__5642__auto__,prefer_table__5643__auto__,method_cache__5644__auto__,cached_hierarchy__5645__auto__));
})();
}
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("shadow.grove.eql-query","default","shadow.grove.eql-query/default",1209436522),(function (env,db,current,query_part,params){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(current,query_part,new cljs.core.Keyword("db","undefined","db/undefined",-1970497934));
}));
shadow.grove.eql_query.process_lookup = (function shadow$grove$eql_query$process_lookup(env,db,current,result,kw,params){
var calced = shadow.grove.eql_query.attr.cljs$core$IFn$_invoke$arity$5(env,db,current,kw,params);
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),calced)){
return calced;
} else {
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","undefined","db/undefined",-1970497934),calced)){
return result;
} else {
if(goog.DEBUG){
if(shadow.grove.eql_query.lazy_seq_QMARK_(calced)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(["the lookup of attribute ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(kw)," returned a lazy sequence. Attributes must not return lazy sequences. Realize the result before returning (eg. doall)."].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"kw","kw",1158308175),kw,new cljs.core.Keyword(null,"result","result",1415092211),calced], null));
} else {
}
} else {
}

return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,kw,calced);

}
}
});
shadow.grove.eql_query.process_query_part = (function shadow$grove$eql_query$process_query_part(env,db,current,result,query_part){
if(cljs.core.keyword_identical_QMARK_(query_part,new cljs.core.Keyword("db","all","db/all",892118348))){
return cljs.core.transient$(current);
} else {
if((query_part instanceof cljs.core.Keyword)){
return shadow.grove.eql_query.process_lookup(env,db,current,result,query_part,cljs.core.PersistentArrayMap.EMPTY);
} else {
if(cljs.core.list_QMARK_(query_part)){
var vec__12467 = query_part;
var kw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12467,(0),null);
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12467,(1),null);
return shadow.grove.eql_query.process_lookup(env,db,current,result,kw,params);
} else {
if(cljs.core.map_QMARK_(query_part)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(query_part))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("join map with more than one entry",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-part","query-part",-130059393),query_part], null));
}

var vec__12472 = cljs.core.first(query_part);
var join_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12472,(0),null);
var join_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12472,(1),null);
if(cljs.core.vector_QMARK_(join_attrs)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("join value must be a vector",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-part","query-part",-130059393),query_part], null));
}

if((join_key instanceof cljs.core.Keyword)){
var join_val = cljs.core.get.cljs$core$IFn$_invoke$arity$3(current,join_key,new cljs.core.Keyword("shadow.grove.eql-query","missing","shadow.grove.eql-query/missing",-735544437));
var join_val__$1 = ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("shadow.grove.eql-query","missing","shadow.grove.eql-query/missing",-735544437),join_val))?join_val:shadow.grove.eql_query.attr.cljs$core$IFn$_invoke$arity$5(env,db,current,join_key,cljs.core.PersistentArrayMap.EMPTY));
if(cljs.core.keyword_identical_QMARK_(join_val__$1,new cljs.core.Keyword("db","loading","db/loading",-737049547))){
return join_val__$1;
} else {
if(cljs.core.keyword_identical_QMARK_(join_val__$1,new cljs.core.Keyword("db","undefined","db/undefined",-1970497934))){
return result;
} else {
if((join_val__$1 == null)){
return result;
} else {
if(shadow.grove.db.ident_QMARK_(join_val__$1)){
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$3(db,join_val__$1,new cljs.core.Keyword("shadow.grove.eql-query","missing","shadow.grove.eql-query/missing",-735544437));
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("shadow.grove.eql-query","missing","shadow.grove.eql-query/missing",-735544437),val)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,join_key,new cljs.core.Keyword("shadow.grove.eql-query","not-found","shadow.grove.eql-query/not-found",18009254));
} else {
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),val)){
return val;
} else {
var query_val = shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,val,join_attrs);
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),query_val)){
return query_val;
} else {
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,join_key,query_val);

}

}
}
} else {
if(cljs.core.map_QMARK_(join_val__$1)){
var query_val = shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,join_val__$1,join_attrs);
if(cljs.core.keyword_identical_QMARK_(query_val,new cljs.core.Keyword("db","loading","db/loading",-737049547))){
return query_val;
} else {
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,join_key,query_val);

}
} else {
if(cljs.core.coll_QMARK_(join_val__$1)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,join_key,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (join_item){
if(shadow.grove.db.ident_QMARK_(join_item)){
var joined = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,join_item);
if(cljs.core.map_QMARK_(joined)){
return shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,joined,join_attrs);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("coll item join missing",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"join-key","join-key",750199789),join_key,new cljs.core.Keyword(null,"join-val","join-val",-990533655),join_val__$1,new cljs.core.Keyword(null,"join-item","join-item",-896163302),join_item], null));
}
} else {
if(cljs.core.map_QMARK_(join_item)){
return shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,join_item,join_attrs);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("join-value contained unknown thing",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"join-key","join-key",750199789),join_key,new cljs.core.Keyword(null,"join-val","join-val",-990533655),join_val__$1,new cljs.core.Keyword(null,"join-item","join-item",-896163302),join_item,new cljs.core.Keyword(null,"current","current",-1088038603),current], null));

}
}
}),join_val__$1));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("don't know how to join",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query-part","query-part",-130059393),query_part,new cljs.core.Keyword(null,"join-val","join-val",-990533655),join_val__$1,new cljs.core.Keyword(null,"join-key","join-key",750199789),join_key], null));

}
}
}
}
}
}
} else {
if(shadow.grove.db.ident_QMARK_(join_key)){
var join_val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,join_key);
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),join_val)){
return join_val;
} else {
if((join_val == null)){
return result;
} else {
var query_val = shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,join_val,join_attrs);
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),query_val)){
return query_val;
} else {
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(result,join_key,query_val);

}

}
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("failed to join",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query-part","query-part",-130059393),query_part,new cljs.core.Keyword(null,"current","current",-1088038603),current,new cljs.core.Keyword(null,"result","result",1415092211),result], null));

}
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid query part",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"part","part",77757738),query_part], null));

}
}
}
}
});
shadow.grove.eql_query.query = (function shadow$grove$eql_query$query(var_args){
var G__12509 = arguments.length;
switch (G__12509) {
case 3:
return shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$3 = (function (env,db,query_data){
return shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4(env,db,db,query_data);
}));

(shadow.grove.eql_query.query.cljs$core$IFn$_invoke$arity$4 = (function (env,db,current,query_data){
if((!((env == null)))){
} else {
throw (new Error("Assert failed: (some? env)"));
}

if(cljs.core.map_QMARK_(db)){
} else {
throw (new Error("Assert failed: (map? db)"));
}

if(cljs.core.map_QMARK_(current)){
} else {
throw (new Error("Assert failed: (map? current)"));
}

if(cljs.core.vector_QMARK_(query_data)){
} else {
throw (new Error("Assert failed: (vector? query-data)"));
}

var len = cljs.core.count(query_data);
var current__$1 = current;
var result = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);
var i = (0);
while(true){
if((i >= len)){
return cljs.core.persistent_BANG_(result);
} else {
var query_part = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(query_data,i);
var result__$1 = shadow.grove.eql_query.process_query_part(env,db,current__$1,result,query_part);
if(cljs.core.keyword_identical_QMARK_(result__$1,new cljs.core.Keyword("db","loading","db/loading",-737049547))){
return result__$1;
} else {
var G__12537 = current__$1;
var G__12538 = result__$1;
var G__12539 = (i + (1));
current__$1 = G__12537;
result = G__12538;
i = G__12539;
continue;
}
}
break;
}
}));

(shadow.grove.eql_query.query.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.grove.eql_query.js.map
