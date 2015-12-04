/********************************************************************************************/
/*******************************            IPHONE             ******************************/
/********************************************************************************************/
/********************************************************************************************/


/************************************* DEVICE SETTINGS *************************************/
/*
prx.devices.iphone = {
		name: "iphone"
		,caption: "iPhone 4 Retina Display"
		,defaultOrientation: 'portrait' // portrait, landscape
		,portrait: [320,480]
		,landscape: [480,320]
		,statusbarportrait: [320,460]
		,statusbarlandscape: [480,300]
		,normalportrait: [320,480]
		,normallandscape: [480,320]
}
*/

var _library = 'iphone';
var _path = '/iphone/';

prx.library_scales = prx.library_scales || {};
prx.library_scales.iphone = 1;

/************************************* COMPONENT TYPES *************************************/
/***** TOOLBAR COMPONENTS *****/
//TYPE: TOOLBAR
prx.types.toolbar = {
	name: "toolbar"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }

		var cReturn = '<div id="'+_id+'" class="box pos type-toolbar" '+((prx.componentsHelper.getProp(item.overlay,'boolean'))? 'data-mpoverlay="1"': '')+'><div class="inner liveUpdate-backgroundColor changeProperty-backgroundColor" style="background-color:'+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';"></div></div>';
		return cReturn;
	}
	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					[
						prx.commonproperties.backgroundColor
					]
				]
			},{
				caption: 'Advanced',
				properties: [
					[
						{
							caption: 'Position fixed on transitions'
							,name: 'overlay'
							,type: 'onoff'
							,value: function(item,name) {
								if(typeof(item.overlay)=="undefined") {
									return false;
								}
								return item.overlay;
							}
							,changeProperty: {
								rerender: true
							}
						}
					]
				]
			}
		]
}

//TYPE: HEADER
prx.types.header = {
	name: "header"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }

		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		var _dims = prx.componentsHelper.getRealDims(item,symbol);
		var cReturn = '<div id="'+_id+'" class="box pos type-header" '+((prx.componentsHelper.getProp(item.overlay,'boolean'))? 'data-mpoverlay="1"': '')+'><div class="inner liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-textFont changeProperty-textSize changeProperty-textColor" style="background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+';text-align: center;line-height:'+_dims.height+'px;'+_props+' text-shadow: 0 -1px 0 rgba(0,0,0,0.5);"><span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text')+'</span></div></div>';
		return cReturn;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item);
		$("#"+_id+' .inner').css("line-height", _dims.height + "px");
	}
	,editableProperties: [
		{
			caption: 'Header'
			,name: 'text'
			,type: 'input'
			,value: function(item,name) {
				return item.text;
			}
			,changeProperty: {
				caption: 'Text',
				property: 'text',
				selector: '.inner',
				transitionable: false
			}
		}
	]
	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					  [
						prx.commonproperties.backgroundColor
					  ]
				]
			},
			{
				caption: 'Text',
				properties: [
					  [
						  prx.commonproperties.textFont
						  ,prx.commonproperties.textSize
						  ,prx.commonproperties.textColor
					  ]
					 ,[
						  prx.commonproperties.textProperties
					  ]
				]
			},
			{
				caption: 'Advanced',
				properties: [
					[
						{
							caption: 'Position fixed on transitions'
							,name: 'overlay'
							,type: 'onoff'
							,value: function(item,name) {
								if(typeof(item.overlay)=="undefined") {
									return false;
								}
								return item.overlay;
							}
							,changeProperty: {
								rerender: true
							}
						}
					]
				]
			}
		]
}

//TYPE: TAB BAR
prx.types.tabbar = {
	name: "tabbar"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = "";
		var icon = '';

		var _dims = prx.componentsHelper.getRealDims(item,symbol);
		var _itemwidth = _dims.width;

		var _width = Math.floor(_itemwidth/item.tabs.length);
		var _bg = prx.css.gradient([{ c: '#3F3F3F', p: 0 }, { c: '#0F0F0F', p: 49}, { c: '#000000', p: 50 }]);

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		if(typeof(item.iconSize) == "undefined") { item.iconSize = 3; }
		if(typeof(item.maskIcons) == "undefined") { item.maskIcons = true; }
		if(typeof(item.changeActive) == "undefined") { item.changeActive = true; }

		cR = cR +  '<div id="' + _id + '" class="box pos type-tabbar '+((prx.componentsHelper.getProp(item.iconSize,'icon-size')==4) ? 'large-icons' : '') +'" '+((prx.componentsHelper.getProp(item.overlay,'boolean'))? 'data-mpoverlay="1"': '')+' style="'+_bg+'">';
		if(prx.componentsHelper.getProp(item.maskIcons,'boolean') && $.browser.webkit && !prx.editor) {
			cR = cR += '<style>#'+_id+' li input:checked + label em { background: ' + prx.tabbargradient + '!important; }</style>';
		}
		cR = cR +  '<ul>';

		var _iconActive = 'background: ' + prx.tabbargradient + ';';

		$.each(item.tabs, function(i,elm){
			_icon = '';
			if(typeof(elm.linkedscreen) == "undefined") { elm.linkedscreen = -1; }
			if(prx.componentsHelper.getProp(item.maskIcons,'boolean') && $.browser.webkit && !prx.editor) {
				_icon += '-webkit-mask-image: url('+prx.componentsHelper.getProp(elm.icon,'asset')+'); background: -webkit-gradient(linear, left top, left bottom, from(#555555), to(#666666));';
			} else {
				_icon += 'background-image: url('+prx.componentsHelper.getProp(elm.icon,'asset')+');';
			}

			var cChecked = '';
			if (i==prx.componentsHelper.getProp(item.selected,'num-other')) {
				cChecked = ' checked="checked"';
			}
			cR += '<li id="'+_id+'-tabs-'+i+'" style="width: '+_width+'px;" class="dynamic-property" data-dynamic-property-index="'+i+'" '+((prx.componentsHelper.getProp(elm.linkedscreen,'num-other') != -1) ? 'data-linked-screen="'+prx.componentsHelper.getProp(elm.linkedscreen,'num-other')+'"' : '')+'>';
			cR += '<input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'"'+cChecked+' data-role="none" '+((!prx.componentsHelper.getProp(item.changeActive,'boolean')) ? 'disabled' : '')+'/>';
			cR += '<label for="'+_id+'-radio-'+i+'"><em style="'+_icon+'+"><img src="'+prx.componentsHelper.getProp(elm.icon,'asset')+'" /></em><span class="caption"><span data-editableproperty="caption" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.caption,'text')+'</span></span></label>';
			cR += '</li>';
		});
		cR = cR +  '</ul>';
		cR = cR + '</div>';

		return cR;
	}
	,onResize: function(item, containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item);
		var _width = Math.floor(_dims.width/item.tabs.length);

		$('#'+_id+' li').width(_width);
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(!prx.editor) {
			$('#' + _id + ' [data-linked-screen]').each(function(){
				var screenId = $(this).attr('data-linked-screen');

				if(prx.stc.screens.getIndexFromId(screenId) != -1) {
					var guid = prx.utils.getGuid();
					var action = {
						title: 'Go to screen "'+prx.pages[prx.stc.screens.getIndexFromId(screenId)].title+'"',
						type: "tap",
						actionId: "go-to-page",
						pageId: screenId,
						animation: "none",
						delay: "0",
						callback: false,
						guid: guid,
						bindTo: '#' + $(this).attr('id')

					};

					action = prx.actions.recursivelyAddInfo(action, action.bindTo, containerid, containerid+ '', action.bindTo, '.protoio-actions-afterdisplay')
					prx.actions.build(action);
					prx.actions.disableFlashActionOnItemTap(action.bindTo, '.flashactiontap-afterdisplay');
				}
			});
		}
	}
	,propertyGroups:
		[
			{
				caption: 'Icons',
				properties: [
					[
					   {
							caption: 'Size'
							,name: 'iconSize'
							,proptype: 'icon-size'
							,type: 'select'
							,value: function(item,name) {
								return item.iconSize;
							}
							,values: [{ value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}]
							,changeProperty: {
								caption: 'Icon size',
								rerender: true
							}
						},
						{
							caption: 'Mask icons'
							,name: 'maskIcons'
							,type: 'onoff'
							,value: function(item,name) { if(typeof(item.maskIcons) == "undefined") {item.maskIcons = true;} return item.maskIcons; }
							,changeProperty: {
								caption: 'Icon mask',
								rerender: true
							}
						}
					  ]
				]
			},{
				caption: 'Advanced',
				properties: [
					[
						{
							caption: 'Active tab'
							,name: 'selected'
							,type: 'select'
							,value: function(item,name) {
								return item.selected;
							}
							,values: function(item,name) {
								var _rA = [{value: '999',displayValue: 'None'}];
								for (var n = 0; n < item.tabs.length; n++) {
									_rA.push({value: n,displayValue: item.tabs[n].caption});
								}
								return _rA;
							}
							,changeProperty: {
								rerender: true
							}
						}
					],
					[
			   			{
			  	  			caption: 'Change active state on click'
			  	  			,name: 'changeActive'
			  	  			,type: 'onoff'
			  	  			,value: function(item,name) {
			  	      			return item.changeActive;
			  	      		}
			      			,changeProperty: {
								caption: 'Change active state on click',
								rerender: true
							}
						}
			   		],
					[
						{
							caption: 'Position fixed on transitions'
							,name: 'overlay'
							,type: 'onoff'
							,value: function(item,name) {
								if(typeof(item.overlay)=="undefined") {
									return false;
								}
								return item.overlay;
							}
							,changeProperty: {
								rerender: true
							}
						}
					]
				]
			}
		]
	,dynamicProperties: {
		data: 'tabs'
		,propertyCaption: 'Tabs'
		,propertyName: 'Tab'
		,addCaption: 'Add tab'
		,deleteCaption: 'Delete'
		,blankItem: {
			caption: "Tab title"
			,icon: {"fileId":"04b27f56e3cbdeedfafcf2b349de07f9.svg","name":"mail-2.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/1b58b288e91e6a4cb64d90433880003d.svg","targetSrc":"generated/1b58b288e91e6a4cb64d90433880003d_666666.svg","color":"666666"}
			,actions: []
		}
		,captionProperty: 'caption'
		,editableProperties: [
			{
				caption: 'Title'
				,name: 'caption'
				,type: 'input'
				,value: function(item,name,index) {
					return item.tabs[index].caption;
				}
				,changeProperty: {
					caption: 'Text',
					property: 'text',
					selector: '.caption',
					transitionable: false
				}
			}
	      ]
		,interactions: [
			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.tabs[index].actions) == "undefined") {
						item.tabs[index].actions = [];
					}

					return item.tabs[index].actions.length;
				}
			}
		                ]
		,propertyGroups: [
              {
            	  caption: 'Icon',
            	  properties: [[
	              	{
		      			caption: false
		      			,name: 'icon'
		      			,type: 'combo-asset'
		      			,value: function(item,name,index) {
	              			return JSON.stringify({
	      						allow: 'image',
	      						asset: item.tabs[index].icon
	      					});
	              		}
		              	,displayValue: function(item,name,index) {
	      					if(item.tabs[index].icon.fileId == '') {
	      						return 'No icon selected.';
	      					}
	      					return item.tabs[index].icon.name;
	      				}
		      			,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
	      			}
	              ]]
              },
              {
            	caption: '<span class="property-icon property-quick-interaction"></span>&nbsp;&nbsp;Linked screen (optional)',
	      		properties: [[
	      			{
	      				caption: false
	      				,name: 'linkedscreen'
	      				,type: 'select'
	      				,help: 'Will trigger a "Go to screen" action on Tap, and force active state to this tab when the selected screen is active'
	      				,value: function(item,name,index) {
	      					return item.tabs[index].linkedscreen
	      				}
	      				,values: function(item,name,index) {
	      					var options = [{ displayValue: 'None', value: -1}]
	      					for(var i=0; i<prx.pages.length ; i++) {
	      						options.push({ displayValue: prx.pages[i].title, value: prx.pages[i].id })
	      					}
	      					return options;
	      				}
	    				,changeProperty: {
	  						caption: 'Linked Screen',
	  						rerender: true
	  					 }
	      			}
	      		]]
	      	}
        ]
	}
};


/***** /TOOLBAR COMPONENTS *****/

/***** BUTTON COMPONENTS *****/

//TYPE: BUTTON2
prx.types.button2 = {
	name: "button2"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var bgBtnCss = '';
		var bgArrCss = '';

		var arr = "";
		var content = "";
		var text = "";
		var shadowColor = prx.css.RGBA(prx.componentsHelper.getProp(item.backgroundColor,'other'), -150, 0.3);

		if(typeof(item.shadowColor) == "undefined") { item.shadowColor = '212121'; }

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		text += 'text-shadow: 0px -'+(1*prx.componentsHelper.getScale(item))+'px '+(1*prx.componentsHelper.getScale(item))+'px '+prx.componentsHelper.getProp(item.shadowColor,'color-shadow')+';';
		bgBtnCss += 'background-color: ' +prx.componentsHelper.getProp(item.backgroundColor,'color-background')+ '; ';
		bgArrCss += 'background-color: ' +prx.componentsHelper.getProp(item.backgroundColor,'color-background')+ '; ';
		bgBtnCss += 'border-color: ' +prx.componentsHelper.getProp(item.borderColor,'color-background')+ ';';
		bgArrCss += 'border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid ' +prx.componentsHelper.getProp(item.borderColor,'color-border')+ ';';

		if(prx.componentsHelper.getProp(item.arrowDirection,'other') != 'none') {
			var arrow_h = Math.round(Math.sqrt((_dims.height * _dims.height)/2));
			var arrow_pos = Math.round((_dims.height - arrow_h)/2);
			var content_left = Math.round(_dims.height /2);
			var content_width = Math.round(_dims.width - content_left);
		}

		switch(prx.componentsHelper.getProp(item.arrowDirection,'other')){
		case 'right':
			arr += 'right: '+arrow_pos+'px;';
			content += 'right: '+content_left+'px; border-width: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px; width: '+content_width+'px;';
			content += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius') + 'px;';
			break;
		case 'left':
			arr += 'left: '+arrow_pos+'px;';
			content += 'left: '+content_left+'px; border-width: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px; width: '+content_width+'px;';
			content += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius') + 'px;';
			break;
		case 'none':
		default:
			content += 'width: 100%; border-width: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px;';
			content += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius') + 'px;';
			break;
		}

		var cR = "";
		cR = cR +  '<div id="' + _id + '" class="box pos type-button '+((!eval(prx.componentsHelper.getProp(item.bgGradient,'other'))) ? 'type-button-no-gradient' : '') + '">';

		cR += '<style>';
		switch(prx.componentsHelper.getProp(item.arrowDirection,'other')){
		case 'right':
			cR += '#'+_id+' .button-content { border-right: 0!important; border-top-right-radius: 0!important; border-bottom-right-radius: 0!important; }';
			break;
		case 'left':
			cR += '#'+_id+' .button-content { border-left: 0!important; border-top-left-radius: 0!important; border-bottom-left-radius: 0!important; }';
			break;
		case 'none':
		default:
			break;
		}

		cR += '</style>';

		cR += '<div class="button-outer">';
		if(prx.componentsHelper.getProp(item.arrowDirection,'other') == 'left') {
			cR = cR + '<div class="button-arrow" style="overflow: hidden; height: 100%; width: '+Math.round(_dims.height/2)+'px; '+prx.componentsHelper.getProp(item.arrowDirection,'other')+': 0; position: relative;"><div class="liveUpdate-borderColor liveUpdate-backgroundColor changeProperty-borderColor changeProperty-backgroundColor changeProperty-borderWidth" style="height: '+arrow_h+'px; width: '+arrow_h+'px; '+arr+' top: '+arrow_pos+'px; '+bgArrCss+'"></div></div>';
		}
		cR = cR + '<div class="button-content liveUpdate-borderColor liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-borderColor changeProperty-borderWidth changeProperty-borderRadius changeProperty-textColor changeProperty-textFont changeProperty-textSize" style="'+content+' height: 100%; '+bgBtnCss+' '+prx.componentsHelper.getProp(item.textFont,'font-family')+_props+' color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px;"><span style="'+text+' margin-'+prx.componentsHelper.getProp(item.arrowDirection,'other')+': -'+eval(content_left/2)+'px;">'


		switch(prx.componentsHelper.getProp(item.iconpos,'icon-position')) {
		case 'left':
		case 'right':
			if(prx.componentsHelper.getProp(item.buttonicon.fileId,'other') != '') {
				cR = cR + '<img class="floated-img" src="'+prx.componentsHelper.getProp(item.buttonicon,'asset')+'" style="'+prx.componentsHelper.getProp(item.iconpos,'icon-position')+': 8px; height: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px; padding-top: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px; " />';
			}
			break;
		case 'notext':
			cR = cR + '<img src="'+prx.componentsHelper.getProp(item.buttonicon,'asset')+'" style="height: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px; vertical-align: middle;" />';
			break;
		case '':
		default:
			break
		}

		if(prx.componentsHelper.getProp(item.iconpos,'icon-position') != 'notext') {
			cR = cR + '<span data-editableproperty="text">' + prx.componentsHelper.getProp(item.text,'text-textarea') + '</span>';
		}


		cR = cR + '</span></div>';
		if(prx.componentsHelper.getProp(item.arrowDirection,'other') == 'right') {
			cR = cR + '<div class="button-arrow" style="overflow: hidden; height: 100%; width: '+Math.round(_dims.height/2)+'px; '+prx.componentsHelper.getProp(item.arrowDirection,'other')+': 0;"><div class="liveUpdate-borderColor liveUpdate-backgroundColor changeProperty-borderColor changeProperty-borderWidth changeProperty-backgroundColor" style="height: '+arrow_h+'px; width: '+arrow_h+'px; '+arr+' top: '+arrow_pos+'px; '+bgArrCss+'"></div></div>';
		}
		cR = cR + '</div>';
		cR = cR + '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item);

		if(prx.componentsHelper.getProp(item.arrowDirection,'other') != 'none') {
			var arrow_h = Math.round(Math.sqrt((_dims.height * _dims.height)/2));
			var arrow_pos = Math.round((_dims.height - arrow_h)/2);
			var content_left = Math.round(_dims.height /2);
			var content_width = Math.round(_dims.width - content_left);

			var arrow_w = Math.round(_dims.height/2);
			$("#"+_id + ' .button-arrow').width(arrow_w);

			$("#"+_id + ' .button-arrow > div').css({
				'height': arrow_h + 'px',
				'width': arrow_h + 'px',
				'top': arrow_pos + 'px'
			});
			$("#"+_id + ' .button-content').css({
				'width': content_width + 'px',
				'height': _dims.height + 'px'
			});
			$("#"+_id + ' .button-content > span').css('margin-'+prx.componentsHelper.getProp(item.arrowDirection,'other'), '-'+eval(content_left/2)+'px');

			switch (prx.componentsHelper.getProp(item.arrowDirection,'other')) {
			case 'left':
				$("#"+_id + ' .button-arrow > div').css({ 'left': arrow_pos + 'px' });
				$("#"+_id + ' .button-content').css({ 'left': content_left + 'px' });
				break;
			case 'right':
				$("#"+_id + ' .button-arrow > div').css({ 'right': arrow_pos + 'px' });
				$("#"+_id + ' .button-content').css({ 'right': content_left + 'px' });
				break;
			}
		}

		if(prx.componentsHelper.getProp(item.iconpos,'icon-position') != '') {
			if(prx.componentsHelper.getProp(item.iconpos,'icon-position') == 'notext') {
				$("#"+_id + ' .button-content span img').css({
					height: eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px'
				})
			} else {
				$("#"+_id + ' .button-content span img').css({
					height: eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px',
					'padding-top': eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px'
				})
			}
		}

	}
	,interactions:	[
		prx.commonproperties.actions
	]
	,editableProperties:[
	    {
			caption: 'Text',
			name: 'text',
			type: 'textarea',
			value: function(item,name) { return item.text; },
			changeProperty: {
	      						caption: 'Text',
	      						selector: '.button-content [data-editableproperty="text"]',
	      						property: 'text',
	      						transitionable: false
	      					 }
		}
	]
	,propertyGroups:
		[
			{
		  caption: 'Style',
		  properties: [
				  [
				  prx.commonproperties.backgroundColor
				  ,{
					  caption: 'Gradient'
					  ,name: 'bgGradient'
						  ,proptype: 'background-gradient'
					  ,type: 'onoff'
					  ,value: function(item,name) {
						  return item.bgGradient;
					  }
					  ,changeProperty: {
					  	caption: 'Gradient',
					  	changeable: false,
					  	rerender: true
					  }
				  }
			 ],[
				   prx.commonproperties.borderWidth
				   ,prx.commonproperties.borderColor
				   ,prx.commonproperties.borderRadius
			   ],[
					{
					  caption: 'Arrow Direction'
					  ,name: 'arrowDirection'
					  ,type: 'select'
					  ,value: function(item,name) {
						  return item.arrowDirection;
					  }
					  ,values: [{value: 'none',displayValue: 'No arrow'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
					  ,changeProperty: {
						  	caption: 'Arrow Direction',
						  	changeable: false,
						  	rerender: true
					  }
				  }
			   ]
		  ]
		},{
			caption: 'Text',
			properties: [
			  [
				  {
					  caption: false,
					  name: 'textFont',
					  proptype: 'font-family',
					  type: 'select',
					  value: function(item,name) { return item.textFont; },
					  values: function(){ return prx.comps.fonts }
					  ,hiddenByDefault: function(item,name){
			  				return (item.iconpos == 'notext');
			  		  },
			  		  changeProperty: {
      						caption: 'Font family',
      						selector: '.button-content',
      						property: 'font-family',
      						transitionable: false
      					}
				  },
				  {
					  caption: false,
					  name: 'textSize',
					  proptype: 'font-size',
					  type: 'combo-select',
					  value: function(item,name) { return item.textSize; },
					  values: prx.comps.textsize
					  ,hiddenByDefault: function(item,name){
			  				return (item.iconpos == 'notext');
			  		  },
			  		  changeProperty: {
      						caption: 'Font size',
      						selector: '.button-content',
      						property: 'font-size',
      						transitionable: true
      					}
				  },
				  {
				  		caption: false,
				  		name: 'textColor',
				  		proptype: 'font-color',
				  		type: 'colorpicker',
				  		value: function(item,name) { return item.textColor; },
				  		liveUpdate: 'color'
				  		,hiddenByDefault: function(item,name){
			  				return (item.iconpos == 'notext');
			  		  	},
			  		  	changeProperty: {
      						caption: 'Font color',
      						selector: '.button-content',
      						property: 'color',
      						transitionable: true
      					}
				  }
			  ],[
				  {
				  		caption: false,
				  		name: 'textProperties',
				  		proptype: 'text-properties',
				  		type: 'checkbox',
				  		value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; },
				  		values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underline"></span>'}]
				  		,hiddenByDefault: function(item,name){
			  				return (item.iconpos == 'notext');
			  		  	}
			  		  	,changeProperty: {
						  	caption: 'Text Properties',
						  	rerender: true
					  	}
				  }
					   ,{
						   caption: 'Text shadow'
						   ,name: 'shadowColor'
							   ,proptype: 'shadow-color'
						   ,type: 'colorpicker'
						   ,value: function(item, name){
							   return item.shadowColor;
						   }
						   //,liveUpdate: 'text-shadow'
				  			,hiddenByDefault: function(item,name){
				  				return (item.iconpos == 'notext');
				  			},
				  			changeProperty: {
						  		caption: 'Text Shadow',
						  		rerender: true
					  		}
					   }
				]
			]
		},{
			caption: 'Icon',
			properties: [
				[
					 {
						 caption: false
						 ,name: 'iconpos'
						 ,type: 'select'
						 ,value: function(item,name) {
							 return item.iconpos;
						 }
						 ,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
						 ,onChange: function(item){
							 if(item.iconpos == '') {
								 $('#property-buttonicon, #property-iconSize').hide();
							 } else {
								 $('#property-buttonicon, #property-iconSize').show();
							 }

							 if(item.iconpos == 'notext') {
								 $('#property-textFont, #property-textSize, #property-textColor, #property-textProperties, #property-shadowColor').hide();
							 } else {
								 $('#property-textFont, #property-textSize, #property-textColor, #property-textProperties, #property-shadowColor').show();
							 }

							 return false;
						 }
						 ,changeProperty: {
					  		caption: 'Icon Position',
					  		rerender: true
				  		  }
					 },
					 {
						 caption: false
						 ,name: 'iconSize'
						,proptype: 'icon-size'
						 ,type: 'select'
						 ,value: function(item,name) {
							 return item.iconSize;
						 }
						 ,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
						 ,hiddenByDefault: function(item,name){
							 return (item.iconpos == '');
						 }
						 ,changeProperty: {
						  		caption: 'Icon size',
						  		rerender: true
					  		}
					 }
				 ],[
					{
						caption: false
						,name: 'buttonicon'
						,type: 'combo-asset'
						,displayValue: function(item,name) {
							if(item.buttonicon.fileId == '') {
								return 'No icon selected';
							}
							return item.buttonicon.name;
						}
						,value: function(item,name) {
							return JSON.stringify({
								allow: 'image',
								asset: item.buttonicon
							});
						}
						,hiddenByDefault: function(item,name){
							return (item.iconpos == '');
						}
						,changeProperty: {
					  		caption: 'Icon',
					  		rerender: true
				  		}
					}
				 ]
			]
		}
		]

};

