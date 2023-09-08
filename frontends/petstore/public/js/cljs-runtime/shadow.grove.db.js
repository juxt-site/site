goog.provide('shadow.grove.db');
shadow.grove.db.make_ident = (function shadow$grove$db$make_ident(type,id){
return shadow.grove.db.ident.__GT_Ident(type,id,null);
});
shadow.grove.db.ident_QMARK_ = (function shadow$grove$db$ident_QMARK_(thing){
return shadow.grove.db.ident.ident_QMARK_(thing);
});
shadow.grove.db.ident_key = (function shadow$grove$db$ident_key(thing){
if(shadow.grove.db.ident.ident_QMARK_(thing)){
} else {
throw (new Error("Assert failed: (ident/ident? thing)"));
}

return thing.entity_type;
});
shadow.grove.db.ident_val = (function shadow$grove$db$ident_val(thing){
if(shadow.grove.db.ident.ident_QMARK_(thing)){
} else {
throw (new Error("Assert failed: (ident/ident? thing)"));
}

return thing.id;
});
shadow.grove.db.ident_as_vec = (function shadow$grove$db$ident_as_vec(ident){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [shadow.grove.db.ident_key(ident),shadow.grove.db.ident_val(ident)], null);
});
shadow.grove.db.parse_joins = (function shadow$grove$db$parse_joins(spec,joins){
return cljs.core.reduce_kv((function (spec__$1,attr,val){
if((!(((cljs.core.vector_QMARK_(val)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"one","one",935007904),cljs.core.first(val))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"many","many",1092119164),cljs.core.first(val))))))))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid join",joins);
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(spec__$1,new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.assoc,attr,cljs.core.second(val));
}
}),spec,joins);
});
shadow.grove.db.parse_primary_key = (function shadow$grove$db$parse_primary_key(p__12175,p__12176){
var map__12177 = p__12175;
var map__12177__$1 = cljs.core.__destructure_map(map__12177);
var spec = map__12177__$1;
var entity_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12177__$1,new cljs.core.Keyword(null,"entity-type","entity-type",-1957300125));
var map__12178 = p__12176;
var map__12178__$1 = cljs.core.__destructure_map(map__12178);
var config = map__12178__$1;
var primary_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12178__$1,new cljs.core.Keyword(null,"primary-key","primary-key",1422512605));
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core.not(primary_key);
if(and__5043__auto__){
return new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869).cljs$core$IFn$_invoke$arity$1(config);
} else {
return and__5043__auto__;
}
})())){
return spec;
} else {
if((primary_key instanceof cljs.core.Keyword)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869),(function (p1__12173_SHARP_){
return shadow.grove.db.make_ident(entity_type,cljs.core.get.cljs$core$IFn$_invoke$arity$2(p1__12173_SHARP_,primary_key));
}));
} else {
if(((cljs.core.vector_QMARK_(primary_key)) && (cljs.core.every_QMARK_(cljs.core.keyword_QMARK_,primary_key)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869),(function (item){
return shadow.grove.db.make_ident(entity_type,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12174_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(item,p1__12174_SHARP_);
}),primary_key));
}));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid :primary-key",config);

}
}
}
});
shadow.grove.db.parse_entity_spec = (function shadow$grove$db$parse_entity_spec(entity_type,p__12183){
var map__12184 = p__12183;
var map__12184__$1 = cljs.core.__destructure_map(map__12184);
var config = map__12184__$1;
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12184__$1,new cljs.core.Keyword(null,"joins","joins",1033962699));
if((entity_type instanceof cljs.core.Keyword)){
} else {
throw (new Error("Assert failed: (keyword? entity-type)"));
}

return shadow.grove.db.parse_joins(shadow.grove.db.parse_primary_key(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(config,new cljs.core.Keyword(null,"entity-type","entity-type",-1957300125),entity_type,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.PersistentArrayMap.EMPTY], 0)),config),joins);
});
shadow.grove.db.parse_schema = (function shadow$grove$db$parse_schema(spec){
return cljs.core.reduce_kv((function (schema,key,p__12190){
var map__12191 = p__12190;
var map__12191__$1 = cljs.core.__destructure_map(map__12191);
var config = map__12191__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12191__$1,new cljs.core.Keyword(null,"type","type",1174270348));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"entity","entity",-450970276),type)){
return cljs.core.assoc_in(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entities","entities",1940967403),key], null),shadow.grove.db.parse_entity_spec(key,config));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unknown type",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"config","config",994861415),config], null));

}
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entities","entities",1940967403),cljs.core.PersistentArrayMap.EMPTY], null),spec);
});
shadow.grove.db.nav_fn = (function shadow$grove$db$nav_fn(db,key,val){
if(shadow.grove.db.ident_QMARK_(val)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,val);
} else {
if(cljs.core.coll_QMARK_(val)){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(val,cljs.core.assoc,new cljs.core.Symbol("clojure.core.protocols","datafy","clojure.core.protocols/datafy",707534751,null),(function (m){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(m,cljs.core.assoc,new cljs.core.Symbol("clojure.core.protocols","nav","clojure.core.protocols/nav",298936762,null),(function (m__$1,key__$1,val__$1){
if(shadow.grove.db.ident_QMARK_(val__$1)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,val__$1);
} else {
return val__$1;
}
}));
}));
} else {
return val;

}
}
});
shadow.grove.db.configure = (function shadow$grove$db$configure(init_db,spec){
var schema = shadow.grove.db.parse_schema(spec);
var m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("shadow.grove.db","schema","shadow.grove.db/schema",1093729226),schema,new cljs.core.Keyword("shadow.grove.db","ident-types","shadow.grove.db/ident-types",-1275004257),cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"entities","entities",1940967403).cljs$core$IFn$_invoke$arity$1(schema))),new cljs.core.Symbol("clojure.core.protocols","nav","clojure.core.protocols/nav",298936762,null),shadow.grove.db.nav_fn], null);
return cljs.core.with_meta(init_db,m);
});
shadow.grove.db.coll_key = (function shadow$grove$db$coll_key(thing){
if(shadow.grove.db.ident_QMARK_(thing)){
} else {
throw (new Error("Assert failed: (ident? thing)"));
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.db","all","shadow.grove.db/all",-709808235),shadow.grove.db.ident_key(thing)], null);
});
shadow.grove.db.normalize_STAR_ = (function shadow$grove$db$normalize_STAR_(imports,schema,entity_type,item){
var map__12195 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entities","entities",1940967403),entity_type], null));
var map__12195__$1 = cljs.core.__destructure_map(map__12195);
var ent_config = map__12195__$1;
var ident_gen = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12195__$1,new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869));
var id_pred = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12195__$1,new cljs.core.Keyword(null,"id-pred","id-pred",-1220295264));
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12195__$1,new cljs.core.Keyword(null,"joins","joins",1033962699));
var item_ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(item,new cljs.core.Keyword("db","ident","db/ident",-737096));
var ident = (ident_gen.cljs$core$IFn$_invoke$arity$1 ? ident_gen.cljs$core$IFn$_invoke$arity$1(item) : ident_gen.call(null,item));
var _ = (cljs.core.truth_((function (){var and__5043__auto__ = item_ident;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(item_ident,ident);
} else {
return and__5043__auto__;
}
})())?(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("item contained ident but we generated a different one",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"item","item",249373802),item,new cljs.core.Keyword(null,"ident","ident",-742346),ident], null))})():null);
var item__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(item_ident,ident))?item:cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(item,new cljs.core.Keyword("db","ident","db/ident",-737096),ident));
var item__$2 = cljs.core.reduce_kv((function (item__$2,key,join_type){
var curr_val = cljs.core.get.cljs$core$IFn$_invoke$arity$3(item__$2,key,new cljs.core.Keyword("shadow.grove.db","skip","shadow.grove.db/skip",-1016607174));
var norm_val = ((cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("shadow.grove.db","skip","shadow.grove.db/skip",-1016607174),curr_val))?curr_val:((shadow.grove.db.ident_QMARK_(curr_val))?new cljs.core.Keyword("shadow.grove.db","skip","shadow.grove.db/skip",-1016607174):((cljs.core.map_QMARK_(curr_val))?(shadow.grove.db.normalize_STAR_.cljs$core$IFn$_invoke$arity$4 ? shadow.grove.db.normalize_STAR_.cljs$core$IFn$_invoke$arity$4(imports,schema,join_type,curr_val) : shadow.grove.db.normalize_STAR_.call(null,imports,schema,join_type,curr_val)):((cljs.core.vector_QMARK_(curr_val))?cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__12194_SHARP_){
return (shadow.grove.db.normalize_STAR_.cljs$core$IFn$_invoke$arity$4 ? shadow.grove.db.normalize_STAR_.cljs$core$IFn$_invoke$arity$4(imports,schema,join_type,p1__12194_SHARP_) : shadow.grove.db.normalize_STAR_.call(null,imports,schema,join_type,p1__12194_SHARP_));
}),curr_val):(((!((curr_val == null))))?shadow.grove.db.make_ident(join_type,curr_val):(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unexpected value in join attr",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"item","item",249373802),item__$2,new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"val","val",128701612),curr_val,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type], null))})()
)))));
if(cljs.core.keyword_identical_QMARK_(norm_val,new cljs.core.Keyword("shadow.grove.db","skip","shadow.grove.db/skip",-1016607174))){
return item__$2;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(item__$2,key,norm_val);
}
}),item__$1,joins);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(imports,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ident,item__$2], null));

