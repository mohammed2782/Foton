import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
	Image,
	Linking,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	View,
	StyleSheet,
	ImageBackground,
	TextInput,
	AsyncStorage,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	TouchableHighlight
} from 'react-native';

import api from '../api/api.js';
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
  ScrollableTab
} from "native-base";
import ProgressBar from './ProgressBar';

import { KeyboardAwareView  } from 'react-native-keyboard-aware-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class Register_kr extends  Component <{}> {
	constructor(props) {
		super(props);

		this.state = {
			isLoading : true,
			isRegistered:false,
			updateInfo : false,
			status : 0,
			nameEmpty:false,
			hpEmpty:false,
			vinEmpty:false,
			custEmailError : false,
			custId : null,
			appCallBackFunction : this.props.navigation.state.params.appCallBackFunction,
			appUnregisterCallBackFunction : this.props.navigation.state.params.unRegCallBackFunction,
		};
	}
	_updateRegInfo (){
		this.setState({updateInfo:true});
	}
	async removeCustomerIdFromStorage (){
		try {
			await AsyncStorage.removeItem("custId");
			return true;
		}catch(exception) {
			return false;
		}
	}
	async componentWillMount (){
		await this.getCustomerId();
		await this.getPlayerId();
		let kickout = false;
		if (this.state.custId !=null && this.state.custId !==undefined){
			const customerInfo = await api.getRegisterCustomerInfo(this.state.custId,'KR');
			if (customerInfo != "error_nt"){
				if (customerInfo !== undefined && customerInfo!=null){
					if (customerInfo.vinId !==undefined && customerInfo.vinId !=null){
						kickout = false;
					}else{
						kickout = true;
					}
				}else{
					kickout = true;
				}
			}
			if (kickout){
				await this.removeCustomerIdFromStorage();
				this.state.appUnregisterCallBackFunction();
				await Alert.alert( '',"سڕینه‌وه‌ی تۆمار");
				//return;
			}
			this.setState({model :customerInfo.model});
			this.setState({color :customerInfo.color});
			this.setState({year :customerInfo.year});
			this.setState({custName:customerInfo.custName});
			this.setState({custHP1:customerInfo.custHP1});
			this.setState({custEmail:customerInfo.email});
			this.setState({custVin:customerInfo.vinId});
			this.setState({isRegistered:true});
		}
		this.setState({isLoading:false});
	}
	async _cancelReg(){
		Alert.alert(
		  'سڕینه‌وه‌ی تۆمار',
		  "هدته‌وێ سڕینه‌وه‌ی تۆمارت بکه‌یت؟",
		  [
			{text: 'نةخيَر', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'بةلَىَ', onPress: () => this._confirmedCancel()},
		  ],
		  { cancelable: false }
		);
	}
	async _confirmedCancel(){
		this.setState({isLoading:true});
		try{
			const zuidInPhone = await AsyncStorage.getItem("zuid");
			await api.cancelRegisteration(zuidInPhone, this.state.custId, "KR");
			this.setState({custId : null});
			this.setState({isRegistered:false});
			this.setState({custName:null});
			this.setState({custHP1:null});
			this.setState({custEmail:null});
			this.setState({custVin:null});
			await this.removeCustomerIdFromStorage();
			this.state.appUnregisterCallBackFunction();
			await Alert.alert( '',"سڕینه‌وه‌ی تۆمار");
		}catch(error){
			console.log(error);
		}
		this.setState({isLoading:false});
	}
	
	async validateEmail(email) {
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
		return re.test(String (email).toLowerCase());
	}
	
	async _registerCustomer(){
		let zuid=0;
		let custId=0;
		const custName = this.state.custName;
		const custHP1 = this.state.custHP1;
		const custEmail = this.state.custEmail;
		const custVin = this.state.custVin;
		var allGood = true;
		var nameEmptyF = false; var hpEmptyF = false; var vinEmptyF = false; var custEmailError= false;
		await AsyncStorage.getItem("zuid").then((value) => zuid = value);
		await AsyncStorage.getItem("custId").then((value) => custId = value);
		if (custId !=='' && custId !== undefined && custId !==null && custId != 'undefined'){
			;
		}else{
			custId = 0;
		}
		
		if (custName !=='' && custName !== undefined && custName !==null && custName != 'undefined'){
			;
		}else{
			allGood = false;
			nameEmptyF = true;
		}
		if (custHP1 !=='' && custHP1 !== undefined && custHP1 !==null && custHP1 !=='undefined' ){
			;
		}else{
			allGood = false;
			hpEmptyF = true;
		}
		if (custVin !=='' && custVin !== undefined && custVin !==null && custVin !== 'undefined'){
			;
		}else{
			allGood = false;
			vinEmptyF = true;
		}
		if (custEmail !=='' && custEmail !== undefined && custEmail !==null && custEmail !== 'undefined'){
			if (!await this.validateEmail(custEmail)){
				allGood = false;
				custEmailError = true;
			}
		}
		this.setState({vinEmpty : vinEmptyF , nameEmpty:nameEmptyF , hpEmpty:hpEmptyF, custEmailError:custEmailError });
		if (allGood){
			this.setState({isLoading:true});
			try{
				const result = await api.registerCustomer(zuid,custId, custName, custHP1, custEmail, custVin , this.state.playerid, 'KR'  );
				if (result.errorMessage!==null && result.errorMessage!==undefined)
					alert(result.errorMessage);
				else{
					if (result.custId !=null && result.custId !==undefined){
						this.setState({updateInfo:false});
						const customerInfo = await api.getRegisterCustomerInfo(result.custId,'KR');
						await this.storeRegInfoInDevice(result.custId, customerInfo.custName , customerInfo.custHP1, customerInfo.email);
						this.setState({custId :result.custId});
						this.setState({model :customerInfo.model});
						this.setState({color :customerInfo.color});
						this.setState({year :customerInfo.year});
						this.setState({custName:customerInfo.custName});
						this.setState({custHP1:customerInfo.custHP1});
						this.setState({custEmail:customerInfo.email});
						this.setState({custVin:customerInfo.vinId});
						this.state.appCallBackFunction();
						await Alert.alert("تۆمارکردن","تۆمار کرا");
						this.setState({isRegistered:true});
						this.setState({updateInfo:false});
					}
				}
			}catch(error){
				console.log(error);
			}
		}
		this.setState({isLoading:false});
	}
	
	async storeRegInfoInDevice (custId, custName, custHp1, custEmail){
		console.log("inside async storage");
		try{
			console.log("async before custId");
			if (custId !==undefined)
			await AsyncStorage.setItem("custId", JSON.stringify(custId));
			if (custHp1 !==undefined)
				await AsyncStorage.setItem("custHp1",custHp1);
			if (custName !==undefined)
				await AsyncStorage.setItem("custName",custName);
			if (custEmail !==undefined)
				await AsyncStorage.setItem("custEmail",custEmail);
			console.log("async before fnished");
		}catch(error){
			console.log(error);
		}
	}
	async getCustomerId (){
		const id = null;
		try{
			const id = await AsyncStorage.getItem("custId");
			this.setState({custId:id});
		}catch (error){
			alert(error);
		}
		return id;
	}
	
	async getPlayerId (){
		const pid = null;
		try{
			const pid = await AsyncStorage.getItem("playerid");
			this.setState({playerid:pid});
		}catch (error){
			alert(error);
		}
		return pid;
	}
	render() {
	if (this.state.isLoading){
		return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
									height: "100%",resizeMode: "cover"}}/></View>);
	}
	if(!this.state.isRegistered || this.state.updateInfo){
		return(
		<ImageBackground style={styles.backgroundImage}
			source={require('../../img/inner/regbkg.png')} blurRadius={0} resizeMode = "cover">
			<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} >
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={{flexDirection:"column" , flex:3 , justifyContent:"flex-start"}}>
						<View style={{flexDirection : "row-reverse" ,marginTop:10, flex:2,paddingLeft:0}}>
							<View style={{flex:0.5}}/>
							<View style={{flex:2, justifyContent : "flex-start", alignItems:"center"}}>
								<Button	transparent onPress={() => this.props.navigation.openDrawer()}>
									<Image source={require("../../img/inner/burgerred.png")}  
										style={{flex:1,width: "100%",height: "100%",resizeMode: 'center'}}/>
								</Button>
							</View>
							<View style={{flex:9}}/>
							<View style={{flex:1.5 }}>
								<Image source={require('../../img/inner/logo.png')}
									style={{flex:1,width: "100%",height: "100%",resizeMode: 'stretch'}}/>
							</View>
							<View style={{flex:1}}/>
						</View>
						<View style={{flexDirection : "row-reverse" , justifyContent:"flex-start" , alignItems:"center", flex:1,
								marginLeft:30, marginRight:30 ,marginTop:"10%", marginBottom :20}}>
							{this.state.custId ?
							<Text style={{fontFamily:"Franklin Gothic Book Regular" , fontSize:18, fontWeight:"bold" ,color:"white"}}>
							 ۶بوونه‌وه‌ی زانیاری تۆمارکردن
							</Text>
							:
							<Text style={{fontFamily:"Franklin Gothic Book Regular" , fontSize:18, fontWeight:"bold" ,color:"white"}}>
							۶بوونه‌وه‌ی زانیاری تۆمارکردن !
							</Text>
							}			
						</View>
						<View style={{flex:6 , marginLeft:30, marginRight:30}}>
							<Form style={styles.form}>
								<View style={styles.formRow} >
									
									<Input name = "customerName" value = {this.state.custName}
										placeholder="ناوی کریار"
										placeholderTextColor ="grey"
										onChangeText={customerName =>this.setState({custName:customerName})}
										style={[styles.textInputStyle,this.state.nameEmpty?styles.validationError:null]}/>
									
								</View>
								<View style={{flex:1}}/>
								<View style={styles.formRow}>
								
									<Input name = "custHP1" value = {this.state.custHP1}
										placeholder="ژماره‌ی ته‌له‌فۆن"
										placeholderTextColor ="grey"
										onChangeText={custHP1 =>this.setState({custHP1:custHP1})}									
										style={[styles.textInputStyle,this.state.hpEmpty?styles.validationError:null]}/>
										
								</View>
								<View style={{flex:0.2}}/>
								<View style={styles.formRow}>
								
											<Input name = "custEmail" value = {this.state.custEmail}
											placeholder="ئمێل"
											placeholderTextColor ="grey"
													onChangeText={custEmail =>this.setState({custEmail:custEmail})}
													style={[styles.textInputStyle,this.state.custEmailError?styles.validationError:null]}/>
									
								</View>
								<View style={{flex:0.2}}/>
								<View style={styles.formRow}>
									
									<Input 
										name = "custVin" 
										value = {this.state.custVin}
										placeholder="ژماره‌ی لاشه‌(شاسی)"
										placeholderTextColor ="grey"
										onChangeText={custVin =>this.setState({custVin:custVin})}	
										style={[styles.textInputStyle,this.state.vinEmpty?styles.validationError:null]}
										
									/>
									
								</View>
								<View style={{flex:1}}/>
								<View style={{flexDirection : "row",marginTop:20 , justifyContent:"center" , alignItems:"center", flex:1}}>
									<View style={{flex:0.5}} />
									<View style={{flex:2}} >
										<ImageBackground source={require('../../img/inner/field.png')}
											style={{flex:1,width: "100%",height: "100%",resizeMode: 'cover'}}>
											<TouchableHighlight onPress={()=> {this._registerCustomer();}} 
											 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
												<Text style={{color:"white",textAlign:"center",paddingBottom:7}}>تۆمارکردن</Text>
											</TouchableHighlight>
										</ImageBackground>
									</View>
									<View style={{flex:0.5}} />
								</View>
									
							</Form>
						
						</View>
						
					</View>
				</TouchableWithoutFeedback>
				</KeyboardAwareScrollView>
				</ImageBackground>
			);
		}else{ // if registered
			return(
				<ImageBackground style={styles.backgroundImage}
						 source={require('../../img/inner/regbkg.png')} blurRadius={0} resizeMode = "cover">
					<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
						<View style={{flexDirection : "row-reverse" ,marginTop:20, flex:1,
								paddingLeft:0}}>
								<View style={{flex:0.5}}/>
								<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
									<Button	transparent onPress={() => this.props.navigation.openDrawer()}>
										<Image source={require("../../img/inner/burgerred.png")}  style={{ 
											flex:1,
											width: "100%",
											height: "100%",
											resizeMode: 'contain'}}/>
									</Button>
								</View>
								<View style={{flex:5}}/>
								<View style={{flex:2 , justifyContent:"flex-end" }}>
									<Image source={require('../../img/inner/logo.png')}
										style={{
											flex:1,
											width: "100%",
											height: "100%",
											resizeMode: 'contain'
											}}
									/>
								</View>
									
						</View>
						<View style={{flexDirection : "row-reverse" , justifyContent:"flex-start" , alignItems:"center", flex:1,
								marginLeft:30, marginRight:30 , marginBottom :10}}>
							{this.state.custId ?<Text style={{fontFamily:"Franklin Gothic Book Regular" ,color:"white", 
							fontSize:17, fontWeight:"bold" }}>
								۶بوونه‌وه‌ی زانیاری تۆمارکردن
							</Text>
							:
							<Text style={{fontFamily:"Franklin Gothic Book Regular" , fontSize:16, fontWeight:"bold" ,color:"white"}}>
								۶بوونه‌وه‌ی زانیاری تۆمارکردن !
							</Text>
							}			
						</View>
						
							
						<View style={{flex:8 , marginLeft:30, marginRight:30,}}>
							<View style={{flexDirection:"row-reverse"}} >
								<View>
									<Label style={styles.labelStyle}>
										مۆدەل: 
									</Label>
								</View>
								<View>
									<Text style={{color:"white"}}>
									{this.state.model}
									</Text>
								</View>
							</View>
							<View style={{flexDirection:"row-reverse"}} >
								<View>
									<Label style={styles.labelStyle}>
										ڕەنگ: 
									</Label>
								</View>
								<View>
									<Text style={{color:"white"}}>
									{this.state.color}
									</Text>
								</View>
							</View>
							<View style={{flexDirection:"row-reverse"}} >
								<View>
									<Label style={styles.labelStyle}>
										ساڵ: 
									</Label>
								</View>
								<View>
									<Text style={{color:"white"}}>
									{this.state.year}
									</Text>
								</View>
							</View>
							
								<View style={{flexDirection:"row-reverse"}} >
									<View>
										<Label style={styles.labelStyle}>
											ناوی کریار: 
										</Label>
									</View>
									<View>
										<Text style={{color:"white"}}>
										{this.state.custName}
										</Text>
									</View>
								</View>
								<View style={{flexDirection:"row-reverse"}} >
									<Label style={styles.labelStyle}>
										ژماره‌ی ته‌له‌فۆن:  
									</Label>
									<Text style={{color:"white"}}>
										{this.state.custHP1}
									</Text>
								</View>
								<View style={{flexDirection:"row-reverse"}} >
									<Label style={styles.labelStyle}>
										ئمێل:  
									</Label>
									<Text style={{color:"white"}}>
										{this.state.custEmail}
									</Text>
									
								</View>
								<View style={{flexDirection:"row-reverse"}} >
									<Label style={styles.labelStyle}>
										ژماره‌ی لاشه‌(شاسی):  
									</Label>
									<Text style={{color:"white"}}>
										{this.state.custVin}
									</Text>
								</View>
								
								<View style={{flexDirection : "row-reverse" , justifyContent:"center" , alignItems:"center", flex:1}}>
									<Button iconLeft onPress={()=> {this._updateRegInfo();}}
										style={{backgroundColor:"#2b4c7d", flex:1, margin: 5, marginTop: 10, padding:5 }}>
										<Icon active type="FontAwesome" name="pencil" style={{color: 'white',fontSize:17}} />
										<Text style={{color:"white",fontSize:12,marginRight:5}}>دەگۆڕێت</Text>
									</Button>
									<Button iconLeft onPress={()=> {this._cancelReg();}}
										style={{backgroundColor:"#D3D3D3", flex:2, margin:5, marginTop: 10, padding:5 }}>
										<Icon active type="FontAwesome" name="power-off" style={{color: '#d1251a',fontSize:17}} />
										<Text style={{color:"#d1251a",fontSize:12,marginRight:10}}>سڕینه‌وه‌ی تۆمار</Text>
									</Button>
								</View>
									
							
						
						</View>
						
					</View>
				</ImageBackground>
			);
		}
	}
}
/*
{
"partSerialNo" :"helllo"
}
*/
const styles = StyleSheet.create(
	{
		backgroundImage: {flex: 1, width:undefined, height:undefined },
		form:{flexDirection : "column" , justifyContent:"flex-start",flex:1 },
		formRow : {justifyContent:"center" , alignItems:"center", flex:1,marginTop:10,marginBottom:10 },
		textInputStyle :{ width:"100%",height:40 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 , fontSize :12 , paddingTop:10 ,
			lineHeight:10 , borderRadius:7 , marginBottom : 10,textAlign:"center"},
		validationError : {borderColor: '#d1251a' , borderWidth:1.5},
		labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:13 ,color:"#e2e1d9" , paddingLeft : 10 , marginBottom:10},
		progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
		
	}
);