/* TYPE = ARROW BUTTON */
prx.types.arrowbutton = prx.componentsHelper.cloneobject(prx.types.button2);
prx.types.arrowbutton.name = 'arrowbutton';
prx.types.arrowbutton.propertyGroups = prx.componentsHelper.editProperty(prx.types.arrowbutton.propertyGroups, 'arrowDirection', 'values', [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]);


//TYPE: FULLWIDTH BUTTON
prx.types.fullwidthbutton = {
	name: "fullwidthbutton"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		var _btnBg = prx.css.gradient([{c: "rgba(255,255,255,0.3)", p:0},{c: "rgba(255,255,255,0.2)", p:50},{c: "rgba(255,255,255,0.1)", p:51},{c: "rgba(255,255,255,0.0)", p:100}])

		var cR = '';
		cR += '<div id="'+_id+'" class="box pos type-fullwidthbutton"><div class="inner-btn liveUpdate-backgroundColor liveUpdate-textColor liveUpdate-borderColor changeProperty-text changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize changeProperty-borderColor" style="'+_btnBg+';font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+_props+'; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+';line-height: '+(parseInt(prx.componentsHelper.getRealDims(item,symbol).height)-6*prx.componentsHelper.getScale(item))+'px;"> <span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text')+'</span></div></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item);

		$("#"+_id + ' .inner-btn').css({ 'line-height': (parseInt(_dims.height)-6) + 'px' });
	}
	,interactions:
		[
			prx.commonproperties.actions
		]
	,editableProperties: [
    		prx.commonproperties.text
    	]
	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					[
						prx.commonproperties.backgroundColor
						,{
							caption: 'Border',
							name: 'borderColor',
							proptype: 'border-color',
							type: 'colorpicker',
							value: function(item,name) {
								return item.borderColor;
								}
						   ,liveUpdate: 'border-color'
						   ,changeProperty: {
								caption: 'Border color',
								property: 'border-color',
								selector: '.changeProperty-borderColor',
								transitionable: true
							}
						}
					]
				]
			},
			{
				caption: 'Text',
				properties: [
					[
						prx.commonproperties.textFont
						,prx.commonproperties.textSize
						,prx.commonproperties.textColor
					],[
						prx.commonproperties.textProperties
					]
				]
			}
		]
}

//TYPE: BUTTONGROUP
prx.types.buttongroup = {
	name: "buttogroup"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var bgBtnCss = '';

		var content = "";
		var text = "";
		var _span = "";
		var shadowColor = prx.css.RGBA(prx.componentsHelper.getProp(item.backgroundColor,'other'), -150, 0.3);

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		bgBtnCss += 'background-color: ' +prx.componentsHelper.getProp(item.backgroundColor,'color-background')+ '; ';
		bgBtnCss += 'border-color: ' +prx.componentsHelper.getProp(item.borderColor,'color-border')+ ';';

		content += 'width: 100%; border-width: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px;';
		content += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius') + 'px;';

		var cR = "";
		cR = cR +  '<div id="' + _id + '" class="box pos type-buttongroup '+((!eval(prx.componentsHelper.getProp(item.bgGradient,'other'))) ? 'type-buttongroup-no-gradient' : '')+'">';
		cR = cR + '<div class="button-content liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor changeProperty-borderRadius changeProperty-textColor changeProperty-borderColor changeProperty-backgroundColor changeProperty-textFont changeProperty-textSize" style="'+content+' height: 100%; '+bgBtnCss+' line-height: '+eval(_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+_props+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'size-text-size')+'px; '+text+'">'
		$.each(item.buttons, function(i,elm){
			_span = 'width: '+100/item.buttons.length+'%;';
			if(i!=0) { _span += ' border-left: ' + prx.componentsHelper.getProp(item.borderWidth,'num-border-width') + 'px solid ' +prx.componentsHelper.getProp(item.borderColor,'color-border')+ ';'; }
			cR += '<span id="'+_id+'-buttons-'+i+'" style="'+_span+'" class="liveUpdate-borderColor changeProperty-borderColor dynamic-property" data-dynamic-property-index="'+i+'">';
			switch(prx.componentsHelper.getProp(item.iconpos,'icon-position')) {
			case 'left':
			case 'right':
				cR = cR + '<img src="'+prx.componentsHelper.getProp(elm.buttonicon,'asset')+'" style="position: absolute; '+prx.componentsHelper.getProp(item.iconpos,'icon-position')+': 8px; height: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px; padding-top: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px; " /><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+ prx.componentsHelper.getProp(elm.text,'text') + '</span>';
				break;
			case 'notext':
				cR = cR + '<img src="'+prx.componentsHelper.getProp(elm.buttonicon,'asset')+'" style="height: '+eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px;" />';
				break;
			case '':
			default:
				cR = cR + '<span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+ prx.componentsHelper.getProp(elm.text,'text') + '</span>';
				break;
			}
			cR += '</span></span>';
		});
		cR = cR + '</div>';
		cR = cR + '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item);

		$("#"+_id + ' .button-content').css({ 'line-height': (_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2) + 'px' });
		if(prx.componentsHelper.getProp(item.iconpos,'icon-position') != '') {
			$("#"+_id + ' .button-content span img').css({
				height: eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px'
			})
			if(prx.componentsHelper.getProp(item.iconpos,'icon-position') != 'notext') {
				$("#"+_id + ' .button-content span img').css({
					'padding-top': eval((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*2)*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px'
				})
			}
		}

	}
	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					[
						prx.commonproperties.backgroundColor
						,{
							caption: 'Gradient'
							,name: 'bgGradient'
							,proptype: 'background-gradient'
							,type: 'onoff'
							,value: function(item,name) {
								return item.bgGradient;
							}
							,changeProperty: {
								rerender: true,
								changeable: false
							}
						}
					],[
						{
							caption: 'Border',
							name: 'borderWidth',
							proptype: 'border-width',
							type: 'combo-select',
							value: function(item,name) { return item.borderWidth; },
							values: { min: 0, max: 20, step: 1 },
							changeProperty: {
								caption: 'Border width',
								rerender: true
							}
						}
						,prx.commonproperties.borderColor
						,prx.commonproperties.borderRadius
					]
				]
			},{
				caption: 'Text',
				properties: [
					[
						{
							caption: false,
							name: 'textFont',
							proptype: 'font-family',
							type: 'select',
							value: function(item,name) { return item.textFont; },
							values: function(){ return prx.comps.fonts },
							hiddenByDefault: function(item) {
								return (item.iconpos=="notext")
							}
							,changeProperty: {
								caption: 'Text font',
								property: 'font-family',
								selector: '.changeProperty-textFont',
								transitionable: false
							}
						}
						,{
							caption: false,
							name: 'textSize',
							proptype: 'font-size',
							type: 'combo-select',
							value: function(item,name) { return item.textSize; },
							values: prx.comps.textsize,
							hiddenByDefault: function(item) {
								return (item.iconpos=="notext")
							}
							,changeProperty: {
								caption: 'Text size',
								property: 'font-size',
								selector: '.changeProperty-textSize',
								transitionable: true
							}
						}
						,{
							caption: false,
							name: 'textColor',
							proptype: 'font-color',
							type: 'colorpicker',
							value: function(item,name) { return item.textColor; },
							liveUpdate: 'color',
							hiddenByDefault: function(item) {
								return (item.iconpos=="notext")
							}
							,changeProperty: {
								caption: 'Text color',
								property: 'color',
								selector: '.changeProperty-textColor',
								transitionable: true
							}
						}

					],[
						{
							caption: false,
							name: 'textProperties',
							proptype: 'text-properties',
							type: 'checkbox',
							value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; },
							values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underline"></span>'}],
							hiddenByDefault: function(item) {
								return (item.iconpos=="notext")
							}
							,changeProperty: {
								caption: 'Text properties',
								rerender: true
							}

						}
					]
				]
			},{
				caption: 'Icon',
				properties: [
					[
						{
							caption: false
							,name: 'iconpos'
							,type: 'select'
							,value: function(item,name) {
								return item.iconpos;
							}
							,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
							,onChange: function(item){
								if(item.iconpos == '') {
									$('[id=property-buttonicon], #property-iconSize').hide();
								} else {
									$('[id=property-buttonicon], #property-iconSize').show();
								}
								if(item.iconpos == 'notext') {
								  $('#property-textFont, #property-textSize, #property-textColor, #property-textProperties').hide();
							 	} else {
								  $('#property-textFont, #property-textSize, #property-textColor, #property-textProperties').show();
							  	}
								return false;
							}
							,changeProperty: {
								caption: 'Icon position',
								rerender: true,
								changeable: false
							}
						},{
							caption: false
							,name: 'iconSize'
							,proptype: 'icon-size'
							,type: 'select'
							,value: function(item,name) {
								return item.iconSize;
							}
							,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
							,hiddenByDefault: function(item,name){
								return (item.iconpos == '');
							}
							,changeProperty: {
								caption: 'Icon size',
								rerender: true,
								changeable: false
							}
						}
					]
				]
			}
		]
     ,dynamicProperties: {
 		data: 'buttons'
 		,propertyCaption: 'Buttons'
 		,propertyName: 'Button'
 		,addCaption: 'Add button'
 		,deleteCaption: 'Delete'
 		,blankItem: {
 			text: 'Label',
 			buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
 			,actions: []
 		}
 		,captionProperty: 'text'


		,editableProperties: [
           		{
 				caption: 'Text'
 				,name: 'text'
 				,type: 'input'
 				,value: function(item,name,index) {
 					return item.buttons[index].text;
 				}
 				,hiddenByDefault: function(item,name){
 					return (item.iconpos == 'notext');
 				}
 				,changeProperty: {
					property: 'text',
					selector: '[data-editableproperty="text"]',
					transitionable: false
				}
 			}
        ]
 		,interactions: [
 			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}

					return item.buttons[index].actions.length;
				}
			}
 		]
 		,propertyGroups: [
			{
				caption: 'Icon'
				,properties: [[
					{
						caption: false
						,name: 'buttonicon'
						,type: 'combo-asset'
						,displayValue: function(item,name,index) {
							if(item.buttons[index].buttonicon.fileId == '') {
								return 'No icon selected';
							}
							return item.buttons[index].buttonicon.name;
						}
						,value: function(item,name,index) {
							return JSON.stringify({
								allow: 'image',
								asset: item.buttons[index].buttonicon
							});
						}
		  				,hiddenByDefault: function(item,name,index){
		  					return (item.iconpos == '');
		  				}
	     				,changeProperty: {
							caption: 'Icon',
							rerender: true
						}
					}
					]]
				}
        ]
	}

};

//TYPE: SEGMENTEDCONTROL
prx.types.segmentedcontrol = {
	name: "segmentedcontrol"
		,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.changeActive) == "undefined") { item.changeActive = true; }

		var cR = '';
		var _active = "";

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		if(item.style == 'plain') {
			var _labelH = _dims.height;
		} else {
			var _labelH = eval(_dims.height - (2*prx.componentsHelper.getScale(item)));
		}

		var bgBtnCss = '';
		var bgBtnCssActive = '';

		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		cR += '<div id="' + _id + '" class="box pos type-segmentedcontrol style-'+item.style+'">';

		cR += '<style>#' + _id + ' input:checked + label { '+bgBtnCssActive+' background-color: '+prx.componentsHelper.getProp(item.activeBackgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+'; }</style>'

		cR += '<ul class="label-container liveUpdate-borderColor liveUpdate-backgroundColor liveUpdate-textColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize changeProperty-borderColor" style="'+bgBtnCss+' background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+_props+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px;">';
		$.each(item.options, function(i,elm){
			_active = "";
			_style= "";
			_spanstyle= "";
			if(prx.componentsHelper.getProp(item.selected,'num-other') == i) {
				_active = ' checked="checked"';
			}
			if(i == 0) {
				_style += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px 0 0 '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px;';
			}
			if(i == item.options.length -1) {
				_style += 'border-radius: 0 '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px 0;';
			}
			_spanstyle += 'width: ' + Math.floor(100/item.options.length) + '%; '
			_style += ' height: ' + _labelH + 'px; line-height: '+_labelH+'px;';

			cR += '<li style="'+_spanstyle+'" id="'+_id+'-options-'+i+'"><input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'"'+_active+' data-role="none" '+((!prx.componentsHelper.getProp(item.changeActive,'boolean')) ? 'disabled' : '')+'/>';
			cR +='<label data-dynamic-property-index="'+i+'" class="dynamic-property liveUpdate-borderColor changeProperty-borderColor '+((prx.componentsHelper.getProp(item.selected,'num-other') == i) ? 'liveUpdate-activeTextColor liveUpdate-activeBackgroundColor' : '')+'" for="'+_id+'-radio-'+i+'" style="'+_style+' border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text')+'</span></label>';
			cR += '</li>';
		});
		cR += '</ul></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item);

		if(item.style == 'plain') {
			var _labelH = _dims.height;
		} else {
			var _labelH = eval(_dims.height - (2*prx.componentsHelper.getScale(item)));
		}
		$('#' + _id + ' label').css({ height: _labelH + 'px', 'line-height': _labelH +'px' });
	}

	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					[
						prx.commonproperties.backgroundColor
						,{
							 caption: 'Active'
							 ,name: 'activeBackgroundColor'
							,proptype: 'background-color-2-active'
							 ,type: 'colorpicker'
							 ,value: function(item, name){
								 return item.activeBackgroundColor;
							 }
							 ,liveUpdate: 'background-color'
		     				,changeProperty: {
								caption: 'Active background color',
								property: 'background-color',
								selector: 'input:checked + .changeProperty-activeBackgroundColor',
								transitionable: true
							}
						}
					],
					[
						{
							caption: 'Border',
							name: 'borderColor',
							proptype: 'border-color',
							type: 'colorpicker',
							value: function(item,name) { return item.borderColor; },
							hiddenByDefault: function(item,name) { return (item.style == 'plain') }
							,liveUpdate:'border-color'
							,changeProperty: {
								caption: 'Border color',
								property: 'border-color',
								selector: '.changeProperty-borderColor',
								transitionable: true
							}
						}
						,{
							caption: '<span class="property-icon property-border-radius" title="Border radius"></span>',
							name: 'borderRadius',
							proptype: 'border-radius',
							type: 'combo-select',
							value: function(item,name) { return item.borderRadius; },
							values: { min: 0, max: 20, step: 1 },
							changeProperty: {
								caption: 'Border radius',
								rerender: true
							}
						}
					]
				]
			},{
				caption: 'Text',
				properties: [
								[
									prx.commonproperties.textFont
									,prx.commonproperties.textSize
									,prx.commonproperties.textColor
								],
								[
									prx.commonproperties.textProperties
									,{
										 caption: 'Active'
										 ,name: 'activeTextColor'
											,proptype: 'font-color-2-active'
										 ,type: 'colorpicker'
										 ,value: function(item, name){
											 return item.activeTextColor;
										 }
										 ,liveUpdate: 'color'
										 ,changeProperty: {
											caption: 'Active text color',
											property: 'color',
											selector: 'input:checked + .changeProperty-activeTextColor',
											transitionable: true
										}
									}
								]
							   ]
			},{
				caption: 'Advanced',
				properties: [
					[
						{
								 caption: 'Active tab'
								 ,name: 'selected'
								 ,type: 'select'
								 ,value: function(item,name) {
									 return item.selected;
								}
								 ,values: function(item,name) {
									 //var _rA = [];
									 var _rA = [{value: '999',displayValue: 'None'}];
									 for (var n = 0; n < item.options.length; n++) {
										 _rA.push({value: n,displayValue: item.options[n].text});
									 }
									 return _rA;
								}
								,changeProperty: {
									caption: 'Active tab',
									rerender: true
								}
						}
					 ]
					 ,[
			   			{
			  	  			caption: 'Change active state on click'
			  	  			,name: 'changeActive'
			  	  			,type: 'onoff'
			  	  			,value: function(item,name) {
			  	      			return item.changeActive;
			  	      		}
			      			,changeProperty: {
								caption: 'Change active state on click',
								rerender: true
							}
						}
			   		]
				]
			}

		]
	,dynamicProperties: {
		data: 'options'
		,propertyCaption: 'Options'
		,propertyName: 'Option'
		,addCaption: 'Add option'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,actions: []
		}
		,captionProperty: 'text'
		,editableProperties: [
       		 {
 		    	caption: 'Label'
 		    	,name: 'text'
 		    	,type: 'input'
 		    	,value: function(item,name,index) {
 		    		return item.options[index].text;
 		    	}
 		    	,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: 'label.dynamic-property',
					transitionable: false
				}
 		    }
       	]
		,interactions: [
		   {
      			caption: 'Interactions'
      			,name: 'actions'
      			,type: 'action'
      			,value: function(item,name,index) {
  					if (typeof(item.options[index].actions) == "undefined") {
  						item.options[index].actions = [];
  					}

          			return item.options[index].actions.length;
          		}
          	}
		]
	}
}



prx.types.pagecontroller = {
	name: "pagecontroller"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '<div id="' + _id + '" class="box pos type-pagecontroller ' + ((item.vertical) ? 'type-pagecontroller-vertical' : '') + '"><ul>';
		var _checked = "";
		
		if(typeof(item.changeActive) == "undefined") { item.changeActive = true; }
		$.each(item.buttons, function(i,elm){
			_checked = "";
			if(i == prx.componentsHelper.getProp(item.selected,'num-other')) {
				_checked = "checked"
			}
			cR += '<li '+((prx.componentsHelper.getProp(item.vertical,'boolean')) ? 'style="display: block; height: '+(parseInt(prx.componentsHelper.getProp(item.buttonSize,'num-other'))+ parseInt(prx.componentsHelper.getProp(item.buttonSpacing,'num-other')))+'px;"' : '')+'>';
			cR += '<input type="radio" data-role="none" name="'+_id+'-radio" id="'+_id+'-option-'+i+'" '+_checked+' '+((!prx.componentsHelper.getProp(item.changeActive,'boolean')) ? 'disabled' : '')+'/>'
			cR += '<label for="'+_id+'-option-'+i+'" id="'+_id+'-buttons-'+i+'" class="page '+((i == prx.componentsHelper.getProp(item.selected,'num-other')) ? 'liveUpdate-activeButtonColor' : 'liveUpdate-buttonColor')+' dynamic-property" data-dynamic-property-index="'+i+'"></label>'
			cR += '</li>';
		});

		cR += '<style>';
		cR += '#'+_id+' label { background-color: '+prx.componentsHelper.getProp(item.buttonColor,'color-bakground')+'; height: ' + prx.componentsHelper.getProp(item.buttonSize,'num-other') + 'px; width: ' + prx.componentsHelper.getProp(item.buttonSize,'num-other') + 'px; border-radius:' + prx.componentsHelper.getProp(item.buttonBorderRadius,'num-border-radius')+'px; ' + ' margin-'+((prx.componentsHelper.getProp(item.vertical,'boolean')) ? 'bottom' : 'right')+': '+prx.componentsHelper.getProp(item.buttonSpacing,'num-other')+'px;}'
		cR += '#'+_id+' input:checked + label { background-color: '+prx.componentsHelper.getProp(item.activeButtonColor,'color-background')+'; }'
		cR += '</style>'
		cR += '</ul></div>'
		return cR;
	}
	,propertyGroups:
		[
			{
				caption: 'Style',
				properties: [
					[
						{
							caption: 'Button Color'
							,name: 'buttonColor'
							,proptype: 'background-color'
							,type: 'colorpicker'
							,value: function(item,name) {
								return item.buttonColor;
							}
							,liveUpdate: 'background-color'
							,changeProperty: {
								caption: 'Button color',
								property: 'background-color',
								selector: 'input:not(:checked) + label',
								transitionable: true
							}
						},{
							caption: 'Active'
							,name: 'activeButtonColor'
							,proptype: 'background-color-2-active'
							,type: 'colorpicker'
							,value: function(item,name) {
								return item.activeButtonColor;
							}
							,liveUpdate: 'background-color'
							,changeProperty: {
								caption: 'Active button color',
								property: 'background-color',
								selector: 'input:checked + label',
								transitionable: true
							}
						}
					],
					[
						{
							caption: 'Border <span class="property-icon property-border-radius" title="Border radius"></span>'
							,name: 'buttonBorderRadius'
							,proptype: 'border-radius'
							,type: 'combo-select'
							,value: function(item,name) {
								return item.buttonBorderRadius;
							}
							,values: { min: 1, max: 10, step: 1 }
							,changeProperty: {
								caption: 'Border radius',
								property: 'border-radius',
								selector: 'label',
								transitionable: true
							}
						}
					],
					[
						{
							caption: 'Size'
							,name: 'buttonSize'
							,proptype: 'button-size'
							,type: 'combo-select'
							,value: function(item,name) {
								return item.buttonSize;
							}
							,values: { min: 1, max: 20, step: 1 }
							,changeProperty: {
								caption: 'Button size',
								rerender: true
							}
						}
					,
						{
							caption: 'Spacing'
							,name: 'buttonSpacing'
							,proptype: 'button-spacing'
							,type: 'combo-select'
							,value: function(item,name) {
								return item.buttonSpacing;
							}
							,values: { min: 1, max: 20, step: 1 }
							,changeProperty: {
								caption: 'Button spacing',
								rerender: true
							}
						}
					]
				]
			},{
				caption: 'Advanced',
				properties: [
					[
						{
							caption: 'Vertical?'
							,name: 'vertical'
							,type: 'onoff'
							,value: function(item,name) {
								if(typeof(item.vertical) == "undefined") {
									item.vertical = false;
								}
								return item.vertical;
							}
							,changeProperty: {
								caption: 'Orientation',
								rerender: true
							}
						}
					],[
						{
							caption: 'Active button'
							,name: 'selected'
							,type: 'select'
							,value: function(item,name) {
								return item.selected;
							}
							,values: function(item,name) {
								var _rA = [{value: '999',displayValue: 'None'}];
								for (var n = 0; n < item.buttons.length; n++) {
									_rA.push({value: n,displayValue: (n+1)});
								}
								return _rA;
							}
							,changeProperty: {
								caption: 'Active color',
								rerender: true
							}
						}
					]
					,
		            [
			   			{
			  	  			caption: 'Change active state on click'
			  	  			,name: 'changeActive'
			  	  			,type: 'onoff'
			  	  			,value: function(item,name) {
			  	      			return item.changeActive;
			  	      		}
			      			,changeProperty: {
								caption: 'Change active state on click',
								rerender: true
							}
						}
			   		]
				]
			}
		]
	,dynamicProperties: {
  		data: 'buttons'
  		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
  		,addCaption: 'Add button'
  		,deleteCaption: 'Delete'
  		,blankItem: {
  			actions: []
  		}
  		,captionProperty: false
  		,interactions: [
  		    {
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}

					return item.buttons[index].actions.length;
				}
			}
	    ]
	}

}