return ident;
});
/**
 * returns a seq of [[ident item] ...] tuples
 */
shadow.grove.db.normalize = (function shadow$grove$db$normalize(schema,entity_type,vals){
var imports = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
if(cljs.core.map_QMARK_(vals)){
shadow.grove.db.normalize_STAR_(imports,schema,entity_type,vals);
} else {
if(cljs.core.sequential_QMARK_(vals)){
var seq__12202_12487 = cljs.core.seq(vals);
var chunk__12203_12488 = null;
var count__12204_12489 = (0);
var i__12205_12490 = (0);
while(true){
if((i__12205_12490 < count__12204_12489)){
var item_12491 = chunk__12203_12488.cljs$core$IIndexed$_nth$arity$2(null,i__12205_12490);
shadow.grove.db.normalize_STAR_(imports,schema,entity_type,item_12491);


var G__12492 = seq__12202_12487;
var G__12493 = chunk__12203_12488;
var G__12494 = count__12204_12489;
var G__12495 = (i__12205_12490 + (1));
seq__12202_12487 = G__12492;
chunk__12203_12488 = G__12493;
count__12204_12489 = G__12494;
i__12205_12490 = G__12495;
continue;
} else {
var temp__5804__auto___12496 = cljs.core.seq(seq__12202_12487);
if(temp__5804__auto___12496){
var seq__12202_12497__$1 = temp__5804__auto___12496;
if(cljs.core.chunked_seq_QMARK_(seq__12202_12497__$1)){
var c__5568__auto___12498 = cljs.core.chunk_first(seq__12202_12497__$1);
var G__12499 = cljs.core.chunk_rest(seq__12202_12497__$1);
var G__12500 = c__5568__auto___12498;
var G__12501 = cljs.core.count(c__5568__auto___12498);
var G__12502 = (0);
seq__12202_12487 = G__12499;
chunk__12203_12488 = G__12500;
count__12204_12489 = G__12501;
i__12205_12490 = G__12502;
continue;
} else {
var item_12503 = cljs.core.first(seq__12202_12497__$1);
shadow.grove.db.normalize_STAR_(imports,schema,entity_type,item_12503);


var G__12504 = cljs.core.next(seq__12202_12497__$1);
var G__12505 = null;
var G__12506 = (0);
var G__12507 = (0);
seq__12202_12487 = G__12504;
chunk__12203_12488 = G__12505;
count__12204_12489 = G__12506;
i__12205_12490 = G__12507;
continue;
}
} else {
}
}
break;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot import",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"entity-type","entity-type",-1957300125),entity_type,new cljs.core.Keyword(null,"vals","vals",768058733),vals], null));

}
}

return cljs.core.deref(imports);
});
shadow.grove.db.set_conj = (function shadow$grove$db$set_conj(x,y){
if((x == null)){
return cljs.core.PersistentHashSet.createAsIfByAssoc([y]);
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(x,y);
}
});
shadow.grove.db.merge_or_replace = (function shadow$grove$db$merge_or_replace(left,right){
if(cljs.core.keyword_identical_QMARK_(new cljs.core.Keyword("db","loading","db/loading",-737049547),left)){
return right;
} else {
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([left,right], 0));
}
});
shadow.grove.db.merge_imports = (function shadow$grove$db$merge_imports(data,imports){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (data__$1,p__12222){
var vec__12223 = p__12222;
var ident = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12223,(0),null);
var item = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12223,(1),null);
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(data__$1,ident,shadow.grove.db.merge_or_replace,item);
}),data,imports);
});
shadow.grove.db.merge_seq = (function shadow$grove$db$merge_seq(var_args){
var G__12235 = arguments.length;
switch (G__12235) {
case 3:
return shadow.grove.db.merge_seq.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.grove.db.merge_seq.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.db.merge_seq.cljs$core$IFn$_invoke$arity$3 = (function (data,entity_type,coll){
return shadow.grove.db.merge_seq.cljs$core$IFn$_invoke$arity$4(data,entity_type,coll,null);
}));

(shadow.grove.db.merge_seq.cljs$core$IFn$_invoke$arity$4 = (function (data,entity_type,coll,target_path_or_fn){
if(cljs.core.sequential_QMARK_(coll)){
} else {
throw (new Error("Assert failed: (sequential? coll)"));
}

var map__12245 = cljs.core.meta(data);
var map__12245__$1 = cljs.core.__destructure_map(map__12245);
var schema = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12245__$1,new cljs.core.Keyword("shadow.grove.db","schema","shadow.grove.db/schema",1093729226));
var _ = (cljs.core.truth_(schema)?null:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("data missing schema",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null))})());
var map__12246 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entities","entities",1940967403),entity_type], null));
var map__12246__$1 = cljs.core.__destructure_map(map__12246);
var entity_spec = map__12246__$1;
var ident_gen = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12246__$1,new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869));
var ___$1 = (cljs.core.truth_(entity_spec)?null:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("entity not defined",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entity-type","entity-type",-1957300125),entity_type], null))})());
var idents = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(ident_gen,coll));
var imports = shadow.grove.db.normalize(schema,entity_type,coll);
var G__12247 = shadow.grove.db.merge_imports(data,imports);
var G__12247__$1 = ((cljs.core.vector_QMARK_(target_path_or_fn))?cljs.core.assoc_in(G__12247,target_path_or_fn,idents):G__12247);
if(cljs.core.fn_QMARK_(target_path_or_fn)){
return (target_path_or_fn.cljs$core$IFn$_invoke$arity$2 ? target_path_or_fn.cljs$core$IFn$_invoke$arity$2(G__12247__$1,idents) : target_path_or_fn.call(null,G__12247__$1,idents));
} else {
return G__12247__$1;
}
}));

