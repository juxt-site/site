goog.provide('todo.ui.views');
todo.ui.views.fragment_l27_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12017,vals12018,element_fn12019){
var el0_li = element_fn12019(new cljs.core.Keyword(null,"li","li",723558921));
var el1_div = element_fn12019(new cljs.core.Keyword(null,"div","div",1057191632));
var el2_input = element_fn12019(new cljs.core.Keyword(null,"input","input",556931961));
var el3_label = element_fn12019(new cljs.core.Keyword(null,"label","label",1718410804));
var d4 = shadow.arborist.fragments.managed_create(env12017,(vals12018[4]));
var el5_button = element_fn12019(new cljs.core.Keyword(null,"button","button",1456579943));
var d6 = shadow.arborist.fragments.managed_create(env12017,(vals12018[6]));
shadow.arborist.fragments.set_attr(env12017,el0_li,new cljs.core.Keyword(null,"class","class",-2030961996),null,(vals12018[0]));

shadow.arborist.fragments.append_child(el0_li,el1_div);

shadow.arborist.fragments.set_attr(env12017,el1_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"view");

shadow.arborist.fragments.append_child(el1_div,el2_input);

shadow.arborist.fragments.set_attr(env12017,el2_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env12017,el2_input,new cljs.core.Keyword(null,"checked","checked",-50955819),null,(vals12018[1]));

shadow.arborist.fragments.set_attr(env12017,el2_input,new cljs.core.Keyword(null,"on-change","on-change",-732046149),null,(vals12018[2]));

shadow.arborist.fragments.set_attr(env12017,el2_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"toggle");

shadow.arborist.fragments.append_child(el1_div,el3_label);

shadow.arborist.fragments.set_attr(env12017,el3_label,new cljs.core.Keyword(null,"on-dblclick","on-dblclick",-1420247173),null,(vals12018[3]));

shadow.arborist.fragments.managed_append(el3_label,d4);

shadow.arborist.fragments.append_child(el1_div,el5_button);

shadow.arborist.fragments.set_attr(env12017,el5_button,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,(vals12018[5]));

shadow.arborist.fragments.set_attr(env12017,el5_button,new cljs.core.Keyword(null,"class","class",-2030961996),null,"destroy");

shadow.arborist.fragments.managed_append(el0_li,d6);

return [el0_li,el2_input,el3_label,d4,el5_button,d6];
}),(function (exports12021,parent12022,anchor12023){
return shadow.arborist.fragments.dom_insert_before(parent12022,(exports12021[0]),anchor12023);
}),(function (this12024,env12025,exports12026,oldv12027,newv12028){
shadow.arborist.fragments.update_attr(env12025,exports12026,0,new cljs.core.Keyword(null,"class","class",-2030961996),(oldv12027[0]),(newv12028[0]));

shadow.arborist.fragments.update_attr(env12025,exports12026,1,new cljs.core.Keyword(null,"checked","checked",-50955819),(oldv12027[1]),(newv12028[1]));

shadow.arborist.fragments.update_attr(env12025,exports12026,1,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(oldv12027[2]),(newv12028[2]));

shadow.arborist.fragments.update_attr(env12025,exports12026,2,new cljs.core.Keyword(null,"on-dblclick","on-dblclick",-1420247173),(oldv12027[3]),(newv12028[3]));

shadow.arborist.fragments.update_managed(this12024,env12025,exports12026,3,(oldv12027[4]),(newv12028[4]));

shadow.arborist.fragments.update_attr(env12025,exports12026,4,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(oldv12027[5]),(newv12028[5]));

return shadow.arborist.fragments.update_managed(this12024,env12025,exports12026,5,(oldv12027[6]),(newv12028[6]));
}),(function (env12031,exports12030,oldv12032,dom_remove12033){
if(dom_remove12033){
shadow.arborist.fragments.dom_remove((exports12030[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports12030[3]),false);

return shadow.arborist.fragments.managed_remove((exports12030[5]),false);
})));

todo.ui.views.fragment_l37_c12 = (new shadow.arborist.fragments.FragmentCode((function (env12038,vals12039,element_fn12040){
var el0_input = element_fn12040(new cljs.core.Keyword(null,"input","input",556931961));
shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"on-keydown","on-keydown",-2056941495),null,(vals12039[0]));

shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),null,(vals12039[1]));

shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"value","value",305978217),null,(vals12039[2]));

shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"edit");

