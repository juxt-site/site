goog.provide('pet.ui.db');
var module$node_modules$$juxt$pass$dist$juxt_pass_cjs=shadow.js.require("module$node_modules$$juxt$pass$dist$juxt_pass_cjs", {});
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883),(function (env,db,current,_,params){
return cljs.core.count(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336),shadow.grove.db.all_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787))));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868),(function (env,db,current,_,params){
return cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336),shadow.grove.db.all_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787))));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835),(function (env,db,current,_,params){
return cljs.core.count(shadow.grove.db.all_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787)));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610),(function (env,db,current,_,params){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword("db","ident","db/ident",-737096).cljs$core$IFn$_invoke$arity$1(current));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","logged-in?","pet.model/logged-in?",-475867979),(function (env,db,current,_,params){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$1(db),new cljs.core.Keyword("db","ident","db/ident",-737096).cljs$core$IFn$_invoke$arity$1(current));
}));
shadow.grove.eql_query.attr.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257),(function (env,p__25351,current,_,params){
var map__25352 = p__25351;
var map__25352__$1 = cljs.core.__destructure_map(map__25352);
var db = map__25352__$1;
var current_filter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25352__$1,new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763));
return cljs.core.vec(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("db","ident","db/ident",-737096),shadow.grove.db.all_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787)))));
}));
pet.ui.db.without = (function pet$ui$db$without(items,del){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.createAsIfByAssoc([del])),items);
});
pet.ui.db.r__GT_ = (function pet$ui$db$r__GT_(init,rfn,coll){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(rfn,init,coll);
});
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("ui","route!","ui/route!",-1286903988),(function (env,p__25353){
var map__25354 = p__25353;
var map__25354__$1 = cljs.core.__destructure_map(map__25354);
var e = map__25354__$1;
var token = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25354__$1,new cljs.core.Keyword(null,"token","token",-1211463215));
var filter = (function (){var G__25355 = token;
switch (G__25355) {
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
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763)], null),filter);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),(function (env,p__25356){
var map__25357 = p__25356;
var map__25357__$1 = cljs.core.__destructure_map(map__25357);
var pet_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25357__$1,new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697));
var pet_status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25357__$1,new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780));
console.log(["POSTING PET",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pet_name),cljs.core.str.cljs$core$IFn$_invoke$arity$1(pet_status)].join(''));

ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"resource-server")),"/petstore/pet"].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),pet_name,new cljs.core.Keyword(null,"status","status",-1997798413),pet_status,new cljs.core.Keyword(null,"id","id",-1388402092),(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","id-seq","pet.model/id-seq",1793673300)], null)) + (1))], null),new cljs.core.Keyword(null,"response-format","response-format",1664465322),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"timeout","timeout",-318625318),(5000),new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true,new cljs.core.Keyword(null,"handler","handler",-195596612),(function (resp){
return console.log("posted");
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(e),(200))){
return "";
} else {
return console.log(["ERROR:",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
}
})], null)], 0));

return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
var map__25358 = db;
var map__25358__$1 = cljs.core.__destructure_map(map__25358);
var id_seq = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25358__$1,new cljs.core.Keyword("pet.model","id-seq","pet.model/id-seq",1793673300));
var next_id = (id_seq + (1));
var new_pet = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("pet.model","pet-id","pet.model/pet-id",1316629041),next_id,new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),pet_name,new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),pet_status], null);
return shadow.grove.db.add.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword("pet.model","id-seq","pet.model/id-seq",1793673300),cljs.core.inc),new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787),new_pet,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","pets","pet.model/pets",-673250121)], null));
}));
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","delete!","pet.model/delete!",-1563147061),(function (env,p__25359){
var map__25360 = p__25359;
var map__25360__$1 = cljs.core.__destructure_map(map__25360);
var pet__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25360__$1,new cljs.core.Keyword(null,"pet","pet",-1587748619));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(db,pet__$1),new cljs.core.Keyword("pet.model","pets","pet.model/pets",-673250121),pet.ui.db.without,pet__$1);
}));
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","toggle-completed!","pet.model/toggle-completed!",-1644353330),(function (env,p__25361){
var map__25362 = p__25361;
var map__25362__$1 = cljs.core.__destructure_map(map__25362);
var pet__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25362__$1,new cljs.core.Keyword(null,"pet","pet",-1587748619));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),pet__$1,new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null),cljs.core.not);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","edit-start!","pet.model/edit-start!",-173714497),(function (env,p__25363){
var map__25364 = p__25363;
var map__25364__$1 = cljs.core.__destructure_map(map__25364);
var pet__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25364__$1,new cljs.core.Keyword(null,"pet","pet",-1587748619));
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725)], null),pet__$1);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","edit-save!","pet.model/edit-save!",975415447),(function (env,p__25365){
var map__25366 = p__25365;
var map__25366__$1 = cljs.core.__destructure_map(map__25366);
var pet__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25366__$1,new cljs.core.Keyword(null,"pet","pet",-1587748619));
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25366__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [pet__$1,new cljs.core.Keyword("pet.model","pet-text","pet.model/pet-text",-611635019)], null),text),new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725),null);
}));
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","edit-cancel!","pet.model/edit-cancel!",-327218758),(function (env,_){
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725)], null),null);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","refresh-whoami!","pet.model/refresh-whoami!",-480459463),(function (env,p__25367){
var map__25368 = p__25367;
var map__25368__$1 = cljs.core.__destructure_map(map__25368);
var whoami = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25368__$1,new cljs.core.Keyword(null,"whoami","whoami",-650118981));
console.log("WHOAMI REFRESH HANDLER");