(shadow.grove.db.merge_seq.cljs$lang$maxFixedArity = 4);

shadow.grove.db.add = (function shadow$grove$db$add(var_args){
var G__12250 = arguments.length;
switch (G__12250) {
case 3:
return shadow.grove.db.add.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.grove.db.add.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.grove.db.add.cljs$core$IFn$_invoke$arity$3 = (function (data,entity_type,item){
return shadow.grove.db.add.cljs$core$IFn$_invoke$arity$4(data,entity_type,item,null);
}));

(shadow.grove.db.add.cljs$core$IFn$_invoke$arity$4 = (function (data,entity_type,item,target_path){
if(cljs.core.map_QMARK_(item)){
} else {
throw (new Error("Assert failed: (map? item)"));
}

var map__12254 = cljs.core.meta(data);
var map__12254__$1 = cljs.core.__destructure_map(map__12254);
var schema = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12254__$1,new cljs.core.Keyword("shadow.grove.db","schema","shadow.grove.db/schema",1093729226));
var _ = (cljs.core.truth_(schema)?null:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("data missing schema",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null))})());
var map__12255 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(schema,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"entities","entities",1940967403),entity_type], null));
var map__12255__$1 = cljs.core.__destructure_map(map__12255);
var entity_spec = map__12255__$1;
var ident_gen = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12255__$1,new cljs.core.Keyword(null,"ident-gen","ident-gen",872410869));
var ___$1 = (cljs.core.truth_(entity_spec)?null:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("entity not defined",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"entity-type","entity-type",-1957300125),entity_type], null))})());
var ident = (ident_gen.cljs$core$IFn$_invoke$arity$1 ? ident_gen.cljs$core$IFn$_invoke$arity$1(item) : ident_gen.call(null,item));
var imports = shadow.grove.db.normalize(schema,entity_type,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [item], null));
var G__12256 = shadow.grove.db.merge_imports(data,imports);
if(cljs.core.truth_(target_path)){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__12256,target_path,cljs.core.conj,ident);
} else {
return G__12256;
}
}));