/***** /BUTTON COMPONENTS *****/

/***** FORM COMPONENTS *****/

//TYPE: LABEL
prx.types.label = {
	name: "label"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');
		
		var _shadow = (prx.componentsHelper.getProp(item.enableShadow,'boolean')) ? " text-shadow: 0 1px 0 #FFFFFF;" : "";
		var cReturn = '<div id="' + _id + '" class="box pos type-text liveUpdate-textColor liveUpdate-backgroundColor changeProperty-backgroundColor changeProperty-textColor changeProperty-textFont changeProperty-textSize changeProperty-textAlign" style="color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+_props+_shadow+' text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; "><div style="overflow: hidden; width: 100%; height: 100%;" class="changeProperty-text"> <span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text')+'</span></div></div>';
		return cReturn;
	}

	,editableProperties: [
	        prx.commonproperties.text
    ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
				prx.commonproperties.backgroundColor
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
				,
					{
	              		caption: 'Shadow',
	              		name: 'enableShadow',
	              		type: 'onoff',
	              		value: function(item,name) {
	              			return item.enableShadow;
	              		}
	              		,changeProperty: {
							caption: 'Shadow',
							rerender: true
						}
	            	}
				]
			]
		}
	]
};

//TYPE: TEXTFIELD
prx.types.textfield = {
	name: 'textfield'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		if(typeof(item.textAlign) == "undefined") { item.textAlign = 'left'; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');
		
		var _bg = prx.componentsHelper.getProp(item.backgroundColor,'color-background')

		var _dims = prx.componentsHelper.getRealDims(item, symbol);

		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-textfield type-textfield-'+prx.componentsHelper.getProp(item.inputtype,'other')+'">';
		if(prx.editor) {
			cR += '<div class="faux-input liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor" data-editableproperty="value">'+prx.componentsHelper.getProp(item.value,'text')+'</div>';
			cR += '<div class="faux-input placeholder-input liveUpdate-placeholderColor liveUpdate-borderColor liveUpdate-backgroundColor">'+prx.componentsHelper.getProp(item.placeholder,'other')+'</div>'
		} else {
			cR += '<input type="'+prx.componentsHelper.getProp(item.inputtype,'other')+'" value="'+prx.componentsHelper.getProp(item.value,'other')+'" placeholder="'+prx.componentsHelper.getProp(item.placeholder,'other')+'" data-role="none" class="real-input changeProperty-backgroundColor changeProperty-textColor changeProperty-textSize changeProperty-textFont changeProperty-borderColor changeProperty-borderWidth changeProperty-borderRadius changeProperty-textAlign" />'
		}
		cR += '<style>';
		cR += '#'+_id+' input, #'+_id+' .faux-input { background-color: '+_bg+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; border-radius:'+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px; '+ _props + ' line-height: '+ (_dims.height - parseInt(prx.componentsHelper.getProp(item.borderWidth,'num-border-width'))*2) +'px }';
		cR += '#'+_id+' .faux-input.placeholder-input { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'; }'
		cR += '#'+_id+' input:-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' input::-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' input::-webkit-input-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '</style>'
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id)
				.hammer()
				.find('.real-input')
				.focus(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputfocus'] = { value: $(this).val() }
					$('#'+_id).trigger('inputfocus');
				})
				.blur(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputblur'] = { value: $(this).val() };
			        $('#'+_id).trigger('inputblur');
				})
				.keyup(function(e){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputkeyup'] = { value: $(this).val() };var event = jQuery.Event("inputkeyup");
					event.which = e.which;
					$('#'+_id).trigger(event);
				});

			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	,interactions: [
			prx.commonproperties.actions
		]
    ,mpactions: {
    	specialEvents: ['inputfocus','inputblur','inputkeyup']
    }
	,editableProperties: [
  		{
	    	caption: 'Value'
	    	,name: 'value'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.value;
	    	}
	    	,changeProperty: {
				caption: 'Value',
				property: 'input-value',
				selector: 'input.real-input',
				transitionable: false
			}
	    }
      ]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				]
				,[
					prx.commonproperties.borderWidth
					,prx.commonproperties.borderColor
					,prx.commonproperties.borderRadius
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],
				[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
				]
			]
		},{
			caption: 'Placeholder (If field is empty)',
	    	properties: [
				[
					{
						caption: false,
						name: 'placeholder',
						type: 'input',
						value: function(item,name) {
							return item.placeholder;
						}
						,changeProperty: {
							caption: 'Placeholder',
							rerender: true
						}
					}
				],
				[
					{
					   caption: 'Placeholder Color',
					   name: 'placeholderColor',
					   proptype: 'placeholder-color',
					   type: 'colorpicker',
					   value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; }
					   ,liveUpdate:'color'
					   ,changeProperty: {
							caption: 'Placeholder color',
							rerender: true
						}
				   }
				]
			]
		},
		{
			caption: 'Input type',
			properties: [
				[
					{
						caption: false,
						name: 'inputtype',
						type: 'select',
						value: function(item,name) {
							return item.inputtype;
						}
						,values: [{ value: 'text', displayValue: 'Text' }, { value: 'number', displayValue: 'Numeric' }, { value: 'email', displayValue: 'Email' }, { value: 'password', displayValue: 'Password' }, { value: 'tel', displayValue: 'Telephone' }]
						,changeProperty: {
							caption: 'Input type',
							rerender: true
						}
						,hiddenByDefault: function(item) {
							return (item.name=="passwordfield")
						}
					}
				]
			]
		}
	]

};

//TYPE: RADIO BUTTON
prx.types.radiobutton = {
	name: "radiobutton"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = '';

		var _bg = 'background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';';
		var _active = "";

		if(prx.componentsHelper.getProp(item.active,'boolean')) {
			_active = 'checked="checked"'
		}

		if(typeof(item.actAsCheckbox) == "undefined") { item.actAsCheckbox = false; }
		var _type = (prx.componentsHelper.getProp(item.actAsCheckbox,'boolean')) ? 'checkbox' : 'radio';

		cR += '<div id="' + _id + '" class="box pos type-radio">';
		cR += '<input type="'+_type+'" '+_active+ ' id="'+_id+'-checkbox" data-role="none" />';
		cR += '<label class="liveUpdate-backgroundColor changeProperty-backgroundColor" for="'+_id+'-checkbox" style="'+_bg+'" for="'+_id+'-checkbox" style="'+_bg+'" data-clickable="true"><span class="liveUpdate-backgroundColor changeProperty-backgroundColor" style="'+_bg+'"></span></label>';
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-checkbox').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-checkbox]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})
			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	, interactions: [
		{
			caption: 'Interactions on change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Interactions on activation',
			name: 'checkboxActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnActive) == "undefined") {
					item.checkboxActionsOnActive = [];
				}
				return item.checkboxActionsOnActive.length;
			}
		}, {
			caption: 'Interactions on deactivation',
			name: 'checkboxActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnDeactive) == "undefined") {
					item.checkboxActionsOnDeactive = [];
				}
				return item.checkboxActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange']
	}
	,propertyGroups:	[

		{
			caption: 'Style',
	    	properties: [
				[
					prx.commonproperties.backgroundColor
				]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active state',
							rerender: true
						}
					},
					{
						caption: 'Act as checkbox'
						,name: 'actAsCheckbox'
						,type: 'onoff'
						,value: function(item,name) {
							return item.actAsCheckbox;
						}
						,changeProperty: {
							rerender: true,
							changeable: false
						}
					}
				]
			]
		}
	]
}

// TYPE: CHECKBOX
prx.types.checkbox = {
	name: "checkbox"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var cR = '';

		var _bg = 'background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';';
		var _check = '<span class="liveUpdate-activeColor changeProperty-activeColor" style="font-size: '+prx.componentsHelper.getProp(item.height,'num-other')+'px; color: '+prx.componentsHelper.getProp(item.activeColor,'color-text')+';">&#10004;</span>';
		var _active = "";

		if(item.active) {
			_active = 'checked="checked"';
		}
		cR += '<div id="' + _id + '" class="box pos type-checkbox">';
		cR += '<input type="checkbox" id="'+_id+'-checkbox" '+_active+' style="display: none;" data-role="none" />';
		//cR += '<label for="'+_id+'-checkbox" style="'+_bg+' display: block; width: 100%; height: 100%;">'+_check+'</label>';
		cR += '<label for="'+_id+'-checkbox" class="liveUpdate-backgroundColor changeProperty-backgroundColor" style="'+_bg+' display: block; width: 100%; height: 100%;" data-clickable="true">'+_check+'</label>';
		cR += '</div>';
		return cR;
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-checkbox').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-checkbox]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-checkbox]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-checkbox]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})
			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}

	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#'+ _id + ' span').css('font-size', prx.componentsHelper.getProp(item.height,'num-other') + 'px');
	}
	, interactions: [
		{
			caption: 'Interactions on change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Interactions on activation',
			name: 'checkboxActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnActive) == "undefined") {
					item.checkboxActionsOnActive = [];
				}
				return item.checkboxActionsOnActive.length;
			}
		}, {
			caption: 'Interactions on deactivation',
			name: 'checkboxActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.checkboxActionsOnDeactive) == "undefined") {
					item.checkboxActionsOnDeactive = [];
				}
				return item.checkboxActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange']
	}
	,propertyGroups:	[

		{
			caption: 'Style',
	    	properties: [
				[
					prx.commonproperties.backgroundColor
					,{
						caption: 'Checkmark'
						,name: 'activeColor'
						,proptype: 'check-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeColor;
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Checkmark color',
							property: 'color',
							selector: '.changeProperty-activeColor',
							transitionable: true
						}
					},
				]
			]
		},
		{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active state',
							rerender: true
						}
					}
				]
			]
		}
	]

}

//TYPE: CHECKBOXLIST
prx.types.checkboxlist = {
	name: "checkboxlist"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		var cR = '';
		var _active = "";
		var _hor = "";

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		cR += '<div id="' + _id + '" class="box pos type-checkboxlist">';

		cR += '<style>#' + _id + ' input:checked + label { background: '+prx.componentsHelper.getProp(item.activeBackgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+'; }</style>'

		if(prx.componentsHelper.getProp(item.horizontal,'boolean')) { _hor += ' horizontal' }
		
		cR += '<div class="label-container liveUpdate-backgroundColor liveUpdate-textColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-textColor changeProperty-borderColor changeProperty-textFont changeProperty-textSize changeProperty-textAlign '+_hor+'" style="background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; border-radius:'+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px; '+_props+' text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+';">';
		
		$.each(item.checkboxes, function(i,elm){
			_active = "";
			_style= "";
			_spanstyle= "";
			if(prx.componentsHelper.getProp(elm.active,'boolean')) {
				_active = ' checked="checked"';
			}
			if(i == 0) {
				if(!prx.componentsHelper.getProp(item.horizontal,'boolean')) {
					_style += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius)+'px '+prx.componentsHelper.getProp(item.borderRadius)+'px 0 0';
				} else {
					_style += 'border-radius: '+prx.componentsHelper.getProp(item.borderRadius)+'px 0 0 '+prx.componentsHelper.getProp(item.borderRadius)+'px';
				}
			}
			if(i == item.checkboxes.length - (1*prx.componentsHelper.getScale(item))) {
				if(!prx.componentsHelper.getProp(item.horizontal,'boolean')) {
					_style += 'border-radius: 0 0 '+prx.componentsHelper.getProp(item.borderRadius)+'px '+prx.componentsHelper.getProp(item.borderRadius)+'px';
				} else {
					_style += 'border-radius: 0 '+prx.componentsHelper.getProp(item.borderRadius)+'px '+prx.componentsHelper.getProp(item.borderRadius)+'px 0';
				}
			}

			var _height;
			if(prx.componentsHelper.getProp(item.horizontal,'boolean')) {
				_spanstyle += 'width: ' + Math.floor(100/item.checkboxes.length) + '%; '
				_height = eval(_dims.height-(2*prx.componentsHelper.getScale(item)));
				_style += ' height: ' + _height + 'px; line-height: '+_height+'px;';
			} else {
				_height = (_dims.height-(1*prx.componentsHelper.getScale(item))-item.checkboxes.length) / item.checkboxes.length;
				_style += ' height: ' + _height + 'px; line-height: ' + _height + 'px;';
			}

			var _checkmark = ""
			if(prx.componentsHelper.getProp(item.appendCheckmark,'boolean')) {
				_checkmark = '<img src="' +prx.componentsHelper.getProp(item.checkmarkicon,'asset')+ '" class="checkmark" style="float: ' + prx.componentsHelper.getProp(item.iconpos,'icon-position') + '; height: ' + eval(_height*0.2*2)+'px; padding-top: '+eval(_height*0.1*(5-2))+'px; padding-'+ ((prx.componentsHelper.getProp(item.iconpos,'icon-position')=="left") ? 'right' : 'left') +': '+(10*prx.componentsHelper.getScale(item))+'px;" />';
			}
			cR += '<span style="'+_spanstyle+'"><input type="'+item.inputtype+'" name="'+_id+'-checkbox" id="'+_id+'-checkbox-'+i+'"'+_active+' data-role="none" />';
			cR += '<label data-dynamic-property-index="'+i+'" class="dynamic-property liveUpdate-borderColor changeProperty-borderColor changeProperty-activeBackgroundColor changeProperty-activeTextColor '+((prx.componentsHelper.getProp(elm.active,'boolean')) ? 'liveUpdate-activeBackgroundColor liveUpdate-activeTextColor' : '')+'" for="'+_id+'-checkbox-'+i+'" style="'+_style+' border-color: '+prx.componentsHelper.getProp(item.borderColor,'color-border')+';"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">' +prx.componentsHelper.getProp(elm.text,'text')+ '</span>' + _checkmark + '</label>'
			cR += '</span>';
		});
		cR += '</div></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _dims = prx.componentsHelper.getRealDims(item);

		if(prx.componentsHelper.getProp(item.horizontal,'boolean')) {
			$('#' + _id + ' label').css({ height: _dims.height-(2*prx.componentsHelper.getScale(item)) + 'px', 'line-height': _dims.height-(2*prx.componentsHelper.getScale(item))+'px' });
		} else {
			$('#' + _id + ' label').css({ height: (_dims.height-(1*prx.componentsHelper.getScale(item))-item.checkboxes.length) / item.checkboxes.length + 'px', 'line-height': (_dims.height-(1*prx.componentsHelper.getScale(item))-item.checkboxes.length) / item.checkboxes.length + 'px' });
		}
	}

	,propertyGroups: [
		{
			caption: 'Style',
	    	properties: [
				[
					prx.commonproperties.backgroundColor
					,
					{
						caption: 'Active'
						,name: 'activeBackgroundColor'
						,proptype: 'background-color-2-active'
						,type: 'colorpicker'
						,value: function(item, name){
							return item.activeBackgroundColor;
						}
						,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Active background color',
							property: 'color',
							selector: 'input:checked + .changeProperty-activeBackgroundColor',
							transitionable: true
						}
					}
				],[
					{
						caption: 'Border',
						name: 'borderColor',
						proptype: 'border-color',
						type: 'colorpicker',
						value: function(item,name) { return item.borderColor; },
						liveUpdate: 'border-color'
						,changeProperty: {
							caption: 'Border color',
							property: 'border-color',
							selector: '.changeProperty-borderColor',
							transitionable: true
						}
					}
					,{
						caption: '<span class="property-icon property-border-radius" title="Border radius"></span>',
						name: 'borderRadius',
						proptype: 'border-radius',
						type: 'combo-select',
						value: function(item,name) { return item.borderRadius; },
						values: { min: 0, max: 20, step: 1 },
						changeProperty: {
							caption: 'Border radius',
							rerender: true
						}
					}

				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],
				[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
					,{
						caption: 'Active'
						,name: 'activeTextColor'
						,proptype: 'font-color-2-active'
						,type: 'colorpicker'
						,value: function(item, name){
							return item.activeTextColor;
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Active text color',
							property: 'color',
							selector: 'input:checked + .changeProperty-activeTextColor',
							transitionable: true
						}
					}

				]
			]
		},{
			caption: 'Checkmark Icon',
			properties: [
				[
					{
						caption: 'Append checkmark on selected rows'
						,name: 'appendCheckmark'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.appendCheckmark) == "undefined") { return false; }
							return item.appendCheckmark
						},
						onChange: function(item) {
							if(item.appendCheckmark) {
								$('#property-checkmarkicon, #property-iconpos').show();
							} else {
								$('#property-checkmarkicon, #property-iconpos').hide();
							}
							return false;
						}
						,changeProperty: {
							caption: 'Append checkmark',
							rerender: true,
							changeable: false
						}
					}
				],[
					{
						caption: 'Checkmark Icon'
						,name: 'checkmarkicon'
						,type: 'combo-asset'
						,value: function(item,name) {
							if(typeof(item.checkmarkicon) == "undefined") {
								item.checkmarkicon = {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"};
							}
							return JSON.stringify({
								allow: 'image',
								asset: item.checkmarkicon
							});
						}
						,displayValue: function(item,name) {
							if(item.checkmarkicon.fileId == '') {
								return 'No asset selected.';
							}
							return item.checkmarkicon.name;
						},
						hiddenByDefault: function(item,name){
							return (!item.appendCheckmark);
						}
						,changeProperty: {
							caption: 'Checkmark icon',
							rerender: true,
							changeable: false
						}
					}
				],[

					{
						caption: 'Icon position'
						,name: 'iconpos'
						,type: 'select'
						,value: function(item,name) {
							if(typeof(item.iconpos) == "undefined"){ return 'right'; }
							return item.iconpos;
						}
						,values: [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
						,hiddenByDefault: function(item,name){
							return (!item.appendCheckmark);
						}
						,changeProperty: {
							caption: 'Icon position',
							rerender: true,
							changeable: false
						}
					}
				]
			]
		}
	]
	,dynamicProperties: {
		data: 'checkboxes'
		,propertyCaption: 'Options'
  		,propertyName: 'Option'
		,addCaption: 'Add option'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,active: false
		}
		,captionProperty: 'text'

		,editableProperties: [
			{
				caption: 'Label'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.checkboxes[index].text;
				}
				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: '[data-editableproperty="text"]',
					transitionable: false
				}
			}
		]
		,propertyGroups: [
		   {
		   		caption: 'Active state',
		   		properties: [[
		   			{
						caption: 'Active'
			        	,name: 'active'
						,type: 'onoff'
						,value: function(item,name,index) {
				    		return item.checkboxes[index].active;
						}
				    	,changeProperty: {
							caption: 'Active',
							rerender: true
						}
					}
				]]
			}
		]
	}
}

