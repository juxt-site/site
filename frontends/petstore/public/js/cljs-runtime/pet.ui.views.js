goog.provide('pet.ui.views');
pet.ui.views.fragment_l16_c4 = (new shadow.arborist.fragments.FragmentCode((function (env24509,vals24510,element_fn24511){
var el0_li = element_fn24511(new cljs.core.Keyword(null,"li","li",723558921));
var el1_div = element_fn24511(new cljs.core.Keyword(null,"div","div",1057191632));
var el2_label = element_fn24511(new cljs.core.Keyword(null,"label","label",1718410804));
var text_24505 = shadow.arborist.fragments.create_text(env24509,"Name: ");
var d4 = shadow.arborist.fragments.managed_create(env24509,(vals24510[0]));
var el5_label = element_fn24511(new cljs.core.Keyword(null,"label","label",1718410804));
var text_24506 = shadow.arborist.fragments.create_text(env24509,"Status: ");
var d7 = shadow.arborist.fragments.managed_create(env24509,(vals24510[1]));
var el8_button = element_fn24511(new cljs.core.Keyword(null,"button","button",1456579943));
shadow.arborist.fragments.append_child(el0_li,el1_div);

shadow.arborist.fragments.set_attr(env24509,el1_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"view");

shadow.arborist.fragments.append_child(el1_div,el2_label);

shadow.arborist.fragments.append_child(el2_label,text_24505);

shadow.arborist.fragments.managed_append(el2_label,d4);

shadow.arborist.fragments.append_child(el1_div,el5_label);

shadow.arborist.fragments.append_child(el5_label,text_24506);

shadow.arborist.fragments.managed_append(el5_label,d7);

shadow.arborist.fragments.append_child(el1_div,el8_button);

shadow.arborist.fragments.set_attr(env24509,el8_button,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,(vals24510[2]));

shadow.arborist.fragments.set_attr(env24509,el8_button,new cljs.core.Keyword(null,"class","class",-2030961996),null,"destroy");

return [el0_li,d4,d7,el8_button];
}),(function (exports24513,parent24514,anchor24515){
return shadow.arborist.fragments.dom_insert_before(parent24514,(exports24513[0]),anchor24515);
}),(function (this24516,env24517,exports24518,oldv24519,newv24520){
shadow.arborist.fragments.update_managed(this24516,env24517,exports24518,1,(oldv24519[0]),(newv24520[0]));

shadow.arborist.fragments.update_managed(this24516,env24517,exports24518,2,(oldv24519[1]),(newv24520[1]));

return shadow.arborist.fragments.update_attr(env24517,exports24518,3,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(oldv24519[2]),(newv24520[2]));
}),(function (env24523,exports24522,oldv24524,dom_remove24525){
if(dom_remove24525){
shadow.arborist.fragments.dom_remove((exports24522[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports24522[1]),false);

return shadow.arborist.fragments.managed_remove((exports24522[2]),false);
})));

pet.ui.views.pet_item = shadow.grove.components.make_component_config("pet.ui.views/pet-item",[shadow.grove.components.make_hook_config((0),(30),(function (comp24502){
var pet__$1 = shadow.grove.components.get_arg(comp24502,0);
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2(pet__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610),new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24502){
var data = shadow.grove.components.get_hook_value(comp24502,(0));
return new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24502){
var data = shadow.grove.components.get_hook_value(comp24502,(0));
return new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24502){
var data = shadow.grove.components.get_hook_value(comp24502,(0));
return new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24502){
var data = shadow.grove.components.get_hook_value(comp24502,(0));
return new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780).cljs$core$IFn$_invoke$arity$2(data,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24502,old24503,new24504){
shadow.grove.components.check_args_BANG_(comp24502,new24504,1);

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old24503.cljs$core$IIndexed$_nth$arity$2(null,0),new24504.cljs$core$IIndexed$_nth$arity$2(null,0))){
shadow.grove.components.arg_triggers_render_BANG_(comp24502,0);

shadow.grove.components.arg_triggers_hooks_BANG_(comp24502,0,(1));
} else {
}

return null;
}),(24),(function (comp24502){
var pet_name = shadow.grove.components.get_hook_value(comp24502,(3));
var pet_status = shadow.grove.components.get_hook_value(comp24502,(4));
var pet__$1 = shadow.grove.components.get_arg(comp24502,0);
return shadow.arborist.fragments.fragment_init([pet_name,pet_status,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","delete!","pet.model/delete!",-1563147061),new cljs.core.Keyword(null,"pet","pet",-1587748619),pet__$1], null)],null,pet.ui.views.fragment_l16_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l34_c5 = (new shadow.arborist.fragments.FragmentCode((function (env24530,vals24531,element_fn24532){
var el0_ul = element_fn24532(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env24530,(vals24531[0]));
shadow.arborist.fragments.set_attr(env24530,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"filters");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports24534,parent24535,anchor24536){
return shadow.arborist.fragments.dom_insert_before(parent24535,(exports24534[0]),anchor24536);
}),(function (this24537,env24538,exports24539,oldv24540,newv24541){
return shadow.arborist.fragments.update_managed(this24537,env24538,exports24539,1,(oldv24540[0]),(newv24541[0]));
}),(function (env24544,exports24543,oldv24545,dom_remove24546){
if(dom_remove24546){
shadow.arborist.fragments.dom_remove((exports24543[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24543[1]),false);
})));

pet.ui.views.fragment_l37_c14 = (new shadow.arborist.fragments.FragmentCode((function (env24552,vals24553,element_fn24554){
var el0_li = element_fn24554(new cljs.core.Keyword(null,"li","li",723558921));
var el1_a = element_fn24554(new cljs.core.Keyword(null,"a","a",-2123407586));
var d2 = shadow.arborist.fragments.managed_create(env24552,(vals24553[2]));
shadow.arborist.fragments.append_child(el0_li,el1_a);

shadow.arborist.fragments.set_attr(env24552,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,(vals24553[0]));

shadow.arborist.fragments.set_attr(env24552,el1_a,new cljs.core.Keyword("ui","href","ui/href",-793802206),null,(vals24553[1]));

shadow.arborist.fragments.managed_append(el1_a,d2);

return [el0_li,el1_a,d2];
}),(function (exports24556,parent24557,anchor24558){
return shadow.arborist.fragments.dom_insert_before(parent24557,(exports24556[0]),anchor24558);
}),(function (this24559,env24560,exports24561,oldv24562,newv24563){
shadow.arborist.fragments.update_attr(env24560,exports24561,1,new cljs.core.Keyword(null,"class","class",-2030961996),(oldv24562[0]),(newv24563[0]));

shadow.arborist.fragments.update_attr(env24560,exports24561,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv24562[1]),(newv24563[1]));

return shadow.arborist.fragments.update_managed(this24559,env24560,exports24561,2,(oldv24562[2]),(newv24563[2]));
}),(function (env24566,exports24565,oldv24567,dom_remove24568){
if(dom_remove24568){
shadow.arborist.fragments.dom_remove((exports24565[0]));
} else {
}

shadow.arborist.fragments.clear_attr(env24566,exports24565,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv24567[1]));

return shadow.arborist.fragments.managed_remove((exports24565[2]),false);
})));

pet.ui.views.ui_filter_select = shadow.grove.components.make_component_config("pet.ui.views/ui-filter-select",[shadow.grove.components.make_hook_config((0),(2),(function (comp24526){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24526){
var __hook$0 = shadow.grove.components.get_hook_value(comp24526,(0));
return new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763).cljs$core$IFn$_invoke$arity$2(__hook$0,null);
})),shadow.grove.components.make_hook_config((0),(0),(function (comp24526){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"All",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"all","all",892129742)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Active",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"active","active",1895962068)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Completed",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"completed","completed",-486056503)], null)], null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24526,old24527,new24528){
shadow.grove.components.check_args_BANG_(comp24526,new24528,0);

return null;
}),(6),(function (comp24526){
var filter_options = shadow.grove.components.get_hook_value(comp24526,(2));
var current_filter = shadow.grove.components.get_hook_value(comp24526,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filter_options,new cljs.core.Keyword(null,"value","value",305978217),(function (p__24547){
var map__24548 = p__24547;
var map__24548__$1 = cljs.core.__destructure_map(map__24548);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24548__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__24548__$1,new cljs.core.Keyword(null,"value","value",305978217));
return shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_filter,value)], null),["/",cljs.core.name(value)].join(''),label],null,pet.ui.views.fragment_l37_c14);
}))],null,pet.ui.views.fragment_l34_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l48_c5 = (new shadow.arborist.fragments.FragmentCode((function (env24573,vals24574,element_fn24575){
var el0_ul = element_fn24575(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env24573,(vals24574[0]));
shadow.arborist.fragments.set_attr(env24573,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-list");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports24577,parent24578,anchor24579){
return shadow.arborist.fragments.dom_insert_before(parent24578,(exports24577[0]),anchor24579);
}),(function (this24580,env24581,exports24582,oldv24583,newv24584){
return shadow.arborist.fragments.update_managed(this24580,env24581,exports24582,1,(oldv24583[0]),(newv24584[0]));
}),(function (env24587,exports24586,oldv24588,dom_remove24589){
if(dom_remove24589){
shadow.arborist.fragments.dom_remove((exports24586[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24586[1]),false);
})));

pet.ui.views.ui_pet_list = shadow.grove.components.make_component_config("pet.ui.views/ui-pet-list",[shadow.grove.components.make_hook_config((0),(2),(function (comp24569){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24569){
var query = shadow.grove.components.get_hook_value(comp24569,(0));
return new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24569,old24570,new24571){
shadow.grove.components.check_args_BANG_(comp24569,new24571,0);

return null;
}),(2),(function (comp24569){
var filtered_pets = shadow.grove.components.get_hook_value(comp24569,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filtered_pets,cljs.core.identity,pet.ui.views.pet_item)],null,pet.ui.views.fragment_l48_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l56_c6 = (new shadow.arborist.fragments.FragmentCode((function (env24597,vals24598,element_fn24599){
var el0_nav = element_fn24599(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn24599(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_24593 = shadow.arborist.fragments.create_text(env24597,"LOG OUT");
var el3_a = element_fn24599(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_24594 = shadow.arborist.fragments.create_text(env24597,"PETS");
var el5_a = element_fn24599(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_24595 = shadow.arborist.fragments.create_text(env24597,"WHOAMI");
shadow.arborist.fragments.set_attr(env24597,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env24597,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env24597,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_24593);

shadow.arborist.fragments.append_child(el0_nav,el3_a);

shadow.arborist.fragments.set_attr(env24597,el3_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/"], null));

shadow.arborist.fragments.set_attr(env24597,el3_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el3_a,text_24594);

shadow.arborist.fragments.append_child(el0_nav,el5_a);

shadow.arborist.fragments.set_attr(env24597,el5_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/whoami"], null));

shadow.arborist.fragments.set_attr(env24597,el5_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el5_a,text_24595);

return [el0_nav];
}),(function (exports24601,parent24602,anchor24603){
return shadow.arborist.fragments.dom_insert_before(parent24602,(exports24601[0]),anchor24603);
}),(function (this24604,env24605,exports24606,oldv24607,newv24608){
return null;
}),(function (env24611,exports24610,oldv24612,dom_remove24613){
if(dom_remove24613){
return shadow.arborist.fragments.dom_remove((exports24610[0]));
} else {
return null;
}
})));

pet.ui.views.fragment_l64_c6 = (new shadow.arborist.fragments.FragmentCode((function (env24616,vals24617,element_fn24618){
var el0_nav = element_fn24618(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn24618(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_24614 = shadow.arborist.fragments.create_text(env24616,"LOG IN");
shadow.arborist.fragments.set_attr(env24616,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env24616,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/login"], null));

shadow.arborist.fragments.set_attr(env24616,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_24614);

return [el0_nav];
}),(function (exports24620,parent24621,anchor24622){
return shadow.arborist.fragments.dom_insert_before(parent24621,(exports24620[0]),anchor24622);
}),(function (this24623,env24624,exports24625,oldv24626,newv24627){
return null;
}),(function (env24630,exports24629,oldv24631,dom_remove24632){
if(dom_remove24632){
return shadow.arborist.fragments.dom_remove((exports24629[0]));
} else {
return null;
}
})));

pet.ui.views.navbar = shadow.grove.components.make_component_config("pet.ui.views/navbar",[shadow.grove.components.make_hook_config((0),(2),(function (comp24590){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24590){
var query = shadow.grove.components.get_hook_value(comp24590,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24590,old24591,new24592){
shadow.grove.components.check_args_BANG_(comp24590,new24592,0);

return null;
}),(2),(function (comp24590){
var logged_in = shadow.grove.components.get_hook_value(comp24590,(1));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l56_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l64_c6);
}
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l73_c4 = (new shadow.arborist.fragments.FragmentCode((function (env24639,vals24640,element_fn24641){
var el0_div = element_fn24641(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn24641(new cljs.core.Keyword(null,"h2","h2",-372662728));
var d2 = shadow.arborist.fragments.managed_create(env24639,(vals24640[0]));
var el3_h3 = element_fn24641(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_24636 = shadow.arborist.fragments.create_text(env24639,"Roles");
var d5 = shadow.arborist.fragments.managed_create(env24639,(vals24640[1]));
var el6_h3 = element_fn24641(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_24637 = shadow.arborist.fragments.create_text(env24639,"Permissions");
var d8 = shadow.arborist.fragments.managed_create(env24639,(vals24640[2]));
shadow.arborist.fragments.set_attr(env24639,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.managed_append(el1_h2,d2);

shadow.arborist.fragments.append_child(el0_div,el3_h3);

shadow.arborist.fragments.append_child(el3_h3,text_24636);

shadow.arborist.fragments.managed_append(el0_div,d5);

shadow.arborist.fragments.append_child(el0_div,el6_h3);

shadow.arborist.fragments.append_child(el6_h3,text_24637);

shadow.arborist.fragments.managed_append(el0_div,d8);

return [el0_div,d2,d5,d8];
}),(function (exports24643,parent24644,anchor24645){
return shadow.arborist.fragments.dom_insert_before(parent24644,(exports24643[0]),anchor24645);
}),(function (this24646,env24647,exports24648,oldv24649,newv24650){
shadow.arborist.fragments.update_managed(this24646,env24647,exports24648,1,(oldv24649[0]),(newv24650[0]));

shadow.arborist.fragments.update_managed(this24646,env24647,exports24648,2,(oldv24649[1]),(newv24650[1]));

return shadow.arborist.fragments.update_managed(this24646,env24647,exports24648,3,(oldv24649[2]),(newv24650[2]));
}),(function (env24653,exports24652,oldv24654,dom_remove24655){
if(dom_remove24655){
shadow.arborist.fragments.dom_remove((exports24652[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports24652[1]),false);

shadow.arborist.fragments.managed_remove((exports24652[2]),false);

return shadow.arborist.fragments.managed_remove((exports24652[3]),false);
})));

pet.ui.views.fragment_l79_c22 = (new shadow.arborist.fragments.FragmentCode((function (env24657,vals24658,element_fn24659){
var el0_li = element_fn24659(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env24657,(vals24658[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports24661,parent24662,anchor24663){
return shadow.arborist.fragments.dom_insert_before(parent24662,(exports24661[0]),anchor24663);
}),(function (this24664,env24665,exports24666,oldv24667,newv24668){
return shadow.arborist.fragments.update_managed(this24664,env24665,exports24666,1,(oldv24667[0]),(newv24668[0]));
}),(function (env24671,exports24670,oldv24672,dom_remove24673){
if(dom_remove24673){
shadow.arborist.fragments.dom_remove((exports24670[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24670[1]),false);
})));

pet.ui.views.fragment_l84_c22 = (new shadow.arborist.fragments.FragmentCode((function (env24675,vals24676,element_fn24677){
var el0_li = element_fn24677(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env24675,(vals24676[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports24679,parent24680,anchor24681){
return shadow.arborist.fragments.dom_insert_before(parent24680,(exports24679[0]),anchor24681);
}),(function (this24682,env24683,exports24684,oldv24685,newv24686){
return shadow.arborist.fragments.update_managed(this24682,env24683,exports24684,1,(oldv24685[0]),(newv24686[0]));
}),(function (env24689,exports24688,oldv24690,dom_remove24691){
if(dom_remove24691){
shadow.arborist.fragments.dom_remove((exports24688[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24688[1]),false);
})));

pet.ui.views.whoami = shadow.grove.components.make_component_config("pet.ui.views/whoami",[shadow.grove.components.make_hook_config((0),(2),(function (comp24633){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24633){
var query = shadow.grove.components.get_hook_value(comp24633,(0));
return new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24633,old24634,new24635){
shadow.grove.components.check_args_BANG_(comp24633,new24635,0);

return null;
}),(2),(function (comp24633){
var whoami = shadow.grove.components.get_hook_value(comp24633,(1));
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","user","juxt.site/user",-1099199318).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","subject","juxt.site/subject",-1761809841).cljs$core$IFn$_invoke$arity$1(whoami))),shadow.grove.simple_seq(new cljs.core.Keyword("juxt.site","roles","juxt.site/roles",-1112975592).cljs$core$IFn$_invoke$arity$1(whoami),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(item)],null,pet.ui.views.fragment_l79_c22);
})),shadow.grove.keyed_seq(new cljs.core.Keyword("juxt.site","permitted-operations","juxt.site/permitted-operations",183409044).cljs$core$IFn$_invoke$arity$1(whoami),new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725).cljs$core$IFn$_invoke$arity$1(item))],null,pet.ui.views.fragment_l84_c22);
}))],null,pet.ui.views.fragment_l73_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l107_c6 = (new shadow.arborist.fragments.FragmentCode((function (env24705,vals24706,element_fn24707){
var el0_div = element_fn24707(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_input = element_fn24707(new cljs.core.Keyword(null,"input","input",556931961));
var el2_form = element_fn24707(new cljs.core.Keyword(null,"form","form",-1624062471));
var el3_input = element_fn24707(new cljs.core.Keyword(null,"input","input",556931961));
var el4_select = element_fn24707(new cljs.core.Keyword(null,"select","select",1147833503));
var el5_option = element_fn24707(new cljs.core.Keyword(null,"option","option",65132272));
var text_24701 = shadow.arborist.fragments.create_text(env24705,"available");
var el7_option = element_fn24707(new cljs.core.Keyword(null,"option","option",65132272));
var text_24702 = shadow.arborist.fragments.create_text(env24705,"pending");
var el9_option = element_fn24707(new cljs.core.Keyword(null,"option","option",65132272));
var text_24703 = shadow.arborist.fragments.create_text(env24705,"sold");
var el11_input = element_fn24707(new cljs.core.Keyword(null,"input","input",556931961));
var d12 = shadow.arborist.fragments.managed_create(env24705,(vals24706[0]));
shadow.arborist.fragments.set_attr(env24705,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_input);

shadow.arborist.fragments.set_attr(env24705,el1_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"button");

shadow.arborist.fragments.set_attr(env24705,el1_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Sync with DB");

shadow.arborist.fragments.set_attr(env24705,el1_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","refresh-pets-handler!","pet.model/refresh-pets-handler!",-282146106)], null));

shadow.arborist.fragments.append_child(el0_div,el2_form);

shadow.arborist.fragments.set_attr(env24705,el2_form,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-form");

shadow.arborist.fragments.append_child(el2_form,el3_input);

shadow.arborist.fragments.set_attr(env24705,el3_input,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Name");

shadow.arborist.fragments.set_attr(env24705,el3_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env24705,el3_input,new cljs.core.Keyword(null,"required","required",1807647006),null,true);

shadow.arborist.fragments.set_attr(env24705,el3_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el2_form,el4_select);

shadow.arborist.fragments.set_attr(env24705,el4_select,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Status");

shadow.arborist.fragments.set_attr(env24705,el4_select,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env24705,el4_select,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el4_select,el5_option);

shadow.arborist.fragments.append_child(el5_option,text_24701);

shadow.arborist.fragments.append_child(el4_select,el7_option);

shadow.arborist.fragments.append_child(el7_option,text_24702);

shadow.arborist.fragments.append_child(el4_select,el9_option);

shadow.arborist.fragments.append_child(el9_option,text_24703);

shadow.arborist.fragments.append_child(el2_form,el11_input);

shadow.arborist.fragments.set_attr(env24705,el11_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761)], null));

shadow.arborist.fragments.set_attr(env24705,el11_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env24705,el11_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"submit");

shadow.arborist.fragments.set_attr(env24705,el11_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Submit");

shadow.arborist.fragments.set_attr(env24705,el11_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"submit-pet");

shadow.arborist.fragments.managed_append(el0_div,d12);

return [el0_div,d12];
}),(function (exports24709,parent24710,anchor24711){
return shadow.arborist.fragments.dom_insert_before(parent24710,(exports24709[0]),anchor24711);
}),(function (this24712,env24713,exports24714,oldv24715,newv24716){
return shadow.arborist.fragments.update_managed(this24712,env24713,exports24714,1,(oldv24715[0]),(newv24716[0]));
}),(function (env24719,exports24718,oldv24720,dom_remove24721){
if(dom_remove24721){
shadow.arborist.fragments.dom_remove((exports24718[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24718[1]),false);
})));

pet.ui.views.fragment_l126_c10 = (new shadow.arborist.fragments.FragmentCode((function (env24723,vals24724,element_fn24725){
var el0_section = element_fn24725(new cljs.core.Keyword(null,"section","section",-300141526));
var d1 = shadow.arborist.fragments.managed_create(env24723,(vals24724[0]));
shadow.arborist.fragments.set_attr(env24723,el0_section,new cljs.core.Keyword(null,"class","class",-2030961996),null,"main");

shadow.arborist.fragments.managed_append(el0_section,d1);

return [el0_section,d1];
}),(function (exports24727,parent24728,anchor24729){
return shadow.arborist.fragments.dom_insert_before(parent24728,(exports24727[0]),anchor24729);
}),(function (this24730,env24731,exports24732,oldv24733,newv24734){
return shadow.arborist.fragments.update_managed(this24730,env24731,exports24732,1,(oldv24733[0]),(newv24734[0]));
}),(function (env24737,exports24736,oldv24738,dom_remove24739){
if(dom_remove24739){
shadow.arborist.fragments.dom_remove((exports24736[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24736[1]),false);
})));

pet.ui.views.fragment_l129_c6 = (new shadow.arborist.fragments.FragmentCode((function (env24742,vals24743,element_fn24744){
var el0_div = element_fn24744(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn24744(new cljs.core.Keyword(null,"h2","h2",-372662728));
var text_24740 = shadow.arborist.fragments.create_text(env24742,"You do not have permission to view this page");
shadow.arborist.fragments.set_attr(env24742,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.append_child(el1_h2,text_24740);

return [el0_div];
}),(function (exports24746,parent24747,anchor24748){
return shadow.arborist.fragments.dom_insert_before(parent24747,(exports24746[0]),anchor24748);
}),(function (this24749,env24750,exports24751,oldv24752,newv24753){
return null;
}),(function (env24756,exports24755,oldv24757,dom_remove24758){
if(dom_remove24758){
return shadow.arborist.fragments.dom_remove((exports24755[0]));
} else {
return null;
}
})));

pet.ui.views.pets = shadow.grove.components.make_component_config("pet.ui.views/pets",[shadow.grove.components.make_hook_config((0),(62),(function (comp24692){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725),new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835),new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883),new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868),new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937),new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24692){
var query = shadow.grove.components.get_hook_value(comp24692,(0));
return new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24692){
var query = shadow.grove.components.get_hook_value(comp24692,(0));
return new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24692){
var query = shadow.grove.components.get_hook_value(comp24692,(0));
return new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24692){
var query = shadow.grove.components.get_hook_value(comp24692,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24692){
var query = shadow.grove.components.get_hook_value(comp24692,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24692,old24693,new24694){
shadow.grove.components.check_args_BANG_(comp24692,new24694,0);

return null;
}),(34),(function (comp24692){
var num_total = shadow.grove.components.get_hook_value(comp24692,(1));
var logged_in = shadow.grove.components.get_hook_value(comp24692,(5));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([(((num_total > (0)))?shadow.arborist.fragments.fragment_init([pet.ui.views.ui_pet_list.cljs$core$IFn$_invoke$arity$0()],null,pet.ui.views.fragment_l126_c10):null)],null,pet.ui.views.fragment_l107_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l129_c6);
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),(function (env,_,e){
var vec__24759_24818 = e.target.form;
var seq__24760_24819 = cljs.core.seq(vec__24759_24818);
var first__24761_24820 = cljs.core.first(seq__24760_24819);
var seq__24760_24821__$1 = cljs.core.next(seq__24760_24819);
var name_24822 = first__24761_24820;
var first__24761_24823__$1 = cljs.core.first(seq__24760_24821__$1);
var seq__24760_24824__$2 = cljs.core.next(seq__24760_24821__$1);
var status_24825 = first__24761_24823__$1;
var __24826__$1 = seq__24760_24824__$2;
console.log(name_24822);

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),name_24822.value,new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),status_24825.value], null));

return null;
}),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),(function (env,_,e){
shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),new cljs.core.Keyword(null,"completed?","completed?",946828354),e.target.checked], null));

return null;
})], null));
pet.ui.views.fragment_l145_c4 = (new shadow.arborist.fragments.FragmentCode((function (env24773,vals24774,element_fn24775){
var el0_div = element_fn24775(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn24775(new cljs.core.Keyword(null,"h2","h2",-372662728));
var text_24768 = shadow.arborist.fragments.create_text(env24773,"This app wants to authorise Site");
var el3_h3 = element_fn24775(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_24769 = shadow.arborist.fragments.create_text(env24773,"Select the scopes you wish to allow");
var el5_form = element_fn24775(new cljs.core.Keyword(null,"form","form",-1624062471));
var el6_div = element_fn24775(new cljs.core.Keyword(null,"div","div",1057191632));
var el7_input = element_fn24775(new cljs.core.Keyword(null,"input","input",556931961));
var el8_label = element_fn24775(new cljs.core.Keyword(null,"label","label",1718410804));
var text_24770 = shadow.arborist.fragments.create_text(env24773,"read pets");
var el10_div = element_fn24775(new cljs.core.Keyword(null,"div","div",1057191632));
var el11_input = element_fn24775(new cljs.core.Keyword(null,"input","input",556931961));
var el12_label = element_fn24775(new cljs.core.Keyword(null,"label","label",1718410804));
var text_24771 = shadow.arborist.fragments.create_text(env24773,"write pets");
var el14_input = element_fn24775(new cljs.core.Keyword(null,"input","input",556931961));
shadow.arborist.fragments.set_attr(env24773,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.append_child(el1_h2,text_24768);

shadow.arborist.fragments.append_child(el0_div,el3_h3);

shadow.arborist.fragments.append_child(el3_h3,text_24769);

shadow.arborist.fragments.append_child(el0_div,el5_form);

shadow.arborist.fragments.set_attr(env24773,el5_form,new cljs.core.Keyword(null,"class","class",-2030961996),null,"auth-form");

shadow.arborist.fragments.append_child(el5_form,el6_div);

shadow.arborist.fragments.set_attr(env24773,el6_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"column-override");

shadow.arborist.fragments.append_child(el6_div,el7_input);

shadow.arborist.fragments.set_attr(env24773,el7_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env24773,el7_input,new cljs.core.Keyword(null,"value","value",305978217),null,"read");

shadow.arborist.fragments.set_attr(env24773,el7_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"read-1");

shadow.arborist.fragments.append_child(el6_div,el8_label);

shadow.arborist.fragments.set_attr(env24773,el8_label,new cljs.core.Keyword(null,"for","for",-1323786319),null,"read-1");

shadow.arborist.fragments.append_child(el8_label,text_24770);

shadow.arborist.fragments.append_child(el5_form,el10_div);

shadow.arborist.fragments.set_attr(env24773,el10_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"column-override");

shadow.arborist.fragments.append_child(el10_div,el11_input);

shadow.arborist.fragments.set_attr(env24773,el11_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"checkbox");

shadow.arborist.fragments.set_attr(env24773,el11_input,new cljs.core.Keyword(null,"value","value",305978217),null,"write");

shadow.arborist.fragments.set_attr(env24773,el11_input,new cljs.core.Keyword(null,"id","id",-1388402092),null,"write-1");

shadow.arborist.fragments.append_child(el10_div,el12_label);

shadow.arborist.fragments.set_attr(env24773,el12_label,new cljs.core.Keyword(null,"for","for",-1323786319),null,"write-1");

shadow.arborist.fragments.append_child(el12_label,text_24771);

shadow.arborist.fragments.append_child(el5_form,el14_input);

shadow.arborist.fragments.set_attr(env24773,el14_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env24773,el14_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"submit");

shadow.arborist.fragments.set_attr(env24773,el14_input,new cljs.core.Keyword(null,"value","value",305978217),null,"authorize");

shadow.arborist.fragments.set_attr(env24773,el14_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"submit-pet");

return [el0_div];
}),(function (exports24777,parent24778,anchor24779){
return shadow.arborist.fragments.dom_insert_before(parent24778,(exports24777[0]),anchor24779);
}),(function (this24780,env24781,exports24782,oldv24783,newv24784){
return null;
}),(function (env24787,exports24786,oldv24788,dom_remove24789){
if(dom_remove24789){
return shadow.arborist.fragments.dom_remove((exports24786[0]));
} else {
return null;
}
})));

pet.ui.views.login_page = shadow.grove.components.make_component_config("pet.ui.views/login-page",[],cljs.core.PersistentArrayMap.EMPTY,(function (comp24762,old24763,new24764){
shadow.grove.components.check_args_BANG_(comp24762,new24764,0);

return null;
}),(0),(function (comp24762){
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l145_c4);
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044),(function (env,_,e){
var vec__24790_24827 = e.target.form;
var seq__24791_24828 = cljs.core.seq(vec__24790_24827);
var first__24792_24829 = cljs.core.first(seq__24791_24828);
var seq__24791_24830__$1 = cljs.core.next(seq__24791_24828);
var read_24831 = first__24792_24829;
var first__24792_24832__$1 = cljs.core.first(seq__24791_24830__$1);
var seq__24791_24833__$2 = cljs.core.next(seq__24791_24830__$1);
var write_24834 = first__24792_24832__$1;
var __24835__$1 = seq__24791_24833__$2;
console.log(["READ ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(read_24831.checked),"\n","WRITE ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(write_24834.checked)].join(''));

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044),new cljs.core.Keyword("pet.model","read","pet.model/read",715584447),read_24831.checked,new cljs.core.Keyword("pet.model","write","pet.model/write",-927887002),write_24834.checked], null));

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/"], null));

return null;
})], null));
pet.ui.views.fragment_l166_c4 = (new shadow.arborist.fragments.FragmentCode((function (env24798,vals24799,element_fn24800){
var d0 = shadow.arborist.fragments.managed_create(env24798,(vals24799[0]));
var el1_header = element_fn24800(new cljs.core.Keyword(null,"header","header",119441134));
var el2_h1 = element_fn24800(new cljs.core.Keyword(null,"h1","h1",-1896887462));
var text_24796 = shadow.arborist.fragments.create_text(env24798,"Petstore");
var d4 = shadow.arborist.fragments.managed_create(env24798,(vals24799[1]));
shadow.arborist.fragments.set_attr(env24798,el1_header,new cljs.core.Keyword(null,"class","class",-2030961996),null,"header");

shadow.arborist.fragments.append_child(el1_header,el2_h1);

shadow.arborist.fragments.append_child(el2_h1,text_24796);

return [d0,el1_header,d4];
}),(function (exports24802,parent24803,anchor24804){
shadow.arborist.fragments.managed_insert((exports24802[0]),parent24803,anchor24804);

shadow.arborist.fragments.dom_insert_before(parent24803,(exports24802[1]),anchor24804);

return shadow.arborist.fragments.managed_insert((exports24802[2]),parent24803,anchor24804);
}),(function (this24805,env24806,exports24807,oldv24808,newv24809){
shadow.arborist.fragments.update_managed(this24805,env24806,exports24807,0,(oldv24808[0]),(newv24809[0]));

return shadow.arborist.fragments.update_managed(this24805,env24806,exports24807,2,(oldv24808[1]),(newv24809[1]));
}),(function (env24812,exports24811,oldv24813,dom_remove24814){
shadow.arborist.fragments.managed_remove((exports24811[0]),dom_remove24814);

if(dom_remove24814){
shadow.arborist.fragments.dom_remove((exports24811[1]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports24811[2]),dom_remove24814);
})));

pet.ui.views.ui_root = shadow.grove.components.make_component_config("pet.ui.views/ui-root",[shadow.grove.components.make_hook_config((0),(2),(function (comp24793){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp24793){
var query = shadow.grove.components.get_hook_value(comp24793,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp24793,old24794,new24795){
shadow.grove.components.check_args_BANG_(comp24793,new24795,0);

return null;
}),(2),(function (comp24793){
var route = shadow.grove.components.get_hook_value(comp24793,(1));
return shadow.arborist.fragments.fragment_init([pet.ui.views.navbar.cljs$core$IFn$_invoke$arity$0(),(function (){var G__24815 = route;
switch (G__24815) {
case "/":
return pet.ui.views.pets.cljs$core$IFn$_invoke$arity$0();

break;
case "/login":
return pet.ui.views.login_page.cljs$core$IFn$_invoke$arity$0();

break;
case "/whoami":
return pet.ui.views.whoami.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__24815)].join('')));

}
})()],null,pet.ui.views.fragment_l166_c4);
}),cljs.core.PersistentArrayMap.EMPTY);

//# sourceMappingURL=pet.ui.views.js.map
