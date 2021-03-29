import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
AsyncStorage
} from 'react-native';


//import * as globalStyles from '../styles/global';
import api from '../api/api.js';
import globalvalidation from './globalvalidation.js';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  ListItem,
} from "native-base";

	export  class PerodicalMaintenance_ar extends Component <{}> {
		constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				rangesList :null,
				isLoading : true,
				appUnregisterCallBackFunction : this.props.navigation.state.params.unRegCallBackFunction,
				
			}
		};
		
		
		
		async componentWillMount(){
			const isThere = await globalvalidation.checkAvailableVinIdForRegisteredCustomer();
			if (!isThere){
				await alert("تم إلغاء تسجيلك, شكرا");
				this.state.appUnregisterCallBackFunction();
				this.props.navigation.navigate("Home");
				return ;
			}
			const zuidInPhone = await AsyncStorage.getItem("zuid");
			this.setState({zuid : zuidInPhone});
			const rangesListJSON = await api.fetchPerodicalRangesList('AR', zuidInPhone);
			this.setState({ rangesList : rangesListJSON , isLoading:false });
			
			//console.log(this.state);
		}			
	render() {
		if (this.state.isLoading)
			return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
									height: "100%",resizeMode: "cover"}}/></View>);
		
		return (
			<ImageBackground style={styles.backgroundImage} source={require('../../img/mileage/BG.png')} blurRadius={0} resizeMode = "cover">
				<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
					<View style={{flexDirection : "row-reverse" ,marginTop:20, flex:1,paddingLeft:0}}>
						<View style={{flex:0.5}}/>
						<View style={{flex:0.7, justifyContent : "flex-start", alignItems:"center"}}>
							<Button	transparent onPress={() => this.props.navigation.openDrawer()}>
								<Image source={require("../../img/inner/burgerred.png")}  style={{ 
									flex:1,
									width: "100%",
									height: "100%",
									resizeMode: 'contain'}}/>
							</Button>
						</View>
						<View style={{flex:3}}/>
						<View style={{flex:2 , justifyContent:"flex-end" }}>
							<Image source={require('../../img/inner/logo.png')}
								style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
						</View>
					</View>
					<View style={{flex:1,marginTop:10,marginLeft:20,justifyContent : "center", alignItems:"flex-end"}}>
						<Text style = {{color:'white', fontSize:15, fontWeight:"500", fontFamily:'Futura Md BT Bold'}}>
							الصيانة الدورية
						</Text>
					</View>
					<View style={{flex:10,backgroundColor:"rgba(43, 75, 122,0.7)" , marginLeft:20 , marginRight:20}}>
						<FlatList contentContainerStyle={{}} data={this.state.rangesList} keyExtractor={item => item.rangeId.toString()}
							renderItem={({item}) =>(
							<LinearGradient style={{margin:15,marginTop:10,flex:1,flexDirection :"row"}} colors={["transparent","#090f17"]} 
								start={{x:0, y:0}} end={{x:1, y:0}}locations={[0,0.9]}>
								<View style={{flex:1,flexDirection :"row-reverse",alignItems:"center",marginBottom:5,padding:10}}>
									<View style={{flex:2,justifyContent:"flex-start", paddingRight:10}}>
										<Image  source={{uri:item.imgUrl}} 
											style ={{flex:1 , minWidth: 75,minHeight: 75, maxWidth: 75,maxHeight: 75,resizeMode: 'contain', }}>
										</Image>
									</View>
									<View style={{flex:8}}>
										<Button transparent  onPress={() => 
											this.props.navigation.navigate("AdviceTable_ar",{rangeId : item.rangeId, startRange:item.startRange, endRange:item.endRange})}
											style={{justifyContent:"flex-start",alignItems: "center", flex:1, margin:0}}>
											<Text style={styles.carTitle}>من {item.startRange} - إلى {item.endRange} كيلومتر</Text>
										</Button>
									</View>
								</View>
							</LinearGradient>
								
							)
						}
						/>
						
					</View>
					<View style={{flex:2}}/>
				</View>
			</ImageBackground>	
		);
	}
}
	
	
		const styles = StyleSheet.create(
		{
			backgroundImage: {flex: 1, width:undefined, height:undefined },
			carTitle :{
				fontFamily : "Futura Md BT Bold",
				color : "white",
				fontSize : 15,		
				paddingRight:10,
				
			},
			bulletText :{
				fontFamily : "Futura Md BT Bold",
				color : "grey",
				fontSize:9,
				flex: 1, paddingRight: 15,
				marginBottom:10,
				marginTop:10,
			},
			bullet :{
				fontFamily : "Futura Md BT Bold",
				color : "grey",
				fontSize:12,
				
			},
			
		}

	);

	
