/*
@license
dhtmlxScheduler v.4.4.9 Professional

This software is covered by DHTMLX Commercial License. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.limit_start=null,scheduler.config.limit_end=null,scheduler.config.limit_view=!1,scheduler.config.check_limits=!0,scheduler.config.mark_now=!0,scheduler.config.display_marked_timespans=!0,scheduler._temp_limit_scope=function(){function e(e,t,a,r,i){var n=scheduler,s=[],d={_props:"map_to",matrix:"y_property"};for(var o in d){var l=d[o];if(n[o])for(var _ in n[o]){var c=n[o][_],h=c[l];e[h]&&(s=n._add_timespan_zones(s,scheduler._get_blocked_zones(t[_],e[h],a,r,i)))}}return s=n._add_timespan_zones(s,scheduler._get_blocked_zones(t,"global",a,r,i));
}var t=null,a="dhx_time_block",r="default",i=function(e,t,a){return t instanceof Date&&a instanceof Date?(e.start_date=t,e.end_date=a):(e.days=t,e.zones=a),e},n=function(e,t,r){var n="object"==typeof e?e:{days:e};return n.type=a,n.css="",t&&(r&&(n.sections=r),n=i(n,e,t)),n};scheduler.blockTime=function(e,t,a){var r=n(e,t,a);return scheduler.addMarkedTimespan(r)},scheduler.unblockTime=function(e,t,a){t=t||"fullday";var r=n(e,t,a);return scheduler.deleteMarkedTimespan(r)},scheduler.attachEvent("onBeforeViewChange",function(e,t,a,r){
function i(e,t){var a=scheduler.config.limit_start,r=scheduler.config.limit_end,i=scheduler.date.add(e,1,t);return e.valueOf()>r.valueOf()||i<=a.valueOf()}return scheduler.config.limit_view&&(r=r||t,a=a||e,i(r,a)&&t.valueOf()!=r.valueOf())?(setTimeout(function(){var e=i(t,a)?scheduler.config.limit_start:t;scheduler.setCurrentView(i(e,a)?null:e,a)},1),!1):!0}),scheduler.checkInMarkedTimespan=function(t,a,i){a=a||r;for(var n=!0,s=new Date(t.start_date.valueOf()),d=scheduler.date.add(s,1,"day"),o=scheduler._marked_timespans;s<t.end_date;s=scheduler.date.date_part(d),
d=scheduler.date.add(s,1,"day")){var l=+scheduler.date.date_part(new Date(s)),_=s.getDay(),c=e(t,o,_,l,a);if(c)for(var h=0;h<c.length;h+=2){var u=scheduler._get_zone_minutes(s),v=t.end_date>d||t.end_date.getDate()!=s.getDate()?1440:scheduler._get_zone_minutes(t.end_date),f=c[h],g=c[h+1];if(v>f&&g>u&&(n="function"==typeof i?i(t,u,v,f,g):!1,!n))break}}return!n};var s=scheduler.checkLimitViolation=function(e){if(!e)return!0;if(!scheduler.config.check_limits)return!0;var t=scheduler,r=t.config,i=[];if(e.rec_type)for(var n=scheduler.getRecDates(e),s=0;s<n.length;s++){
var d=scheduler._copy_event(e);scheduler._lame_copy(d,n[s]),i.push(d)}else i=[e];for(var o=!0,l=0;l<i.length;l++){var _=!0,d=i[l];d._timed=scheduler.isOneDayEvent(d),_=r.limit_start&&r.limit_end?d.start_date.valueOf()>=r.limit_start.valueOf()&&d.end_date.valueOf()<=r.limit_end.valueOf():!0,_&&(_=!scheduler.checkInMarkedTimespan(d,a,function(e,a,r,i,n){var s=!0;return n>=a&&a>=i&&((1440==n||n>r)&&(s=!1),e._timed&&t._drag_id&&"new-size"==t._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(n)):s=!1),
(r>=i&&n>r||i>a&&r>n)&&(e._timed&&t._drag_id&&"new-size"==t._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(i)):s=!1),s})),_||(_=t.checkEvent("onLimitViolation")?t.callEvent("onLimitViolation",[d.id,d]):_),o=o&&_}return o||(t._drag_id=null,t._drag_mode=null),o};scheduler._get_blocked_zones=function(e,t,a,r,i){var n=[];if(e&&e[t])for(var s=e[t],d=this._get_relevant_blocked_zones(a,r,s,i),o=0;o<d.length;o++)n=this._add_timespan_zones(n,d[o].zones);return n},scheduler._get_relevant_blocked_zones=function(e,t,a,r){
var i=a[t]&&a[t][r]?a[t][r]:a[e]&&a[e][r]?a[e][r]:[];return i},scheduler.attachEvent("onMouseDown",function(e){return!(e==a)}),scheduler.attachEvent("onBeforeDrag",function(e){return e?s(scheduler.getEvent(e)):!0}),scheduler.attachEvent("onClick",function(e,t){return s(scheduler.getEvent(e))}),scheduler.attachEvent("onBeforeLightbox",function(e){var a=scheduler.getEvent(e);return t=[a.start_date,a.end_date],s(a)}),scheduler.attachEvent("onEventSave",function(e,t,a){if(!t.start_date||!t.end_date){
var r=scheduler.getEvent(e);t.start_date=new Date(r.start_date),t.end_date=new Date(r.end_date)}if(t.rec_type){var i=scheduler._lame_clone(t);return scheduler._roll_back_dates(i),s(i)}return s(t)}),scheduler.attachEvent("onEventAdded",function(e){if(!e)return!0;var t=scheduler.getEvent(e);return!s(t)&&scheduler.config.limit_start&&scheduler.config.limit_end&&(t.start_date<scheduler.config.limit_start&&(t.start_date=new Date(scheduler.config.limit_start)),t.start_date.valueOf()>=scheduler.config.limit_end.valueOf()&&(t.start_date=this.date.add(scheduler.config.limit_end,-1,"day")),
t.end_date<scheduler.config.limit_start&&(t.end_date=new Date(scheduler.config.limit_start)),t.end_date.valueOf()>=scheduler.config.limit_end.valueOf()&&(t.end_date=this.date.add(scheduler.config.limit_end,-1,"day")),t.start_date.valueOf()>=t.end_date.valueOf()&&(t.end_date=this.date.add(t.start_date,this.config.event_duration||this.config.time_step,"minute")),t._timed=this.isOneDayEvent(t)),!0}),scheduler.attachEvent("onEventChanged",function(e){if(!e)return!0;var a=scheduler.getEvent(e);if(!s(a)){
if(!t)return!1;a.start_date=t[0],a.end_date=t[1],a._timed=this.isOneDayEvent(a)}return!0}),scheduler.attachEvent("onBeforeEventChanged",function(e,t,a){return s(e)}),scheduler.attachEvent("onBeforeEventCreated",function(e){var t=scheduler.getActionData(e).date,a={_timed:!0,start_date:t,end_date:scheduler.date.add(t,scheduler.config.time_step,"minute")};return s(a)}),scheduler.attachEvent("onViewChange",function(){scheduler._mark_now()}),scheduler.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){
scheduler._mark_now()},1),!0}),scheduler.attachEvent("onTemplatesReady",function(){scheduler._mark_now_timer=window.setInterval(function(){scheduler._is_initialized()&&scheduler._mark_now()},6e4)}),scheduler._mark_now=function(e){var t="dhx_now_time";this._els[t]||(this._els[t]=[]);var a=scheduler._currentDate(),r=this.config;if(scheduler._remove_mark_now(),!e&&r.mark_now&&a<this._max_date&&a>this._min_date&&a.getHours()>=r.first_hour&&a.getHours()<r.last_hour){var i=this.locate_holder_day(a);this._els[t]=scheduler._append_mark_now(i,a);
}},scheduler._append_mark_now=function(e,t){var a="dhx_now_time",r=scheduler._get_zone_minutes(t),i={zones:[r,r+1],css:a,type:a};if(!this._table_view){if(this._props&&this._props[this._mode]){var n,s,d=this._props[this._mode],o=d.size||d.options.length;d.days>1?(n=e,s=e+o):(n=0,s=n+o);for(var l=[],_=n;s>_;_++){var c=_;i.days=c;var h=scheduler._render_marked_timespan(i,null,c)[0];l.push(h)}return l}return i.days=e,scheduler._render_marked_timespan(i,null,e)}return"month"==this._mode?(i.days=+scheduler.date.date_part(t),
scheduler._render_marked_timespan(i,null,null)):void 0},scheduler._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],a=0;a<t.length;a++){var r=t[a],i=r.parentNode;i&&i.removeChild(r)}this._els[e]=[]},scheduler._marked_timespans={global:{}},scheduler._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},scheduler._prepare_timespan_options=function(e){var t=[],a=[];if("fullweek"==e.days&&(e.days=[0,1,2,3,4,5,6]),e.days instanceof Array){for(var i=e.days.slice(),n=0;n<i.length;n++){
var s=scheduler._lame_clone(e);s.days=i[n],t.push.apply(t,scheduler._prepare_timespan_options(s))}return t}if(!e||!(e.start_date&&e.end_date&&e.end_date>e.start_date||void 0!==e.days&&e.zones)&&!e.type)return t;var d=0,o=1440;"fullday"==e.zones&&(e.zones=[d,o]),e.zones&&e.invert_zones&&(e.zones=scheduler.invertZones(e.zones)),e.id=scheduler.uid(),e.css=e.css||"",e.type=e.type||r;var l=e.sections;if(l){for(var _ in l)if(l.hasOwnProperty(_)){var c=l[_];c instanceof Array||(c=[c]);for(var n=0;n<c.length;n++){
var h=scheduler._lame_copy({},e);h.sections={},h.sections[_]=c[n],a.push(h)}}}else a.push(e);for(var u=0;u<a.length;u++){var v=a[u],f=v.start_date,g=v.end_date;if(f&&g)for(var m=scheduler.date.date_part(new Date(f)),p=scheduler.date.add(m,1,"day");g>m;){var h=scheduler._lame_copy({},v);delete h.start_date,delete h.end_date,h.days=m.valueOf();var y=f>m?scheduler._get_zone_minutes(f):d,b=g>p||g.getDate()!=m.getDate()?o:scheduler._get_zone_minutes(g);h.zones=[y,b],t.push(h),m=p,p=scheduler.date.add(p,1,"day");
}else v.days instanceof Date&&(v.days=scheduler.date.date_part(v.days).valueOf()),v.zones=e.zones.slice(),t.push(v)}return t},scheduler._get_dates_by_index=function(e,t,a){var r=[];t=scheduler.date.date_part(new Date(t||scheduler._min_date)),a=new Date(a||scheduler._max_date);for(var i=t.getDay(),n=e-i>=0?e-i:7-t.getDay()+e,s=scheduler.date.add(t,n,"day");a>s;s=scheduler.date.add(s,1,"week"))r.push(s);return r},scheduler._get_css_classes_by_config=function(e){var t=[];return e.type==a&&(t.push(a),
e.css&&t.push(a+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},scheduler._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},scheduler._render_marked_timespan=function(e,t,a){var r=[],i=scheduler.config,n=this._min_date,s=this._max_date,d=!1;if(!i.display_marked_timespans)return r;if(!a&&0!==a){if(e.days<7)a=e.days;else{var o=new Date(e.days);if(d=+o,!(+s>+o&&+o>=+n))return r;a=o.getDay();
}var l=n.getDay();l>a?a=7-(l-a):a-=l}var _=e.zones,c=scheduler._get_css_classes_by_config(e);if(scheduler._table_view&&"month"==scheduler._mode){var h=[],u=[];if(t)h.push(t),u.push(a);else{u=d?[d]:scheduler._get_dates_by_index(a);for(var v=0;v<u.length;v++)h.push(this._scales[u[v]])}for(var v=0;v<h.length;v++){t=h[v],a=u[v];var f=Math.floor((this._correct_shift(a,1)-n.valueOf())/(864e5*this._cols.length)),g=this.locate_holder_day(a,!1)%this._cols.length;if(!this._ignores[g]){var m=scheduler._get_block_by_config(e),p=Math.max(t.offsetHeight-1,0),y=Math.max(t.offsetWidth-1,0),b=this._colsS[g],x=this._colsS.heights[f]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;
m.className=c,m.style.top=x+"px",m.style.lineHeight=m.style.height=p+"px";for(var w=0;w<_.length;w+=2){var k=_[v],D=_[v+1];if(k>=D)return[];var N=m.cloneNode(!0);N.style.left=b+Math.round(k/1440*y)+"px",N.style.width=Math.round((D-k)/1440*y)+"px",t.appendChild(N),r.push(N)}}}}else{var E=a;if(this._ignores[this.locate_holder_day(a,!1)])return r;if(this._props&&this._props[this._mode]&&e.sections&&e.sections[this._mode]){var S=this._props[this._mode];E=S.order[e.sections[this._mode]];var A=S.order[e.sections[this._mode]];
if(S.days>1){var M=S.size||S.options.length;E=E*M+A}else E=A,S.size&&E>S.position+S.size&&(E=0)}t=t?t:scheduler.locate_holder(E);for(var v=0;v<_.length;v+=2){var k=Math.max(_[v],60*i.first_hour),D=Math.min(_[v+1],60*i.last_hour);if(k>=D){if(v+2<_.length)continue;return[]}var N=scheduler._get_block_by_config(e);N.className=c;var C=24*this.config.hour_size_px+1,O=36e5;N.style.top=Math.round((60*k*1e3-this.config.first_hour*O)*this.config.hour_size_px/O)%C+"px",N.style.lineHeight=N.style.height=Math.max(Math.round(60*(D-k)*1e3*this.config.hour_size_px/O)%C,1)+"px",
t.appendChild(N),r.push(N)}}return r},scheduler._mark_timespans=function(){var e=this._els.dhx_cal_data[0],t=[];if(scheduler._table_view&&"month"==scheduler._mode)for(var a in this._scales){var r=new Date(+a);t.push.apply(t,scheduler._on_scale_add_marker(this._scales[a],r))}else for(var r=new Date(scheduler._min_date),i=0,n=e.childNodes.length;n>i;i++){var s=e.childNodes[i];s.firstChild&&scheduler._getClassName(s.firstChild).indexOf("dhx_scale_hour")>-1||(t.push.apply(t,scheduler._on_scale_add_marker(s,r)),
r=scheduler.date.add(r,1,"day"))}return t},scheduler.markTimespan=function(e){var t=!1;this._els.dhx_cal_data||(scheduler.get_elements(),t=!0);var a=scheduler._marked_timespans_ids,r=scheduler._marked_timespans_types,i=scheduler._marked_timespans;scheduler.deleteMarkedTimespan(),scheduler.addMarkedTimespan(e);var n=scheduler._mark_timespans();return t&&(scheduler._els=[]),scheduler._marked_timespans_ids=a,scheduler._marked_timespans_types=r,scheduler._marked_timespans=i,n},scheduler.unmarkTimespan=function(e){
if(e)for(var t=0;t<e.length;t++){var a=e[t];a.parentNode&&a.parentNode.removeChild(a)}},scheduler._addMarkerTimespanConfig=function(e){var t="global",a=scheduler._marked_timespans,r=e.id,i=scheduler._marked_timespans_ids;i[r]||(i[r]=[]);var n=e.days,s=e.sections,d=e.type;if(e.id=r,s){for(var o in s)if(s.hasOwnProperty(o)){a[o]||(a[o]={});var l=s[o],_=a[o];_[l]||(_[l]={}),_[l][n]||(_[l][n]={}),_[l][n][d]||(_[l][n][d]=[],scheduler._marked_timespans_types||(scheduler._marked_timespans_types={}),scheduler._marked_timespans_types[d]||(scheduler._marked_timespans_types[d]=!0));
var c=_[l][n][d];e._array=c,c.push(e),i[r].push(e)}}else{a[t][n]||(a[t][n]={}),a[t][n][d]||(a[t][n][d]=[]),scheduler._marked_timespans_types||(scheduler._marked_timespans_types={}),scheduler._marked_timespans_types[d]||(scheduler._marked_timespans_types[d]=!0);var c=a[t][n][d];e._array=c,c.push(e),i[r].push(e)}},scheduler._marked_timespans_ids={},scheduler.addMarkedTimespan=function(e){var t=scheduler._prepare_timespan_options(e);if(t.length){for(var a=t[0].id,r=0;r<t.length;r++)scheduler._addMarkerTimespanConfig(t[r]);
return a}},scheduler._add_timespan_zones=function(e,t){var a=e.slice();if(t=t.slice(),!a.length)return t;for(var r=0;r<a.length;r+=2)for(var i=a[r],n=a[r+1],s=r+2==a.length,d=0;d<t.length;d+=2){var o=t[d],l=t[d+1];if(l>n&&n>=o||i>o&&l>=i)a[r]=Math.min(i,o),a[r+1]=Math.max(n,l),r-=2;else{if(!s)continue;var _=i>o?0:2;a.splice(r+_,0,o,l)}t.splice(d--,2);break}return a},scheduler._subtract_timespan_zones=function(e,t){for(var a=e.slice(),r=0;r<a.length;r+=2)for(var i=a[r],n=a[r+1],s=0;s<t.length;s+=2){
var d=t[s],o=t[s+1];if(o>i&&n>d){var l=!1;i>=d&&o>=n&&a.splice(r,2),d>i&&(a.splice(r,2,i,d),l=!0),n>o&&a.splice(l?r+2:r,l?0:2,o,n),r-=2;break}}return a},scheduler.invertZones=function(e){return scheduler._subtract_timespan_zones([0,1440],e.slice())},scheduler._delete_marked_timespan_by_id=function(e){var t=scheduler._marked_timespans_ids[e];if(t)for(var a=0;a<t.length;a++)for(var r=t[a],i=r._array,n=0;n<i.length;n++)if(i[n]==r){i.splice(n,1);break}},scheduler._delete_marked_timespan_by_config=function(e){
var t,a=scheduler._marked_timespans,i=e.sections,n=e.days,s=e.type||r;if(i){for(var d in i)if(i.hasOwnProperty(d)&&a[d]){var o=i[d];a[d][o]&&(t=a[d][o])}}else t=a.global;if(t)if(void 0!==n)t[n]&&t[n][s]&&(scheduler._addMarkerTimespanConfig(e),scheduler._delete_marked_timespans_list(t[n][s],e));else for(var l in t)if(t[l][s]){var _=scheduler._lame_clone(e);e.days=l,scheduler._addMarkerTimespanConfig(_),scheduler._delete_marked_timespans_list(t[l][s],e)}},scheduler._delete_marked_timespans_list=function(e,t){
for(var a=0;a<e.length;a++){var r=e[a],i=scheduler._subtract_timespan_zones(r.zones,t.zones);if(i.length)r.zones=i;else{e.splice(a,1),a--;for(var n=scheduler._marked_timespans_ids[r.id],s=0;s<n.length;s++)if(n[s]==r){n.splice(s,1);break}}}},scheduler.deleteMarkedTimespan=function(e){if(arguments.length||(scheduler._marked_timespans={global:{}},scheduler._marked_timespans_ids={},scheduler._marked_timespans_types={}),"object"!=typeof e)scheduler._delete_marked_timespan_by_id(e);else{e.start_date&&e.end_date||(void 0!==e.days||e.type||(e.days="fullweek"),
e.zones||(e.zones="fullday"));var t=[];if(e.type)t.push(e.type);else for(var a in scheduler._marked_timespans_types)t.push(a);for(var r=scheduler._prepare_timespan_options(e),i=0;i<r.length;i++)for(var n=r[i],s=0;s<t.length;s++){var d=scheduler._lame_clone(n);d.type=t[s],scheduler._delete_marked_timespan_by_config(d)}}},scheduler._get_types_to_render=function(e,t){var a=e?scheduler._lame_copy({},e):{};for(var r in t||{})t.hasOwnProperty(r)&&(a[r]=t[r]);return a},scheduler._get_configs_to_render=function(e){
var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push.apply(t,e[a]);return t},scheduler._on_scale_add_marker=function(e,t){if(!scheduler._table_view||"month"==scheduler._mode){var a=t.getDay(),r=t.valueOf(),i=this._mode,n=scheduler._marked_timespans,s=[],d=[];if(this._props&&this._props[i]){var o=this._props[i],l=o.options,_=scheduler._get_unit_index(o,t),c=l[_];if(o.days>1){var h=864e5,u=Math.round((t-scheduler._min_date)/h);t=scheduler.date.add(scheduler._min_date,Math.floor(u/l.length),"day"),t=scheduler.date.date_part(t);
}else t=scheduler.date.date_part(new Date(this._date));if(a=t.getDay(),r=t.valueOf(),n[i]&&n[i][c.key]){var v=n[i][c.key],f=scheduler._get_types_to_render(v[a],v[r]);s.push.apply(s,scheduler._get_configs_to_render(f))}}var g=n.global,m=g[r]||g[a];s.push.apply(s,scheduler._get_configs_to_render(m));for(var p=0;p<s.length;p++)d.push.apply(d,scheduler._render_marked_timespan(s[p],e,t));return d}},scheduler.attachEvent("onScaleAdd",function(){scheduler._on_scale_add_marker.apply(scheduler,arguments)}),
scheduler.dblclick_dhx_marked_timespan=function(e,t){scheduler.callEvent("onScaleDblClick",[scheduler.getActionData(e).date,t,e]),scheduler.config.dblclick_create&&scheduler.addEventNow(scheduler.getActionData(e).date,null,e)}},scheduler._temp_limit_scope();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_limit.js.map