import React , {Component} from 'react';
import {
  Text,View, StyleSheet
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default class OtherTab extends Component <{}>  {
	render(){
		return (
			
				<View style={style.contentContainer}> 
				<ScrollableTabView

					style={{marginTop: 20, }}
					initialPage={1}
					renderTabBar={() => <DefaultTabBar />}
				>
				<Text tabLabel='Tab #1'>My</Text>
				<Text tabLabel='Tab #2'>favorite</Text>
				<Text tabLabel='Tab #3'>project</Text>
				</ScrollableTabView>
				</View>
			
		);
	}
}
const style = StyleSheet.create({
		contentContainer: {
			flex: 1,
			marginTop: 157
		},
	}
)