// TYPE: FLIPSWITCH
prx.types.flipswitch = {
	name: 'flipswitch'
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		var _active = '';

		if(typeof(item.ios5) == "undefined") {
			item.ios5 = false;
		}
		if(prx.componentsHelper.getProp(item.active,'boolean')) {
			_active = 'checked="checked"';
		}

		cR += '<div id="' + _id + '" class="box pos type-flipswitch '+((prx.componentsHelper.getProp(item.ios5,'boolean')) ? 'flipswitch-ios5' : '') +'">';

		cR += '<style>'
		if(!prx.componentsHelper.getProp(item.ios5,'boolean')) {
			cR += '#'+_id+' .activelabel { width: '+(prx.componentsHelper.getProp(item.width,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; line-height: '+(item.height-(2*prx.componentsHelper.getScale(item)))+'px; padding-right: '+parseInt(prx.componentsHelper.getProp(item.width,'num-other')*0.4)+'px; background-color: '+prx.componentsHelper.getProp(item.activeLabelColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.activeLabelTextColor,'color-text')+'; }'
			cR += '#'+_id+' .inactivelabel { width: '+(+prx.componentsHelper.getProp(item.width,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; line-height: '+(item.height-(2*prx.componentsHelper.getScale(item)))+'px; padding-left: '+parseInt(prx.componentsHelper.getProp(item.width,'num-other')*0.4)+'px; background-color: '+prx.componentsHelper.getProp(item.inactiveLabelColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.inactiveLabelTextColor,'color-text')+'; }'
			cR += '#'+_id+' .switch { right: '+(prx.componentsHelper.getProp(item.width,'num-other')*0.6)+'px; background-color: '+prx.componentsHelper.getProp(item.switchColor,'color-switch')+'; }'
		} else {
			cR += '#'+_id+' label { border-radius:'+prx.componentsHelper.getProp(item.height,'num-border-radius')+'px ; }';
			cR += '#'+_id+' .activelabel { width: '+(prx.componentsHelper.getProp(item.width,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; line-height: '+(prx.componentsHelper.getProp(item.height,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; padding-right: '+parseInt(prx.componentsHelper.getProp(item.height,'num-other')*0.75)+'px; background-color: '+prx.componentsHelper.getProp(item.activeLabelColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.activeLabelTextColor,'color-text')+'; border-radius: '+(prx.componentsHelper.getProp(item.height,'num-other')/2)+'px 0 0 '+(prx.componentsHelper.getProp(item.height,'num-other')/2)+'px; }'
			cR += '#'+_id+' .inactivelabel { width: '+(+prx.componentsHelper.getProp(item.width,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; line-height: '+(prx.componentsHelper.getProp(item.height,'num-other')-(2*prx.componentsHelper.getScale(item)))+'px; padding-left: '+parseInt(prx.componentsHelper.getProp(item.height,'num-other')*0.75)+'px; background-color: '+prx.componentsHelper.getProp(item.inactiveLabelColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.inactiveLabelTextColor,'color-text')+'; border-radius: 0 '+(prx.componentsHelper.getProp(item.height,'num-other')/2)+'px '+(prx.componentsHelper.getProp(item.height,'num-other')/2)+'px 0; }'
			cR += '#'+_id+' .switch { right: '+(prx.componentsHelper.getProp(item.width,'num-other') - prx.componentsHelper.getProp(item.height,'num-other'))+'px; width: '+prx.componentsHelper.getProp(item.height,'num-other')+'px; background-color: '+prx.componentsHelper.getProp(item.switchColor,'color-switch')+'; }'
		}
		cR += '</style>'

		cR += '<input type="checkbox" '+_active+ ' id="'+_id+'-flipswitch" data-role="none" />';
		cR += '<label for="'+_id+'-flipswitch" data-clickable="true">';
		cR += '<div class="flipswitch-inner">'
		cR += '<span class="activelabel liveUpdate-activeLabelColor liveUpdate-activeLabelTextColor"><span data-editableproperty="activeLabelText">'+prx.componentsHelper.getProp(item.activeLabelText,'text')+'</span></span>';
		cR += '<span class="inactivelabel liveUpdate-inactiveLabelColor liveUpdate-inactiveLabelTextColor"><span data-editableproperty="inactiveLabelText">'+prx.componentsHelper.getProp(item.inactiveLabelText,'text')+'</span></span>';
		cR += '</div>';
		cR += '<span class="switch liveUpdate-switchColor""></span>';
		cR += '</label>';
		cR += '</div>';
		return cR;
	}

	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id+'-flipswitch').on('change.custom-change-event', function(e){
				if(typeof(prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]']) == "undefined") { prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]'] = {}; }
		        prx.variables._triggerData['input:checked[id='+_id+'-flipswitch]']['checkboxchange'] = { state: $(this).is(':checked') };
		        if(typeof(prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)']) == "undefined") { prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)'] = {}; }
		        prx.variables._triggerData['input[id='+_id+'-flipswitch]:not(:checked)']['checkboxchange'] = { state: $(this).is(':checked') };
				if(typeof(prx.variables._triggerData['#' + _id]) == "undefined") { prx.variables._triggerData['#' + _id] = {}; }
				prx.variables._triggerData['#' + _id]['checkboxchange'] = { state: $(this).is(':checked') };
				$(this).trigger('checkboxchange');
			})

			$('#' + _id).hammer();
			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.ios5) == "undefined") {
			item.ios5 = false;
		}

		$('#'+_id+' .activelabel, #'+_id+' .inactivelabel').css({
			width: (prx.componentsHelper.getProp(item.width,'num-other')-(2*prx.componentsHelper.getScale(item))) + 'px',
			'line-height': (prx.componentsHelper.getProp(item.height,'num-other')-(2*prx.componentsHelper.getScale(item))) + 'px'
		})

		if(!prx.componentsHelper.getProp(item.ios5,'boolean')) {
			$('#'+_id+' .activelabel').css('padding-right', parseInt(prx.componentsHelper.getProp(item.width,'num-other')*0.4)+'px');
			$('#'+_id+' .inactivelabel').css('padding-left', parseInt(prx.componentsHelper.getProp(item.width,'num-other')*0.4)+'px');
			$('#'+_id+' .switch').css('right', (prx.componentsHelper.getProp(item.width,'num-other')*0.6) + 'px')
		} else {

			$('#'+_id+' label').css({
				'-moz-border-radius': (prx.componentsHelper.getProp(item.height,'num-other')) + 'px',
				'-webkit-border-radius': (prx.componentsHelper.getProp(item.height,'num-other')) + 'px',
				'border-radius': (prx.componentsHelper.getProp(item.height,'num-other')) + 'px'
			})

			$('#'+_id+' .activelabel').css({
				'padding-right': parseInt(prx.componentsHelper.getProp(item.height,'num-other')*0.75) + 'px',
				'-moz-border-radius': (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0 0 '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px',
				'-webkit-border-radius': (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0 0 '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px',
				'border-radius': (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0 0 '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px'
			})
			$('#'+_id+' .inactivelabel').css({
				'padding-left': parseInt(prx.componentsHelper.getProp(item.height,'num-other')*0.75) + 'px',
				'-moz-border-radius': '0 '+ (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0',
				'-webkit-border-radius': '0 '+ (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0',
				'border-radius': '0 '+ (prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px '+(prx.componentsHelper.getProp(item.height,'num-other')/2) + 'px 0'
			})
			$('#'+_id+' .switch').css({
				width: item.height + 'px',
				right: (item.width - item.height)+'px'
			});
		}

	}
	, interactions: [
		{
			caption: 'Interactions on change',
			name: 'actions',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.actions) == "undefined") {
					item.actions = [];
				}
				return item.actions.length;
			},
			changeProperty: {
				caption: 'Interactions on change',
				selector: '',
				property: 'action',
				transitionable: false,
				changeable: false
			}
		}, {
			caption: 'Interactions on activation',
			name: 'flipswitchActionsOnActive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.flipswitchActionsOnActive) == "undefined") {
					if (typeof(item.actionsOnActive) == "undefined") {
						item.flipswitchActionsOnActive = [];
					} else {
						item.flipswitchActionsOnActive = item.actionsOnActive;
					}
				}
				return item.flipswitchActionsOnActive.length;
			}
		}, {
			caption: 'Interactions on deactivation',
			name: 'flipswitchActionsOnDeactive',
			type: 'action',
			value: function (item, name) {
				if (typeof(item.flipswitchActionsOnDeactive) == "undefined") {
					if (typeof(item.actionsOnDeactive) == "undefined") {
						item.flipswitchActionsOnDeactive = [];
					} else {
						item.flipswitchActionsOnDeactive = item.actionsOnDeactive;
					}
				}
				return item.flipswitchActionsOnDeactive.length;
			}
		}
	]
	,mpactions: {
		specialEvents: ['checkboxchange'],
	}
	,editableProperties: [
		{
			caption: 'Active Label'
			,name: 'activeLabelText'
			,type: 'input'
			,value: function(item,name) {
				return item.activeLabelText;
			}
			,changeProperty: {
				caption: 'Active label',
				property: 'text',
				selector: '.activelabel',
				transitionable: false
			}
		},
		{
			caption: 'Inactive Label'
			,name: 'inactiveLabelText'
			,type: 'input'
			,value: function(item,name) {
				return item.inactiveLabelText;
			}
			,changeProperty: {
				caption: 'Inactive label',
				property: 'text',
				selector: '.inactivelabel',
				transitionable: false
			}
		}
	]
	,propertyGroups:	[
		{
			caption: 'Active State',
			properties: [
				[
					{
						caption: 'Background'
						,name: 'activeLabelColor'
						,proptype: 'background-color-2-active'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeLabelColor;
						}
						,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Active label background color',
							property: 'background-color',
							selector: '.activelabel',
							transitionable: true
						}
					},
					{
						caption: 'Text'
						,name: 'activeLabelTextColor'
						,proptype: 'font-color-2-active'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeLabelTextColor;
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Active label text color',
							property: 'color',
							selector: '.activelabel',
							transitionable: true
						}
					}
				]

			]
		},
		{
			caption: 'Inactive State',
			properties: [
				[
					{
						caption: 'Background'
						,name: 'inactiveLabelColor'
						,proptype: 'background-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.inactiveLabelColor;
						}
						,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Inactive label background color',
							property: 'background-color',
							selector: '.inactivelabel',
							transitionable: true
						}
					}
					,{
						caption: 'Text'
						,name: 'inactiveLabelTextColor'
						,proptype: 'font-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.inactiveLabelTextColor;
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Inactive label background color',
							property: 'background-color',
							selector: '.inactivelabel',
							transitionable: true
						}
					},

				]
			]
		},
		{
			caption: 'Switch',
	    	properties: [
				[
					{
						caption: 'Switch handle'
						,name: 'switchColor'
						,proptype: 'background-color-3-switch'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.switchColor;
						}
						,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Switch color',
							property: 'background-color',
							selector: '.switch',
							transitionable: true
						}
					},
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
						,changeProperty: {
							caption: 'Active state',
							rerender: true
						}
					}

				]
			]
		}

	]

}

//TYPE: TEXTAREA
prx.types.textarea = {
	name: 'textarea'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		var cR = '';
		//cR += '<div id="' + _id + '" class="box pos type-textarea"><textarea class="liveUpdate-placeholderColor liveUpdate-backgroundColor liveUpdate-textColor liveUpdate-borderColor" placeholder="'+item.placeholder+'" style="background-color: '+prx.utils.getColor(item.backgroundColor)+'; color: '+prx.utils.getColor(item.textColor)+'; font-size: '+item.textSize+'px; '+prx.componentsHelper.getFontCssFromFontFamily(item.textFont)+'; border: '+item.borderWidth+'px solid '+prx.utils.getColor(item.borderColor)+'; '+prx.css.borderRadius(item.borderRadius + 'px')+_props+'" data-role="none">'+item.value+'</textarea></div>';
		//cR += '<style>#'+_id+' textarea:-moz-placeholder { color: '+prx.utils.getColor(item.placeholderColor)+'!important } #'+_id+' textarea::-webkit-input-placeholder { color: '+prx.utils.getColor(item.placeholderColor)+'!important } </style>'

		cR += '<div id="' + _id + '" class="box pos type-textarea">';
		if(prx.editor) {
			cR += '<div class="faux-input liveUpdate-textColor liveUpdate-borderColor liveUpdate-backgroundColor" data-editableproperty="value">'+prx.componentsHelper.getProp(item.value,'text-textarea')+'</div>';
			cR += '<div class="faux-input placeholder-input liveUpdate-placeholderColor liveUpdate-borderColor liveUpdate-backgroundColor">'+prx.componentsHelper.getProp(item.placeholder,'other')+'</div>'
		} else {
			cR += '<textarea class="liveUpdate-placeholderColor liveUpdate-backgroundColor liveUpdate-textColor liveUpdate-borderColor changeProperty-backgroundColor changeProperty-borderColor changeProperty-borderWidth changeProperty-borderRadius changeProperty-textSize changeProperty-textFont changeProperty-textColor changeProperty-textAlign" placeholder="'+prx.componentsHelper.getProp(item.placeholder,'other')+'" style="background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+'; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; '+prx.css.borderRadius(item.borderRadius + 'px')+_props+'" data-role="none">'+item.value.replace(/<br \/>/g, "\n")+'</textarea>'
		}
		cR += '<style>';
		cR += '#'+_id+' > textarea, #'+_id+' .faux-input { background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px; '+ _props + '}';
		cR += '#'+_id+' .faux-input.placeholder-input { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'; }'
		cR += '#'+_id+' textarea:-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' textarea::-webkit-input-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '#'+_id+' textarea::-moz-placeholder { color: '+prx.componentsHelper.getProp(item.placeholderColor,'color-text')+'!important; }'
		cR += '</style>'
		cR += '</div>'
		return cR;
	}
	,afterDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(!prx.editor) {
			$('#'+_id)
				.hammer()
				.find('textarea')
				.focus(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputfocus'] = { value: $(this).val() }
					$('#'+_id).trigger('inputfocus');
				})
				.blur(function(){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputblur'] = { value: $(this).val() };
			        $('#'+_id).trigger('inputblur');
				})
				.keyup(function(e){
					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
			        prx.variables._triggerData['#'+_id]['inputkeyup'] = { value: $(this).val() };var event = jQuery.Event("inputkeyup");
					event.which = e.which;
					$('#'+_id).trigger(event);
				});

			prx.actions.disableFlashActionOnItemTap('#' + _id, '.flashactiontap-afterdisplay');
		}
	}

	,editableProperties: [
              {
      	    	caption: 'Value'
      	    	,name: 'value'
      	    	,type: 'textarea'
      	    	,value: function(item,name) {
      	    		return item.value;
      	    	}
      	    	,changeProperty: {
					caption: 'Value',
					property: 'textarea-value',
					selector: 'textarea',
					transitionable: false
				}
      	    }
	  	]

	,interactions: [
			prx.commonproperties.actions
		]

    ,mpactions: {
    	specialEvents: ['inputfocus','inputblur','inputkeyup']
    }
	,propertyGroups:	[
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				],
				[
					prx.commonproperties.borderWidth
					,prx.commonproperties.borderColor
					,prx.commonproperties.borderRadius

				]
			]

		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],
				[
					prx.commonproperties.textProperties
				]
			]
		},{
			caption: 'Placeholder  (If field is empty)',
	    	properties: [
				[
					{
						caption: false
						,name: 'placeholder'
						,type: 'input'
						,value: function(item,name) {
							return item.placeholder;
						}
		      	    	,changeProperty: {
							caption: 'Placeholder',
							rerender: true
						}
					}
				],
				[
					{
						caption: 'Placeholder Color',
						name: 'placeholderColor',
						proptype: 'placeholder-color',
						type: 'colorpicker',
						value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; }
						,liveUpdate:'color'
		      	    	,changeProperty: {
							caption: 'Placeholder color',
							rerender: true
						}
					}
				]
			]
		}
	]

};

//TYPE: SLIDER
prx.types.slider = {
	name: 'slider'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';

		if(typeof(item.vertical) == "undefined") { item.vertical = false }


		cR += '<div id="' + _id + '" class="box pos type-slider '+((prx.componentsHelper.getProp(item.vertical,'boolean')) ? 'type-slider-vertical' : '')+'">';
		cR += '<style>'
		if(prx.componentsHelper.getProp(item.vertical,'boolean')) {
			cR += '#'+_id+' .slider-bar { width: '+prx.componentsHelper.getProp(item.barThickness,'num-other')+'px; background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+'; left: '+((prx.componentsHelper.getProp(item.sliderSize,'num-other') - prx.componentsHelper.getProp(item.barThickness,'num-other'))/2)+'px; }'
			cR += '#'+_id+' .slider-bar-filled { bottom: 0; height: '+prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-fill')+' }'
			cR += '#'+_id+' .slider-button { background-color: '+prx.componentsHelper.getProp(item.sliderColor,'color-switch')+'; '+prx.css.borderRadius(item.sliderBorderRadius+'px')+' width: '+prx.componentsHelper.getProp(item.sliderSize,'num-other')+'px; height: '+prx.componentsHelper.getProp(item.sliderSize,'num-other')+'px; margin-bottom: -'+(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2)+'px; margin-top: -'+(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2)+'px; ' + ((prx.componentsHelper.getProp(item.sliderPosition,'num-percentage') == 100) ? 'top: 0;' : '') + ' }'
		} else {
			cR += '#'+_id+' .slider-bar { height: '+prx.componentsHelper.getProp(item.barThickness,'num-other')+'px; background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+'; top: '+((prx.componentsHelper.getProp(item.sliderSize,'num-other') - prx.componentsHelper.getProp(item.barThickness,'num-other'))/2)+'px; }'
			cR += '#'+_id+' .slider-bar-filled { left: 0; width: '+prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-fill')+' }'
			cR += '#'+_id+' .slider-button { background-color: '+prx.componentsHelper.getProp(item.sliderColor,'color-switch')+'; '+prx.css.borderRadius(item.sliderBorderRadius+'px')+' height: '+prx.componentsHelper.getProp(item.sliderSize,'num-other')+'px; width: '+prx.componentsHelper.getProp(item.sliderSize,'num-other')+'px; margin-left: -'+(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2)+'px; margin-right: -'+(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2)+'px; ' + ((prx.componentsHelper.getProp(item.sliderPosition,'num-percentage') == 100) ? 'right: 0;' : '') + ' }'
		}
		cR += '</style>'
		cR += '<div class="slider-bar liveUpdate-barColor">';
		if(prx.componentsHelper.getProp(item.twoColored,'boolean')) {
			cR += '<div class="slider-bar-filled liveUpdate-fillBarColor"></div>'
		}
		cR += '</div>';
		cR += '<span class="slider-button liveUpdate-sliderColor"></span>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item,symbol);
		
		if(prx.editor) {
			if(prx.componentsHelper.getProp(item.vertical,'boolean')) {
				$('#'+_id).find(' .slider-button').css({ 
					'top': ((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01)) + 'px'
				});				
				$('#'+_id).find(' .slider-bar-filled').css({
					'height': (_dims.height-((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01))) +'px'
				});	
			}
			else {			
				$('#'+_id).find(' .slider-button').css({ 
					'left': ((_dims.width)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01)) + 'px'
				});				
			}
		}
	}
	,afterDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		if(typeof(item.vertical) == "undefined") { item.vertical = false }

		var _dims = prx.componentsHelper.getRealDims(item,symbol);
		
		if(!prx.editor) {

			if(prx.componentsHelper.getProp(item.vertical,'boolean')) {

				prx.draggable._draggables['#'+_id+' .slider-button'] = Draggable.create('#'+_id+' .slider-button', {
					type: 'y',
					bounds: { top: -(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2), height: parseInt(_dims.height) + parseInt(prx.componentsHelper.getProp(item.sliderSize,'num-other')), left: 0, width: 0 },
					onDragStart: function(){
						$(this.target).parents('.box').each(function() {
	            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
	            				prx.scrollable._scrollables[this.id + '-inner'].disable();
	            			}
	            		})

	            		var pos = this.y - this.minY;
						var height = this.maxY - this.minY;

	            		var progress = 100 - Math.ceil((pos / height)*100)

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
						$('#'+_id).trigger('sliderdragstart');

						// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
						// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
						// because of the "actionIsRunning" check
						$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
							var pos = $('#' + _id + ' .slider-button').position().top;
							var height = $('#' + _id).height();

							$('#'+_id+' .slider-bar-filled').height(_dims.height - pos);
							var progress = 100 - Math.ceil((pos / height)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
							$('#'+_id).trigger('sliderdrag');
						})
					},
					onDragEnd: function(){

						$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

						$(this.target).parents('.box').each(function() {
	            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
	            				prx.scrollable._scrollables[this.id + '-inner'].enable();
	            			}
	            		})

	            		var pos = this.y - this.minY;
						var height = this.maxY - this.minY;

						var progress = 100 - Math.ceil((pos / height)*100)

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
						$('#'+_id).trigger('sliderdragend');
					}
				});

				TweenLite.set('#'+_id+' .slider-button',{y:((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01))});
				TweenLite.set('#'+_id+' .slider-bar-filled',{height:(_dims.height-((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01)))});
				
				$('#'+_id+' .slider-bar').hammer().on('click', function(e){
					var _pos = e.pageY - $(this).offset().top;

					var progress = 100 - Math.ceil((_pos / $('#'+_id).height())*100)
					
					TweenLite.to($('#'+_id+' .slider-bar-filled'), 1, {height: _dims.height-_pos});
					TweenLite.to($('#'+_id+' .slider-button'), 1, {y: _pos});

					//$(this).find('.slider-bar-filled').height($(this).height() - _pos);
					//$(this).siblings('.slider-button').css({ top: _pos + 'px' });
					
					prx.draggable._draggables['#'+_id+' .slider-button'][0].update();

					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }

					prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
					prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
					prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
					$('#'+_id).trigger('sliderdragstart');
					$('#'+_id).trigger('sliderdrag');
					$('#'+_id).trigger('sliderdragend');

				});
				prx.actions.disableFlashActionOnItemTap('#' + _id + ' .slider-bar', '.flashactiontap-afterdisplay');
			}
			else {
				prx.draggable._draggables['#'+_id+' .slider-button'] =  Draggable.create('#'+_id+' .slider-button', {
					type: 'x',
					bounds: { left: -(prx.componentsHelper.getProp(item.sliderSize,'num-other')/2), width: parseInt(_dims.width) + parseInt(prx.componentsHelper.getProp(item.sliderSize,'num-other')), top: 0, height: 0 },
					onDragStart: function(){
						$(this.target).parents('.box').each(function() {
	            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
	            				prx.scrollable._scrollables[this.id + '-inner'].disable();
	            			}
	            		})

	            		var pos = this.x - this.minX;
						var width = this.maxX - this.minX;

	            		var progress = Math.ceil((pos / width)*100)

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
						$('#'+_id).trigger('sliderdragstart');

						// hack instead of ondrag because greensock on drag only triggers if the item has actually moved
						// so if you are at 0 or 100 it only triggers once, which results in the value not always being updated
						// because of the "actionIsRunning" check
						$(document).on('mousemove.prx-sliderdrag touchmove.prx-sliderdrag', function(){
							var pos = $('#' + _id + ' .slider-button').position().left;
							var width = $('#' + _id).width();

							$('#'+_id+' .slider-bar-filled').width(pos);
							var progress = Math.ceil((pos / width)*100)

							if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
					        prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
							$('#'+_id).trigger('sliderdrag');

						})
					},
					onDragEnd: function(){

						$(document).off('mousemove.prx-sliderdrag touchmove.prx-sliderdrag');

						$(this.target).parents('.box').each(function() {
	            			if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
	            				prx.scrollable._scrollables[this.id + '-inner'].enable();
	            			}
	            		})

	            		var pos = this.x - this.minX;
						var width = this.maxX - this.minX;

						var progress = Math.ceil((pos / width)*100)

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
						$('#'+_id).trigger('sliderdragend');
					}
				});
				
				TweenLite.set('#'+_id+' .slider-button',{x:((_dims.width)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01))});

				$('#'+_id+' .slider-bar').hammer().on('mousedown touchstart', function(e){

					var _pageXY = prx.utils.getEventPageXY(e);				
					var _pos = _pageXY.x - $(this).offset().left;

					var progress = Math.ceil((_pos / $('#'+_id).width())*100);
					
					TweenLite.to($('#'+_id+' .slider-bar-filled'), 1, {width:_pos});
					TweenLite.to($('#'+_id+' .slider-button'), 1, {x:_pos});

					//$(this).find('.slider-bar-filled').width(_pos);
					//$(this).siblings('.slider-button').css({ left: _pos + 'px' });
					
					prx.draggable._draggables['#'+_id+' .slider-button'][0].update();

					if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }

					prx.variables._triggerData['#'+_id]['sliderdragstart'] = { value: progress };
					prx.variables._triggerData['#'+_id]['sliderdrag'] = { value: progress };
					prx.variables._triggerData['#'+_id]['sliderdragend'] = { value: progress };
					$('#'+_id).trigger('sliderdragstart');
					$('#'+_id).trigger('sliderdrag');
					$('#'+_id).trigger('sliderdragend');
				});
				prx.actions.disableFlashActionOnItemTap('#' + _id + ' .slider-bar', '.flashactiontap-afterdisplay');
			}
		}
		else {	
			if(item.vertical) {
				$('#'+_id).find(' .slider-button').css({ 
					'top': ((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01)) + 'px'
				});				
				$('#'+_id).find(' .slider-bar-filled').css({
					'height': (_dims.height-((_dims.height)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01))) +'px'
				});	
			}
			else {			
				$('#'+_id).find(' .slider-button').css({ 
					'left': ((_dims.width)*(prx.componentsHelper.getProp(item.sliderPosition,'num-percentage')*0.01)) + 'px'
				});				
			}			
		}
	}
	,interactions: [prx.commonproperties.actions]
	,mpactions: {
		specialEvents: ['sliderdragstart','sliderdrag','sliderdragend']
	}
	,propertyGroups:	[

		{
			caption: 'Bar',
			properties: [
				[
					{
						caption: 'Color'
						,name: 'barColor'
						,proptype: 'background-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
						,liveUpdate:'background-color'
		      	    	,changeProperty: {
							caption: 'Color',
							property: 'background-color',
							selector: '.slider-bar',
							transitionable: true
						}

					},
					{
						caption: 'Thickness'
						,name: 'barThickness'
						,proptype: 'bar-thickness'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.barThickness;
						}
						,values: { min: 2, max: 20, step: 2 }
		      	    	,changeProperty: {
							caption: 'Thickness',
							rerender: true,
							changeable: false
						}
					}
				],
				[
					{
						caption: 'Two-colored bar?'
						,name: 'twoColored'
						,type: 'onoff'
						,value: function(item,name) {
							return item.twoColored;
						}
						,onChange: function(item) {
							if(item.twoColored) {
								$('#property-fillBarColor').show();
							} else {
								$('#property-fillBarColor').hide();
							}
							return false;
						}
		      	    	,changeProperty: {
							caption: 'Two-colored bar',
							rerender: true,
							changeable: false
						}
					},
					{
						caption: 'Fill Color'
						,name: 'fillBarColor'
						,proptype: 'background-color-2-fill'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
						,hiddenByDefault: function(item){
							return !item.twoColored;
						}
						,liveUpdate:'background-color'
		      	    	,changeProperty: {
							caption: 'Fill Color',
							property: 'background-color',
							selector: '.slider-bar-filled',
							transitionable: true
						}
					}
				]
			]
		},
		{
			caption: 'Slider',
	    	properties: [
				[
					{
						caption: 'Size'
						,name: 'sliderSize'
						,proptype: 'slider-size'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.sliderSize;
						}
						,values: { min: 4, max: 40, step: 2 }
		      	    	,changeProperty: {
							caption: 'Slider size',
							rerender: true
						}
					},
					{
						caption: 'Color'
						,name: 'sliderColor'
						,proptype: 'background-color-3-slider'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.sliderColor;
						}
						,liveUpdate:'background-color'
		      	    	,changeProperty: {
							caption: 'Slider color',
							property: 'background-color',
							selector: '.slider-button',
							transitionable: true
						}
					},
					{
						caption: '<span class="property-icon property-border-radius" title="Border radius"></span>'
						,name: 'sliderBorderRadius'
						,proptype: 'border-radius'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.sliderBorderRadius;
						}
						,values: { min: 0, max: 20, step: 2 },changeProperty: {
							caption: 'Slider border-radius',
							property: 'border-radius',
							selector: '.slider-button',
							transitionable: true
						}
					}
				]
				,[
					{
						caption: 'Original position (%)'
						,name: 'sliderPosition'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.sliderPosition;
						}
						,values: { min: 0, max: 100, step: 10 }
						,changeProperty: {
							caption: 'Slider position',
							rerender: true
						}
					}
				],

			]
		},
		{
			caption : 'Advanced',
			properties: [[
					{
						caption: 'Vertical?'
						,name: 'vertical'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.vertical) == "undefined") { return false; }
							return item.vertical;
						}
						,onChange: function(item){
							var _dims = prx.componentsHelper.getRealDims(item);

							item.height = _dims.width;
							item.width = _dims.height;
							item.htype = 'fixed';
							item.wtype = 'fixed';

							return item;
						}
						,changeProperty: {
							caption: 'Orientation',
							rerender: true,
							changeable: false
						}
					}
				]]

		}


	]
}

