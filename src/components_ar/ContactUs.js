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
import { KeyboardAwareView  } from 'react-native-keyboard-aware-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
  ScrollableTab,
  Textarea
} from "native-base";
import ProgressBar from './ProgressBar';

import LinearGradient from 'react-native-linear-gradient';
import TabOne from "./SingleCarTabs/tabOne";
import TabTwo from "./SingleCarTabs/tabTwo";
import TabThree from "./SingleCarTabs/tabThree";
import Swiper from 'react-native-swiper';

export class ContactUs_ar extends  Component <{}> {
	constructor(props) {
		super(props);

		this.state = {
			isLoading : false,
			status : 0,
			zuid : null,
			nameEmpty:false,
			hpEmpty:false,
			msgEmpty:false,
			custEmailError : false,
		};
	}
	async componentDidMount(){
		try{
			
			//alert('checking');
			const zuidInPhone = await AsyncStorage.getItem("zuid");
			this.setState({zuid : zuidInPhone});
		}catch(error){
			console.log(error);
		}
	}
	async validateEmail(email) {
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
		return re.test(String (email).toLowerCase());
	}
	async _contactSend(){
		const custName = this.state.custName;
		const custHP1 = this.state.custHP1;
		const custEmail = this.state.custEmail;
		const msg = this.state.msg;
		var allGood = true;
		var nameEmptyF = false; var hpEmptyF = false; var msgEmptyF = false;var custEmailError= false;
		
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
		if (msg !=='' && msg !== undefined && msg !==null && msg !== 'undefined'){
			;
		}else{
			allGood = false;
			msgEmptyF = true;
		}
		if (custEmail !=='' && custEmail !== undefined && custEmail !==null && custEmail !== 'undefined'){
			if (!await this.validateEmail(custEmail)){
				allGood = false;
				custEmailError = true;
			}
		}
		this.setState({msgEmpty : msgEmptyF , nameEmpty:nameEmptyF , hpEmpty:hpEmptyF, custEmailError:custEmailError });
		
		if (allGood){
			this.setState({isLoading:true});
			const result = await api.sendContactUsMsg(this.state.zuid, custName, custHP1, custEmail, msg, 'AR'  );
			//this.setState({status:result.rs});
			//alert(result);
			if (result.errorMessage!==null && result.errorMessage!==undefined)
				Alert.alert('',result.errorMessage);
			else{
				this.setState({isLoading:false});
				//ToastAndroid.showWithGravity('We have recieved your inquiry, we will contact you soon.\nThank you', ToastAndroid.LONG, ToastAndroid.TOP);
				Alert.alert('لقد تم إستلام أستفسارك, سوف نتصل بك قريبا.\nشكرا لكم');
				
			}
			
		}
		
	}
	
	
	render() {
		
		if (this.state.isLoading){
			return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
		}
		return(
		<ImageBackground style={styles.backgroundImage} source={require('../../img/inner/BG.png')} blurRadius={0} resizeMode = "cover">
		<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} >
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			
					 
			
				<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
					<View style={{flexDirection : "row-reverse" ,height:"12%",marginTop:20,alignItems:"flex-start", paddingLeft:0}}>
						<View style={{flex:2, justifyContent : "flex-start", alignItems:"center"}}>
							<Button	transparent onPress={() => this.props.navigation.goBack()}>
							
								<Text style={{color:"white"}}>رجوع</Text>
									<Image source={require("../../img/inner/backwhite_ar.png")}  style={{ flex:1,
									width: "100%",
									height: "100%",
									resizeMode: 'contain'}}/>
							</Button>
						</View>
						<View style={{flex:4}}/>
						<View style={{flex:2, alignSelf: "flex-end" }}>
							<Image source={require('../../img/inner/logo.png')}
								style={{flex:1,alignSelf: "flex-end",width: "100%",height: "100%",resizeMode: 'contain'}}/>
						</View>
							
					</View>
					<View style={{flex:1,flexDirection : "row-reverse" , justifyContent:"flex-start" , alignItems:"center", flex:1,
							marginLeft:30, marginRight:30 , marginBottom :10}}>
						<Text style={{fontFamily:"Franklin Gothic Book Regular" , fontSize:18, fontWeight:"bold" ,color:"black"}}>
							أتصل بنا:
						</Text>
								
					</View>
					<View style={{flex:6 , marginLeft:30, marginRight:30}}>
					
						<Form style={styles.form}>
							<View style={styles.formRow} >
								
								<Input 
									name = "customerName"
									placeholder = "الإسم" 
									onChangeText={customerName =>this.setState({custName:customerName})}
									style={[styles.textInputStyle,this.state.nameEmpty?styles.error:null]}
								/>
								
							</View>
							<View style={styles.formRow}>
								<Input 
									name = "custHP1" 
									placeholder = "رقم الهاتف"
									onChangeText={custHP1 =>this.setState({custHP1:custHP1})}
									style={[styles.textInputStyle,this.state.hpEmpty?styles.error:null]}
								/>
							</View>
							<View style={styles.formRow}>
								<Input 
									name = "custEmail"
									placeholder = "البريد الإلكتروني"
									onChangeText={custEmail =>this.setState({custEmail:custEmail})}
									style={[styles.textInputStyle,this.state.custEmailError?styles.error:null]}
								/>
							</View>
							<View style={styles.formRow}>
								<Input multiline={true} numberOfLine={5} name = "msg"
									placeholder = "طلبك"
									onChangeText={msg =>this.setState({msg:msg})}
									style={[styles.multiLineInputStyle,this.state.msgEmpty?styles.error:null]}
									bordered  /> 
							</View>
							
							<View style={{flexDirection:"row", justifyContent:"center" , alignItems:"center", flex:1}}>
								<View style={{flex:0.5}} />
								<View style={{flex:2}} >
									<ImageBackground source={require('../../img/inner/send_button.png')}
										style={{flex:1,width: "100%",height: "100%",resizeMode: 'cover'}}>
										<TouchableHighlight onPress={()=> {this._contactSend();}} 
										 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
											<Text style={{color:"white",textAlign:"center",paddingBottom:10}}>أرسل</Text>
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
		form:{flexDirection : "column" , justifyContent:"flex-start" },
		formRow : {flexDirection : "row" , justifyContent:"flex-start" , alignItems:"center", flex:1 },
		textInputStyle :{ height:40 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 , fontSize :12 , paddingTop:10 ,
		lineHeight:10 , borderRadius:7 , marginBottom : 10,textAlign:"right"},
		error : {borderColor: '#d1251a' , borderWidth:1.5},
		labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:13 ,color:"#d1251a" , paddingRight : 10 , marginBottom:10},
		progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		},
		multiLineInputStyle : {height:150 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 , fontSize :10 , paddingTop:10 ,
		lineHeight:10 , borderRadius:7 , marginBottom : 10 , textAlignVertical: "top",textAlign:"right"}
	
		
	}
);