return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991)], null),whoami);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044),(function (env,p__25369){
var map__25370 = p__25369;
var map__25370__$1 = cljs.core.__destructure_map(map__25370);
var read = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25370__$1,new cljs.core.Keyword("pet.model","read","pet.model/read",715584447));
var write = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25370__$1,new cljs.core.Keyword("pet.model","write","pet.model/write",-927887002));
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null)))){
console.log("LOGGING OUT");
} else {
console.log("LOGGING IN");

var response_25379 = module$node_modules$$juxt$pass$dist$juxt_pass_cjs.authorize(cljs.core.clj__GT_js(pet.config.authorize_payload(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"authorization-server")),"/scopes/system/self-identification"].join('')], null))));
response_25379.then((function (){
console.log("Authorization Response Received");

return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic([cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(pet.config.config,"resource-server")),"/_site/whoami"].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"response-format","response-format",1664465322),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"keywords?","keywords?",764949733),true,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(5000),new cljs.core.Keyword(null,"handler","handler",-195596612),(function (h){
return shadow.grove.run_tx_BANG_(pet.ui.env.rt_ref,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","refresh-whoami!","pet.model/refresh-whoami!",-480459463),new cljs.core.Keyword(null,"whoami","whoami",-650118981),h], null));
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (e){
return console.log(["ERROR:",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
})], null)], 0));
}));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null),new cljs.core.Var(function(){return cljs.core.not;},new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"not","not",1044554643,null),"cljs/core.cljs",(10),(1),(254),(254),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null)),"Returns true if x is logical false, false otherwise.",(cljs.core.truth_(cljs.core.not)?cljs.core.not.cljs$lang$test:null)])));
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),(function (env,p__25371){
var map__25372 = p__25371;
var map__25372__$1 = cljs.core.__destructure_map(map__25372);
var route = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25372__$1,new cljs.core.Keyword(null,"route","route",329891309));
return cljs.core.assoc_in(env,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"db","db",993250759),new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937)], null),route);
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","clear-completed!","pet.model/clear-completed!",-93248045),(function (env,_){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(pet.ui.db.r__GT_(db,(function (db__$1,p__25374){
var map__25375 = p__25374;
var map__25375__$1 = cljs.core.__destructure_map(map__25375);
var pet__$1 = map__25375__$1;
var completed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25375__$1,new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336));
if(cljs.core.not(completed_QMARK_)){
return db__$1;
} else {
return shadow.grove.db.remove(db__$1,pet__$1);
}
}),shadow.grove.db.all_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787))),new cljs.core.Keyword("pet.model","pets","pet.model/pets",-673250121),(function (current){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$1((function (p1__25373_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25373_SHARP_,new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null));
})),current);
}));
}));
}));
shadow.grove.reg_event(pet.ui.env.rt_ref,new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),(function (env,p__25376){
var map__25377 = p__25376;
var map__25377__$1 = cljs.core.__destructure_map(map__25377);
var completed_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__25377__$1,new cljs.core.Keyword(null,"completed?","completed?",946828354));
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(env,new cljs.core.Keyword(null,"db","db",993250759),(function (db){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (db__$1,ident){
return cljs.core.assoc_in(db__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ident,new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null),completed_QMARK_);
}),db,shadow.grove.db.all_idents_of(db,new cljs.core.Keyword("pet.model","pet","pet.model/pet",153608787)));
}));
}));

//# sourceMappingURL=pet.ui.db.js.map