prx.types.picker = {
	name: 'picker'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '<div id="' + _id + '" class="box pos type-picker"><div class="outer liveUpdate-containerColor" style="background-color: '+prx.componentsHelper.getProp(item.containerColor,'color-background')+';">';
		var _options = prx.componentsHelper.getProp(item.values,'text-list').split("<br />");
		
		var _props = prx.componentsHelper.getProp(item.textProperties,'props-text');

		cR += '<div class="inner liveUpdate-listColor liveUpdate-textColor changeProperty-textColor changeProperty-textFont" id="' + _id + '-inner" style="background-color: '+prx.componentsHelper.getProp(item.listColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+' '+_props+'">';
		cR += '<ul style="padding: '+(prx.componentsHelper.getProp(item.height,'num-other')/2-(22*prx.componentsHelper.getScale(item)))+'px 0;">';

		for(var i = 0; i < _options.length; i++) {
			if(prx.componentsHelper.getProp(item.showBar,'boolean')) {
				cR += '<li><label for="'+_id+'-option'+i+'">' + _options[i] + '</label></li>';
			} else {
				cR += '<li><input type="radio" data-role="none" id="'+_id+'-option'+i+'" name="'+_id+'-input" '+((i == prx.componentsHelper.getProp(item.selectedValue,'num-other')) ? 'checked' : '' )+'/><label '+((i == prx.componentsHelper.getProp(item.selectedValue,'num-other')) ? 'class="liveUpdate-activeTextColor"' : '' )+' for="'+_id+'-option'+i+'"><span>&#10004;</span>' + _options[i] + '</label></li>';
			}
		};
		cR += '</ul>'

		if(prx.componentsHelper.getProp(item.showBar,'boolean')) {
			cR += '<div class="bar liveUpdate-barColor" style="background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+';"></div>';
		} else {
			cR += '<style>.type-picker .inner ul input:checked + label {color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+';}</style>';
		}

		cR += '</div>';
		cR += '</div>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		$('#' + _id + ' ul').css('padding', (prx.componentsHelper.getProp(item.height,'num-other')/2-(22*prx.componentsHelper.getScale(item)))+'px 0');
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var manualScroll = false;
		if(!prx.editor) {
			//if (typeof(prx.scrollable._scrollables[_id + '-inner'])=='undefined') {
				try {
					prx.scrollable._scrollables[_id + '-inner'] = new IScroll('#'+_id + '-inner',{
						scrollX: false,
						scrollbars: false,
						mousewheel: false,
						probeType: 3,
						twoWayScroll: true
					});

					prx.scrollable._scrollables[_id + '-inner'].on('scrollStart', function() {

						$(this.wrapper).parents('.box').not('.type-picker').each(function() {
							if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
								prx.scrollable._scrollables[this.id + '-inner'].disable();
							}
						})

					});

					prx.scrollable._scrollables[_id + '-inner'].on('scrollEnd', function() {
						// ROUND POSITION TO NEAREST LI (32 = LI HEIGHT)
						//var offset = 32 * Math.round(prx.scrollable._scrollables[_id + '-inner'].y/32);

						var index = Math.round(prx.scrollable._scrollables[_id + '-inner'].y/(32*prx.componentsHelper.getScale(item))) * -1;

						prx.scrollable._scrollables[_id + '-inner'].scrollTo(0,index*-32*prx.componentsHelper.getScale(item));


						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['pickerchange'] = { selected: $('#'+_id+' li').eq(index).find('label').text() }
						$('#'+_id).trigger('pickerchange');

						$(this.wrapper).parents('.box').not('.type-picker').each(function() {
							if(typeof(prx.scrollable._scrollables[this.id + '-inner']) != "undefined") {
								prx.scrollable._scrollables[this.id + '-inner'].enable();
							}
						})
					});

					/* broke in iscroll5, whats the use anw?
					var RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize';
					prx.scrollable._scrollables[_id + '-inner']._unbind(RESIZE_EV, window);
					*/

					//BRINGS SELECTED LI TO CENTER, UNDER INDICATOR, ON CLICK
					$('#' + _id + ' li').hammer().on('tap', function(e){
						prx.scrollable._scrollables[_id + '-inner'].scrollTo(0,-$(this).index() * 32*prx.componentsHelper.getScale(item), 300);

						if(typeof(prx.variables._triggerData['#'+_id]) == "undefined") { prx.variables._triggerData['#'+_id] = {}; }
				        prx.variables._triggerData['#'+_id]['pickerchange'] = { selected: $(this).text() }
						$('#'+_id).trigger('pickerchange');
					})

					prx.actions.disableFlashActionOnItemTap('#' + _id + ' li', '.flashactiontap-afterdisplay');

					// DEFAULT SELECTED ITEM
					var _options = item.values.split("<br />");
					if(item.selectedValue <= _options.length && item.selectedValue!=-1) {
						prx.scrollable._scrollables[_id + '-inner'].scrollTo(0,-item.selectedValue * 32*prx.componentsHelper.getScale(item));
					}
				} catch(err){};
			//}
		} else {
			var _options = item.values.split("<br />");
			if(prx.componentsHelper.getProp(item.selectedValue,'num-other') < _options.length && prx.componentsHelper.getProp(item.selectedValue,'num-other')!=-1) {
				$('#' + _id + ' ul').css('margin-top', (-prx.componentsHelper.getProp(item.selectedValue,'num-other') * 32*prx.componentsHelper.getScale(item)) + 'px');
			}
		}
	}
	,interactions: [prx.commonproperties.actions]
    ,mpactions: {
    	specialEvents: ['pickerchange']
    }
	,propertyGroups:	[

		{
			caption: 'Style',
	    	properties: [
				[
					{
						caption: 'Background'
						,name: 'listColor'
						,proptype: 'background-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.listColor
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Background color',
							property: 'background-color',
							selector: '.inner',
							transitionable: true
						}
					}
					,{
						caption: 'Border'
						,name: 'containerColor'
						,proptype: 'background-color-2-container'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.containerColor
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Border color',
							property: 'background-color',
							selector: '.outer',
							transitionable: true
						}
					}
					,

				],
				[
					{
						caption: 'Show selection indicator bar?'
						,name: 'showBar'
						,type: 'onoff'
						,value: function(item,name) {
							return item.showBar;
						},
						onChange: function(item) {
							if(item.showBar) {
								$('#property-barColor').show();
								$('#property-activeTextColor').hide();
							} else {
								$('#property-activeTextColor').show();
								$('#property-barColor').hide();
							}
							return false;
						}
						,changeProperty: {
							caption: 'Show selection bar',
							rerender: true,
							changeable: false
						}
					},
					{
						caption: false
						,name: 'barColor'
						,proptype: 'background-color-3-bar'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.barColor
						}
						,hiddenByDefault: function(item){
							return (!item.showBar)
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Bar color',
							property: 'background-color',
							selector: '.bar',
							transitionable: true
						}
					}
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont,
					prx.commonproperties.textColor,
					prx.commonproperties.textProperties
				],
				[
					{
						caption: 'Active'
						,name: 'activeTextColor'
						,proptype: 'font-color-2-active'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeTextColor
						}
						,hiddenByDefault: function(item){
							return (item.showBar)
						}
						,liveUpdate:'color'
						,changeProperty: {
							caption: 'Active text color',
							property: 'color',
							selector: 'input:checked + label',
							transitionable: true
						}
					}
				]
			]
		},
		{
			caption: 'Values',
			properties: [

				[
					{
						caption: '(Separated by line breaks)'
						,name: 'values'
						,type: 'textarea'
						,value: function(item,name) {
							return item.values;
						}
						,onChange: function(item,name) {
							var _options = item.values.split("<br />");

							var cR = '';

							var _values = [{displayValue: 'None', value: -1}];
							for(var i = 0; i < _options.length; i++) {
								cR += '<option value="'+i+'" '+((item.selectedValue == i) ? 'selected' : '')+'>'+_options[i]+'</option>'
							}

							$('#property-selectedValue select').html(cR);
						}
						,changeProperty: {
							caption: 'Values',
							rerender: true
						}
					}
				],
				[
					{
						caption: 'Selected value'
						,name: 'selectedValue'
						,type: 'select'
						,value: function(item,name) {
							return item.selectedValue;
						}
						,values: function(item,name){
							var _options = item.values.split("<br />");
							var _values = [{displayValue: 'None', value: -1}];
							for(var i = 0; i < _options.length; i++) {
								_values.push({
									displayValue: _options[i],
									value: i
								});
							}
							return _values;
						}
						,changeProperty: {
							caption: 'Selected value',
							rerender: true
						}
					}
				]
			]
		}
	]
}

/***** /FORM COMPONENTS *****/

/***** LIST COMPONENTS *****/