shadow.arborist.fragments.set_attr(env12038,el0_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"edit");

return [el0_input];
}),(function (exports12042,parent12043,anchor12044){
return shadow.arborist.fragments.dom_insert_before(parent12043,(exports12042[0]),anchor12044);
}),(function (this12045,env12046,exports12047,oldv12048,newv12049){
shadow.arborist.fragments.update_attr(env12046,exports12047,0,new cljs.core.Keyword(null,"on-keydown","on-keydown",-2056941495),(oldv12048[0]),(newv12049[0]));

shadow.arborist.fragments.update_attr(env12046,exports12047,0,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),(oldv12048[1]),(newv12049[1]));

return shadow.arborist.fragments.update_attr(env12046,exports12047,0,new cljs.core.Keyword(null,"value","value",305978217),(oldv12048[2]),(newv12049[2]));
}),(function (env12052,exports12051,oldv12053,dom_remove12054){
if(dom_remove12054){
return shadow.arborist.fragments.dom_remove((exports12051[0]));
} else {
return null;
}
})));

todo.ui.views.todo_item = shadow.grove.components.make_component_config("todo.ui.views/todo-item",[shadow.grove.components.make_hook_config((0),(14),(function (comp12002){
var todo__$1 = shadow.grove.components.get_arg(comp12002,0);
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2(todo__$1,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204),new cljs.core.Keyword("todo.model","editing?","todo.model/editing?",1303588061),new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12002){
var data = shadow.grove.components.get_hook_value(comp12002,(0));
return new cljs.core.Keyword("todo.model","completed?","todo.model/completed?",1421801671).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12002){
var data = shadow.grove.components.get_hook_value(comp12002,(0));
return new cljs.core.Keyword("todo.model","editing?","todo.model/editing?",1303588061).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12002){
var data = shadow.grove.components.get_hook_value(comp12002,(0));
return new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204).cljs$core$IFn$_invoke$arity$2(data,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12002,old12003,new12004){
shadow.grove.components.check_args_BANG_(comp12002,new12004,1);

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old12003.cljs$core$IIndexed$_nth$arity$2(null,0),new12004.cljs$core$IIndexed$_nth$arity$2(null,0))){
shadow.grove.components.arg_triggers_render_BANG_(comp12002,0);

shadow.grove.components.arg_triggers_hooks_BANG_(comp12002,0,(1));
} else {
}

return null;
}),(14),(function (comp12002){
var editing_QMARK_ = shadow.grove.components.get_hook_value(comp12002,(2));
var completed_QMARK_ = shadow.grove.components.get_hook_value(comp12002,(1));
var todo_text = shadow.grove.components.get_hook_value(comp12002,(3));
var todo__$1 = shadow.grove.components.get_arg(comp12002,0);
return shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"completed","completed",-486056503),completed_QMARK_,new cljs.core.Keyword(null,"editing","editing",1365491601),editing_QMARK_], null),completed_QMARK_,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","toggle-completed!","todo.model/toggle-completed!",-1449155801),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo__$1], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","edit-start!","todo.model/edit-start!",1212595670),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo__$1], null),todo_text,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","delete!","todo.model/delete!",-1976186698),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo__$1], null),(cljs.core.truth_(editing_QMARK_)?shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","edit-update!","todo.model/edit-update!",-436853738),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo__$1], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","edit-complete!","todo.model/edit-complete!",-1626878078),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo__$1], null),todo_text],null,todo.ui.views.fragment_l37_c12):null)],null,todo.ui.views.fragment_l27_c5);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("todo.model","edit-update!","todo.model/edit-update!",-436853738),(function (G__12005,G__12006,G__12007){
var comp12002_12191 = shadow.grove.components.get_component(G__12005);
var todo_12192__$1 = shadow.grove.components.get_arg(comp12002_12191,0);
var env_12193 = G__12005;
var map__12055_12194 = G__12006;
var map__12055_12195__$1 = cljs.core.__destructure_map(map__12055_12194);
var todo_12196__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12055_12195__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
var e_12197 = G__12007;
var G__12056_12198 = e_12197.which;
switch (G__12056_12198) {
case (13):
e_12197.target.blur();

break;
case (27):
shadow.grove.run_tx(env_12193,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","edit-cancel!","todo.model/edit-cancel!",-1189311455),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo_12196__$2], null));

break;
default:

}

return null;
}),new cljs.core.Keyword("todo.model","edit-complete!","todo.model/edit-complete!",-1626878078),(function (G__12008,G__12009,G__12010){
var comp12002_12200 = shadow.grove.components.get_component(G__12008);
var editing_QMARK__12201 = shadow.grove.components.get_hook_value(comp12002_12200,(2));
var todo_12202__$1 = shadow.grove.components.get_arg(comp12002_12200,0);
var env_12203 = G__12008;
var map__12057_12204 = G__12009;
var map__12057_12205__$1 = cljs.core.__destructure_map(map__12057_12204);
var todo_12206__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12057_12205__$1,new cljs.core.Keyword(null,"todo","todo",-1046442570));
var e_12207 = G__12010;
if(cljs.core.truth_(editing_QMARK__12201)){
shadow.grove.run_tx(env_12203,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","edit-save!","todo.model/edit-save!",1835670770),new cljs.core.Keyword(null,"todo","todo",-1046442570),todo_12206__$2,new cljs.core.Keyword(null,"text","text",-1790561697),e_12207.target.value], null));
} else {
}

return null;
})], null));
todo.ui.views.fragment_l54_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12062,vals12063,element_fn12064){
var el0_ul = element_fn12064(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env12062,(vals12063[0]));
shadow.arborist.fragments.set_attr(env12062,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"filters");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports12066,parent12067,anchor12068){
return shadow.arborist.fragments.dom_insert_before(parent12067,(exports12066[0]),anchor12068);
}),(function (this12069,env12070,exports12071,oldv12072,newv12073){
return shadow.arborist.fragments.update_managed(this12069,env12070,exports12071,1,(oldv12072[0]),(newv12073[0]));
}),(function (env12076,exports12075,oldv12077,dom_remove12078){
if(dom_remove12078){
shadow.arborist.fragments.dom_remove((exports12075[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12075[1]),false);
})));

