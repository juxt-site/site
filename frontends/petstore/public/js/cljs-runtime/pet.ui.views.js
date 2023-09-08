goog.provide('pet.ui.views');
pet.ui.views.fragment_l16_c4 = (new shadow.arborist.fragments.FragmentCode((function (env40005,vals40006,element_fn40007){
var el0_li = element_fn40007(new cljs.core.Keyword(null,"li","li",723558921));
var el1_div = element_fn40007(new cljs.core.Keyword(null,"div","div",1057191632));
var el2_label = element_fn40007(new cljs.core.Keyword(null,"label","label",1718410804));
var text_40001 = shadow.arborist.fragments.create_text(env40005,"Name: ");
var d4 = shadow.arborist.fragments.managed_create(env40005,(vals40006[0]));
var el5_label = element_fn40007(new cljs.core.Keyword(null,"label","label",1718410804));
var text_40002 = shadow.arborist.fragments.create_text(env40005,"Status: ");
var d7 = shadow.arborist.fragments.managed_create(env40005,(vals40006[1]));
var el8_button = element_fn40007(new cljs.core.Keyword(null,"button","button",1456579943));
shadow.arborist.fragments.append_child(el0_li,el1_div);

shadow.arborist.fragments.set_attr(env40005,el1_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"view");

shadow.arborist.fragments.append_child(el1_div,el2_label);

shadow.arborist.fragments.append_child(el2_label,text_40001);

shadow.arborist.fragments.managed_append(el2_label,d4);

shadow.arborist.fragments.append_child(el1_div,el5_label);

shadow.arborist.fragments.append_child(el5_label,text_40002);

shadow.arborist.fragments.managed_append(el5_label,d7);

shadow.arborist.fragments.append_child(el1_div,el8_button);

shadow.arborist.fragments.set_attr(env40005,el8_button,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,(vals40006[2]));

shadow.arborist.fragments.set_attr(env40005,el8_button,new cljs.core.Keyword(null,"class","class",-2030961996),null,"destroy");

return [el0_li,d4,d7,el8_button];
}),(function (exports40009,parent40010,anchor40011){
return shadow.arborist.fragments.dom_insert_before(parent40010,(exports40009[0]),anchor40011);
}),(function (this40012,env40013,exports40014,oldv40015,newv40016){
shadow.arborist.fragments.update_managed(this40012,env40013,exports40014,1,(oldv40015[0]),(newv40016[0]));

shadow.arborist.fragments.update_managed(this40012,env40013,exports40014,2,(oldv40015[1]),(newv40016[1]));

return shadow.arborist.fragments.update_attr(env40013,exports40014,3,new cljs.core.Keyword(null,"on-click","on-click",1632826543),(oldv40015[2]),(newv40016[2]));
}),(function (env40019,exports40018,oldv40020,dom_remove40021){
if(dom_remove40021){
shadow.arborist.fragments.dom_remove((exports40018[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports40018[1]),false);

return shadow.arborist.fragments.managed_remove((exports40018[2]),false);
})));

pet.ui.views.pet_item = shadow.grove.components.make_component_config("pet.ui.views/pet-item",[shadow.grove.components.make_hook_config((0),(30),(function (comp39998){
var pet__$1 = shadow.grove.components.get_arg(comp39998,0);
return shadow.grove.query_ident.cljs$core$IFn$_invoke$arity$2(pet__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610),new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp39998){
var data = shadow.grove.components.get_hook_value(comp39998,(0));
return new cljs.core.Keyword("pet.model","completed?","pet.model/completed?",-500140336).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp39998){
var data = shadow.grove.components.get_hook_value(comp39998,(0));
return new cljs.core.Keyword("pet.model","editing?","pet.model/editing?",-1168397610).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp39998){
var data = shadow.grove.components.get_hook_value(comp39998,(0));
return new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697).cljs$core$IFn$_invoke$arity$2(data,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp39998){
var data = shadow.grove.components.get_hook_value(comp39998,(0));
return new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780).cljs$core$IFn$_invoke$arity$2(data,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp39998,old39999,new40000){
shadow.grove.components.check_args_BANG_(comp39998,new40000,1);

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old39999.cljs$core$IIndexed$_nth$arity$2(null,0),new40000.cljs$core$IIndexed$_nth$arity$2(null,0))){
shadow.grove.components.arg_triggers_render_BANG_(comp39998,0);

shadow.grove.components.arg_triggers_hooks_BANG_(comp39998,0,(1));
} else {
}

return null;
}),(24),(function (comp39998){
var pet_name = shadow.grove.components.get_hook_value(comp39998,(3));
var pet_status = shadow.grove.components.get_hook_value(comp39998,(4));
var pet__$1 = shadow.grove.components.get_arg(comp39998,0);
return shadow.arborist.fragments.fragment_init([pet_name,pet_status,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","delete!","pet.model/delete!",-1563147061),new cljs.core.Keyword(null,"pet","pet",-1587748619),pet__$1], null)],null,pet.ui.views.fragment_l16_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l34_c5 = (new shadow.arborist.fragments.FragmentCode((function (env40026,vals40027,element_fn40028){
var el0_ul = element_fn40028(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env40026,(vals40027[0]));
shadow.arborist.fragments.set_attr(env40026,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"filters");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports40030,parent40031,anchor40032){
return shadow.arborist.fragments.dom_insert_before(parent40031,(exports40030[0]),anchor40032);
}),(function (this40033,env40034,exports40035,oldv40036,newv40037){
return shadow.arborist.fragments.update_managed(this40033,env40034,exports40035,1,(oldv40036[0]),(newv40037[0]));
}),(function (env40040,exports40039,oldv40041,dom_remove40042){
if(dom_remove40042){
shadow.arborist.fragments.dom_remove((exports40039[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40039[1]),false);
})));

pet.ui.views.fragment_l37_c14 = (new shadow.arborist.fragments.FragmentCode((function (env40048,vals40049,element_fn40050){
var el0_li = element_fn40050(new cljs.core.Keyword(null,"li","li",723558921));
var el1_a = element_fn40050(new cljs.core.Keyword(null,"a","a",-2123407586));
var d2 = shadow.arborist.fragments.managed_create(env40048,(vals40049[2]));
shadow.arborist.fragments.append_child(el0_li,el1_a);

shadow.arborist.fragments.set_attr(env40048,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,(vals40049[0]));

shadow.arborist.fragments.set_attr(env40048,el1_a,new cljs.core.Keyword("ui","href","ui/href",-793802206),null,(vals40049[1]));

shadow.arborist.fragments.managed_append(el1_a,d2);

return [el0_li,el1_a,d2];
}),(function (exports40052,parent40053,anchor40054){
return shadow.arborist.fragments.dom_insert_before(parent40053,(exports40052[0]),anchor40054);
}),(function (this40055,env40056,exports40057,oldv40058,newv40059){
shadow.arborist.fragments.update_attr(env40056,exports40057,1,new cljs.core.Keyword(null,"class","class",-2030961996),(oldv40058[0]),(newv40059[0]));

shadow.arborist.fragments.update_attr(env40056,exports40057,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv40058[1]),(newv40059[1]));

return shadow.arborist.fragments.update_managed(this40055,env40056,exports40057,2,(oldv40058[2]),(newv40059[2]));
}),(function (env40062,exports40061,oldv40063,dom_remove40064){
if(dom_remove40064){
shadow.arborist.fragments.dom_remove((exports40061[0]));
} else {
}

shadow.arborist.fragments.clear_attr(env40062,exports40061,1,new cljs.core.Keyword("ui","href","ui/href",-793802206),(oldv40063[1]));

return shadow.arborist.fragments.managed_remove((exports40061[2]),false);
})));

pet.ui.views.ui_filter_select = shadow.grove.components.make_component_config("pet.ui.views/ui-filter-select",[shadow.grove.components.make_hook_config((0),(2),(function (comp40022){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40022){
var __hook$0 = shadow.grove.components.get_hook_value(comp40022,(0));
return new cljs.core.Keyword("pet.model","current-filter","pet.model/current-filter",-2083944763).cljs$core$IFn$_invoke$arity$2(__hook$0,null);
})),shadow.grove.components.make_hook_config((0),(0),(function (comp40022){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"All",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"all","all",892129742)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Active",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"active","active",1895962068)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1718410804),"Completed",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"completed","completed",-486056503)], null)], null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40022,old40023,new40024){
shadow.grove.components.check_args_BANG_(comp40022,new40024,0);

return null;
}),(6),(function (comp40022){
var filter_options = shadow.grove.components.get_hook_value(comp40022,(2));
var current_filter = shadow.grove.components.get_hook_value(comp40022,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filter_options,new cljs.core.Keyword(null,"value","value",305978217),(function (p__40043){
var map__40044 = p__40043;
var map__40044__$1 = cljs.core.__destructure_map(map__40044);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40044__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40044__$1,new cljs.core.Keyword(null,"value","value",305978217));
return shadow.arborist.fragments.fragment_init([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_filter,value)], null),["/",cljs.core.name(value)].join(''),label],null,pet.ui.views.fragment_l37_c14);
}))],null,pet.ui.views.fragment_l34_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l48_c5 = (new shadow.arborist.fragments.FragmentCode((function (env40069,vals40070,element_fn40071){
var el0_ul = element_fn40071(new cljs.core.Keyword(null,"ul","ul",-1349521403));
var d1 = shadow.arborist.fragments.managed_create(env40069,(vals40070[0]));
shadow.arborist.fragments.set_attr(env40069,el0_ul,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-list");

shadow.arborist.fragments.managed_append(el0_ul,d1);

return [el0_ul,d1];
}),(function (exports40073,parent40074,anchor40075){
return shadow.arborist.fragments.dom_insert_before(parent40074,(exports40073[0]),anchor40075);
}),(function (this40076,env40077,exports40078,oldv40079,newv40080){
return shadow.arborist.fragments.update_managed(this40076,env40077,exports40078,1,(oldv40079[0]),(newv40080[0]));
}),(function (env40083,exports40082,oldv40084,dom_remove40085){
if(dom_remove40085){
shadow.arborist.fragments.dom_remove((exports40082[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40082[1]),false);
})));

pet.ui.views.ui_pet_list = shadow.grove.components.make_component_config("pet.ui.views/ui-pet-list",[shadow.grove.components.make_hook_config((0),(2),(function (comp40065){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40065){
var query = shadow.grove.components.get_hook_value(comp40065,(0));
return new cljs.core.Keyword("pet.model","filtered-pets","pet.model/filtered-pets",803039257).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40065,old40066,new40067){
shadow.grove.components.check_args_BANG_(comp40065,new40067,0);

return null;
}),(2),(function (comp40065){
var filtered_pets = shadow.grove.components.get_hook_value(comp40065,(1));
return shadow.arborist.fragments.fragment_init([shadow.grove.keyed_seq(filtered_pets,cljs.core.identity,pet.ui.views.pet_item)],null,pet.ui.views.fragment_l48_c5);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l56_c6 = (new shadow.arborist.fragments.FragmentCode((function (env40093,vals40094,element_fn40095){
var el0_nav = element_fn40095(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn40095(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_40089 = shadow.arborist.fragments.create_text(env40093,"LOG OUT");
var el3_a = element_fn40095(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_40090 = shadow.arborist.fragments.create_text(env40093,"PETS");
var el5_a = element_fn40095(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_40091 = shadow.arborist.fragments.create_text(env40093,"WHOAMI");
shadow.arborist.fragments.set_attr(env40093,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env40093,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env40093,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_40089);

shadow.arborist.fragments.append_child(el0_nav,el3_a);

shadow.arborist.fragments.set_attr(env40093,el3_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/"], null));

shadow.arborist.fragments.set_attr(env40093,el3_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el3_a,text_40090);

shadow.arborist.fragments.append_child(el0_nav,el5_a);

shadow.arborist.fragments.set_attr(env40093,el5_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","change-route!","pet.model/change-route!",1457742632),new cljs.core.Keyword(null,"route","route",329891309),"/whoami"], null));

shadow.arborist.fragments.set_attr(env40093,el5_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el5_a,text_40091);

return [el0_nav];
}),(function (exports40097,parent40098,anchor40099){
return shadow.arborist.fragments.dom_insert_before(parent40098,(exports40097[0]),anchor40099);
}),(function (this40100,env40101,exports40102,oldv40103,newv40104){
return null;
}),(function (env40107,exports40106,oldv40108,dom_remove40109){
if(dom_remove40109){
return shadow.arborist.fragments.dom_remove((exports40106[0]));
} else {
return null;
}
})));

pet.ui.views.fragment_l64_c6 = (new shadow.arborist.fragments.FragmentCode((function (env40112,vals40113,element_fn40114){
var el0_nav = element_fn40114(new cljs.core.Keyword(null,"nav","nav",719540477));
var el1_a = element_fn40114(new cljs.core.Keyword(null,"a","a",-2123407586));
var text_40110 = shadow.arborist.fragments.create_text(env40112,"LOG IN");
shadow.arborist.fragments.set_attr(env40112,el0_nav,new cljs.core.Keyword(null,"class","class",-2030961996),null,"nabar");

shadow.arborist.fragments.append_child(el0_nav,el1_a);

shadow.arborist.fragments.set_attr(env40112,el1_a,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","login-toggle!","pet.model/login-toggle!",-124906044)], null));

shadow.arborist.fragments.set_attr(env40112,el1_a,new cljs.core.Keyword(null,"class","class",-2030961996),null,"login");

shadow.arborist.fragments.append_child(el1_a,text_40110);

return [el0_nav];
}),(function (exports40116,parent40117,anchor40118){
return shadow.arborist.fragments.dom_insert_before(parent40117,(exports40116[0]),anchor40118);
}),(function (this40119,env40120,exports40121,oldv40122,newv40123){
return null;
}),(function (env40126,exports40125,oldv40127,dom_remove40128){
if(dom_remove40128){
return shadow.arborist.fragments.dom_remove((exports40125[0]));
} else {
return null;
}
})));

pet.ui.views.navbar = shadow.grove.components.make_component_config("pet.ui.views/navbar",[shadow.grove.components.make_hook_config((0),(2),(function (comp40086){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40086){
var query = shadow.grove.components.get_hook_value(comp40086,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40086,old40087,new40088){
shadow.grove.components.check_args_BANG_(comp40086,new40088,0);

return null;
}),(2),(function (comp40086){
var logged_in = shadow.grove.components.get_hook_value(comp40086,(1));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l56_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l64_c6);
}
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l73_c4 = (new shadow.arborist.fragments.FragmentCode((function (env40135,vals40136,element_fn40137){
var el0_div = element_fn40137(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn40137(new cljs.core.Keyword(null,"h2","h2",-372662728));
var d2 = shadow.arborist.fragments.managed_create(env40135,(vals40136[0]));
var el3_h3 = element_fn40137(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_40132 = shadow.arborist.fragments.create_text(env40135,"Roles");
var d5 = shadow.arborist.fragments.managed_create(env40135,(vals40136[1]));
var el6_h3 = element_fn40137(new cljs.core.Keyword(null,"h3","h3",2067611163));
var text_40133 = shadow.arborist.fragments.create_text(env40135,"Permissions");
var d8 = shadow.arborist.fragments.managed_create(env40135,(vals40136[2]));
shadow.arborist.fragments.set_attr(env40135,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.managed_append(el1_h2,d2);

shadow.arborist.fragments.append_child(el0_div,el3_h3);

shadow.arborist.fragments.append_child(el3_h3,text_40132);

shadow.arborist.fragments.managed_append(el0_div,d5);

shadow.arborist.fragments.append_child(el0_div,el6_h3);

shadow.arborist.fragments.append_child(el6_h3,text_40133);

shadow.arborist.fragments.managed_append(el0_div,d8);

return [el0_div,d2,d5,d8];
}),(function (exports40139,parent40140,anchor40141){
return shadow.arborist.fragments.dom_insert_before(parent40140,(exports40139[0]),anchor40141);
}),(function (this40142,env40143,exports40144,oldv40145,newv40146){
shadow.arborist.fragments.update_managed(this40142,env40143,exports40144,1,(oldv40145[0]),(newv40146[0]));

shadow.arborist.fragments.update_managed(this40142,env40143,exports40144,2,(oldv40145[1]),(newv40146[1]));

return shadow.arborist.fragments.update_managed(this40142,env40143,exports40144,3,(oldv40145[2]),(newv40146[2]));
}),(function (env40149,exports40148,oldv40150,dom_remove40151){
if(dom_remove40151){
shadow.arborist.fragments.dom_remove((exports40148[0]));
} else {
}

shadow.arborist.fragments.managed_remove((exports40148[1]),false);

shadow.arborist.fragments.managed_remove((exports40148[2]),false);

return shadow.arborist.fragments.managed_remove((exports40148[3]),false);
})));

pet.ui.views.fragment_l79_c22 = (new shadow.arborist.fragments.FragmentCode((function (env40153,vals40154,element_fn40155){
var el0_li = element_fn40155(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env40153,(vals40154[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports40157,parent40158,anchor40159){
return shadow.arborist.fragments.dom_insert_before(parent40158,(exports40157[0]),anchor40159);
}),(function (this40160,env40161,exports40162,oldv40163,newv40164){
return shadow.arborist.fragments.update_managed(this40160,env40161,exports40162,1,(oldv40163[0]),(newv40164[0]));
}),(function (env40167,exports40166,oldv40168,dom_remove40169){
if(dom_remove40169){
shadow.arborist.fragments.dom_remove((exports40166[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40166[1]),false);
})));

pet.ui.views.fragment_l84_c22 = (new shadow.arborist.fragments.FragmentCode((function (env40171,vals40172,element_fn40173){
var el0_li = element_fn40173(new cljs.core.Keyword(null,"li","li",723558921));
var d1 = shadow.arborist.fragments.managed_create(env40171,(vals40172[0]));
shadow.arborist.fragments.managed_append(el0_li,d1);

return [el0_li,d1];
}),(function (exports40175,parent40176,anchor40177){
return shadow.arborist.fragments.dom_insert_before(parent40176,(exports40175[0]),anchor40177);
}),(function (this40178,env40179,exports40180,oldv40181,newv40182){
return shadow.arborist.fragments.update_managed(this40178,env40179,exports40180,1,(oldv40181[0]),(newv40182[0]));
}),(function (env40185,exports40184,oldv40186,dom_remove40187){
if(dom_remove40187){
shadow.arborist.fragments.dom_remove((exports40184[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40184[1]),false);
})));

pet.ui.views.whoami = shadow.grove.components.make_component_config("pet.ui.views/whoami",[shadow.grove.components.make_hook_config((0),(2),(function (comp40129){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40129){
var query = shadow.grove.components.get_hook_value(comp40129,(0));
return new cljs.core.Keyword("pet.model","whoami","pet.model/whoami",-1166872991).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40129,old40130,new40131){
shadow.grove.components.check_args_BANG_(comp40129,new40131,0);

return null;
}),(2),(function (comp40129){
var whoami = shadow.grove.components.get_hook_value(comp40129,(1));
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","user","juxt.site/user",-1099199318).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","subject","juxt.site/subject",-1761809841).cljs$core$IFn$_invoke$arity$1(whoami))),shadow.grove.simple_seq(new cljs.core.Keyword("juxt.site","roles","juxt.site/roles",-1112975592).cljs$core$IFn$_invoke$arity$1(whoami),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(item)],null,pet.ui.views.fragment_l79_c22);
})),shadow.grove.keyed_seq(new cljs.core.Keyword("juxt.site","permitted-operations","juxt.site/permitted-operations",183409044).cljs$core$IFn$_invoke$arity$1(whoami),new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725),(function (item){
return shadow.arborist.fragments.fragment_init([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("juxt.site","operation-ref","juxt.site/operation-ref",1192020725).cljs$core$IFn$_invoke$arity$1(item))],null,pet.ui.views.fragment_l84_c22);
}))],null,pet.ui.views.fragment_l73_c4);
}),cljs.core.PersistentArrayMap.EMPTY);
pet.ui.views.fragment_l107_c6 = (new shadow.arborist.fragments.FragmentCode((function (env40201,vals40202,element_fn40203){
var el0_div = element_fn40203(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_input = element_fn40203(new cljs.core.Keyword(null,"input","input",556931961));
var el2_form = element_fn40203(new cljs.core.Keyword(null,"form","form",-1624062471));
var el3_input = element_fn40203(new cljs.core.Keyword(null,"input","input",556931961));
var el4_select = element_fn40203(new cljs.core.Keyword(null,"select","select",1147833503));
var el5_option = element_fn40203(new cljs.core.Keyword(null,"option","option",65132272));
var text_40197 = shadow.arborist.fragments.create_text(env40201,"available");
var el7_option = element_fn40203(new cljs.core.Keyword(null,"option","option",65132272));
var text_40198 = shadow.arborist.fragments.create_text(env40201,"pending");
var el9_option = element_fn40203(new cljs.core.Keyword(null,"option","option",65132272));
var text_40199 = shadow.arborist.fragments.create_text(env40201,"sold");
var el11_input = element_fn40203(new cljs.core.Keyword(null,"input","input",556931961));
var d12 = shadow.arborist.fragments.managed_create(env40201,(vals40202[0]));
shadow.arborist.fragments.set_attr(env40201,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_input);

shadow.arborist.fragments.set_attr(env40201,el1_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"button");

shadow.arborist.fragments.set_attr(env40201,el1_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Sync with DB");

shadow.arborist.fragments.set_attr(env40201,el1_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","refresh-pets-handler!","pet.model/refresh-pets-handler!",-282146106)], null));

shadow.arborist.fragments.append_child(el0_div,el2_form);

shadow.arborist.fragments.set_attr(env40201,el2_form,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-form");

shadow.arborist.fragments.append_child(el2_form,el3_input);

shadow.arborist.fragments.set_attr(env40201,el3_input,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Name");

shadow.arborist.fragments.set_attr(env40201,el3_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env40201,el3_input,new cljs.core.Keyword(null,"required","required",1807647006),null,true);

shadow.arborist.fragments.set_attr(env40201,el3_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el2_form,el4_select);

shadow.arborist.fragments.set_attr(env40201,el4_select,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),null,"Pet Status");

shadow.arborist.fragments.set_attr(env40201,el4_select,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env40201,el4_select,new cljs.core.Keyword(null,"class","class",-2030961996),null,"new-pet");

shadow.arborist.fragments.append_child(el4_select,el5_option);

shadow.arborist.fragments.append_child(el5_option,text_40197);

shadow.arborist.fragments.append_child(el4_select,el7_option);

shadow.arborist.fragments.append_child(el7_option,text_40198);

shadow.arborist.fragments.append_child(el4_select,el9_option);

shadow.arborist.fragments.append_child(el9_option,text_40199);

shadow.arborist.fragments.append_child(el2_form,el11_input);

shadow.arborist.fragments.set_attr(env40201,el11_input,new cljs.core.Keyword(null,"on-click","on-click",1632826543),null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761)], null));

shadow.arborist.fragments.set_attr(env40201,el11_input,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),null,true);

shadow.arborist.fragments.set_attr(env40201,el11_input,new cljs.core.Keyword(null,"type","type",1174270348),null,"submit");

shadow.arborist.fragments.set_attr(env40201,el11_input,new cljs.core.Keyword(null,"value","value",305978217),null,"Submit");

shadow.arborist.fragments.set_attr(env40201,el11_input,new cljs.core.Keyword(null,"class","class",-2030961996),null,"submit-pet");

shadow.arborist.fragments.managed_append(el0_div,d12);

return [el0_div,d12];
}),(function (exports40205,parent40206,anchor40207){
return shadow.arborist.fragments.dom_insert_before(parent40206,(exports40205[0]),anchor40207);
}),(function (this40208,env40209,exports40210,oldv40211,newv40212){
return shadow.arborist.fragments.update_managed(this40208,env40209,exports40210,1,(oldv40211[0]),(newv40212[0]));
}),(function (env40215,exports40214,oldv40216,dom_remove40217){
if(dom_remove40217){
shadow.arborist.fragments.dom_remove((exports40214[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40214[1]),false);
})));

pet.ui.views.fragment_l126_c10 = (new shadow.arborist.fragments.FragmentCode((function (env40219,vals40220,element_fn40221){
var el0_section = element_fn40221(new cljs.core.Keyword(null,"section","section",-300141526));
var d1 = shadow.arborist.fragments.managed_create(env40219,(vals40220[0]));
shadow.arborist.fragments.set_attr(env40219,el0_section,new cljs.core.Keyword(null,"class","class",-2030961996),null,"main");

shadow.arborist.fragments.managed_append(el0_section,d1);

return [el0_section,d1];
}),(function (exports40223,parent40224,anchor40225){
return shadow.arborist.fragments.dom_insert_before(parent40224,(exports40223[0]),anchor40225);
}),(function (this40226,env40227,exports40228,oldv40229,newv40230){
return shadow.arborist.fragments.update_managed(this40226,env40227,exports40228,1,(oldv40229[0]),(newv40230[0]));
}),(function (env40233,exports40232,oldv40234,dom_remove40235){
if(dom_remove40235){
shadow.arborist.fragments.dom_remove((exports40232[0]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40232[1]),false);
})));

pet.ui.views.fragment_l129_c6 = (new shadow.arborist.fragments.FragmentCode((function (env40238,vals40239,element_fn40240){
var el0_div = element_fn40240(new cljs.core.Keyword(null,"div","div",1057191632));
var el1_h2 = element_fn40240(new cljs.core.Keyword(null,"h2","h2",-372662728));
var text_40236 = shadow.arborist.fragments.create_text(env40238,"You do not have permission to view this page");
shadow.arborist.fragments.set_attr(env40238,el0_div,new cljs.core.Keyword(null,"class","class",-2030961996),null,"pet-view");

shadow.arborist.fragments.append_child(el0_div,el1_h2);

shadow.arborist.fragments.append_child(el1_h2,text_40236);

return [el0_div];
}),(function (exports40242,parent40243,anchor40244){
return shadow.arborist.fragments.dom_insert_before(parent40243,(exports40242[0]),anchor40244);
}),(function (this40245,env40246,exports40247,oldv40248,newv40249){
return null;
}),(function (env40252,exports40251,oldv40253,dom_remove40254){
if(dom_remove40254){
return shadow.arborist.fragments.dom_remove((exports40251[0]));
} else {
return null;
}
})));

pet.ui.views.pets = shadow.grove.components.make_component_config("pet.ui.views/pets",[shadow.grove.components.make_hook_config((0),(62),(function (comp40188){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","editing","pet.model/editing",-200754725),new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835),new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883),new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868),new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937),new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40188){
var query = shadow.grove.components.get_hook_value(comp40188,(0));
return new cljs.core.Keyword("pet.model","num-total","pet.model/num-total",321749835).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40188){
var query = shadow.grove.components.get_hook_value(comp40188,(0));
return new cljs.core.Keyword("pet.model","num-active","pet.model/num-active",-1036825883).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40188){
var query = shadow.grove.components.get_hook_value(comp40188,(0));
return new cljs.core.Keyword("pet.model","num-completed","pet.model/num-completed",595162868).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40188){
var query = shadow.grove.components.get_hook_value(comp40188,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40188){
var query = shadow.grove.components.get_hook_value(comp40188,(0));
return new cljs.core.Keyword("pet.model","logged-in","pet.model/logged-in",1179984977).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40188,old40189,new40190){
shadow.grove.components.check_args_BANG_(comp40188,new40190,0);

return null;
}),(34),(function (comp40188){
var num_total = shadow.grove.components.get_hook_value(comp40188,(1));
var logged_in = shadow.grove.components.get_hook_value(comp40188,(5));
if(cljs.core.truth_(logged_in)){
return shadow.arborist.fragments.fragment_init([(((num_total > (0)))?shadow.arborist.fragments.fragment_init([pet.ui.views.ui_pet_list.cljs$core$IFn$_invoke$arity$0()],null,pet.ui.views.fragment_l126_c10):null)],null,pet.ui.views.fragment_l107_c6);
} else {
return shadow.arborist.fragments.fragment_init([],null,pet.ui.views.fragment_l129_c6);
}
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),(function (env,_,e){
var vec__40255_40283 = e.target.form;
var seq__40256_40284 = cljs.core.seq(vec__40255_40283);
var first__40257_40285 = cljs.core.first(seq__40256_40284);
var seq__40256_40286__$1 = cljs.core.next(seq__40256_40284);
var name_40287 = first__40257_40285;
var first__40257_40288__$1 = cljs.core.first(seq__40256_40286__$1);
var seq__40256_40289__$2 = cljs.core.next(seq__40256_40286__$1);
var status_40290 = first__40257_40288__$1;
var __40291__$1 = seq__40256_40289__$2;
console.log(name_40287);

shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","create-new!","pet.model/create-new!",-309029761),new cljs.core.Keyword("pet.model","pet-name","pet.model/pet-name",327604697),name_40287.value,new cljs.core.Keyword("pet.model","pet-status","pet.model/pet-status",-499091780),status_40290.value], null));

return null;
}),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),(function (env,_,e){
shadow.grove.run_tx(env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("pet.model","toggle-all!","pet.model/toggle-all!",999464727),new cljs.core.Keyword(null,"completed?","completed?",946828354),e.target.checked], null));

return null;
})], null));
pet.ui.views.fragment_l139_c4 = (new shadow.arborist.fragments.FragmentCode((function (env40263,vals40264,element_fn40265){
var d0 = shadow.arborist.fragments.managed_create(env40263,(vals40264[0]));
var el1_header = element_fn40265(new cljs.core.Keyword(null,"header","header",119441134));
var el2_h1 = element_fn40265(new cljs.core.Keyword(null,"h1","h1",-1896887462));
var text_40261 = shadow.arborist.fragments.create_text(env40263,"Petstore");
var d4 = shadow.arborist.fragments.managed_create(env40263,(vals40264[1]));
shadow.arborist.fragments.set_attr(env40263,el1_header,new cljs.core.Keyword(null,"class","class",-2030961996),null,"header");

shadow.arborist.fragments.append_child(el1_header,el2_h1);

shadow.arborist.fragments.append_child(el2_h1,text_40261);

return [d0,el1_header,d4];
}),(function (exports40267,parent40268,anchor40269){
shadow.arborist.fragments.managed_insert((exports40267[0]),parent40268,anchor40269);

shadow.arborist.fragments.dom_insert_before(parent40268,(exports40267[1]),anchor40269);

return shadow.arborist.fragments.managed_insert((exports40267[2]),parent40268,anchor40269);
}),(function (this40270,env40271,exports40272,oldv40273,newv40274){
shadow.arborist.fragments.update_managed(this40270,env40271,exports40272,0,(oldv40273[0]),(newv40274[0]));

return shadow.arborist.fragments.update_managed(this40270,env40271,exports40272,2,(oldv40273[1]),(newv40274[1]));
}),(function (env40277,exports40276,oldv40278,dom_remove40279){
shadow.arborist.fragments.managed_remove((exports40276[0]),dom_remove40279);

if(dom_remove40279){
shadow.arborist.fragments.dom_remove((exports40276[1]));
} else {
}

return shadow.arborist.fragments.managed_remove((exports40276[2]),dom_remove40279);
})));

pet.ui.views.ui_root = shadow.grove.components.make_component_config("pet.ui.views/ui-root",[shadow.grove.components.make_hook_config((0),(2),(function (comp40258){
return shadow.grove.query_root.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937)], null));
})),shadow.grove.components.make_hook_config((1),(0),(function (comp40258){
var query = shadow.grove.components.get_hook_value(comp40258,(0));
return new cljs.core.Keyword("pet.model","route","pet.model/route",-88160937).cljs$core$IFn$_invoke$arity$2(query,null);
}))],cljs.core.PersistentArrayMap.EMPTY,(function (comp40258,old40259,new40260){
shadow.grove.components.check_args_BANG_(comp40258,new40260,0);

return null;
}),(2),(function (comp40258){
var route = shadow.grove.components.get_hook_value(comp40258,(1));
return shadow.arborist.fragments.fragment_init([pet.ui.views.navbar.cljs$core$IFn$_invoke$arity$0(),(function (){var G__40280 = route;
switch (G__40280) {
case "/":
return pet.ui.views.pets.cljs$core$IFn$_invoke$arity$0();

break;
case "/whoami":
return pet.ui.views.whoami.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__40280)].join('')));

}
})()],null,pet.ui.views.fragment_l139_c4);
}),cljs.core.PersistentArrayMap.EMPTY);

//# sourceMappingURL=pet.ui.views.js.map