//TYPE: LISTCOMPLEX
prx.types.listcomplex = {
	name: 'listcomplex'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		/* BACKWARDS COMPATIBILITY */
		if(item.name == "listnested") item.type = "listnested";
		if(typeof(item.subColor) == 'undefined') item.subColor = '999999';
		if(typeof(item.subFont) == 'undefined') item.subFont = 'Helvetica, Arial, sans-serif';
		if(typeof(item.activeSubColor) == 'undefined') item.activeSubColor = 'FFFFFF';
		if(typeof(item.borderWidth) == 'undefined') item.borderWidth = '1';

		var cR = '';
		var _active = "";
		var _style ='';
		var _BRstyle = "";
		var _icon = "";
		var _borderRadius = prx.componentsHelper.getProp(item.borderRadius,'num-border-radius');
		var _activevalue = "";
		var _inactivevalue = "";
		var _thumbnail = "";
		var _activetext = "";
		var _inactivetext = "";
		var _badge = "";

		if(typeof(item.textProperties) == "undefined") { item.textProperties = []; }
		var _textprops = prx.componentsHelper.getProp(item.textProperties,'props-text');

		if(typeof(item.subProperties) != "undefined") {
			var _subprops = prx.componentsHelper.getProp(item.subProperties,'props-text');
		}
		if(typeof(item.valueProperties) != "undefined") {
			var _valueprops = prx.componentsHelper.getProp(item.valueProperties,'props-text');
		}
		if(typeof(item.badgeProperties) != "undefined") {
			var _badgeprops = prx.componentsHelper.getProp(item.badgeProperties,'props-text');
		}

		if(prx.componentsHelper.getProp(item.style,'other')=="plain") {
			_borderRadius = 0;
			_style = 'border-width: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px 0!important; '
		}

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		var _width = _dims.width - (20*prx.componentsHelper.getScale(item));
		var _height = Math.round((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*(item.listitems.length+(1*prx.componentsHelper.getScale(item)))) / item.listitems.length);
		var _iconheights = 'height: '+eval((_height-(2*prx.componentsHelper.getScale(item)))*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px; padding-top: '+eval((_height-(2*prx.componentsHelper.getScale(item)))*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px;';
		var _thumbheights = 'height: '+eval((_height-(2*prx.componentsHelper.getScale(item)))*0.7)+'px; padding-top: '+eval((_height-(2*prx.componentsHelper.getScale(item)))*0.2)+'px;';

		cR += '<div id="' + _id + '" class="box pos type-list">';

		cR += '<style>'
		cR += '#' + _id + ' .label-container { '+_style+'text-align: '+prx.componentsHelper.getProp(item.textAlign,'align')+'; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'; '+prx.componentsHelper.getProp(item.textFont,'font-family')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; border-radius: '+_borderRadius+'px; }';
		cR += '#' + _id + ' .label-text { width: '+_width+'px; height: '+_height+'px; }';
		cR += '#' + _id + ' .label-text .label-text-span { '+_textprops+' }'
		cR += '#' + _id + ' input:checked + label { background: '+prx.componentsHelper.getProp(item.activeBackgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(item.activeTextColor,'color-text')+'; }'
		cR += '#' + _id + ' input:checked + label .value { color: '+prx.componentsHelper.getProp(item.activeValueColor,'color-text')+'; }'
		cR += '#' + _id + ' input:checked + label .subtitle { color: '+prx.componentsHelper.getProp(item.activeSubColor,'color-text')+'; }'
		cR += '#' + _id + ' li { height: ' + _height + 'px; line-height: '+_height+'px; border-top: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; }'
		if(prx.componentsHelper.getProp(item.style,'other') == "grouped") {
			cR += '#' + _id + ' li:first-child label { border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px 0 0; }'
			cR += '#' + _id + ' li:last-child label { border-radius: 0 0 '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px; }'
		}
		cR += '#' + _id + ' li .value { height: '+_height+'px; '+prx.componentsHelper.getProp(item.valueFont,'font-family')+_valueprops+'; font-size: '+prx.componentsHelper.getProp(item.valueSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.valueColor,'color-text')+'; padding-left: '+(10*prx.componentsHelper.getScale(item))+'px; }'
		cR += '#' + _id + ' li .subtitle { '+prx.componentsHelper.getProp(item.subFont,'font-family')+_subprops+' font-size: '+prx.componentsHelper.getProp(item.subSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.subColor,'color-text')+'; }'
		cR += '</style>'

		cR += '<ul class="label-container liveUpdate-borderColor liveUpdate-textColor liveUpdate-backgroundColor changeProperty-backgroundColor changeProperty-textColor changeProperty-borderColor changeProperty-textAlign changeProperty-textFont changeProperty-textSize">';


		$.each(item.listitems, function(i,elm){

			/* BACKWARDS COMPATIBILITY */
			if(typeof(elm.itemtype) == 'undefined') {
				switch (prx.componentsHelper.getProp(item.type,'other')) {
				case 'listnested': elm.itemtype = 'nested'; break;
				case 'listbasic': default: elm.itemtype = 'basic'; break;
				}
			}

			_BRstyle = "";
			_style = "";
			_icon = "";
			_activevalue = "";
			_inactivevalue = "";
			_thumbnail = "";
			_inactivetext = '<div class="va-outer text"><div class="va-inner label-text"><span class="label-text-span"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text')+'</span></span>';
			_badge = "";


			/* THUMBNAIL */
			//if(elm.hasThumbnail && typeof(elm.thumbnail) != "undefined" &&  elm.thumbnail.fileId != '') {
			if(typeof(elm.thumbnail) != "undefined" && elm.thumbnail.fileId != '') {
				_thumbnail = '<img src="' + prx.componentsHelper.getProp(elm.thumbnail,'asset') + '" style="'+_thumbheights+' float: left; margin-right: '+(10*prx.componentsHelper.getScale(item))+'px;" class="thumb" />';
			}
			/* /THUMBNAIL */

			/* LIST WITH VALUES */
			if( prx.componentsHelper.getProp(elm.itemtype,'other') == 'withValue' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithValue' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'withIconAndValue' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithBadgeAndValue') {
				//this will probably be changed later to allow for tableviewstyle2
				_inactivevalue = '<span class="va-outer"><span class="va-inner value liveUpdate-valueColor"><span data-editableproperty="value" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.value,'text')+'</span></span></span>';
			}
			/* /VALUES */

			/* SUBTITLES */
			if(typeof(elm.subtitle) != "undefined" && prx.componentsHelper.getProp(elm.subtitle,'other') != "") {
				_inactivetext += '<span class="subtitle '+ ((prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox' && prx.componentsHelper.getProp(elm.checked,'boolean')) ? 'liveUpdate-activeSubColor' : 'liveUpdate-subColor') +'"><span data-editableproperty="subtitle" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.subtitle,'text')+'</span></span>'
			}
			/* /SUBTITLES */

			_inactivetext += '</div></div>';

			/* LISTS WITH ICONS */
			if( prx.componentsHelper.getProp(elm.itemtype,'other') == 'nested' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithValue' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'withIcon' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'withIconAndValue' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithBadge' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'withIconAndBadge' || 
					prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithBadgeAndValue') {

				if(typeof (elm.buttonicon) != "undefined" && prx.componentsHelper.getProp(elm.buttonicon.fileId,'other') != ''){
					var _iconclass = 'class="listicon"';
					if(prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox') { _iconclass = 'class="listicon checkmark"'; }
					switch(prx.componentsHelper.getProp(item.iconpos,'icon-position')) {
					case 'left':
						_icon += '<img src="'+prx.componentsHelper.getProp(elm.buttonicon,'asset')+'" style="float: '+prx.componentsHelper.getProp(item.iconpos,'icon-position')+'; '+_iconheights+' padding-right: '+(10*prx.componentsHelper.getScale(item))+'px;" '+_iconclass+' />';
						break;
					case 'right':
						_icon += '<img src="'+prx.componentsHelper.getProp(elm.buttonicon,'asset')+'" style="float: '+prx.componentsHelper.getProp(item.iconpos,'icon-position')+'; '+_iconheights+' padding-left: '+(10*prx.componentsHelper.getScale(item))+'px;" '+_iconclass+' />';
						break;
					case '':
					default:
						break;
					}
				}
			}
			/* /ICONS */

			/* BADGES */
			if( prx.componentsHelper.getProp(elm.itemtype,'other') == 'withBadge' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithBadge' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'withIconAndBadge' || 
				prx.componentsHelper.getProp(elm.itemtype,'other') == 'nestedWithBadgeAndValue') {
				var _badgeStyle = (prx.componentsHelper.getProp(item.badgeGlassStyle,'boolean')) ? ' glass' : '';
				_badge = '<div class="va-outer"><div class="va-inner" style="height: '+_height+'px"><span class="badge'+_badgeStyle+' liveUpdate-badgeColor liveUpdate-badgeBackgroundColor" style="'+prx.componentsHelper.getProp(item.badgeFont,'font-family')+_badgeprops+'; font-size: '+prx.componentsHelper.getProp(item.badgeSize,'num-text-size')+'px; color: '+prx.componentsHelper.getProp(item.badgeColor,'color-text')+'; background-color: '+prx.componentsHelper.getProp(item.badgeBackgroundColor,'color-background')+';" ><span data-editableproperty="badgeText" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.badgeText,'text')+'</span></span></div></div>';
			}
			/* /BADGES */

			cR += '<li  class="liveUpdate-borderColor dynamic-property listitem-type-'+prx.componentsHelper.getProp(elm.itemtype,'other')+'" id="'+_id+'-listitems-'+i+'" data-dynamic-property-index="'+i+'">';
			cR += '<input type="'+((prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox') ? 'checkbox': 'radio') +'" name="'+_id+'-checkbox" id="'+_id+'-checkbox-'+i+'" data-role="none" '+ ((prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox' && prx.componentsHelper.getProp(elm.checked,'boolean')) ? 'checked' : '') +' />';
			cR += '<label '+ ((prx.componentsHelper.getProp(elm.itemtype,'other') == 'checkbox' && prx.componentsHelper.getProp(elm.checked,'boolean')) ? 'class="liveUpdate-activeTextColor liveUpdate-activeBackgroundColor"' : '') +' for="'+_id+'-checkbox-'+i+'">' +_icon + _thumbnail + _badge + _inactivevalue + _inactivetext+'</label>';
			cR += '</li>';

		});
		cR += '</ul></div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = prx.componentsHelper.getRealDims(item);
		
		var _height = Math.round((_dims.height-prx.componentsHelper.getProp(item.borderWidth,'num-border-width')*(item.listitems.length+(1*prx.componentsHelper.getScale(item)))) / item.listitems.length);
		var _width = _dims.width - (20*prx.componentsHelper.getScale(item));

		$('#' + _id + ' li, #' + _id + ' .va-inner').height(_height);
		$('#' + _id + '.va-outer.text').width(_width);

		if(prx.componentsHelper.getProp(item.iconpos,'icon-position') != '') {
			$("#"+_id + ' label img.listicon').css({
				height: eval((_height-(2*prx.componentsHelper.getScale(item)))*0.2*prx.componentsHelper.getProp(item.iconSize,'icon-size'))+'px',
				'padding-top': eval((_height-(2*prx.componentsHelper.getScale(item)))*0.1*(5-prx.componentsHelper.getProp(item.iconSize,'icon-size')))+'px'
			})
		}
		$("#"+_id + ' label img.thumb').css({
			height: eval((_height-(2*prx.componentsHelper.getScale(item)))*0.7)+'px',
			'padding-top': eval((_height-(2*prx.componentsHelper.getScale(item)))*0.2)+'px'
		})

	}
	,propertyGroups:	[
		{
			caption: 'List',
	    	properties: [
				[
					{
						caption: 'Style'
						,name: 'style'
						,type: 'select'
						,value: function(item,name){
							return item.style;
						}
						,values: [{ value: 'plain', displayValue: 'Plain' }, { value: 'grouped', displayValue: 'Grouped' }]
						,onChange: function(item){
							if(item.style== 'plain') {
								$('#property-borderRadius').hide();
							} else {
								$('#property-borderRadius').show();
							}
							return false;
						}
						,changeProperty: {
							caption: 'Style',
							rerender: true,
							changeable: false
						}
					}
				],[
					prx.commonproperties.backgroundColor
					,{
						caption: 'Active',
						name: 'activeBackgroundColor',
						proptype: 'backrgound-color-2-active',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeBackgroundColor
						}
						,liveUpdate: 'background-color'
						,changeProperty: {
							caption: 'Active background color',
							property: 'background-color',
							selector: 'input:checked + label',
							transitionable: true
						}
					}
				],[
					{
						caption: 'Border (px)',
						name: 'borderWidth',
						proptype: 'border-width',
						type: 'combo-select',
						value: function(item,name)
						{
							if(typeof(item.borderWidth) == "undefined") {
								return 1;
							}
							return item.borderWidth;
						},
						values: { min: 0, max: 10, step: 1 }
						,changeProperty: {
							caption: 'Border width',
							rerender: true
						}
					}
					,prx.commonproperties.borderColor
					,{
						caption: '<span class="property-icon property-border-radius" title="Border radius"></span>',
						name: 'borderRadius',
						proptype: 'border-radius',
						type: 'combo-select',
						value: function(item,name) { return item.borderRadius; },
						values: { min: 0, max: 20, step: 1 },
						hiddenByDefault: function(item,name) { return (item.style=='plain'); }
						,changeProperty: {
							caption: 'Border radius',
							rerender: true
						}
					}
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],
				[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
					,{
						caption: 'Active',
						name: 'activeTextColor',
						proptype: 'font-color-2-active',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeTextColor
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Active text color',
							property: 'color',
							selector: 'input:checked + label',
							transitionable: true
						}
					}
				]
			]
		},{
			caption: 'Subtitle',
			properties: [
				[
					{

						caption: false,
						name: 'subFont',
						proptype: 'font-family-2-subtitle',
						type: 'select',
						value: function(item,name) { if (typeof(item.subFont) == "undefined") { return 'Helvetica, Arial, sans-serif'; } return item.subFont; },
						values: function() { return prx.comps.fonts; }
						,changeProperty: {
							caption: 'Subtitle font',
							property: 'font-family',
							selector: '.subtitle',
							transitionable: false
						}
					},{
						caption: false,
						name: 'subSize',
						proptype: 'font-size-2-subtitle',
						type: 'combo-select',
						value: function(item,name) { if (typeof(item.subSize) == "undefined") {return 12;} return item.subSize; },
						values: prx.comps.textsize
						,changeProperty: {
							caption: 'Subtitle font size',
							property: 'font-size',
							selector: '.subtitle',
							transitionable: true
						}
					},{
						caption: false,
						name: 'subColor',
						proptype: 'font-color-3-subtitle',
						type: 'colorpicker',
						value: function(item,name) { if (typeof(item.subColor) == "undefined") {return '999999';} return item.subColor; }
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Subtitle color',
							property: 'color',
							selector: '.subtitle',
							transitionable: true
						}
					}
				],[
					{
						caption: false,
						name: 'subProperties',
						proptype: 'text-properties-2-subtitle',
						type: 'checkbox',
						value: function(item,name) { if(typeof(item.subProperties) == "undefined") {item.subProperties = [];} return item.subProperties; },
						values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underline"></span>'}]
						,changeProperty: {
							caption: 'Subtitle text properties',
							rerender: true,
							changeable: false
						}
					}
					,
					{
						caption: 'Active',
						name: 'activeSubColor',
						proptype: 'font-color-4-subtitle-active',
						type: 'colorpicker',
						value: function(item,name){
							if(typeof(item.activeSubColor) == "undefined") { return 'FFFFFF'; }
							return item.activeSubColor
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Subtitle color',
							property: 'color',
							selector: 'input:checked + label .subtitle',
							transitionable: true
						}
					}
				]
			]
		},{
			caption: 'Value',
			properties: [
				[
					{
						caption: false,
						name: 'valueFont',
						proptype: 'font-family-3-value',
						type: 'select',
						value: function(item,name) { return item.valueFont; },
						values: function() { return prx.comps.fonts; }
						,changeProperty: {
							caption: 'Value font',
							property: 'font-family',
							selector: '.value',
							transitionable: false
						}
					},{
						caption: false,
						name: 'valueSize',
						proptype: 'font-size-3-value',
						type: 'combo-select',
						value: function(item,name) { return item.valueSize; },
						values: prx.comps.textsize
						,changeProperty: {
							caption: 'Value font size',
							property: 'font-size',
							selector: '.value',
							transitionable: true
						}

					},{
						caption: false,
						name: 'valueColor',
						proptype: 'font-color-5-value',
						type: 'colorpicker',
						value: function(item,name) { return item.valueColor; }
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Value color',
							property: 'color',
							selector: '.value',
							transitionable: true
						}

					}
				],[
					{
						caption: false,
						name: 'valueProperties',
						proptype: 'text-properties-3-value',
						type: 'checkbox',
						value: function(item,name) { if(typeof(item.valueProperties) == "undefined") {item.valueProperties = [];} return item.valueProperties; },
						values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underline"></span>'}]
						,changeProperty: {
							caption: 'Value text properties',
							rerender: true,
							changeable: false
						}

					}
					,{
						caption: 'Active',
						name: 'activeValueColor',
						proptype: 'font-color-6-subtitle-active',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeValueColor
						}
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Active value color',
							property: 'color',
							selector: 'input:checked + label .value',
							transitionable: true
						}

					}
				]
			]
		},
		{
			caption: 'Badge',
			properties: [
				[
					{
						caption: 'Background',
						name: 'badgeBackgroundColor',
						proptype: 'background-color-3-badge',
						type: 'colorpicker',
						value: function(item,name){
							return item.badgeBackgroundColor
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Badge background color',
							property: 'background-color',
							selector: '.badge',
							transitionable: true
						}

					}
					,{
						caption: 'Glass Style',
						name: 'badgeGlassStyle',
						type: 'onoff',
						value: function(item,name) {
							return item.badgeGlassStyle;
						}
						,changeProperty: {
							caption: 'Badge stu;e',
							rerender: true,
							changeable: false
						}
					}
				],[
					{
						caption: false,
						name: 'badgeFont',
						proptype: 'font-family-4-badge',
						type: 'select',
						value: function(item,name) { return item.badgeFont; },
						values: function() { return prx.comps.fonts; }
						,changeProperty: {
							caption: 'Badge font',
							property: 'font-family',
							selector: '.badge',
							transitionable: false
						}

					},{
						caption: false,
						name: 'badgeSize',
						proptype: 'font-size-4-badge',
						type: 'combo-select',
						value: function(item,name) { return item.badgeSize; },
						values: prx.comps.textsize
						,changeProperty: {
							caption: 'Badge font size',
							property: 'font-size',
							selector: '.badge',
							transitionable: true
						}

					},{
						caption: false,
						name: 'badgeColor',
						proptype: 'font-color-7-badge',
						type: 'colorpicker',
						value: function(item,name) { return item.badgeColor; }
						,liveUpdate: 'color'
						,changeProperty: {
							caption: 'Badge font color',
							property: 'color',
							selector: '.badge',
							transitionable: true
						}

					}
				],[
					{
						caption: false,
						name: 'badgeProperties',
						proptype: 'text-properties-4-badge',
						type: 'checkbox',
						value: function(item,name) { if(typeof(item.badgeProperties) == "undefined") {item.badgeProperties = [];} return item.badgeProperties; },
						values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underline"></span>'}]
						,changeProperty: {
							caption: 'Badge text properties',
							rerender: true
						}
					}


				]

			]
		},{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'iconpos'
						,type: 'select'
						,value: function(item,name) {
							//item.iconpos == '') { item.iconpos = 'right'}
							return item.iconpos;
						}
						,values: [{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'}]
					   /* ,onChange: function(item){
							if(item.iconpos == '') {
								$('[id=property-buttonicon], [id=property-removeIcon], #property-iconSize').hide();
							} else {
								$('[id=property-buttonicon], [id=property-removeIcon], #property-iconSize').show();
							}
							return false;
						}*/
						,changeProperty: {
							caption: 'Icon position',
							rerender: true,
							changeable: false
						}

					}
					,
					{
						caption: false
						,name: 'iconSize'
						,proptype: 'icon-size'
						,type: 'select'
						,value: function(item,name) {
							return item.iconSize;
						}
						,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
						,changeProperty: {
							caption: 'Icon size',
							rerender: true,
							changeable: false
						}

					}
				]
			]
		}
	]
	,dynamicProperties: {
		data: 'listitems'
		,propertyCaption: 'List items'
  		,propertyName: 'List item'
		,addCaption: 'Add list item'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""},
			checked: true,
			actions: []
		}
		,captionProperty: 'text'

		,interactions: [
			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.listitems[index].actions) == "undefined") {
						item.listitems[index].actions = [];
					}

					return item.listitems[index].actions.length;
				}
			}
		]
		,editableProperties: [
			{
				caption: 'Label'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.listitems[index].text;
				}
				,changeProperty: {
					caption: 'Label',
					property: 'text',
					selector: '.label-text-span',
					transitionable: false
				}

			}
			,
			{
				caption: 'Subtitle'
				,name: 'subtitle'
				,type: 'input'
				,value: function(item,name,index) {
					if(typeof(item.listitems[index].subtitle) == 'undefined') { return ''; }
					return item.listitems[index].subtitle;
				}
				,changeProperty: {
					caption: 'Subtitle Text',
					property: 'text',
					selector: '.subtitle',
					transitionable: false
				}

		   }
			,
			{
				caption: 'Value'
				,name: 'value'
				,type: 'input'
				,value: function(item,name,index) {
					return item.listitems[index].value;
				}
				,hiddenByDefault: function(item,name,index){
					return (item.listitems[index].itemtype != 'nestedWithValue' && item.listitems[index].itemtype != 'withValue' && item.listitems[index].itemtype != 'withIconAndValue' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue');
				}
				,changeProperty: {
					caption: 'Value Text',
					property: 'text',
					selector: '.value',
					transitionable: false
				}

			}
			,
			{
				caption: 'Badge'
				,name: 'badgeText'
				,type: 'input'
				,value: function(item,name,index) {
					return item.listitems[index].badgeText;
				}
				,hiddenByDefault: function(item,name,index){
					return (item.listitems[index].itemtype != 'withBadge' && item.listitems[index].itemtype != 'nestedWithBadge' && item.listitems[index].itemtype != 'withIconAndBadge' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue');
				}
				,changeProperty: {
					caption: 'Badge text',
					property: 'text',
					selector: '.badge',
					transitionable: false
				}

			}
		]
		,propertyGroups: [
			{
				caption:  'Style',
				properties: [
					[
						{
							caption: false //'List item Type'
							,name: 'itemtype'
							,type: 'select'
							,value: function(item,name,index) {
								if(typeof(item.listitems[index].itemtype) == "undefined") {
									item.listitems[index].itemtype = 'basic'
								}
								return item.listitems[index].itemtype;
							}
							,values: [
									  { value: 'basic', displayValue: 'Basic'}
									  ,{ value: 'nested', displayValue: 'Nested'}
									  ,{ value: 'withIcon', displayValue: 'With Icon' }
									  ,{ value: 'checkbox', displayValue: 'Checkbox (On/off)'}
									  ,{ value: 'withBadge', displayValue: 'With Badge' }
									  ,{ value: 'withValue', displayValue: 'With Value'}
									  ,{ value: 'nestedWithValue', displayValue: 'Nested with Value'}
									  ,{ value: 'withIconAndValue', displayValue: 'With icon and value' }
									  ,{ value: 'nestedWithBadge', displayValue: 'Nested with Badge' }
									  ,{ value: 'withIconAndBadge', displayValue: 'With icon and badge' }
									  ,{ value: 'nestedWithBadgeAndValue', displayValue: 'Nested with badge and value' }
							],
							onChange: function(item, index) {
								switch(item.itemtype) {
								case 'basic':
									$('#property-buttonicon, #property-value, #property-checked, #property-badgeText').hide();
									break;
								case 'withIcon':
								case 'withIconAndValue':
								case 'withIconAndBadge':
									item.buttonicon = {"fileId":"","name":"","assetType":"icon","url":""};
									return item;
									break;
								case 'nested':
								case 'nestedWithValue':
								case 'nestedWithBadge':
								case 'nestedWithBadgeAndValue':
									item.buttonicon = {"fileId":"308d48427cd7846bd86b679eabd077ae.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
									return item;
									break;
								case 'checkbox':
									item.buttonicon = {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"};
									return item;
									break;
								case 'withValue':
									$('#property-buttonicon, #property-checked, #property-badgeText').hide()
									$('#property-value').show();
									break;
								case 'withBadge':
									$('#property-buttonicon, #property-checked, #property-value').hide()
									$('#property-badgeText').show();
									break;
								default: break;
								}
								return false;
							}

							,changeProperty: {
								caption: 'Listitem type',
								rerender: true
							}
						}

					]]
				}
				,
				{
					caption: 'Thumbnail',
					properties: [/*[
						{
							caption: 'Has thumbnail?'
							,name: 'hasThumbnail'
							,type: 'onoff'
							,value: function(item,name,index) {
							if(typeof(item.listitems[index].hasThumbnail) == 'undefined') { return false; }
								return item.listitems[index].hasThumbnail;
							}
							,onChange: function(item,index) {
								if(item.hasThumbnail) {
									$('#property-thumbnail').show();
								} else {
									$('#property-thumbnail').hide();
								}
								return false;
							}
							,changeProperty: {
								caption: 'Has thumbnail',
								rerender: true
							}

						}
					],*/
					[
						{
							caption: false
							,name: 'thumbnail'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(typeof(item.listitems[index].thumbnail) == 'undefined' || item.listitems[index].thumbnail.fileId == '') {
									return 'No thumbnail selected';
								}
								return item.listitems[index].thumbnail.name;
							}
							,value: function(item,name,index) {
								return JSON.stringify({
									allow: 'image',
									asset: item.listitems[index].thumbnail
								});
							}
							/*,hiddenByDefault: function(item,name,index){
								return (!item.listitems[index].hasThumbnail);
							}*/
							,changeProperty: {
								caption: 'Thumbnail',
								rerender: true
							}

						}
					]]
				}
				,
				{
					caption: 'Icon',
					properties: [[
						{
							caption: false
							,name: 'buttonicon'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(item.listitems[index].buttonicon.fileId == '') {
									return 'No icon selected';
								}
								return item.listitems[index].buttonicon.name;
							}
							,value: function(item,name,index) {
								return JSON.stringify({
									allow: 'image',
									asset: item.listitems[index].buttonicon
								});
							}
							,hiddenByDefault: function(item,name,index){
								return (item.listitems[index].itemtype != 'nested' && item.listitems[index].itemtype != 'withIcon' && item.listitems[index].itemtype != 'withIconAndValue' && item.listitems[index].itemtype != 'nestedWithValue' && item.listitems[index].itemtype != 'checkbox' && item.listitems[index].itemtype != 'withIconAndBadge' && item.listitems[index].itemtype != 'nestedWithBadgeAndValue' && item.listitems[index].itemtype != 'nestedWithBadge');
							}
							,changeProperty: {
								caption: 'Icon',
								rerender: true
							}

						}
					]]
				},
				{
					caption: 'Checkbox state',
					properties: [[
						{
							caption: 'Checked?'
							,name: 'checked'
							,type: 'onoff'
							,value: function(item,name,index){
								return item.listitems[index].checked;
							}
							,hiddenByDefault: function(item,name,index){
								return (item.listitems[index].itemtype != 'checkbox');
							}
							,changeProperty: {
								caption: 'Checkbox active state',
								rerender: true
							}

						}
					]
				]
			}
		]

	}
}

/* TYPE = LISTNESTED */
prx.types.listnested = prx.componentsHelper.cloneobject(prx.types.listcomplex);
prx.types.listnested.name = 'listnested';
prx.componentsHelper.removeProperties(prx.types.listnested.propertyGroups, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor', 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor'])
prx.componentsHelper.removeProperties(prx.types.listnested.dynamicProperties.propertyGroups, ['itemtype', 'value', 'checked', 'badgeText']);
prx.types.listnested.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listnested.dynamicProperties.blankItem, ['value', 'checked', 'badgeText']);
prx.types.listnested.dynamicProperties.blankItem.itemtype = 'nested';
prx.types.listnested.dynamicProperties.blankItem.buttonicon = {"fileId":"308d48427cd7846bd86b679eabd077ae.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
prx.types.listnested.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnested.dynamicProperties.propertyGroups, 'itemtype', 'value', 'nested');
prx.types.listnested.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnested.dynamicProperties.propertyGroups, 'itemtype', 'hiddenByDefault', true);
prx.types.listnested.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnested.dynamicProperties.propertyGroups, 'buttonicon', 'hiddenByDefault', false);

//TYPE = LISTBASIC
prx.types.listbasic = prx.componentsHelper.cloneobject(prx.types.listnested);
prx.types.listbasic.name = 'listbasic';
prx.componentsHelper.removeProperties(prx.types.listbasic.propertyGroups, ['iconpos', 'iconSize'])
prx.componentsHelper.removeProperties(prx.types.listbasic.dynamicProperties.propertyGroups, ['buttonicon']);
prx.types.listbasic.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listbasic.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listbasic.dynamicProperties.blankItem.itemtype = 'basic';
prx.types.listbasic.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listbasic.dynamicProperties.propertyGroups, 'itemtype', 'value', 'basic');

/* TYPE = LISTWITHICON */
prx.types.listwithicon = prx.componentsHelper.cloneobject(prx.types.listnested);
prx.types.listwithicon.name = 'listwithicon';
prx.types.listwithicon.dynamicProperties.blankItem.itemtype = 'withIcon';
prx.types.listwithicon.dynamicProperties.blankItem.buttonicon = {"fileId":"","name":"","assetType":"icon","url":""};
prx.types.listwithicon.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithicon.dynamicProperties.propertyGroups, 'itemtype', 'value', 'withIcon');

/* TYPE = LISTWITHICONANDVALUE */
prx.types.listwithiconandvalue = prx.componentsHelper.cloneobject(prx.types.listcomplex);
prx.types.listwithiconandvalue.name = 'listwithiconandvalue';
prx.componentsHelper.removeProperties(prx.types.listwithiconandvalue.propertyGroups, [/*'subFont', 'subSize', 'subColor', 'subProperties', 'activeSubColor',*/ 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor'])
prx.componentsHelper.removeProperties(prx.types.listwithiconandvalue.dynamicProperties.propertyGroups, ['itemtype', 'checked', 'badgeText']);
prx.types.listwithiconandvalue.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listwithiconandvalue.dynamicProperties.blankItem, ['checked', 'badgeText']);
prx.types.listwithiconandvalue.dynamicProperties.blankItem.itemtype = 'withIconAndValue';
prx.types.listwithiconandvalue.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithiconandvalue.dynamicProperties.propertyGroups, 'itemtype', 'value', 'withIconAndValue');
prx.types.listwithiconandvalue.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithiconandvalue.dynamicProperties.propertyGroups, 'itemtype', 'hiddenByDefault', true);
prx.types.listwithiconandvalue.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithiconandvalue.dynamicProperties.propertyGroups, 'value', 'hiddenByDefault', false);


/* TYPE = LISTNESTEDWITHVALUE */
prx.types.listnestedwithvalue = prx.componentsHelper.cloneobject(prx.types.listwithiconandvalue);
prx.types.listnestedwithvalue.name = 'listnestedwithvalue';
prx.types.listnestedwithvalue.dynamicProperties.blankItem.itemtype = 'nestedWithValue';
prx.types.listnestedwithvalue.dynamicProperties.blankItem.buttonicon = {"fileId":"308d48427cd7846bd86b679eabd077ae.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
prx.types.listnestedwithvalue.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithvalue.dynamicProperties.propertyGroups, 'itemtype', 'value', 'nestedWithValue');

/* TYPE = LISTWITHVALUE */
prx.types.listwithvalue = prx.componentsHelper.cloneobject(prx.types.listnestedwithvalue);
prx.types.listwithvalue.name = 'listwithvalue';
prx.componentsHelper.removeProperties(prx.types.listwithvalue.propertyGroups, ['iconpos', 'iconSize'])
prx.componentsHelper.removeProperties(prx.types.listwithvalue.dynamicProperties.propertyGroups, ['buttonicon']);
prx.types.listwithvalue.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listwithvalue.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithvalue.dynamicProperties.blankItem.itemtype = 'withValue';
prx.types.listwithvalue.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithvalue.dynamicProperties.propertyGroups, 'itemtype', 'value', 'withValue');

/*
// TYPE = LISTNESTEDWITHSUBTITLE
prx.types.listnestedwithsubtitle = prx.componentsHelper.cloneobject(prx.types.listcomplex);
prx.types.listnestedwithsubtitle.name = 'listnestedwithsubtitle';
prx.componentsHelper.removeProperties(prx.types.listnestedwithsubtitle.propertyGroups, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor', 'badgeFont', 'badgeSize', 'badgeColor', 'badgeProperties', 'badgeGlassStyle', 'badgeBackgroundColor'])
prx.componentsHelper.removeProperties(prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups, ['itemtype', 'value', 'checked', 'badgeText']);
prx.types.listnestedwithsubtitle.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listnestedwithsubtitle.dynamicProperties.blankItem, ['value', 'checked']);
prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups, 'itemtype', 'value', 'nested');
prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups, 'itemtype', 'hiddenByDefault', true);
prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithsubtitle.dynamicProperties.propertyGroups, 'buttonicon', 'hiddenByDefault', false);

// TYPE = LISTWITHSUBTITLE
prx.types.listwithsubtitle = prx.componentsHelper.cloneobject(prx.types.listnestedwithsubtitle);
prx.types.listwithsubtitle.name = 'listwithsubtitle';
prx.componentsHelper.removeProperties(prx.types.listwithsubtitle.propertyGroups, ['iconpos', 'iconSize'])
prx.componentsHelper.removeProperties(prx.types.listwithsubtitle.dynamicProperties.propertyGroups, ['buttonicon']);
prx.types.listwithsubtitle.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listwithsubtitle.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithsubtitle.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithsubtitle.dynamicProperties.propertyGroups, 'itemtype', 'value', 'basic');
*/