todo.ui.views.fragment_l57_c14 = (new shadow.arborist.fragments.FragmentCode((function (env12084,vals12085,element_fn12086){
var el0_li = element_fn12086(new cljs.core.Keyword(null,"li","li",723558921));
var el1_a = element_fn12086(new cljs.core.Keyword(null,"a","a",-2123407586));
var d2 = shadow.arborist.fragments.managed_create(env12084,(vals12085[2]));
shadow.arborist.fragments.append_child(el0_li,el1_a);

shadow.arborist.fragments.set_attr(env12084,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,(vals12085[0]));

shadow.arborist.fragments.set_attr(env12084,el1_a,new cljs.core.Keyword("ui","href","ui/href",-793802206),null,(vals12085[1]));

shadow.arborist.fragments.managed_append(el1_a,d2);

return [el0_li,el1_a,d2];
}),(function (exports12088,parent12089,anchor12090){
return shadow.arborist.fragments.dom_insert_before(parent12089,(exports12088[0]),anchor12090);
}),(function (this12091,env12092,exports12093,oldv12094,newv12095){
shadow.arborist.fragments.update_attr(env12092,exports12093,1,new cljs.core.Keyword(null,"class","class",-2030961996),(oldv12094[0]),(newv12095[0]));

shadow.arborist.fragments.update_attr(env12092,exports12093,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv12094[1]),(newv12095[1]));

return shadow.arborist.fragments.update_managed(this12091,env12092,exports12093,2,(oldv12094[2]),(newv12095[2]));
}),(function (env12098,exports12097,oldv12099,dom_remove12100){
if(dom_remove12100){
shadow.arborist.fragments.dom_remove((exports12097[0]));
} else {
}

shadow.arborist.fragments.clear_attr(env12098,exports12097,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv12099[1]));

return shadow.arborist.fragments.managed_remove((exports12097[2]),false);
})));

