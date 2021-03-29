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
  ScrollableTab
} from "native-base";
import ProgressBar from './ProgressBar';

export class GetPromotionInfo_kr extends  Component <{}> {
	constructor(props) {
		super(props);

		this.state = {
			isLoading : false,
			status : 0,
			nameEmpty:false,
			hpEmpty:false,
			custEmailError : false,
			promoId : this.props.navigation.state.params.promoId,
		};
	}
	async componentDidMount (){
		await this.loadCustomerPromoInfo();
		
	}
	async validateEmail(email) {
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
		return re.test(String (email).toLowerCase());
	}
	
	async _setCustomerInfoForPromotion(){
		const custName = this.state.custName;
		const custHP1 = this.state.custHP1;
		const custEmail = this.state.custEmail;
		
		var allGood = true;
		var nameEmptyF = false; var hpEmptyF = false; var custEmailError= false;
		
		
		
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
		if (custEmail !=='' && custEmail !== undefined && custEmail !==null && custEmail !== 'undefined'){
			if (!await this.validateEmail(custEmail)){
				allGood = false;
				custEmailError = true;
			}
		}
		this.setState({ nameEmpty:nameEmptyF , hpEmpty:hpEmptyF ,custEmailError:custEmailError});
		
		if (allGood){
			await this.storeCustomerInfoInDevice (custName, custHP1, custEmail);
			this.setState({isLoading:true});
			const result = await api.registerForPromotion(this.state.promoId, custName, custHP1, custEmail );
			//this.setState({status:result.rs});
			//alert(result);
			if (result.errorMessage!==null && result.errorMessage!==undefined){
				//alert(result.errorMessage);
				//alert("error");
			}else{
				Alert.alert('داواكاريه‌ كه‌ت وه‌رگیرا');
			}
			this.setState({isLoading:false});
		}
	}
	
	
	async loadCustomerPromoInfo (){
		const id = null;
		try{
			let custNamePromo = await AsyncStorage.getItem("custName");
			let custHPpromo = await AsyncStorage.getItem("custHp1");
			let custEmailPromo = await AsyncStorage.getItem("custEmail");
			if (custNamePromo !=='' && custNamePromo !== undefined && custNamePromo !==null && custNamePromo !== 'undefined'){
				;
			}else{
				custNamePromo = await AsyncStorage.getItem("custNamePromo");
			}
			
			if (custHPpromo !=='' && custHPpromo !== undefined && custHPpromo !==null && custHPpromo !== 'undefined'){
			;
			}else{
				custHPpromo = await AsyncStorage.getItem("custHpPromo");
			}
			
			if (custEmailPromo !=='' && custEmailPromo !== undefined && custEmailPromo !==null && custEmailPromo !== 'undefined'){
			;
			}else{
				custEmailPromo = await AsyncStorage.getItem("custEmailPromo");
			}
			
			this.setState({custName:custNamePromo, custHP1 : custHPpromo, custEmail : custEmailPromo});
			
		}catch (error){
			alert(error);
		}
		return id;
	}
	async storeCustomerInfoInDevice (custName , custHp, custEmail){
		try{
			await AsyncStorage.setItem("custNamePromo",custName);
			await AsyncStorage.setItem("custHpPromo",custHp);
			await AsyncStorage.setItem("custEmailPromo",custEmail);
		}catch(error){
			alert(error);
		}
	}
	
	render() {
		//alert(this.state.promoId);
		if (this.state.isLoading){
			return (<View style={styles.progressBar}><ProgressBar /></View>);
		}
		return(
			<ImageBackground style={styles.backgroundImage}
					 source={require('../../img/inner/regbkg.png')} blurRadius={0} resizeMode = "cover">
				<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"} >
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={{flexDirection:"column" , flex:1.4 , justifyContent:"flex-start"}}>
					<View style={{flexDirection : "row-reverse" ,marginTop:20, flex:2,
							paddingLeft:0}}>
							<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
								<Button	transparent onPress={() => this.props.navigation.goBack()}>
									<Image source={require("../../img/inner/backar.png")}  style={{ 
										flex:1,
										width: "100%",
										height: "100%",
										resizeMode: 'contain'}}/>
								</Button>
							</View>
							<View style={{flex:1}}/>
							<View style={{flex:1 , justifyContent:"flex-end" }}>
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
					<View style={{flex:2}}/>
					<View style={{flexDirection : "row" , justifyContent:"flex-start" , alignItems:"center", flex:1,
							marginLeft:30, marginRight:30 , marginBottom :20,marginTop:20}}>
						<Text style={{fontFamily:"Franklin Gothic Book Regular" , fontSize:15, fontWeight:"bold" ,color:"white"}}>
							وه‌رکرتنی ئۆفه‌ر : {this.props.navigation.state.params.promoCode}
						</Text>
								
					</View>
					<View style={{flex:6 , marginLeft:30, marginRight:30}}>
					
						<Form style={styles.form}>
							<View style={styles.formRow} >
								<Label style={styles.labelStyle}>
									ناوی کریار:   
								</Label>
								<ScrollView 
									  scrollEnabled={false}
									>
								<Input 
									name = "customerName" 
									onChangeText={customerName =>this.setState({custName:customerName})}
									value = {this.state.custName}
									style={[styles.textInputStyle,this.state.nameEmpty?styles.validationError:null]}
								/>
								</ScrollView>
							</View>
							<View style={styles.formRow}>
								<Label style={styles.labelStyle}>
									ژماره‌ی ته‌له‌فۆن:  
								</Label>
								<Input keyboardType={'numeric'}
									name = "custHP1" 
									value = {this.state.custHP1}
									onChangeText={custHP1 =>this.setState({custHP1:custHP1})}
									style={[styles.textInputStyle,this.state.hpEmpty?styles.validationError:null]}
								/>
							</View>
							<View style={styles.formRow}>
								<Label style={styles.labelStyle}>
									ئمێل:   
								</Label>
								<Input keyboardType={'email-address'}
									name = "custEmail" 
									value = {this.state.custEmail}
									onChangeText={custEmail =>this.setState({custEmail:custEmail})}
									
									style={[styles.textInputStyle,this.state.custEmailError?styles.validationError:null]}
								/>
							</View>
							<View style={{flexDirection : "row",marginTop:20 , justifyContent:"center" , alignItems:"center", flex:1}}>
								<ImageBackground source={require('../../img/mileage/button.png')}
									style={{flex:1,width: "100%",height: "100%"}} resizeMode='contain'>
									<TouchableHighlight onPress={()=> {this._setCustomerInfoForPromotion();}}
									 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
										<Text style={{fontSize:16,color:"white",textAlign:"center",padding:10,}}>وه‌رکرتنی ئۆفه‌ر</Text>
									</TouchableHighlight>
								</ImageBackground>
								
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
		formRow : {flexDirection : "row-reverse" , justifyContent:"flex-start" , alignItems:"center", flex:1 },
		textInputStyle :{ height:35,textAlign:"right" ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 , fontSize :12 , paddingTop:10 ,
		lineHeight:10 , borderRadius:7 , marginBottom : 10},
		labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:13 ,color:"white" , paddingLeft : 10 , marginBottom:10},
		validationError : {borderColor: '#d1251a' , borderWidth:1.5},
		progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
		
	}
);