(shadow.grove.db.add.cljs$lang$maxFixedArity = 4);

shadow.grove.db.update_entity = (function shadow$grove$db$update_entity(var_args){
var args__5775__auto__ = [];
var len__5769__auto___12529 = arguments.length;
var i__5770__auto___12530 = (0);
while(true){
if((i__5770__auto___12530 < len__5769__auto___12529)){
args__5775__auto__.push((arguments[i__5770__auto___12530]));

var G__12531 = (i__5770__auto___12530 + (1));
i__5770__auto___12530 = G__12531;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((4) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((4)),(0),null)):null);
return shadow.grove.db.update_entity.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__5776__auto__);
});

(shadow.grove.db.update_entity.cljs$core$IFn$_invoke$arity$variadic = (function (data,entity_type,id,update_fn,args){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(data,shadow.grove.db.make_ident(entity_type,id),(function (p1__12265_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(update_fn,p1__12265_SHARP_,args);
}));
}));

(shadow.grove.db.update_entity.cljs$lang$maxFixedArity = (4));

/** @this {Function} */
(shadow.grove.db.update_entity.cljs$lang$applyTo = (function (seq12266){
var G__12267 = cljs.core.first(seq12266);
var seq12266__$1 = cljs.core.next(seq12266);
var G__12268 = cljs.core.first(seq12266__$1);
var seq12266__$2 = cljs.core.next(seq12266__$1);
var G__12269 = cljs.core.first(seq12266__$2);
var seq12266__$3 = cljs.core.next(seq12266__$2);
var G__12270 = cljs.core.first(seq12266__$3);
var seq12266__$4 = cljs.core.next(seq12266__$3);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__12267,G__12268,G__12269,G__12270,seq12266__$4);
}));