/* TYPE = LISTNESTEDWITHBADGE */
prx.types.listnestedwithbadge = prx.componentsHelper.cloneobject(prx.types.listcomplex);
prx.types.listnestedwithbadge.name = 'listnestedwithbadge';
prx.componentsHelper.removeProperties(prx.types.listnestedwithbadge.propertyGroups, ['valueFont', 'valueSize', 'valueColor', 'valueProperties', 'activeValueColor'])
prx.componentsHelper.removeProperties(prx.types.listnestedwithbadge.dynamicProperties.propertyGroups, ['itemtype', 'value', 'checked']);
prx.types.listnestedwithbadge.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listnestedwithbadge.dynamicProperties.blankItem, ['value', 'checked']);
prx.types.listnestedwithbadge.dynamicProperties.blankItem.itemtype = 'nestedWithBadge';
prx.types.listnestedwithbadge.dynamicProperties.blankItem.buttonicon = {"fileId":"308d48427cd7846bd86b679eabd077ae.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"};
prx.types.listnestedwithbadge.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithbadge.dynamicProperties.propertyGroups, 'itemtype', 'value', 'nestedWithBadge');
prx.types.listnestedwithbadge.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithbadge.dynamicProperties.propertyGroups, 'itemtype', 'hiddenByDefault', true);
prx.types.listnestedwithbadge.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listnestedwithbadge.dynamicProperties.propertyGroups, 'buttonicon', 'hiddenByDefault', false);

/* TYPE = LISTWITHICONANDBADGE */
prx.types.listwithiconandbadge = prx.componentsHelper.cloneobject(prx.types.listnestedwithbadge);
prx.types.listwithiconandbadge.name = 'listwithiconandbadge';
prx.types.listwithiconandbadge.dynamicProperties.blankItem.itemtype = 'withIconAndBadge';
prx.types.listwithiconandbadge.dynamicProperties.blankItem.buttonicon = {"fileId":"","name":"","assetType":"icon","url":""};
prx.types.listwithiconandbadge.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithiconandbadge.dynamicProperties.propertyGroups, 'itemtype', 'value', 'withIconAndBadge');


/* TYPE = LISTWITHBADGE */
prx.types.listwithbadge = prx.componentsHelper.cloneobject(prx.types.listnestedwithbadge);
prx.types.listwithbadge.name = 'listwithbadge';
prx.componentsHelper.removeProperties(prx.types.listwithbadge.propertyGroups, ['iconpos', 'iconSize'])
prx.componentsHelper.removeProperties(prx.types.listwithbadge.dynamicProperties.propertyGroups, ['buttonicon']);
prx.types.listwithbadge.dynamicProperties.blankItem = prx.componentsHelper.removeObjMembers(prx.types.listwithbadge.dynamicProperties.blankItem, ['buttonicon']);
prx.types.listwithbadge.dynamicProperties.blankItem.itemtype = 'withBadge';
prx.types.listwithbadge.dynamicProperties.propertyGroups = prx.componentsHelper.editProperty(prx.types.listwithbadge.dynamicProperties.propertyGroups, 'itemtype', 'value', 'withBadge');


/***** /LIST COMPONENTS *****/

/***** OTHER COMPONENTS *****/
//TYPE: ALERT
prx.types.alert = {
	name: "alert"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';

		var _bg = prx.css.gradient([{c: "rgba(255,255,255,0.4)", p: 0},{c: "rgba(255,255,255,0.3)", p: 15},{c: "rgba(255,255,255,0.2)", p: 20},{c: "transparent", p: 40}]);

		cR += '<div id="' + _id + '" class="box pos type-alert"><div class="alert-inner" style="border-radius: '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px; border: '+prx.componentsHelper.getProp(item.borderWidth,'num-border-width')+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background: '+_bg+';background-color: ' +prx.componentsHelper.getProp(item.backgroundColor,'color-background')+ ';"><span class="alert-title"><span data-editableproperty="title">' + prx.componentsHelper.getProp(item.title,'text') + '</span></span><span class="alert-text changeProperty-text"><span data-editableproperty="text">' + prx.componentsHelper.getProp(item.text,'text') + '</span></span>';
		cR += '<div class="buttons">';
		var _btnWidth = Math.floor(100/item.buttons.length);
		$.each(item.buttons, function(i,elm){
			switch(prx.componentsHelper.getProp(elm.style,'other')) {
			case 'dark':
				_btnBg = prx.css.gradient([{c: "rgba(255,255,255,0.5)", p:0},{c: "rgba(255,255,255,0.3)", p:50},{c: "rgba(255,255,255,0.2)", p:51},{c: "rgba(255,255,255,0.1)", p:100}])
				break;
			case 'light':
			default:
				_btnBg = prx.css.gradient([{c: "rgba(255,255,255,0.9)", p:0},{c: "rgba(255,255,255,0.5)", p:50},{c: "rgba(255,255,255,0.4)", p:51},{c: "rgba(255,255,255,0.2)", p:100}])
				break;
			}
			cR += '<span id="' + _id + '-buttons-'+i+'" style="width: '+_btnWidth+'%;" class="dynamic-property" data-dynamic-property-index="'+i+'"><span class="alert-button-text" style="'+_btnBg+' background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">' + prx.componentsHelper.getProp(elm.text,'text') + '</span></span></span>';
		});
		cR += '</div></div></div>';
		return cR;
	}
	,editableProperties: [
		{
			caption: 'Title'
			,name: 'title'
			,type: 'input'
			,value: function(item,name) {
				return item.title;
			}
			,changeProperty: {
				property: 'text',
				selector: '.alert-title',
				transitionable: false
			}
		}
		,prx.commonproperties.text
	]
	,dynamicProperties: {
        data: 'buttons'
		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
		,addCaption: 'Add button'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: "Button text"
			,style: 'light'
			,actions: []
		}
		,captionProperty: 'text'
		,editableProperties: [
			{
				caption: 'Button text'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.buttons[index].text;
				}
				,changeProperty: {
					property: 'text',
					selector: '.alert-button-text',
					transitionable: false
				}
			}
		 ]
		,interactions: [
			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}

					return item.buttons[index].actions.length;
				}
			}
		]
		,propertyGroups: [
			{
				caption: 'Style',
				properties: [[
					{
						caption: 'Button style'
						,name: 'style'
						,type: 'radio'
						,value: function(item,name,index) {
							return item.buttons[index].style;
						}
						,values: [{ value: 'light', displayValue: 'Light'}, { value: 'dark', displayValue: 'Dark'}]
						,changeProperty: {
							rerender: true
						}
					}
					]]
			}
		]

	}
}

//TYPE: ACTIONSHEET
prx.types.actionsheet = {
	name: "actionsheet"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _bg = prx.css.gradient([{c: "rgba(255,255,255,0.2)", p:0}, {c: "rgba(255,255,255,0.3)", p: 100}])
		var _btnBg = prx.css.gradient([{c: "rgba(255,255,255,0.3)", p:0},{c: "rgba(255,255,255,0.2)", p:50},{c: "rgba(255,255,255,0.1)", p:51},{c: "rgba(255,255,255,0.0)", p:100}])

		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-actionsheet"><div  class="actionsheet-inner liveUpdate-backgroundColor changeProperty-backgroundColor"  style="padding: '+prx.componentsHelper.getProp(item.padding,'num-other')+'px; '+_bg+' background-size: 100% '+20*prx.componentsHelper.getScale(item)+'px; background-repeat: no-repeat; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+';">';
		$.each(item.buttons, function(i,elm){
			cR += '<div id="'+_id+'-buttons-'+i+'" class="dynamic-property actionsheet-button liveUpdate-backgroundColor-'+i+' liveUpdate-textColor-'+i+'" data-dynamic-property-index="'+i+'"  style="'+_btnBg+'; background-color: '+prx.componentsHelper.getProp(elm.backgroundColor,'color-background')+'; color: '+prx.componentsHelper.getProp(elm.textColor,'color-text')+';"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+prx.componentsHelper.getProp(elm.text,'text')+'</span></div>';
		});
		cR +='</div></div>';
		return cR;
	}

	,propertyGroups: [
		{
			caption: 'Style',
			properties: [[
				  prx.commonproperties.backgroundColor
				,{
					caption: 'Padding (px)',
					name: 'padding',
					proptype: 'padding',
					type: 'combo-select',
					value: function(item,name) {
					  return item.padding;
					},
					values: { min: 0, max: 20, step: 2 }
					,changeProperty: {
						caption: 'Padding',
						property: 'padding',
						selector: '.actionsheet-inner',
						transitionable: true
					}
				}
			]]
		}
	]

	,dynamicProperties: {
		data: 'buttons'
		,propertyCaption: 'Buttons'
  		,propertyName: 'Button'
		,addCaption: 'Add button'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,backgroundColor: '333333'
			,textColor: 'FFFFFF'
			,actions: []
		}
		,captionProperty: 'text'

		,editableProperties: [
      			{
      				caption: 'Text'
      				,name: 'text'
      				,type: 'input'
      				,value: function(item,name,index) {
      					return item.buttons[index].text;
      				}
					,changeProperty: {
						property: 'text',
						selector: '.actionsheet-button',
						transitionable: false
					}
      			}
      	]
		,interactions: [
			{
				caption: 'Interactions'
				,name: 'actions'
				,type: 'action'
				,value: function(item,name,index) {
					if (typeof(item.buttons[index].actions) == "undefined") {
						item.buttons[index].actions = [];
					}

					return item.buttons[index].actions.length;
				}
			}
		]
		,propertyGroups: [
          {
        	  caption: 'Style',
        	  properties: [[

				{
					caption: 'Background'
					,name: 'backgroundColor'
					,proptype: 'background-color-2-buttons'
					,type: 'colorpicker'
					,value: function(item,name,index) {
						return item.buttons[index].backgroundColor;
					}
					,liveUpdate: 'background-color'
					,changeProperty: {
						property: 'background-color',
						selector: '.actionsheet-button',
						transitionable: true
					}
				},
				{
					caption: 'Text'
					,name: 'textColor'
					,proptype: 'font-color'
					,type: 'colorpicker'
					,value: function(item,name,index) {
						return item.buttons[index].textColor;
					}
					,liveUpdate: 'color'
					,changeProperty: {
						property: 'color',
						selector: '.actionsheet-button',
						transitionable: true
					}
				}
			]]
          }
		]

	}
}

//TYPE: PROGRESSVIEW
prx.types.progressview = {
	name: 'progressview'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var cR = '';
		cR += '<div id="' + _id + '" class="box pos type-progressview">';
		cR += '<div class="slider-bar liveUpdate-barColor" style="height: 100%; background-color: '+prx.componentsHelper.getProp(item.barColor,'color-background')+';">';
		cR += '<div class="slider-bar-filled liveUpdate-fillBarColor" style="width: '+prx.componentsHelper.getProp(item.progress,'num-percentage')+'%; background-color: '+prx.componentsHelper.getProp(item.fillBarColor,'color-background')+'";></div>'
		cR += '</div></div>';
		return cR;
	}
	,propertyGroups:	[

		{
			caption: 'Style',
	    	properties: [
				[
					{
						caption: 'Complete'
						,name: 'fillBarColor'
						,proptype: 'background-color-2-fill'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.fillBarColor;
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Completed bar color',
							property: 'background-color',
							selector: '.slider-bar-filled',
							transitionable: true
						}
					},{
						caption: 'Remaining'
						,name: 'barColor'
						,proptype: 'background-color'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.barColor;
						}
						,liveUpdate:'background-color'
						,changeProperty: {
							caption: 'Remaining bar color',
							property: 'background-color',
							selector: '.slider-bar',
							transitionable: true
						}
					},

				],[
					{
						caption: 'Default Progress Position (%)'
						,name: 'progress'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.progress;
						}
						,values: { min: 0, max: 100, step: 10 }
						,changeProperty: {
							caption: 'Progress',
							property: 'percent-width',
							selector: '.slider-bar-filled',
							transitionable: true
						}
					}

				]
			]
		}

	]
}


