import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {ImageBackground} from "react-native";
import {
TabBarIOS,
Text,
View,
Image,
StyleSheet,
Animated,
AsyncStorage,
Linking,
Alert
} from 'react-native';
//import NewsFeed from './NewsFeed';
import {BaicHeader} from './BaicHeader';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator, DrawerNavigator } from "react-navigation";
import OneSignal from 'react-native-onesignal';
import {
  Container,
  Header,
  Title,Badge,
  Fab,
  Button,
  IconNB,
  Left,
  Right,
  Body,
  Icon,
  Content,
  ListItem,
  Input,
} from "native-base";
import { Grid, Row ,Col} from "react-native-easy-grid";

/*
to get the device info
*/
import DeviceInfo from 'react-native-device-info';
import api from '../api/api.js';
	export class HomeScreen_kr extends Component <{}> {
		constructor(props) {
			super(props);
			this.state = {
				active: false,
				zuserid : null,
				shouldChangeOil : false,
				showOilInput : true,
			};
		}
		async componentWillReceiveProps () {
			await this._prepareData();				
		}
		
		async componentDidMount(){
			await this._prepareData();
		}
		
		async _prepareData(){
			OneSignal.addEventListener('opened', this.onOpened.bind(this));
			OneSignal.addEventListener('ids', this.onIds.bind(this));
			//OneSignal.configure();
			
			//await this._methodToReloadOnOilPopUpClose();
			try{
					//alert('checking');
					let zuid = 0;
					let playerid ;
					let savedplayeridinserver =0 ;
					let mobileLang = "";
					await AsyncStorage.getItem("zuid").then((value) => zuid = value);
					await AsyncStorage.getItem("playerid").then((value) => playerid = value);
					await AsyncStorage.getItem("savedplayeridinserver").then((value) => savedplayeridinserver = value);
					await AsyncStorage.getItem("mobileLang").then((value) => mobileLang = value);
					//alert("lang is--->"+mobileLang);
					//alert("in storage playerid=>"+playerid+",savedplayeridinserver=>"+savedplayeridinserver);
					if (zuid ==null){
						//alert('not found');
						const deviceID = DeviceInfo.getUniqueID();
						const maker = DeviceInfo.getManufacturer();
						const os = DeviceInfo.getSystemName();
						const model = DeviceInfo.getModel();
						// set zuid when null
						zuid = await api.addAppUser(deviceID, maker, os , model, 'KR');
						//alert('after fetching->'+zuid);
						await AsyncStorage.setItem("zuid", JSON.stringify(zuid));
						
					}
					if (playerid !=null)
						if (savedplayeridinserver == null || savedplayeridinserver ==0){
							zpid = await api.addAppPlayerId(playerid, zuid);
							//console.log("zpid----"+zpid);
							if (zpid >0)
								await AsyncStorage.setItem("savedplayeridinserver", JSON.stringify(zpid));
							//alert('after fetching->'+playerid);
						}
					changeOil = await api.checkOilShouldChange(zuid , 'KR');
					insertMileage = await api.checkShouldInsertNewMileage('KR',zuid);
					
					this.setState({zuserid : zuid , shouldChangeOil:changeOil.shouldChangeOil,shouldInsertMileage:insertMileage.shouldInsetMileage});
					
					if (insertMileage.shouldInsetMileage){
						Alert.alert('',"لقد مرت فتره منذ أن أدخلت أخر قيمه لعداد السياره");
						this.props.navigation.navigate("Maintenance_ar");
						return ;
					}
				
				}catch(error){
					Alert.alert("هەڵە پەيوەندى ببەستە");
					console.log(error);
			}
		}
		async componentWillMount(){
			
			
		}
		
		onOpened(openResult) {
			let routeScreen = openResult.notification.payload.additionalData.screenname;
			//console.log('Message: ', openResult.notification.payload.body);
			console.log('Data: ', openResult.notification.payload.additionalData);
			//console.log('isActive: ', openResult.notification.isAppInFocus);
			console.log('inside home openResult: ', openResult.notification.payload.additionalData.screenname);
			if (routeScreen =='PROMO'){
				this.props.navigation.navigate("Promotions_kr");
			}else if(routeScreen =='NORMAL_NOTIFICATION'){
				this.props.navigation.navigate("ShortNews_kr");
			}else if(routeScreen =='SPECIALPROMO'){
				this.props.navigation.navigate("SpecialPromotions_kr");
			}
		
		}
		componentDidUnmount() {
			//OneSignal.removeEventListener('received', this.onReceived);
			OneSignal.removeEventListener('opened', this.onOpened);
			OneSignal.removeEventListener('ids', this.onIds);
		
		}
		
		async onIds(device) {
			console.log('Device info: ', device);
			//alert('Device info: '+ device);
			this.setState({playerid:device.userId});
			await this.saveOneSignalPlayerId();
		}
	
		async  saveOneSignalPlayerId (){
			try{
				let currentPlayerId=null;
				await AsyncStorage.getItem("playerid").then((value) => currentPlayerId = value);
				if (currentPlayerId ==null)
					await AsyncStorage.setItem("playerid",this.state.playerid);
				else{
					if (currentPlayerId !=this.state.playerid)
						await AsyncStorage.setItem("playerid",this.state.playerid);
				}
			}catch (error){
				alert(error);
			}
		}
		
		 _methodToReloadOnOilPopUpClose = async ()=>{
			
			const changeOil = await api.checkOilShouldChange(this.state.zuserid , 'KR');
			 //alert ("called=>"+changeOil.shouldChangeOil);
			this.setState({shouldChangeOil:changeOil.shouldChangeOil});
			//alert("called");
		}
		checkOil(){
			var x =<View style={{flex:1}}/>;
			if (this.state.shouldChangeOil){
				
					return (<View style={{flex:1}}><Button	transparent style={{flex:1}} 
					onPress={() => this.props.navigation.navigate("OilPopUp_kr",{callBackMethod: this._methodToReloadOnOilPopUpClose})}>
								<Image source={require("../../img/oil1orange.gif")}  
								style={{ 
									flex:1,
									width: "160%",
									height: "160%",
									resizeMode: 'contain'}}/>
							</Button></View>);
				
			}
			return (x);
		}
		_pressCall=()=>{
			const url='tel://6677'
			Linking.openURL(url)
		}	
		render() {
		return (
		<ImageBackground style={styles.backgroundImage}
			 source={require('../../img/landingpage/BG.jpg')} blurRadius={0} resizeMode = "cover">
			<View style={{flexDirection : "column",justifyContent:"space-around" , flex:1 }}>
				<View style={{flex:0.3 }}/>
				<View style={{flexDirection : "row-reverse",justifyContent:"center" , flex:2 }}>
					
					<View style={{flex:1}}>
						<Button	transparent onPress={() => this.props.navigation.openDrawer()}>
							<Image source={require("../../img/burgermenu.png")}  style={{ paddingTop:0,width:"100%",height:"100%",resizeMode: 'center'}}/>
						</Button>
					</View>
					<View style={{flex:3}}>
						<Image source={require("../../img/landingpage/logo_txt.png")}  style={{ paddingTop:0,width:"100%",height:"100%",resizeMode: 'contain'}}/>
					</View>
					<View  style={{flex:1}}>
						{this.checkOil()}
					</View>
					
				</View>
				
				<View style={{flex:1,flexDirection:"row",alignItems:"flex-start",
					justifyContent:"flex-start"}}>
					<View style={{flex:4}}/>
					
				</View>
				<View style={{flexDirection : "row" , justifyContent:"flex-start" , flex:2, marginLeft:0,}}>
					<View style={{flex:2.3}}>	
						<Button block onPress={this._pressCall}>
							<View style = {styles.ViewTextAction,{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
								<Image source={require("../../img/callus.png")}  
								style={{ marginLeft:0,width:30,height: 23,resizeMode: 'contain'}}/>								
								<Text style={{color:"#fff", fontFamily:"Futura Bk BT Book",fontSize:12, paddingLeft:5, paddingRight:0}}>
								ان پێ بکه‌ن ئیستا
								</Text>
							</View>
						</Button>
					</View>
					<View style={{flex:4.5}}/>
				</View>
				
				<View style={{flex:1}}/>
				<View style={{flex:6 ,marginRight:20 }}>
					<ListItem button noBorder style = {styles.ListItemStyle} onPress={() => this.props.navigation.navigate("Products_kr")}>
						<View style = {styles.ViewTextAction}>
							<Image source={require("../../img/poducts.png")} style={{ paddingTop:0,width: 50,height: 50,resizeMode: 'contain'}}/>
							<LinearGradient colors={["transparent","#090f17"]} start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}} locations={[0.0, 1.0]}	style={styles.linearGradient}>
								<Text style={styles.text}>
									به‌رهه‌مه‌کان
								</Text>
							</LinearGradient>
						</View>
					</ListItem>
					<ListItem button noBorder style = {styles.ListItemStyle} onPress={() => this.props.navigation.navigate("Parts_kr")}>
						<View style = {styles.ViewTextAction}>
							<Image source={require("../../img/aftersale.png")}  style={{ paddingTop:0,width: 50,height: 50,resizeMode: 'contain'}}/>
							<LinearGradient colors={["transparent","#090f17"]} start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}} locations={[0.0, 1.0]}	style={styles.linearGradient}>
								<Text style={styles.text}>
									خزمه‌تگوزاری
								</Text>
							</LinearGradient>
						</View>
					</ListItem>
					<ListItem button noBorder style = {styles.ListItemStyle} onPress={() => this.props.navigation.navigate("Centers_kr")}>
						<View style = {styles.ViewTextAction}>
							<Image source={require("../../img/findus.png")}  style={{ paddingTop:0, width: 50,height: 50,resizeMode: 'contain'}}/>
							<LinearGradient colors={["transparent","#090f17"]} start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}} locations={[0.0, 1.0]}	style={styles.linearGradient}>
								<Text style={styles.text}>
								ناونیشانه‌کانمان
								</Text>
							</LinearGradient>
						</View>
					</ListItem>
					<ListItem button noBorder style = {styles.ListItemStyle} onPress = {()=> this.props.navigation.navigate("ContactUs_kr")} >
						<View style = {styles.ViewTextAction}>
							<Image source={require("../../img/contactus.png")}  style={{ paddingTop:0,width: 50,height: 50,resizeMode: 'contain'}}/>
							<LinearGradient colors={["transparent","#090f17"]} start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}} locations={[0.0, 1.0]}	style={styles.linearGradient}>
								<Text style={styles.text}>
								په‌یوه‌ندی کردن پیمان
								</Text>
							</LinearGradient>
						</View>
					</ListItem>
					<ListItem button noBorder style = {styles.ListItemStyle} onPress = {()=> this.props.navigation.navigate("AboutUs_kr")}>
						<View style = {styles.ViewTextAction}>
							<Image source={require("../../img/aboutus.png")}  style={{ paddingTop:0,width: 50, height: 50, resizeMode: 'contain'}}/>
							<LinearGradient colors={["transparent","#090f17"]} start={{x:0.0, y:0.5}} end={{x:1.0, y:0.5}} locations={[0.0, 1.0]}	style={styles.linearGradient}>
								<Text style={styles.text}>
									ده‌رباره‌ی کۆمپانیا
								</Text>
							</LinearGradient>
						</View>
					</ListItem>
				</View>
				<View style={{flex:1,flexDirection:"row" , alignItems :"flex-end"}}>
					<View style={{flex:1}}/>
					<View style={{backgroundColor :"#d1251a" , borderTopLeftRadius:10, borderTopRightRadius:10}}/>
					<View style={{flex:1}}/>
				</View>
			</View>		
		</ImageBackground>
		);
	}
}
const styles = StyleSheet.create({
	MainContainer :{flex:1},
	
	backgroundImage: {flex: 1, width:undefined, height:undefined },
	
	logoview:{ flex: 1, alignItems:"flex-end", paddingTop:10},
	
	text: { fontSize: 14,fontFamily:"Futura Md BT Bold", color : "#FFF", marginBottom:10, marginTop:13,fontWeight: 'bold',
	alignItems:'flex-end',textAlign:"right", paddingRight:45},
	
	mb15: { marginBottom: 12, backgroundColor: "#FF8C00" ,position: "relative"},
	
	/*Home : {flexDirection : "row", flex:1 , alignItems:'flex-start' , justifyContent:'flex-start'},*/
	
	HomeActionsLeft:{ flex:1, flexDirection:"column",paddingLeft:0,paddingRight:0, marginTop :10 , height:"100%" },
	
	ListItemStyle:{marginLeft:0,paddingTop:0,paddingBottom:0, paddingLeft:0,paddingRight:0, marginBottom:5 },
	
	ViewTextAction:{paddingLeft:0,paddingRight:0, flexDirection:"row-reverse", },
	linearGradient:{flex: 1,
					paddingLeft: 15,
					paddingRight: 0,
					borderRadius: 5,
					marginRight:-25,
					 zIndex: -1 
					}
});