import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
AsyncStorage,
ScrollView,
KeyboardAvoidingView,
TouchableWithoutFeedback,
Keyboard,
Alert,
TouchableHighlight
} from 'react-native';

import { KeyboardAwareView  } from 'react-native-keyboard-aware-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import * as globalStyles from '../../styles/global';
import api from '../../api/api.js';
import { Grid, Row ,Col} from "react-native-easy-grid";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Form,
  Label,
  Input,
  
} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
export class Maintenance extends Component <{}> {
	_isMounted = false;
	constructor (props){
		super(props);
		//alert("this is const");
		this.state ={
			custId : null,
			isLoading : true,
			lastMileage :0,
			lastOilChange:0,
			zuid : null,
			//callBackMethod : this.props.navigation.getParam("callBackMethod"),
			validMileage : true,
		}
	}
	
	
	async componentWillReceiveProps () {
		await this._prepareData();				
	}
	async componentDidMount(){
		await this._prepareData();
	}
	async _prepareData(){
		this._isMounted = true;
		try{
			this.setState({isLoading:true});
			const zuidInPhone = await AsyncStorage.getItem("zuid");
			//alert("in storage=>"+zuidInPhone);
			const lastMileageVal = await api.getLastMileage('EN',zuidInPhone);
			const lastOilChangeVal = await api.getLastOilChangedMileage('EN',zuidInPhone);
			//alert("did mount");
			if (this._isMounted){
				this.setState({lastMileage : lastMileageVal});
				this.setState({lastOilChange : lastOilChangeVal});
				this.setState({zuid : zuidInPhone});
				//alert("in lastMileageVal=>"+lastMileageVal);
				this.setState({isLoading:false});
			}
		}catch(error){
			console.log(error);
		}
		this.setState({isLoading:false});
	}
	
