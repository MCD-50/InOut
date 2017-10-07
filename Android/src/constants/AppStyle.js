//import from system
import { StyleSheet } from 'react-native';


//import from app
import { TOOLBAR_HEIGHT, MARGIN_10, MARGIN_5, SIDEMARGIN, UPDOWNMARGIN, PRICOLOR } from './AppConstant.js'

export const uiTheme = {
	toolbar: {
		container: {
			height: TOOLBAR_HEIGHT,
		},
	},
};

export const style = StyleSheet.create({
	container_with_flex_1: {
		flex: 1,
	},
	
	small_image_80_height_and_width: {
		width: 80,
		height: 80,
		alignItems: 'center',
		justifyContent: 'center'
	},
	content_padding: {
		paddingLeft: MARGIN_10,
		paddingRight: MARGIN_10
	},
	splash_page_render_outer_view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black'
	},
	splash_page_footer_touchable_opacity: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		paddingBottom: 5,
		paddingTop: 5
	},
	splash_page_footer_outer_view: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},
	splash_page_footer_text: {
		color: 'white',
		fontSize: 16
	},
	view_with_flex_1_and_margin_all_sides: {
		flex: 1,
		marginLeft: MARGIN_10,
		marginRight: MARGIN_10,
		marginTop: MARGIN_5,
		marginBottom: MARGIN_5,
	},
	text_with_flex_1_and_font_size_17_centered: {
		flex: 1,
		color: 'white',
		fontSize: 17,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text_with_margin_bottom_and_font_size_19: {
		color: 'white',
		fontSize: 19,
		marginBottom: 5
	},
	text_with_margin_bottom_and_font_size_14: {
		color: 'white',
		fontSize: 14,
		marginBottom: 5
	},
	text_with_black_color_and_font_size_17: {
		color: 'black',
		fontSize: 17,
	},
	text_with_black_color_and_font_size_15: {
		color: 'black',
		fontSize: 15,
	},
	text_with_black_color_and_font_size_13: {
		color: 'black',
		fontSize: 13,
	},
	text_with_gray_color_and_font_size_14: {
		color: '#b2b2b2',
		fontSize: 17,
	},
	text_input_standard_style: {
		color: 'black',
		fontSize: 17,
		borderWidth: 1.2,
		borderColor: 'transparent',
		backgroundColor: 'white',
		borderRadius: 3,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10
	},
	background_image_resize_mode_cover: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover'
	},
	progress_ring_centered_view: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	align_center_justify_center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	align_end_justify_end: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	avatar_base: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: MARGIN_5,
		marginBottom: MARGIN_5
	},
	new_group_page_text_input: {
		flex: 1,
		borderRadius: 3,
		paddingLeft: 5,
		paddingRight: 5,
		alignItems: 'center',
		marginBottom: 5,
		flexDirection: 'row'
	},
	row_back_swipe_list_view: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	back_right_holder_swipe_list_view: {
		alignItems: 'flex-start',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		paddingLeft: 15,
		width: 120
	},
	back_right_button_swipe_list_view: {
		backgroundColor: '#ebb510',
		marginTop: 0,
		marginBottom: 1,
		right: 0
	},
	back_left_holder_swipe_list_view: {
		alignItems: 'flex-end',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		paddingRight: 15,
		width: 120
	},
	back_left_button_swipe_list_view: {
		backgroundColor: '#0eb244',
		marginTop: 0,
		marginBottom: 1,
		left: 0
	},
	send_ui_container: {
		justifyContent: 'flex-end',
		height: 51,
	},
	send_ui_icon: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	translucent_toolbar_view: {
		flex: 1,
		marginLeft: 15,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	
	splash_screen_view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black'
	},
	splash_screen_image: {
		width: 150,
		height: 150,
		alignItems: 'center',
		justifyContent: 'center'
	},


	main_page_list_item_container: {
		flex: 1,
		marginLeft: SIDEMARGIN,
		marginRight: SIDEMARGIN,
		padding: UPDOWNMARGIN,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	main_page_header_text: {
		fontSize: 17,
		fontWeight: '400',
		color: 'black',
	},
	main_page_description_text: {
		marginTop: 2,
		fontSize: 14,
		fontWeight: 'normal',
		color: '#757575'
	},
	main_page_footer_text: {
		marginTop: 2,
		fontSize: 14,
		fontWeight: 'normal',
		color: '#757575'
	},


	edit_page_rich_text_editor: {
		alignItems: "flex-start",
		justifyContent: "flex-start",
		backgroundColor: "transparent",
		marginTop: UPDOWNMARGIN,
		marginLeft: SIDEMARGIN,
		marginRight: SIDEMARGIN
	},
	edit_page_touchable_opacity: {
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center"
	},
	edit_page_rich_text_toolbar: {
		backgroundColor: "#ffffff",
		alignItems: "flex-start",
	},


	setting_page_inside_card_view: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: UPDOWNMARGIN,
	},
	setting_page_text: {
		fontSize: 17,
		color: 'black',
		padding: UPDOWNMARGIN,
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	setting_page_switch: {
		marginLeft: 10,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	},

	text_with_margin_bottom_and_font_size_14: {
		color: 'white',
		fontSize: 14,
		marginBottom: 5
	},
	row_back_swipe_list_view: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	back_right_holder_swipe_list_view: {
		alignItems: 'flex-start',
		bottom: 4,
		justifyContent: 'center',
		position: 'absolute',
		top: 4,
		paddingLeft: 15,
		width: 120
	},
	back_right_button_swipe_list_view: {
		backgroundColor: PRICOLOR,
		marginTop: 0,
		marginBottom: 0,
		right: 0
	},
	back_left_holder_swipe_list_view: {
		alignItems: 'flex-end',
		bottom: 4,
		justifyContent: 'center',
		position: 'absolute',
		top: 4,
		paddingRight: 15,
		width: 120
	},
	back_left_button_swipe_list_view: {
		backgroundColor: '#0eb244',
		marginTop: 0,
		marginBottom: 0,
		left: 0
	},
	swipeCard:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 300,
	}
});



