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
  Icon,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Form,
  Label,
  Input
} from "native-base";

	export class OilPopUp_kr extends Component <{}> {
		constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				custId : null,
				zuid : null,
				callBackMethod : this.props.navigation.getParam("callBackMethod")
			}
		}
		
		async componentWillMount(){
			
		}
		
		async componentDidMount(){
			try{
				
				//alert('checking');
				const zuidInPhone = await AsyncStorage.getItem("zuid");
				this.setState({zuid : zuidInPhone});
				try{
					const lastMileageVal = await api.getLastOilChangedMileage('KR',zuidInPhone);
					this.setState({lastMileage : lastMileageVal});
					}catch(error){
						console.log(error);
					}
			}catch(error){
				console.log(error);
			}
		}
		
		async _saveOilChange(){
			const zuid = this.state.zuid;
			const newMileage = this.state.newMileage;
			
				const result = await api.saveOilChangeMileage(zuid, newMileage , 'KR' );
				console.log(result);
				if (result.errorMessage!==null && result.errorMessage!==undefined)
					alert(result.errorMessage);
				else{
					this.props.navigation.navigate("Home");
					this.state.callBackMethod ();
				}
		}
		
		showCheckForm(){
			return (
			<View style={{flex:1}}>
				<View style={{flex:1,flexDirection:"row"}}>
					<View style={{flex:0.5}}/>
					<View style={{flex:1}}>
						<Input 
						name = "newMileage"
						keyboardType='numeric'
						placeholder = "العداد عند تغيير الزيت "
						placeholderTextColor = "#D3D3D3"
						onChangeText={newMileage =>this.setState({newMileage:newMileage})}
						style={styles.textInputStyle}
						maxLength = {7}
					/>
					</View>
					<View style={{flex:0.5}}/>
				</View>
				<View style={{flex:2}}/>
				<View style={{ flexDirection : "row" , justifyContent:"center" , alignItems:"center", flex:4}}>
					<View style={{flex:0.5}}/>
					<View style={{flex:2}}>
						<ImageBackground source={require('../../../img/mileage/button.png')}
							style={{flex:1,width: "100%",height: "100%"}} resizeMode='contain'>
							<TouchableHighlight onPress={()=> {this._saveOilChange();}}
							 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
								<Text style={{fontSize:14,color:"#b4b3b5",textAlign:"center",padding:10,}}>زياد دەكات</Text>
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
	return (
	<ImageBackground style={styles.backgroundImage}
		source={require('../../../img/products/products_bg.png')} blurRadius={0} resizeMode = "cover">
		<KeyboardAwareScrollView keyboardShouldPersistTaps={"always"}   contentContainerStyle={{flexGrow: 1}} >
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
				<View style={{flexDirection:"column" ,flex:1, justifyContent:"flex-start" ,}}>
					<View style={{flex:1 ,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",marginTop:10, }}>
						<View style={{flex:12 , justifyContent:"flex-end" }}/>
						<View style={{flex:3 , justifyContent:"flex-end" }}>
							<Button	transparent style={{}} onPress={() => this.props.navigation.goBack()}>
								<Image source={require("../../../img/exit.png")}  
									style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
							</Button>
						</View>
					</View>
					<View style={{flex:4,marginTop:0 , marginLeft:20 , marginRight:20 ,paddingLeft:5,paddingRight:5, 
								backgroundColor:"#2b4c7d",elevation:4,shadowOffset: { width: 5, height: 5 },shadowColor: "grey",shadowOpacity: 0.5,
								shadowRadius: 10,}}>
						<View style={{flex:1,flexDirection:"row"}}>
							<View style={{flex:2,marginTop:10,flexDirection:"column", alignItems:"center"}}>
								<Image source={require("../../../img/logo_txt.png")}  
									style={{flex:2,width: "100%",height: "100%",resizeMode: 'center'}}/>
							</View>
						</View>
						<View style={{flex:1 , justifyContent:"center"}}>
							<Text style={{alignSelf:"center" ,fontSize:13 , color:"white" }}>
								کۆتاجاری گورینه‌ وه‌ی ڕۆن: {this.state.lastMileage}
							</Text>
						</View>
						<View style={{flex:2}}>
							{this.showCheckForm()}
						</View>
					</View>
					<View style={{flex:3}}/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	</ImageBackground>
	);
	}}
	
	
	const styles = StyleSheet.create(
	{
		scrollView:{
    flex:1,
   
  },
		backgroundImage: {flex: 1, width:undefined, height:undefined },
		form:{flexDirection : "column" , justifyContent:"center" ,alignItems:"center" ,marginTop:20, },
		formRow : {flexDirection : "row" , justifyContent:"center" , alignItems:"center", flex:1 , marginBottom:20 },
		textInputStyle :{ height:35 ,borderColor: 'gray',backgroundColor :"#FFF", borderWidth: 1, flex:1 ,
						textAlign:"right",fontSize :10 , paddingTop:5 ,lineHeight:10 , borderRadius:7 , marginBottom : 5, marginTop:5},
		labelStyle : {fontFamily:"Franklin Gothic Book Regular" , fontSize:13 ,color:"#d1251a" , paddingRight : 10 , marginBottom:10},
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

	