shadow.grove.db.all_idents_of = (function shadow$grove$db$all_idents_of(db,entity_type){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.grove.db","all","shadow.grove.db/all",-709808235),entity_type], null));
});
shadow.grove.db.all_of = (function shadow$grove$db$all_of(db,entity_type){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__12286_SHARP_){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(db,p1__12286_SHARP_);
}),shadow.grove.db.all_idents_of(db,entity_type));
});
shadow.grove.db.remove = (function shadow$grove$db$remove(data,thing){
if(shadow.grove.db.ident_QMARK_(thing)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(data,thing);
} else {
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core.map_QMARK_(thing);
if(and__5043__auto__){
return new cljs.core.Keyword("db","ident","db/ident",-737096).cljs$core$IFn$_invoke$arity$1(thing);
} else {
return and__5043__auto__;
}
})())){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword("db","ident","db/ident",-737096).cljs$core$IFn$_invoke$arity$1(thing));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("don't know how to remove thing",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"thing","thing",270525715),thing], null));

}
}
});
shadow.grove.db.remove_idents = (function shadow$grove$db$remove_idents(data,idents){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(shadow.grove.db.remove,data,idents);
});

/**
 * @interface
 */
shadow.grove.db.IObserved = function(){};

var shadow$grove$db$IObserved$observed_keys$dyn_12532 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.db.observed_keys[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.db.observed_keys["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IObserved.observed-keys",this$);
}
}
});
shadow.grove.db.observed_keys = (function shadow$grove$db$observed_keys(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$db$IObserved$observed_keys$arity$1 == null)))))){
return this$.shadow$grove$db$IObserved$observed_keys$arity$1(this$);
} else {
return shadow$grove$db$IObserved$observed_keys$dyn_12532(this$);
}
});


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {shadow.grove.db.IObserved}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.grove.db.ObservedData = (function (keys_used,data){
this.keys_used = keys_used;
this.data = data;
this.cljs$lang$protocol_mask$partition0$ = 132864;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.grove.db.ObservedData.prototype.shadow$grove$db$IObserved$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.db.ObservedData.prototype.shadow$grove$db$IObserved$observed_keys$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.persistent_BANG_(self__.keys_used);
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.data.cljs$core$IMeta$_meta$arity$1(null);
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("observed data is read-only",cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return self__.data.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(null,k);
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (coll,k,v){
var self__ = this;
var coll__$1 = this;
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("observed data is read-only, assoc not allowed",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"k","k",-2146297393),k,new cljs.core.Keyword(null,"v","v",21465059),v], null));
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (_,key){
var self__ = this;
var ___$1 = this;
if((key == null)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot read nil key",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

(self__.keys_used = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_used,key));

return self__.data.cljs$core$ILookup$_lookup$arity$2(null,key);
}));