	async _resetAll(){
		Alert.alert(
		  'Reset all mileage?',
		  'Are you sure you want to reset all mileage?',
		  [
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () => this._resetOptionHandle()},
		  ],
		  { cancelable: false }
		);
	}
	
	async _resetOptionHandle(){
		this.setState({isLoading:true});
		try{
			this.setState({isLoading:true});
			const zuidInPhone = await AsyncStorage.getItem("zuid");
			//alert("in storage=>"+zuidInPhone);
			await api.resetOilAndKilometer(zuidInPhone);
			this.setState({lastMileage : 0});
			this.setState({lastOilChange:0});
		}catch(error){
			console.log(error);
		}
		
		this.setState({isLoading:false});
	}
	
	
	async _saveNewMileage(){
		this.setState({isLoading:true});
		num = /^[0-9]+$/
		//alert('new mileage-->'+this.state.newMileage)
		if (this.state.newMileage !=='' && this.state.newMileage !== undefined && this.state.newMileage !==null && num.test(this.state.newMileage) ){
			const zuid = this.state.zuid;
			const newMileage = this.state.newMileage;
			
			const result = await api.saveNewMileageAndGetRecomendations(zuid, newMileage, this.state.lastMileage );
			if(result !== undefined && result !='undefined'){
				alert("New mileage saved");
				this.props.navigation.navigate("Home",{"dummy":"ok"});
			}
		}else{
			this.setState ({validMileage:false});
			this.setState({isLoading:false});
		}
		
		//
	}
	
	showCheckForm(){
		
		return (
		<View style={{flex:1}}>
			<View style={{flex:1,flexDirection:"row"}}>
				<View style={{flex:0.5}}/>
				<View style={{flex:1}}>
					<Input keyboardType={'numeric'}
						name = "newMileagein"
						onChangeText={newMileagein =>this.setState({newMileage:newMileagein})}
						style={[styles.textInputStyle ,!this.state.validMileage?styles.error:null]} maxLength = {7}/>
				</View>
				<View style={{flex:0.5}}/>
			</View>
			<View style={{flex:2}}/>
			<View style={{ flexDirection : "row" , justifyContent:"center" , alignItems:"center", flex:4}}>
				<View style={{flex:0.5}}/>
				<View style={{flex:2}}>
					<ImageBackground source={require('../../../img/mileage/button.png')}
						style={{flex:1,width: "100%",height: "100%"}} resizeMode='contain'>
						<TouchableHighlight onPress={()=> {this._saveNewMileage();}} 
						 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
							<Text style={{fontSize:14,color:"#b4b3b5",textAlign:"center",padding:10,}}>Enter Last Mileage</Text>
						</TouchableHighlight>
					</ImageBackground>
				</View>
				<View style={{flex:0.5}}/>
			</View>
			<View style={{flex:6}}/>
		</View>
		);
	}
	
	render() {
		if (this.state.isLoading)
			return (<View><Image source={require('../../../img/loading.gif')} style={{width: "100%",
									height: "100%",resizeMode: "cover"}}/></View>);
	return(
	<ImageBackground style={styles.backgroundImage}
			 source={require('../../../img/mileage/BG.png')} blurRadius={0} resizeMode = "cover">
		<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"}   contentContainerStyle={{flexGrow: 1}} >
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
				<View style={{flexDirection:"column" ,flex:1, justifyContent:"flex-start",}}>
					<View style={{flexDirection : "row" ,flex:1,marginTop:20,alignItems:"flex-start", paddingLeft:0,}}>
						<View style={{flex:1}}/>
						<View style={{flex:2, justifyContent : "flex-start", alignItems:"center"}}>
							<Button	transparent style={{}} onPress={() => this.props.navigation.openDrawer()}>
								<Image source={require("../../../img/inner/burgerred.png")}  
									style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
							</Button>	
						</View>
						<View style={{flex:15}}/>
					</View>
					<View style={{flex:1}}/>
					<View style={{flex:8,marginTop:0 , marginLeft:10 , marginRight:10}}>
						<ImageBackground style={styles.backgroundImage}
							source={require('../../../img/mileage/subbg.png')} blurRadius={0} resizeMode = "cover">
							<View style={{flex:8}}>
								<View style={{flex:1}}/>
								<View style={{flex:7}}>
									<Image source={require("../../../img/mileage/rpm.png")}  
										style={{ flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
								</View>
								<View style={{flex:1}}/>
								<View style={{flex:2,flexDirection:"column", alignItems:"center",justifyContent : "flex-start"}}>
									
									<View style={{flex:0.5,flexDirection:"row" , justifyContent:"center"}}>
										<Text style={{alignSelf:"center" ,fontSize:14 , color:"#b4b3b5",paddingRight:5,paddingLeft:5 }}>Last Mileage</Text>
										<Text style={{alignSelf:"center",fontSize:11 , color:"#b4b3b5",paddingRight:5,paddingLeft:5 }}>{this.state.lastMileage}</Text>
									</View>
									<View style={{flex:0.5,flexDirection:"row" , justifyContent:"center"}}>
										<Text style={{alignSelf:"center" ,fontSize:14 , color:"#b4b3b5",paddingRight:5,paddingLeft:5 }}>Last Oil Change</Text>
										<Text style={{alignSelf:"center",fontSize:11 , color:"#b4b3b5",paddingRight:5,paddingLeft:5 }}>{this.state.lastOilChange}</Text>
									</View>
									<View style={{flex:0.3 , justifyContent:"center"}}>
										<Button iconLeft onPress={()=> {this._resetAll();}} transparent style={{borderColor: '#b4b3b5'}} textStyle={{color:'red'}}>
											<Icon active name="refresh" style={{color: '#b4b3b5',fontSize:18}} />
											<Text style={{color: '#b4b3b5',fontSize:11}}>Reset</Text>
										</Button>
									</View>
								</View>
							</View>
							<View style={{flex:2}}>{this.showCheckForm()}</View>
						</ImageBackground>
					</View>
					<View style={{flex:6}}/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	</ImageBackground>
	);
	}
}
	
	
	const styles = StyleSheet.create(
	{
		scrollView:{
    flex:1,
   
  },
		backgroundImage: {flex: 1, width:undefined, height:undefined },
		form:{flexDirection : "column" , justifyContent:"center" ,alignItems:"center" ,marginTop:5,flex:1 },
		formRow : {flexDirection : "row" , justifyContent:"center" , alignItems:"center", flex:1 , marginBottom:5 },
		textInputStyle :{ height:35 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 ,
						fontSize :10 , paddingTop:5 ,lineHeight:10 , borderRadius:7 , marginBottom : 5, marginTop:5},
		error : {borderColor: '#d1251a'},
		labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:11 ,color:"#d1251a" , paddingRight : 10 , marginBottom:10},
		progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
		},
		 container: {
    flex:1,
    paddingTop:65,
    
  },
		
	}
);

	