todo.ui.views.ui_filter_select = shadow.grove.components.make_component_config("todo.ui.views/ui-filter-select",[shadow.grove.components.make_hook_config((0),(2),(function (comp12058){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("todo.model","current-filter","todo.model/current-filter",-418969394)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12058){
var __hook$0 = shadow.grove.components.get_hook_value(comp12058,(0));
return new cljs.core.Keyword("todo.model","current-filter","todo.model/current-filter",-418969394).cljs$core$IFn$_invoke$arity$2(__hook$0,null);
})),shadow.grove.components.make_hook_config((0),(0),(function (comp12058){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"All",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"all","all",892129742)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Active",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"active","active",1895962068)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Completed",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"completed","completed",-486056503)], null)], null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12058,old12059,new12060){
shadow.grove.components.check_args_BANG_(comp12058,new12060,0);

return null;
}),(6),(function (comp12058){
var filter_options = shadow.grove.components.get_hook_value(comp12058,(2));
var current_filter = shadow.grove.components.get_hook_value(comp12058,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filter_options,new cljs.core.Keyword(null,"value","value",305978217),(function (p__12079){
var map__12080 = p__12079;
var map__12080__$1 = cljs.core.__destructure_map(map__12080);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12080__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12080__$1,new cljs.core.Keyword(null,"value","value",305978217));
return shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_filter,value)], null),["/",cljs.core.name(value)].join(''),label],null,todo.ui.views.fragment_l57_c14);
}))],null,todo.ui.views.fragment_l54_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
todo.ui.views.fragment_l68_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12105,vals12106,element_fn12107){
var el0_ul = element_fn12107(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env12105,(vals12106[0]));
shadow.arborist.fragments.set_attr(env12105,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"todo-list");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports12109,parent12110,anchor12111){
return shadow.arborist.fragments.dom_insert_before(parent12110,(exports12109[0]),anchor12111);
}),(function (this12112,env12113,exports12114,oldv12115,newv12116){
return shadow.arborist.fragments.update_managed(this12112,env12113,exports12114,1,(oldv12115[0]),(newv12116[0]));
}),(function (env12119,exports12118,oldv12120,dom_remove12121){
if(dom_remove12121){
shadow.arborist.fragments.dom_remove((exports12118[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12118[1]),false);
})));