(shadow.grove.db.ObservedData.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (_,key,default$){
var self__ = this;
var ___$1 = this;
if((key == null)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("cannot read nil key",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

(self__.keys_used = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_used,key));

return self__.data.cljs$core$ILookup$_lookup$arity$3(null,key,default$);
}));

(shadow.grove.db.ObservedData.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"keys-used","keys-used",-35184854,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null))], null);
}));

(shadow.grove.db.ObservedData.cljs$lang$type = true);

(shadow.grove.db.ObservedData.cljs$lang$ctorStr = "shadow.grove.db/ObservedData");

(shadow.grove.db.ObservedData.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.db/ObservedData");
}));

/**
 * Positional factory function for shadow.grove.db/ObservedData.
 */
shadow.grove.db.__GT_ObservedData = (function shadow$grove$db$__GT_ObservedData(keys_used,data){
return (new shadow.grove.db.ObservedData(keys_used,data));
});

shadow.grove.db.observed = (function shadow$grove$db$observed(data){
return (new shadow.grove.db.ObservedData(cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY),data));
});

/**
 * @interface
 */
shadow.grove.db.ITxCommit = function(){};

var shadow$grove$db$ITxCommit$commit_BANG_$dyn_12536 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.grove.db.commit_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.grove.db.commit_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("ITxCommit.commit!",this$);
}
}
});
shadow.grove.db.commit_BANG_ = (function shadow$grove$db$commit_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$grove$db$ITxCommit$commit_BANG_$arity$1 == null)))))){
return this$.shadow$grove$db$ITxCommit$commit_BANG_$arity$1(this$);
} else {
return shadow$grove$db$ITxCommit$commit_BANG_$dyn_12536(this$);
}
});