// TYPE: POPOVER
prx.types.popover = {
	name: "popover"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _height, _width, _ttBg, _pos, _height2;

		var _dims = prx.componentsHelper.getRealDims(item,symbol);

		switch (prx.componentsHelper.getProp(item.ttDirection,'other')) {
		case 'top':
		case 'bottom':
			_width = '100%';
			_height = eval(_dims.height - (15*prx.componentsHelper.getScale(item))) + 'px';
			_pos = 'width: '+(35*prx.componentsHelper.getScale(item))+'px; height: '+(15*prx.componentsHelper.getScale(item))+'px; left: ' + eval((_dims.width * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100) - ((35*prx.componentsHelper.getScale(item)) * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100)) + 'px;';
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = eval(_dims.width - (15*prx.componentsHelper.getScale(item))) + 'px';
			_pos = 'width: '+(15*prx.componentsHelper.getScale(item))+'px; height: '+(35*prx.componentsHelper.getScale(item))+'px; top: ' + eval((_dims.height * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100) - ((35*prx.componentsHelper.getScale(item)) * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100)) + 'px;';
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			_pos = 'width: 0px; height: 0px';
			break;
		}
		if(eval(prx.componentsHelper.getProp(item.hasHeader,'boolean'))) {
			if(_height != '100%') {
				_height2 = parseInt(_height) - (35*prx.componentsHelper.getScale(item)) + 'px';
			} else {
				_height2 = _dims.height - (35*prx.componentsHelper.getScale(item)) + 'px';
			}
			var _borderRadius =  prx.css.borderRadius('0 0 ' + prx.componentsHelper.getProp(item.borderRadius,'num-border-radius') + 'px ' +prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px');
		} else {
			_height2 = _height;
			var _borderRadius = prx.css.borderRadius(prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px');
		}

		cR = '<div id="'+_id+'" class="box pos type-popover">'
		cR += '<div style="position: absolute; overflow: hidden; '+prx.componentsHelper.getProp(item.ttDirection,'other')+': 0; '+_pos+'"><div class="liveUpdate-borderColor-background-color popover-tooltip popover-tooltip-'+prx.componentsHelper.getProp(item.ttDirection,'other')+' popover-tooltip-'+((prx.componentsHelper.getProp(item.hasHeader,'boolean')) ? 'with-header' : 'no-header')+'" style="background-color: '+prx.componentsHelper.getProp(item.borderColor,'color-background')+'; '+prx.componentsHelper.getProp(item.ttDirection,'other')+': 0;"></div></div>'
		cR += '<div style="position: absolute; margin-'+prx.componentsHelper.getProp(item.ttDirection,'other')+': '+(15*prx.componentsHelper.getScale(item))+'px; width: '+_width+'; height: '+_height+';">';
		if(eval(prx.componentsHelper.getProp(item.hasHeader,'boolean'))) {
			cR += '<div class="popover-header liveUpdate-borderColor-background-color liveUpdate-textColor" style="line-height: '+(30*prx.componentsHelper.getScale(item))+'px; height: '+(25*prx.componentsHelper.getScale(item))+'px; background-color: '+prx.componentsHelper.getProp(item.borderColor,'color-background')+'; padding: '+(5*prx.componentsHelper.getScale(item))+'px 0; text-align: center;'+prx.componentsHelper.getProp(item.textFont,'font-family')+'; color: '+prx.componentsHelper.getProp(item.textColor,'color-text')+'; font-size: '+prx.componentsHelper.getProp(item.textSize,'num-text-size')+'px; ' + prx.css.borderRadius(prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px '+prx.componentsHelper.getProp(item.borderRadius,'num-border-radius')+'px 0 0') + '"><span data-editableproperty="text">'+prx.componentsHelper.getProp(item.text,'text')+'</span></div>';
		}
		cR += '<div class="popover-content liveUpdate-backgroundColor liveUpdate-borderColor-border-color changeProperty-backgroundColor" style="height: '+_height2+'; '+_borderRadius+' border: '+(5*prx.componentsHelper.getScale(item))+'px solid '+prx.componentsHelper.getProp(item.borderColor,'color-border')+'; background-color: '+prx.componentsHelper.getProp(item.backgroundColor,'color-background')+'"></div>';
		cR += '</div></div>';

		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		var _height, _height2, _width;
		var _dims = prx.componentsHelper.getRealDims(item);

		switch (prx.componentsHelper.getProp(item.ttDirection,'other')) {
		case 'top':
		case 'bottom':
			_width = '100%';
			_height = eval(_dims.height - (15*prx.componentsHelper.getScale(item))) + 'px';
			$("#" + _id + " > div").first().css("left", eval((_dims.width * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100) - ((35*prx.componentsHelper.getScale(item)) * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100)) + 'px')
			break;
		case 'left':
		case 'right':
			_height = '100%';
			_width = eval(_dims.width - (15*prx.componentsHelper.getScale(item))) + 'px';
			$("#" + _id + " > div").first().css("top", eval((_dims.height * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100) - ((35*prx.componentsHelper.getScale(item)) * prx.componentsHelper.getProp(item.ttPosition,'num-other')/100)) + 'px')
			break;
		case 'none':
			_height = '100%';
			_width = '100%';
			break;
		}

		if(eval(prx.componentsHelper.getProp(item.hasHeader,'boolean'))) {
			if(_height != '100%') {
				_height2 = parseInt(_height) - (35*prx.componentsHelper.getScale(item)) + 'px';
			} else {
				_height2 = _dims.height - (35*prx.componentsHelper.getScale(item)) + 'px';
			}
		} else {
			_height2 = _height;
		}

		$("#" + _id + " .popover-content").css({
			width: _width,
			height: _height2
		});

		$("#" + _id + " > div").eq(1).css({
			width: _width,
			height: _height
		})
	}
	,editableProperties: [
		{
			caption: 'Header Text'
			,name: 'text'
			,type: 'input'
			,value: function(item,name) {
				return item.text;
			}
			,hiddenByDefault: function(item,name){
				return (!item.hasHeader);
			}
		}
	]

	,propertyGroups:[
		{
			caption: 'Style',
	    	properties: [
				[
				   prx.commonproperties.backgroundColor
				//]
				,//[
					{
						caption: 'Border',
						name: 'borderColor',
						proptype: 'border-color',
						type: 'colorpicker',
						value: function(item,name) { return item.borderColor; },
						liveUpdate: 'border-color,background-color'
						,changeProperty: {
							caption: 'BorderColor',
							rerender: true
						}
					}
					,{
						caption: '<span class="property-icon property-border-radius" title="Border radius"></span>',
						name: 'borderRadius',
						proptype: 'border-radius',
						type: 'combo-select',
						value: function(item,name) { return item.borderRadius; },
						values: { min: 0, max: 20, step: 1 },
						changeProperty: {
							caption: 'Border radius',
							rerender: true
						}
					}
				],
			]
		},
		{
			caption: 'Arrow',
	    	properties: [
				[
					{
						caption: false
						,name: 'ttDirection'
						,type: 'select'
						,value: function(item,name) {
							return item.ttDirection;
						}
						,values: [{ value: 'top', displayValue: 'Top' }, { value: 'bottom', displayValue: 'Bottom' }, { value: 'left', displayValue: 'Left' }, { value: 'right', displayValue: 'Right' }, { value: 'none', displayValue: 'No tooltip' }]
						,onChange: function(item) {
							if(item.ttDirection == 'none') {
								$('#property-ttPosition').hide();
							} else {
								$('#property-ttPosition').show();
							}
						}
						,changeProperty: {
							caption: 'Arrow direction',
							rerender: true
						}
					},
					{
						caption: 'Position (%)'
						,name: 'ttPosition'
						,type: 'combo-select'
						,value: function(item,name) {
							return item.ttPosition;
						}
						,values: { min: 0, max: 100, step: 5 }
						,hiddenByDefault: function(item){
							return (item.ttDirection == "none")
						}
						,changeProperty: {
							caption: 'Arrow position',
							rerender: true
						}
					}
				]
			]
		},
		{
			caption: 'Header',
			properties: [
				[
					{
						caption: 'Has Header?'
						,name: 'hasHeader'
						,type: 'onoff'
						,value: function(item,name) {
							return item.hasHeader;
						}
						,onChange: function(item) {
							if(item.hasHeader) {
								$('#property-textFont, #property-textColor').show()
							} else {
								$('#property-textFont, #property-textColor').hide()
							}
							return false;
						}
						,changeProperty: {
							caption: 'Header',
							rerender: true
						}
					}
				],[
					{
						caption: false,
						name: 'textFont',
						proptype: 'font-family',
						type: 'select',
						value: function(item,name) { return item.textFont; },
						values: function(){ return prx.comps.fonts },
						hiddenByDefault: function(item){
							return (!item.hasHeader)
						}
						,changeProperty: {
							caption: 'Header text font',
							property: 'font-family',
							selector: '.popover-header',
							transitionable: false
						}
					}
					,{
						caption: false,
						name: 'textColor',
						proptype: 'font-color',
						type: 'colorpicker',
						value: function(item,name) { return item.textColor; },
						liveUpdate: 'color',
						hiddenByDefault: function(item){
							return (!item.hasHeader)
						}
						,changeProperty: {
							caption: 'Header text color',
							property: 'color',
							selector: '.popover-header',
							transitionable: false
						}
					}
				]
			]
		}
	]

};
/***** /OTHER COMPONENTS *****/

/************************************* COMPONENTS (OBJECTS) *************************************/
/***** TOOLBAR COMPONENTS *****/
prx.components.toolbar = {
	name: 'toolbar'
	,type: 'toolbar'
	,lib: _library
	,caption: 'Toolbar'
	,icon: '-400px -80px'
	,helper: prx.url.devices+_path + 'toolbar/helper.png'
	,width:  "full"
	,height: 44*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '6e84a2'
	,overlay: false
}

prx.components.tabbar = {
	name: 'tabbar'
	,type: 'tabbar'
	,lib: _library
	,caption: 'Tab bar'
	,icon: '-640px -80px'
	,helper: prx.url.devices+_path + 'tabbar/helper.png'
	,textColor:  'black'
	,backgroundColor:  'none'
	,width: "full"
	,height: 48*prx.componentsHelper.getScale(_library)
	,vpos: "bottom"
	,tabs: [
	           {
	        	   caption: "Home"
	        	   ,icon: {"fileId":"9228c02c76a35973a75e0a1553c94c25.svg","name":"home.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/caeebe7f3a62939528c6a4ed009de42c.svg","targetSrc":"generated/caeebe7f3a62939528c6a4ed009de42c_666666.svg","color":"666666"}
	           	}
	           ,{
	        	   caption: "Favorites"
        		   ,icon: {"fileId":"14f30c2b833f936542dd33c1e7ce9e7d.svg","name":"star.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/94a90bf9a645dba63ad7a41d18f82ea7.svg","targetSrc":"generated/94a90bf9a645dba63ad7a41d18f82ea7_666666.svg","color":"666666"}
	           }
	           ]
	,selected: 0
	,resizable : true
	,resizeHandles : "e,w"
	,properties: "v,l,hpos,vpos,w,r"
	,overlay: false
	,maskIcons: true
}

prx.components.header = {
	name: 'header'
	,type: 'header'
	,lib: _library
	,caption: 'Header'
	,icon: '-480px -80px'
	,helper: prx.url.devices+_path + 'header/helper.png'
	,width: "full"
	,height: 44*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '6e84a2'
	,text: 'Header'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 20*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: ['bold']
	,overlay: false
}
/***** /TOOLBAR COMPONENTS *****/

/***** BUTTON COMPONENTS *****/
prx.components.button2 = {
	name: 'button2'
	,type: 'button2'
	,lib: _library
	,caption: 'Menu Button'
	,icon: '-720px -80px'
	,helper: prx.url.devices+_path + 'button/helper.png'
	,width: 75*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,text: 'Button'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,shadowColor: '212121'
	,arrowDirection: 'none'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: '416491'
	,borderRadius: 3*prx.componentsHelper.getScale(_library)
	,iconpos: ''
	,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
	,iconSize: 3
}

prx.components.arrowbutton = {
	name: 'arrowbutton'
	,type: 'arrowbutton'
	,lib: _library
	,caption: 'Arrow Button'
	,icon: '-800px -80px'
	,helper: prx.url.devices+_path + 'arrowbutton/helper.png'
	,width: 75*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,text: 'Button'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,shadowColor: '212121'
	,arrowDirection: 'left'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: '416491'
	,borderRadius: 3*prx.componentsHelper.getScale(_library)
	,iconpos: ''
	,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
	,iconSize: 3
}

prx.components.fullwidthbutton = {
	name: 'fullwidthbutton'
	,type: 'fullwidthbutton'
	,lib: _library
	,caption: 'Full Width Button'
	,icon: '0 -160px'
	,helper: prx.url.devices+_path + 'fullwidthbutton/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 45*prx.componentsHelper.getScale(_library)
	,resizable : true
	,text: 'Button 1'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,backgroundColor: '2c333c'
	,borderColor: '333333'
	,textColor: 'FFFFFF'
	,actions: []
}

prx.components.buttongroup = {
	name: 'buttongroup'
	,type: 'buttongroup'
	,lib: _library
	,caption: 'Button Group'
	,icon: '-80px -160px'
	,helper: prx.url.devices+_path + 'buttongroup/helper.png'
	,width: 150*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '4d6687'
	,bgGradient: true
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,textProperties: ["bold"]
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: '416491'
	,borderRadius: 3*prx.componentsHelper.getScale(_library)
	,iconpos: ''
	,iconSize: 3
	,buttons: [
		{
	    	text: 'Button 1',
	    	buttonicon: {"fileId":"","name":"","assetType":"icon","url":""},
			actions: []
	    },
		{
	    	text: 'Button 2',
	    	buttonicon: {"fileId":"","name":"","assetType":"icon","url":""},
			actions: []
	    }
        ]
    ,dynamicSizeExpand: 'h'
}

prx.components.segmentedcontrolplain = {
	name: 'segmentedcontrolplain'
	,type: 'segmentedcontrol'
	,lib: _library
	,caption: 'Segmented Control Plain'
	,icon: '-160px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrol/helper.png'
	,width: 240*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 10*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 17*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '7f7f7f'
	,textProperties: ["bold"]
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'plain'
	,options: [
	   {
		   text: 'Label 1',
		   actions: []
	   },
	   {
		   text: 'Label 2',
	    	   actions: []
	       }
	   ]
	,dynamicSizeExpand: 'h'
}


prx.components.segmentedcontrol = {
	name: 'segmentedcontrol'
	,type: 'segmentedcontrol'
	,lib: _library
	,caption: 'Segmented Control Bordered'
	,icon: '-240px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrol/helper.png'
	,width: 240*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 10*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 17*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '7f7f7f'
	,textProperties: ["bold"]
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bordered'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}


prx.components.segmentedcontrolbar = {
	name: 'segmentedcontrolbar'
	,type: 'segmentedcontrol'
	,lib: _library
	,caption: 'Segmented Control Bar'
	,icon: '-320px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrolbar/helper.png'
	,width: 200*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: '416491'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: 'FFFFFF'
	,textProperties: ["bold"]
	,backgroundColor: '4d6687'
	,activeBackgroundColor: '2f507a'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bar'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}

prx.components.segmentedcontrolbezeled = {
	name: 'segmentedcontrolbezeled'
	,type: 'segmentedcontrol'
	,lib: _library
	,caption: 'Segmented Control Bezeled'
	,icon: '-400px -160px'
	,helper: prx.url.devices+_path + 'segmentedcontrolbezeled/helper.png'
	,width: 200*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 4*prx.componentsHelper.getScale(_library)
	,borderColor: '515d96'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 12*prx.componentsHelper.getScale(_library)
	,textColor: '344d72'
	,textProperties: ["bold"]
	,backgroundColor: 'd0deed'
	,activeBackgroundColor: '738db5'
	,activeTextColor: 'FFFFFF'
	,selected: 0
	,style: 'bezeled'
	,options: [
       {
    	   text: 'Label 1',
    	   actions: []
       },
       {
    	   text: 'Label 2',
        	   actions: []
           }
       ]
    ,dynamicSizeExpand: 'h'
}

prx.components.pagecontroller = {
		name: 'pagecontroller'
		,type: 'pagecontroller'
		,lib: _library
		,caption: 'Page Controller'
		,icon: '-480px -160px'
		,helper: prx.url.devices+_path + 'pagecontroller/helper.png'
		,width: 100*prx.componentsHelper.getScale(_library)
		,height: 20*prx.componentsHelper.getScale(_library)
		,resizable : true
		,buttonColor: '4d4d4d'
		,activeButtonColor: 'ffffff'
		,buttonSize: 8*prx.componentsHelper.getScale(_library)
		,buttonBorderRadius: 10*prx.componentsHelper.getScale(_library)
		,buttonSpacing: 5*prx.componentsHelper.getScale(_library)
		,vertical: false
		,selected: 999
		,buttons: [
	       {
	    	   actions: []
	       },
	       {
        	   actions: []
           }
       ]
	}

/***** /BUTTON COMPONENTS *****/

/***** FORM COMPONENTS *****/
prx.components.label = {
	name: 'label'
	,type: 'label'
	,lib: _library
	,caption: 'Label'
	,icon: '-560px -160px'
	,helper: prx.url.devices+_path + 'label/helper.png'
	,text: 'Label'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  '4c566c'
	,backgroundColor:  'none'
	,width: 200*prx.componentsHelper.getScale(_library)
	,height: 20*prx.componentsHelper.getScale(_library)
	,textProperties: ['bold']
	,textAlign: 'left'
	,enableShadow: true
}

prx.components.textfield = {
	name: 'textfield'
	,type: 'textfield'
	,lib: _library
	,caption: 'Text Field'
	,icon: '-640px -160px'
	,helper: prx.url.devices+_path + 'textfield/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'text'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  '000000'
	,placeholderColor: '999999'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: 'cccccc'
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,textAlign: 'left'
}

prx.components.passwordfield = {
	name: 'passwordfield'
	,type: 'textfield'
	,lib: _library
	,caption: 'Password Field'
	,icon: '-720px -160px'
	,helper: prx.url.devices+_path + 'passwordfield/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'password'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  '000000'
	,placeholderColor: '999999'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: 'cccccc'
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,textAlign: 'left'
}

prx.components.radiobutton = {
	name: 'radiobutton'
	,type: 'radiobutton'
	,lib: _library
	,caption: 'Radio Button'
	,icon: '0 -240px'
	,helper: prx.url.devices+_path + 'radiobutton/helper.png'
	,width: 16*prx.componentsHelper.getScale(_library)
	,height: 16*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: 'cccccc'
	,active: false
	,actAsCheckbox: true
	,checkboxActionsOnActive: []
   	,checkboxActionsOnDeactive: []
}

prx.components.radiolist = {
	name: 'radiolist'
	,type: 'checkboxlist'
	,lib: _library
	,caption: 'Radiobutton List'
	,icon: '-80px -240px'
	,helper: prx.url.devices+_path + 'radiofield/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,inputtype: 'radio'
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,textAlign: 'center'
	,appendCheckmark: false
	,checkmarkicon: {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"}
	,iconpos: 'right'
	,horizontal: false
	,inputtype: 'radio'
	,checkboxes: [
       {
    	   text: 'Radio Button 1',
    	   active: false
       },
       {
    	   text: 'Radio Button 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'v'
}

prx.components.horizontalradiolist = {
	name: 'horizontalradiolist'
	,type: 'checkboxlist'
	,lib: _library
	,caption: 'Horizontal Radio List'
	,icon: '-160px -240px'
	,helper: prx.url.devices+_path + 'horizontalradiolist/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,resizable : true
	,inputtype: 'radio'
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"}
	,iconpos: 'right'
	,horizontal: true
	,inputtype: 'radio'
	,checkboxes: [
       {
    	   text: 'Radio Button 1',
    	   active: false
       },
       {
    	   text: 'Radio Button 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'h'
}

prx.components.checkbox = {
	name: 'checkbox'
	,type: 'checkbox'
	,lib: _library
	,caption: 'Checkbox'
	,icon: '-240px -240px'
	,helper: prx.url.devices+_path + 'checkbox/helper.png'
	,width: 16*prx.componentsHelper.getScale(_library)
	,height: 16*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: 'cccccc'
	,activeColor: 'ffffff'
	,active: false
	,checkboxActionsOnActive: []
   	,checkboxActionsOnDeactive: []
}

prx.components.checkboxlist = {
	name: 'checkboxlist'
	,type: 'checkboxlist'
	,lib: _library
	,caption: 'Checkbox List'
	,icon: '-320px -240px'
	,helper: prx.url.devices+_path + 'checkboxlist/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"}
	,iconpos: 'right'
	,horizontal: false
	,inputtype: 'checkbox'
	,checkboxes: [
       {
    	   text: 'Checkbox 1',
    	   active: false
       },
       {
    	   text: 'Checkbox 2',
    	   active: false
       }
   ]
   ,dynamicSizeExpand: 'v'
}

prx.components.horizontalcheckboxlist = {
	name: 'horizontalcheckboxlist'
	,type: 'checkboxlist'
	,lib: _library
	,caption: 'Horizontal Checkbox List'
	,icon: '-400px -240px'
	,helper: prx.url.devices+_path + 'horizontalcheckboxlist/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 40*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '999999'
	,textAlign: 'center'
	,textProperties: ['bold']
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'ffffff'
	,activeTextColor: '333333'
	,appendCheckmark: false
	,checkmarkicon: {"fileId":"ebdc2ec5f69431fcf7cd33127204f4ff.png","assetType":"gallery","bucketsource":"main","name":" checkmark.png"}
	,iconpos: 'right'
	,horizontal: true
	,inputtype: 'checkbox'
	,checkboxes: [
       {
    	   text: 'Checkbox 1',
    	   active: false
       },
       {
    	   text: 'Checkbox 2',
        	   active: false
           }
       ]
    ,dynamicSizeExpand: 'h'
}


prx.components.flipswitch = {
	name: 'flipswitch'
	,type: 'flipswitch'
	,lib: _library
	,caption: 'Flip Switch'
	,icon: '-480px -240px'
	,helper: prx.url.devices+_path + 'flipswitch/helper.png'
	,width: 90*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,switchColor: 'FFFFFF'
	,activeLabelText: 'ON'
	,activeLabelColor: '6194FD'
	,activeLabelTextColor: 'FFFFFF'
	,inactiveLabelText: 'OFF'
	,inactiveLabelColor: 'FFFFFF'
	,inactiveLabelTextColor: '666666'
	,ios5: false
	,active: true
	,flipswitchActionsOnActive: []
	,flipswitchActionsOnDeactive: []
}

prx.components.flipswitch_ios5 = {
	name: 'flipswitch_ios5'
	,type: 'flipswitch'
	,lib: _library
	,caption: 'iOS5 Flip Switch'
	,icon: '-560px -240px'
	,helper: prx.url.devices+_path + 'flipswitch_ios5/helper.png'
	,width: 90*prx.componentsHelper.getScale(_library)
	,height: 30*prx.componentsHelper.getScale(_library)
	,resizable : true
	,switchColor: 'FFFFFF'
	,activeLabelText: 'ON'
	,activeLabelColor: '1687E2'
	,activeLabelTextColor: 'FFFFFF'
	,inactiveLabelText: 'OFF'
	,inactiveLabelColor: 'FFFFFF'
	,inactiveLabelTextColor: '666666'
	,ios5: true
	,active: true
	,flipswitchActionsOnActive: []
	,flipswitchActionsOnDeactive: []
}
prx.components.textarea = {
	name: 'textarea'
	,type: 'textarea'
	,lib: _library
	,caption: 'Textarea'
	,icon: '-640px -240px'
	,helper: prx.url.devices+ _path + 'textarea/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 150*prx.componentsHelper.getScale(_library)
	,value: ''
	,placeholder: 'Placeholder'
	,backgroundColor: 'ffffff'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textSize: 16*prx.componentsHelper.getScale(_library)
	,textColor:  '999999'
	,placeholderColor: '999999'
	,textProperties: ['bold']
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderColor: 'cccccc'
	,borderRadius: 10*prx.componentsHelper.getScale(_library)
}

prx.components.slider = {
	name: 'slider'
	,type: 'slider'
	,lib: _library
	,caption: 'Slider'
	,icon: '-720px -240px'
	,helper: prx.url.devices+_path + 'slider/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 22*prx.componentsHelper.getScale(_library)
	,resizable : true
	,sliderColor: 'ffffff'
	,sliderSize: 20*prx.componentsHelper.getScale(_library)
	,sliderBorderRadius: 10*prx.componentsHelper.getScale(_library)
	,barColor: 'ffffff'
	,barThickness: 7*prx.componentsHelper.getScale(_library)
	,twoColored: true
	,fillBarColor: '6194FD'
	,sliderPosition: 70
	,vertical: false
	,properties: "v,l,o,hpos,vpos,w,h"
}

prx.components.picker = {
	name: 'picker'
	,type: 'picker'
	,lib: _library
	,caption: 'Picker'
	,icon: '0 -320px'
	,helper: prx.url.devices+_path + 'picker/helper.png'
	,width: "full"
	,height: 150*prx.componentsHelper.getScale(_library)
	,vpos: "bottom"
	,resizable : true
	,containerColor: '05192d'
	,listColor: 'ffffff'
	,textColor: '000000'
	,activeTextColor: '2A3666'
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textProperties: ['bold']
	,showBar: true
	,barColor: '5d6489'
	,values: "Label 1<br />Label 2<br />Label 3<br />Label 4<br />Label 5"
	,selectedValue: 0
}
/***** /FORM COMPONENTS *****/

/***** LIST COMPONENTS *****/
prx.components.listbasic = {
	name: 'listbasic'
	,type: 'listbasic'
	,lib: _library
	,caption: 'Basic List'
	,icon: '-80px -320px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: ''
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'basic'
    	   ,text: 'Label 1'
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''
       },
       {
    	   itemtype: 'basic'
    	   ,text: 'Label 2'
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnested = {
	name: 'listnested'
	,type: 'listnested'
	,lib: _library
	,caption: 'Nested List'
	,icon: '-160px -320px'
	,helper: prx.url.devices+_path + 'listnested/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'nested'
    	   ,text: 'Label 1'
    	   ,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''
       },
       {
    	   itemtype: 'nested'
		   ,text: 'Label 2'
		   ,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithicon = {
	name: 'listwithicon'
	,type: 'listwithicon'
	,lib: _library
	,caption: 'List with Icon'
	,icon: '-240px -320px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textAlign: 'left'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
       {
    	   itemtype: 'withIcon'
    	   ,text: 'Label 1'
    	   ,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''

       },
       {
    	   itemtype: 'withIcon'
    	   ,text: 'Label 2'
    	   ,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
    	   ,actions: []
    	   ,hasThumbnail: false
    	   ,thumbnail: {"fileId":"","name":"","assetType":""}
    	   ,subtitle: ''
       }
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithvalue = {
	name: 'listwithvalue'
	,type: 'listwithvalue'
	,lib: _library
	,caption: 'List with Value'
	,icon: '-320px -320px'
	,helper: prx.url.devices+_path + 'listwithvalue/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 16*prx.componentsHelper.getScale(_library)
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'withValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnestedwithvalue = {
	name: 'listnestedwithvalue'
	,type: 'listnestedwithvalue'
	,lib: _library
	,caption: 'Nested List with Value'
	,icon: '-400px -320px'
	,helper: prx.url.devices+_path + 'listnestedwithvalue/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 16*prx.componentsHelper.getScale(_library)
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithiconandvalue = {
	name: 'listwithiconandvalue'
	,type: 'listwithiconandvalue'
	,lib: _library
	,caption: 'List with Icon and Value'
	,icon: '-480px -320px'
	,helper: prx.url.devices+_path + 'listwithvalue/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
	,textAlign: 'left'
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 16*prx.componentsHelper.getScale(_library)
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194FD'
	,activeTextColor: 'FFFFFF'
	,activeValueColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withIconAndValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,actions: []
			,subtitle: ''
		},
		{
			text: 'Label 2'
			,itemtype: 'withIconAndValue'
			,value: 'Insert value'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,actions: []
			,subtitle: ''
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listwithbadge = {
	name: 'listwithbadge'
	,type: 'listwithbadge'
	,lib: _library
	,caption: 'List with Badge'
	,icon: '-560px -320px'
	,helper: prx.url.devices+_path + 'listwithbadge/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 12*prx.componentsHelper.getScale(_library)
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'withBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'withBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listnestedwithbadge = {
	name: 'listnestedwithbadge'
	,type: 'listnestedwithbadge'
	,lib: _library
	,caption: 'Nested List with Badge'
	,icon: '-640px -320px'
	,helper: prx.url.devices+_path + 'listnestedwithbadge/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 12*prx.componentsHelper.getScale(_library)
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"b821d85ca40ce5ec744f7c97418d2b93.svg","name":"chevron-right.svg","assetType":"icon","bucketsource":"static","url":"f1352971179296/54d11361d17fef026e2d6b2c1a8fe379.svg","targetSrc":"generated/54d11361d17fef026e2d6b2c1a8fe379_999999.svg","color":"999999"}
			,actions: []
			}
	    ]
	    ,dynamicSizeExpand: 'v'
}

prx.components.listwithiconandbadge = {
	name: 'listwithiconandbadge'
	,type: 'listwithiconandbadge'
	,lib: _library
	,caption: 'List with Icon and Badge'
	,icon: '-720px -320px'
	,helper: prx.url.devices+_path + 'listwithbadge/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,badgeSize: 12*prx.componentsHelper.getScale(_library)
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: '6194fd'
	,activeTextColor: 'FFFFFF'
	,activeSubColor: 'FFFFFF'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'nestedWithBadge'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}

prx.components.listcomplex = {
	name: 'listcomplex'
	,type: 'listcomplex'
	,lib: _library
	,caption: 'Complex List'
	,icon: '0 -400px'
	,helper: prx.url.devices+_path + 'listbasic/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 80*prx.componentsHelper.getScale(_library)
	,resizable : true
	,style: 'grouped'
	,borderWidth: 1*prx.componentsHelper.getScale(_library)
	,borderRadius: 5*prx.componentsHelper.getScale(_library)
	,borderColor: 'CCCCCC'
	,textSize: 15*prx.componentsHelper.getScale(_library)
	,textFont: 'sans-serif,Helvetica Neue,Arial'
	,textColor: '333333'
	,textProperties: ['bold']
    ,subSize: 12*prx.componentsHelper.getScale(_library)
	,subFont: 'sans-serif,Helvetica Neue,Arial'
	,subColor: '999999'
	,subProperties: []
    ,valueSize: 16*prx.componentsHelper.getScale(_library)
	,valueFont: 'sans-serif,Helvetica Neue,Arial'
	,valueColor: '39558a'
	,valueProperties: []
    ,badgeSize: 12*prx.componentsHelper.getScale(_library)
	,badgeFont: 'sans-serif,Helvetica Neue,Arial'
	,badgeColor: 'ffffff'
	,badgeProperties: ['bold']
    ,badgeBackgroundColor: '8895B0'
    ,badgeGlassStyle: false
	,textAlign: 'left'
	,backgroundColor: 'FFFFFF'
	,activeBackgroundColor: 'FFFFFF'
	,activeTextColor: '445289'
	,activeSubColor: '445289'
	,activeValueColor: '445289'
	,iconpos: 'right'
	,iconSize: 2
	,listitems: [
		{
			text: 'Label 1'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,checked: true
			,actions: []
		},
		{
			text: 'Label 2'
			,itemtype: 'basic'
			,value: 'Insert value'
			,subtitle: ''
			,badgeText: '1'
			,hasThumbnail: false
			,thumbnail: {"fileId":"","name":"","assetType":""}
			,buttonicon: {"fileId":"","name":"","assetType":"icon","url":""}
			,checked: true
			,actions: []
		}
    ]
    ,dynamicSizeExpand: 'v'
}
/***** /LIST COMPONENTS *****/

/***** OTHER COMPONENTS *****/
prx.components.alert = {
	name: 'alert'
	,type: 'alert'
	,lib: _library
	,caption: 'Alert'
	,icon: '-160px -400px'
	,helper: prx.url.devices+_path + 'alert/helper.png'
	,width: 250*prx.componentsHelper.getScale(_library)
	,height: 150*prx.componentsHelper.getScale(_library)
	,resizable : true
	,backgroundColor: '162344'
	,title: 'Alert Label'
	,text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
	,borderColor: 'CCCCCC'
	,borderWidth: 2*prx.componentsHelper.getScale(_library)
	,borderRadius: 7*prx.componentsHelper.getScale(_library)
	,buttons: [{
			text: 'Cancel'
			,style: 'dark'
		},{
			text: 'Continue'
			,style: 'light'
		}]
}

prx.components.actionsheet = {
	name: 'actionsheet'
	,type: 'actionsheet'
	,lib: _library
	,caption: 'Actionsheet'
	,icon: '-240px -400px'
	,helper: prx.url.devices+_path + 'actionsheet/helper.png'
	,width: 320*prx.componentsHelper.getScale(_library)
	,height: 143*prx.componentsHelper.getScale(_library)
	,vpos: "bottom"
	,resizable : true
	,backgroundColor: '60656f'
	,padding: 16*prx.componentsHelper.getScale(_library)
	,buttons: [{
			text: 'Button 1'
			,backgroundColor: '2c333c'
			,textColor: 'FFFFFF'
			,actions: []
		},
		{
			text: 'Button 2'
			,backgroundColor: 'bf0000'
			,textColor: 'FFFFFF'
			,actions: []
		}]
}

prx.components.progressview = {
	name: 'progressview'
	,type: 'progressview'
	,lib: _library
	,caption: 'Progress View'
	,icon: '-320px -400px'
	,helper: prx.url.devices+_path + 'progressview/helper.png'
	,width: 300*prx.componentsHelper.getScale(_library)
	,height: 5*prx.componentsHelper.getScale(_library)
	,resizable : true
	,barColor: 'ffffff'
	,fillBarColor: '6194FD'
	,progress: 70
}

prx.components.popover = {
	name: 'popover'
	,type: 'popover'
	,lib: _library
	,caption: 'Popover'
	,icon: '-80px -400px'
	,helper: prx.url.devices+_path + 'popover/helper.png'
	,image: prx.url.devices+_path + 'popover/image.png'
	,width: 220*prx.componentsHelper.getScale(_library)
	,height: 350*prx.componentsHelper.getScale(_library)
	,resizable : true
	,borderColor: '091018'
	,backgroundColor: 'none'
	,hasHeader: true
	,text: 'Header'
	,textFont: 'sans-serif'
	,textSize: 20*prx.componentsHelper.getScale(_library)
	,textColor:  'FFFFFF'
	,borderRadius: 10*prx.componentsHelper.getScale(_library)
	,ttDirection: 'top'
	,ttPosition: '5'
};
/***** /OTHER COMPONENTS *****/

// this is a patenta for backwards compatibility to add scale: 2 if we are attaching iphone_retina components
if(!prx.v5x11 && prx.compatibility.responsiveComponents.iphone_retina) {
	for(var component in prx.components) {
		if(prx.components.hasOwnProperty(component)) {
			if(prx.components[component].lib == "iphone") {
				prx.components[component].rscale = 2;
			}
		}
	}
}