import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
Text,
ImageBackground,
Image
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body,
  Header,
  Label,
  Input,
  ScrollableTab,
  TabHeading
} from "native-base";

import ServiceCenterTab from './FindUsTabs/ServiceCenterTab';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import ShowRoomTab from './FindUsTabs/ShowRoomTab';
//import * as globalStyles from '../styles/global';
import api from '../api/api.js';


	export  class Centers extends Component <{}> {
		constructor (props){
			super(props)
			this.state = { 
				currentTab: 0 ,
				isLoading : true,
			}
		}
		
	
				
render() {							
	return (
		<ImageBackground style={styles.backgroundImage}
			 source={require('../../img/aftersales/Background.png')} blurRadius={0} resizeMode = "cover">
			<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
				<View style={{flexDirection : "row" ,marginTop:15, flex:1,paddingLeft:0}}>
					<View style={{flex:0.5 }}/>
					<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
						<Button	transparent style={{flex:1}} onPress={() => this.props.navigation.goBack()}>
							<Image source={require("../../img/inner/backen.png")}  
								style={{ flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
						</Button>
					</View>
					<View style={{flex:8 }}/>
					<View style={{flex:1.5 , justifyContent:"flex-end" }}>
						<Image source={require('../../img/inner/logo.png')}
							style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
					</View>
					<View style={{flex:0.5 }}/>	
				</View>
				<View style={{flex:1, marginTop:10 , marginLeft:20 , marginRight:20}}>
					<Text style = {{color:'white', fontSize:20, fontWeight:"700", fontFamily:'Futura Md BT Bold'}}>Find Us</Text>
				</View>
				<View style={{flex:11, marginTop:0 , marginLeft:20 , marginRight:20}}>
					<Tabs 
					tabBarBackgroundColor={'#ffffff'} 
					tabBarUnderlineStyle ={{backgroundColor:"transparent"}}
					style={{borderWidth:0}}
					initialPage={this.state.currentTab} onChangeTab={({ i }) => this.setState({ currentTab: i })}>
						<Tab 
							heading = "Showrooms"
							tabStyle= {styles.inActiveTab} 
							textStyle={{color: '#D3D3D3' , fontSize:13}} 
							activeTabStyle={styles.activeTab}  
							activeTextStyle={{color:"white", fontSize:13}}
							style={{backgroundColor:"transparent",borderLeftColor:"rgb(124, 136, 155)",borderLeftWidth:0}}
						>
							<ShowRoomTab navigation = {this.props.navigation}/>
						</Tab>
						<Tab 
							heading="Service Centers"
							tabStyle= {styles.inActiveTab} 
							textStyle={{color: '#D3D3D3' , fontSize:13}} 
							activeTabStyle={styles.activeTab}  
							activeTextStyle={{color:"white", fontSize:13}}
							style={{backgroundColor:"transparent",borderLeftColor:"rgb(124, 136, 155)",borderLeftWidth:0}}
						>
							<ServiceCenterTab navigation = {this.props.navigation}/>
						</Tab>
					</Tabs>
				</View>
				
				
			</View>
		</ImageBackground>
	);
	}
}


	
	const styles = StyleSheet.create(
		{
			backgroundImage: {flex: 1, width:undefined, height:undefined },
			form:{flexDirection : "column" , justifyContent:"flex-start" },
			formRow : {flexDirection : "row" , justifyContent:"flex-start" , alignItems:"center", flex:1 },
			textInputStyle :{ height:35 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 , fontSize :10 , paddingTop:10 ,
			lineHeight:10 , borderRadius:7 , marginBottom : 10},
			labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:11 ,color:"#d1251a" , paddingRight : 10 , marginBottom:10},
			progressBar: {
				backgroundColor: '#0a0a0a',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			},
			activeTab :{backgroundColor:"rgb(12,19,26)", borderRightColor:"transparent" , 
				borderTopRightRadius:0,paddingLeft:0,paddingRight:0, borderTopLeftRadius:0, borderLeftColor:"rgb(124, 136, 155)",borderLeftWidth:2,
				borderTopWidth:0,borderRightWidth:1},
			inActiveTab : {backgroundColor:'rgb(23, 38, 58)',paddingLeft:0,paddingRight:0,borderColor:"#D3D3D3",borderLeftWidth:0, borderTopLeftRadius:0, 
				borderTopRightRadius:0 , borderTopWidth:0, borderRightWidth:0}
		
	});

	