/**
* @constructor
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {shadow.grove.db.ITxCommit}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.grove.db.TransactedData = (function (data,keys_new,keys_updated,keys_removed,completed_ref){
this.data = data;
this.keys_new = keys_new;
this.keys_updated = keys_updated;
this.keys_removed = keys_removed;
this.completed_ref = completed_ref;
this.cljs$lang$protocol_mask$partition0$ = 165642;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.grove.db.TransactedData.prototype.check_completed_BANG_ = (function (){
var self__ = this;
var this$ = this;
if(cljs.core.truth_(cljs.core.deref(self__.completed_ref))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("transaction concluded, don't hold on to db while in tx",cljs.core.PersistentArrayMap.EMPTY);
} else {
return null;
}
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
this$__$1.check_completed_BANG_();

return self__.data.cljs$core$ILookup$_lookup$arity$2(null,key);
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this$,key,default$){
var self__ = this;
var this$__$1 = this;
this$__$1.check_completed_BANG_();

return self__.data.cljs$core$ILookup$_lookup$arity$3(null,key,default$);
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.data.cljs$core$IMeta$_meta$arity$1(null);
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
this$__$1.check_completed_BANG_();

return self__.data.cljs$core$ICounted$_count$arity$1(null);
}));

(shadow.grove.db.TransactedData.prototype.shadow$grove$db$ITxCommit$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.grove.db.TransactedData.prototype.shadow$grove$db$ITxCommit$commit_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.vreset_BANG_(self__.completed_ref,true);

return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"data","data",-232669377),self__.data,new cljs.core.Keyword(null,"keys-new","keys-new",546185618),cljs.core.persistent_BANG_(self__.keys_new),new cljs.core.Keyword(null,"keys-updated","keys-updated",1209111301),cljs.core.persistent_BANG_(self__.keys_updated),new cljs.core.Keyword(null,"keys-removed","keys-removed",-110314827),cljs.core.persistent_BANG_(self__.keys_removed)], null);
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
this$__$1.check_completed_BANG_();

var key_is_ident_QMARK_ = shadow.grove.db.ident_QMARK_(key);
var next_data = (function (){var G__12392 = self__.data.cljs$core$IMap$_dissoc$arity$2(null,key);
if(key_is_ident_QMARK_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(G__12392,shadow.grove.db.coll_key(key),cljs.core.disj,key);
} else {
return G__12392;
}
})();
var next_removed = (function (){var G__12396 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_removed,key);
if(key_is_ident_QMARK_){
return cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(G__12396,shadow.grove.db.coll_key(key));
} else {
return G__12396;
}
})();
return (new shadow.grove.db.TransactedData(next_data,self__.keys_new,self__.keys_updated,next_removed,self__.completed_ref));
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (coll,k){
var self__ = this;
var coll__$1 = this;
return self__.data.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(null,k);
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this$,key,value){
var self__ = this;
var this$__$1 = this;
this$__$1.check_completed_BANG_();

if((key == null)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("nil key not allowed",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),value], null));
} else {
}

var prev_val = self__.data.cljs$core$ILookup$_lookup$arity$3(null,key,new cljs.core.Keyword("shadow.grove.db","not-found","shadow.grove.db/not-found",1006210955));
var is_ident_update_QMARK_ = ((shadow.grove.db.ident_QMARK_(key)) && (cljs.core.contains_QMARK_(new cljs.core.Keyword("shadow.grove.db","ident-types","shadow.grove.db/ident-types",-1275004257).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(self__.data)),shadow.grove.db.ident_key(key))));
if((prev_val === value)){
return this$__$1;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("shadow.grove.db","not-found","shadow.grove.db/not-found",1006210955),prev_val)){
if((!(is_ident_update_QMARK_))){
return (new shadow.grove.db.TransactedData(self__.data.cljs$core$IAssociative$_assoc$arity$3(null,key,value),cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_new,key),self__.keys_updated,self__.keys_removed,self__.completed_ref));
} else {
return (new shadow.grove.db.TransactedData(cljs.core.update.cljs$core$IFn$_invoke$arity$4(self__.data.cljs$core$IAssociative$_assoc$arity$3(null,key,value),shadow.grove.db.coll_key(key),shadow.grove.db.set_conj,key),cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_new,key),cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_updated,shadow.grove.db.coll_key(key)),self__.keys_removed,self__.completed_ref));
}
} else {
if((!(is_ident_update_QMARK_))){
return (new shadow.grove.db.TransactedData(self__.data.cljs$core$IAssociative$_assoc$arity$3(null,key,value),self__.keys_new,cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_updated,key),self__.keys_removed,self__.completed_ref));
} else {
return (new shadow.grove.db.TransactedData(self__.data.cljs$core$IAssociative$_assoc$arity$3(null,key,value),self__.keys_new,cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(self__.keys_updated,key),shadow.grove.db.coll_key(key)),self__.keys_removed,self__.completed_ref));
}
}
}
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$ICollection$_conj$arity$2 = (function (coll,entry){
var self__ = this;
var coll__$1 = this;
if(cljs.core.vector_QMARK_(entry)){
return coll__$1.cljs$core$IAssociative$_assoc$arity$3(null,entry.cljs$core$IIndexed$_nth$arity$2(null,(0)),entry.cljs$core$IIndexed$_nth$arity$2(null,(1)));
} else {
var ret = coll__$1;
var es = cljs.core.seq(entry);
while(true){
if((es == null)){
return ret;
} else {
var e = cljs.core.first(es);
if(cljs.core.vector_QMARK_(e)){
var G__12550 = cljs.core._assoc(ret,e.cljs$core$IIndexed$_nth$arity$2(null,(0)),e.cljs$core$IIndexed$_nth$arity$2(null,(1)));
var G__12551 = cljs.core.next(es);
ret = G__12550;
es = G__12551;
continue;
} else {
throw (new Error("conj on a map takes map entries or seqables of map entries"));
}
}
break;
}
}
}));

(shadow.grove.db.TransactedData.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.data;
}));

(shadow.grove.db.TransactedData.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"not-native","not-native",-236392494,null)], null)),new cljs.core.Symbol(null,"keys-new","keys-new",-2108250151,null),new cljs.core.Symbol(null,"keys-updated","keys-updated",-1445324468,null),new cljs.core.Symbol(null,"keys-removed","keys-removed",1530216700,null),new cljs.core.Symbol(null,"completed-ref","completed-ref",-1986860423,null)], null);
}));

(shadow.grove.db.TransactedData.cljs$lang$type = true);

(shadow.grove.db.TransactedData.cljs$lang$ctorStr = "shadow.grove.db/TransactedData");

(shadow.grove.db.TransactedData.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.grove.db/TransactedData");
}));

/**
 * Positional factory function for shadow.grove.db/TransactedData.
 */
shadow.grove.db.__GT_TransactedData = (function shadow$grove$db$__GT_TransactedData(data,keys_new,keys_updated,keys_removed,completed_ref){
return (new shadow.grove.db.TransactedData(data,keys_new,keys_updated,keys_removed,completed_ref));
});

shadow.grove.db.transacted = (function shadow$grove$db$transacted(data){
return (new shadow.grove.db.TransactedData(data,cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY),cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY),cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY),cljs.core.volatile_BANG_(false)));
});

//# sourceMappingURL=shadow.grove.db.js.map
