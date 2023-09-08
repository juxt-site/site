goog.provide('todo.ui.db');
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("todo.model","num-active","todo.model/num-active",-1663710018),(function (env,db,current,_,params){
return cljs.core.count(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671),shadow.grove.db.all_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781))));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("todo.model","num-completed","todo.model/num-completed",1964965065),(function (env,db,current,_,params){
return cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671),shadow.grove.db.all_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781))));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("todo.model","num-total","todo.model/num-total",-1077343836),(function (env,db,current,_,params){
return cljs.core.count(shadow.grove.db.all_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781)));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("todo.model","editing?","todo.model/editing?",1303588061),(function (env,db,current,_,params){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword("db","ident","db/ident",-737096).cljs$core$IFn$_invoke$arity$1(current));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("todo.model","filtered-todos","todo.model/filtered-todos",-1617720361),(function (env,p__12088,current,_,params){
var map__12089 = p__12088;
var map__12089__$1 = cljs.core.__destructure_map(map__12089);
var db = map__12089__$1;
var current_filter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12089__$1,new cljs.core.Keyword("todo.model","current-filter","todo.model/current-filter",-418969394));
var filter_fn = (function (){var G__12090 = current_filter;
var G__12090__$1 = (((G__12090 instanceof cljs.core.Keyword))?G__12090.fqn:null);
switch (G__12090__$1) {
case "all":
return (function (x){
return true;
});

break;
case "active":
return (function (p1__12086_SHARP_){
return cljs.core.not(new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671).cljs$core$IFn$_invoke$arity$1(p1__12086_SHARP_));
});

break;
case "completed":
return (function (p1__12087_SHARP_){
return new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671).cljs$core$IFn$_invoke$arity$1(p1__12087_SHARP_) === true;
});

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__12090__$1)].join('')));

}
})();
return cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","ident","db/ident",-737096),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(filter_fn,shadow.grove.db.all_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781))))));
}));
todo.ui.db.without = (function todo$ui$db$without(items,del){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([del])),items);
});
todo.ui.db.r__GT_ = (function todo$ui$db$r__GT_(init,rfn,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(rfn,init,coll);
});
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("ui","route!","ui/route!",-1286903988),(function (env,p__12091){
var map__12092 = p__12091;
var map__12092__$1 = cljs.core.__destructure_map(map__12092);
var e = map__12092__$1;
var token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12092__$1,new cljs.core.Keyword(null,"token","token",-1211463215));
var filter = (function (){var G__12093 = token;
switch (G__12093) {
case "/completed":
return new cljs.core.Keyword(null,"completed","completed",-486056503);

break;
case "/active":
return new cljs.core.Keyword(null,"active","active",1895962068);

break;
default:
return new cljs.core.Keyword(null,"all","all",892129742);

}
})();
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("todo.model","current-filter","todo.model/current-filter",-418969394)], null),filter);
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","create-new!","todo.model/create-new!",951582358),(function (env,p__12094){
var map__12095 = p__12094;
var map__12095__$1 = cljs.core.__destructure_map(map__12095);
var todo_text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12095__$1,new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
var map__12096 = db;
var map__12096__$1 = cljs.core.__destructure_map(map__12096);
var id_seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12096__$1,new cljs.core.Keyword("todo.model","id-seq","todo.model/id-seq",1330562601));
var new_todo = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("todo.model","pet-id","todo.model/pet-id",22849568),id_seq,new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204),todo_text], null);
return shadow.grove.db.add.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword("todo.model","id-seq","todo.model/id-seq",1330562601),cljs.core.inc),new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781),new_todo,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("todo.model","todos","todo.model/todos",-234793599)], null));
}));
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","delete!","todo.model/delete!",-1976186698),(function (env,p__12097){
var map__12098 = p__12097;
var map__12098__$1 = cljs.core.__destructure_map(map__12098);
var todo__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12098__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(db,todo__$1),new cljs.core.Keyword("todo.model","todos","todo.model/todos",-234793599),todo.ui.db.without,todo__$1);
}));
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","toggle-completed!","todo.model/toggle-completed!",-1449155801),(function (env,p__12099){
var map__12100 = p__12099;
var map__12100__$1 = cljs.core.__destructure_map(map__12100);
var todo__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12100__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),todo__$1,new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671)], null),cljs.core.not);
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","edit-start!","todo.model/edit-start!",1212595670),(function (env,p__12101){
var map__12102 = p__12101;
var map__12102__$1 = cljs.core.__destructure_map(map__12102);
var todo__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12102__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578)], null),todo__$1);
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","edit-save!","todo.model/edit-save!",1835670770),(function (env,p__12103){
var map__12104 = p__12103;
var map__12104__$1 = cljs.core.__destructure_map(map__12104);
var todo__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12104__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12104__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [todo__$1,new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204)], null),text),new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578),null);
}));
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","edit-cancel!","todo.model/edit-cancel!",-1189311455),(function (env,_){
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578)], null),null);
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","clear-completed!","todo.model/clear-completed!",-1919507476),(function (env,_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(todo.ui.db.r__GT_(db,(function (db__$1,p__12106){
var map__12107 = p__12106;
var map__12107__$1 = cljs.core.__destructure_map(map__12107);
var todo__$1 = map__12107__$1;
var completed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12107__$1,new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671));
if(cljs.core.not(completed_QMARK_)){
return db__$1;
} else {
return shadow.grove.db.remove(db__$1,todo__$1);
}
}),shadow.grove.db.all_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781))),new cljs.core.Keyword("todo.model","todos","todo.model/todos",-234793599),(function (current){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1((function (p1__12105_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__12105_SHARP_,new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671)], null));
})),current);
}));
}));
}));
shadow.grove.reg_event(todo.ui.env.rt_ref,new cljs.core.Keyword("todo.model","toggle-all!","todo.model/toggle-all!",-826400480),(function (env,p__12108){
var map__12109 = p__12108;
var map__12109__$1 = cljs.core.__destructure_map(map__12109);
var completed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12109__$1,new cljs.core.Keyword(null,"completed?","completed?",946828354));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$1,ident){
return cljs.core.assoc_in(db__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ident,new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671)], null),completed_QMARK_);
}),db,shadow.grove.db.all_idents_of(db,new cljs.core.Keyword("todo.model","todo","todo.model/todo",456201781)));
}));
}));

//# sourceMappingURL=todo.ui.db.js.map