todo.ui.views.ui_todo_list = shadow.grove.components.make_component_config("todo.ui.views/ui-todo-list",[shadow.grove.components.make_hook_config((0),(2),(function (comp12101){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("todo.model","filtered-todos","todo.model/filtered-todos",-1617720361)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12101){
var query = shadow.grove.components.get_hook_value(comp12101,(0));
return new cljs.core.Keyword("todo.model","filtered-todos","todo.model/filtered-todos",-1617720361).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12101,old12102,new12103){
shadow.grove.components.check_args_BANG_(comp12101,new12103,0);

return null;
}),(2),(function (comp12101){
var filtered_todos = shadow.grove.components.get_hook_value(comp12101,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filtered_todos,cljs.core.identity,todo.ui.views.todo_item)],null,todo.ui.views.fragment_l68_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
todo.ui.views.fragment_l91_c5 = (new shadow.arborist.fragments.FragmentCode((function (env12133,vals12134,element_fn12135){
var el0_header = element_fn12135(new cljs.core.Keyword(null,"header","header",119441134));
var el1_h1 = element_fn12135(new cljs.core.Keyword(null,"h1","h1",-1896887462));
var text_12131 = shadow.arborist.fragments.create_text(env12133,"Petstore");
var el3_input = element_fn12135(new cljs.core.Keyword(null,"input","input",556931961));
var d4 = shadow.arborist.fragments.managed_create(env12133,(vals12134[0]));
shadow.arborist.fragments.set_attr(env12133,el0_header,new cljs.core.Keyword(null,"class","class",-2030961996),null,"header");

shadow.arborist.fragments.append_child(el0_header,el1_h1);

shadow.arborist.fragments.append_child(el1_h1,text_12131);

shadow.arborist.fragments.append_child(el0_header,el3_input);

shadow.arborist.fragments.set_attr(env12133,el3_input,new cljs.core.Keyword(null,"on-keydown","on-keydown",-2056941495),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","create-new!","todo.model/create-new!",951582358)], null));

shadow.arborist.fragments.set_attr(env12133,el3_input,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"What needs to be done?");

shadow.arborist.fragments.set_attr(env12133,el3_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env12133,el3_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-todo");

return [el0_header,d4];
}),(function (exports12137,parent12138,anchor12139){
shadow.arborist.fragments.dom_insert_before(parent12138,(exports12137[0]),anchor12139);

return shadow.arborist.fragments.managed_insert((exports12137[1]),parent12138,anchor12139);
}),(function (this12140,env12141,exports12142,oldv12143,newv12144){
return shadow.arborist.fragments.update_managed(this12140,env12141,exports12142,1,(oldv12143[0]),(newv12144[0]));
}),(function (env12147,exports12146,oldv12148,dom_remove12149){
if(dom_remove12149){
shadow.arborist.fragments.dom_remove((exports12146[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports12146[1]),dom_remove12149);
})));

todo.ui.views.fragment_l98_c11 = (new shadow.arborist.fragments.FragmentCode((function (env12153,vals12154,element_fn12155){
var el0_section = element_fn12155(new cljs.core.Keyword(null,"section","section",-300141526));
var el1_input = element_fn12155(new cljs.core.Keyword(null,"input","input",556931961));
var el2_label = element_fn12155(new cljs.core.Keyword(null,"label","label",1718410804));
var text_12150 = shadow.arborist.fragments.create_text(env12153,"Mark all as complete");
var d4 = shadow.arborist.fragments.managed_create(env12153,(vals12154[0]));
var el5_footer = element_fn12155(new cljs.core.Keyword(null,"footer","footer",1606445390));
var el6_span = element_fn12155(new cljs.core.Keyword(null,"span","span",1394872991));
var el7_strong = element_fn12155(new cljs.core.Keyword(null,"strong","strong",269529000));
var d8 = shadow.arborist.fragments.managed_create(env12153,(vals12154[1]));
var d9 = shadow.arborist.fragments.managed_create(env12153,(vals12154[2]));
var text_12151 = shadow.arborist.fragments.create_text(env12153," left");
var d11 = shadow.arborist.fragments.managed_create(env12153,(vals12154[3]));
var d12 = shadow.arborist.fragments.managed_create(env12153,(vals12154[4]));
shadow.arborist.fragments.set_attr(env12153,el0_section,new cljs.core.Keyword(null,"class","class",-2030961996),null,"main");

shadow.arborist.fragments.append_child(el0_section,el1_input);

shadow.arborist.fragments.set_attr(env12153,el1_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env12153,el1_input,new cljs.core.Keyword(null,"on-change","on-change",-732046149),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","toggle-all!","todo.model/toggle-all!",-826400480)], null));

shadow.arborist.fragments.set_attr(env12153,el1_input,new cljs.core.Keyword(null,"checked","checked",-50955819),null,false);

shadow.arborist.fragments.set_attr(env12153,el1_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"toggle-all");

shadow.arborist.fragments.set_attr(env12153,el1_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"toggle-all");

shadow.arborist.fragments.append_child(el0_section,el2_label);

shadow.arborist.fragments.set_attr(env12153,el2_label,new cljs.core.Keyword(null,"for","for",-1323786319),null,"toggle-all");

shadow.arborist.fragments.append_child(el2_label,text_12150);

shadow.arborist.fragments.managed_append(el0_section,d4);

shadow.arborist.fragments.append_child(el0_section,el5_footer);

shadow.arborist.fragments.set_attr(env12153,el5_footer,new cljs.core.Keyword(null,"class","class",-2030961996),null,"footer");

shadow.arborist.fragments.append_child(el5_footer,el6_span);

shadow.arborist.fragments.set_attr(env12153,el6_span,new cljs.core.Keyword(null,"class","class",-2030961996),null,"todo-count");

shadow.arborist.fragments.append_child(el6_span,el7_strong);

shadow.arborist.fragments.managed_append(el7_strong,d8);

shadow.arborist.fragments.managed_append(el6_span,d9);

shadow.arborist.fragments.append_child(el6_span,text_12151);

shadow.arborist.fragments.managed_append(el5_footer,d11);

shadow.arborist.fragments.managed_append(el5_footer,d12);

return [el0_section,d4,d8,d9,d11,d12];
}),(function (exports12157,parent12158,anchor12159){
return shadow.arborist.fragments.dom_insert_before(parent12158,(exports12157[0]),anchor12159);
}),(function (this12160,env12161,exports12162,oldv12163,newv12164){
shadow.arborist.fragments.update_managed(this12160,env12161,exports12162,1,(oldv12163[0]),(newv12164[0]));

shadow.arborist.fragments.update_managed(this12160,env12161,exports12162,2,(oldv12163[1]),(newv12164[1]));

shadow.arborist.fragments.update_managed(this12160,env12161,exports12162,3,(oldv12163[2]),(newv12164[2]));

shadow.arborist.fragments.update_managed(this12160,env12161,exports12162,4,(oldv12163[3]),(newv12164[3]));

return shadow.arborist.fragments.update_managed(this12160,env12161,exports12162,5,(oldv12163[4]),(newv12164[4]));
}),(function (env12167,exports12166,oldv12168,dom_remove12169){
if(dom_remove12169){
shadow.arborist.fragments.dom_remove((exports12166[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports12166[1]),false);

shadow.arborist.fragments.managed_remove((exports12166[2]),false);

shadow.arborist.fragments.managed_remove((exports12166[3]),false);

shadow.arborist.fragments.managed_remove((exports12166[4]),false);

return shadow.arborist.fragments.managed_remove((exports12166[5]),false);
})));

todo.ui.views.fragment_l114_c19 = (new shadow.arborist.fragments.FragmentCode((function (env12172,vals12173,element_fn12174){
var el0_button = element_fn12174(new cljs.core.Keyword(null,"button","button",1456579943));
var text_12170 = shadow.arborist.fragments.create_text(env12172,"Clear completed");
shadow.arborist.fragments.set_attr(env12172,el0_button,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","clear-completed!","todo.model/clear-completed!",-1919507476)], null));

shadow.arborist.fragments.set_attr(env12172,el0_button,new cljs.core.Keyword(null,"class","class",-2030961996),null,"clear-completed");

shadow.arborist.fragments.append_child(el0_button,text_12170);

return [el0_button];
}),(function (exports12176,parent12177,anchor12178){
return shadow.arborist.fragments.dom_insert_before(parent12177,(exports12176[0]),anchor12178);
}),(function (this12179,env12180,exports12181,oldv12182,newv12183){
return null;
}),(function (env12186,exports12185,oldv12187,dom_remove12188){
if(dom_remove12188){
return shadow.arborist.fragments.dom_remove((exports12185[0]));
} else {
return null;
}
})));

todo.ui.views.ui_root = shadow.grove.components.make_component_config("todo.ui.views/ui-root",[shadow.grove.components.make_hook_config((0),(14),(function (comp12122){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("todo.model","editing","todo.model/editing",2129346578),new cljs.core.Keyword("todo.model","num-total","todo.model/num-total",-1077343836),new cljs.core.Keyword("todo.model","num-active","todo.model/num-active",-1663710018),new cljs.core.Keyword("todo.model","num-completed","todo.model/num-completed",1964965065)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12122){
var query = shadow.grove.components.get_hook_value(comp12122,(0));
return new cljs.core.Keyword("todo.model","num-total","todo.model/num-total",-1077343836).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12122){
var query = shadow.grove.components.get_hook_value(comp12122,(0));
return new cljs.core.Keyword("todo.model","num-active","todo.model/num-active",-1663710018).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp12122){
var query = shadow.grove.components.get_hook_value(comp12122,(0));
return new cljs.core.Keyword("todo.model","num-completed","todo.model/num-completed",1964965065).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp12122,old12123,new12124){
shadow.grove.components.check_args_BANG_(comp12122,new12124,0);

return null;
}),(14),(function (comp12122){
var num_active = shadow.grove.components.get_hook_value(comp12122,(2));
var num_completed = shadow.grove.components.get_hook_value(comp12122,(3));
var num_total = shadow.grove.components.get_hook_value(comp12122,(1));
return shadow.arborist.fragments.fragment_init([(((num_total > (0)))?shadow.arborist.fragments.fragment_init([todo.ui.views.ui_todo_list.cljs$core$IFn$_invoke$arity$0(),num_active,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(num_active,(1)))?" item":" items"),todo.ui.views.ui_filter_select.cljs$core$IFn$_invoke$arity$0(),(((num_completed > (0)))?shadow.arborist.fragments.fragment_init([],null,todo.ui.views.fragment_l114_c19):null)],null,todo.ui.views.fragment_l98_c11):null)],null,todo.ui.views.fragment_l91_c5);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("todo.model","create-new!","todo.model/create-new!",951582358),(function (env,_,e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((13),e.keyCode)){
var input_12208 = e.target;
var text_12209 = input_12208.value;
if(cljs.core.seq(text_12209)){
(input_12208.value = "");

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","create-new!","todo.model/create-new!",951582358),new cljs.core.Keyword("todo.model","todo-text","todo.model/todo-text",1484480204),text_12209], null));
} else {
}
} else {
}

return null;
}),new cljs.core.Keyword("todo.model","toggle-all!","todo.model/toggle-all!",-826400480),(function (env,_,e){
shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("todo.model","toggle-all!","todo.model/toggle-all!",-826400480),new cljs.core.Keyword(null,"completed?","completed?",946828354),e.target.checked], null));

return null;
})], null));

//# sourceMappingURL=todo.ui.views.js.map
