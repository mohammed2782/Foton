import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
} from 'react-native';


//import * as globalStyles from '../styles/global';
import api from '../api/api.js';
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
  ListItem
} from "native-base";

	export  class ShortNews_kr extends Component <{}> {
		constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				newsList :null,
				isLoading : true,
				
			}
		};
		
		
		
		async componentWillMount(){
			//alert("this is json1 ");
			const newsListJSON = await api.fetchNewsList('kr');
			this.setState({ newsList : newsListJSON , isLoading:false });
			
			//console.log(this.state);
		}			
		render() {
			
			if (this.state.isLoading)
				return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
			
			return (
				<ImageBackground style={styles.backgroundImage}
				 source={require('../../img/products/products_bg.png')} blurRadius={0} resizeMode = "cover">
					<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
						<View style={{flexDirection : "row-reverse" ,marginTop:20, flex:1.1,paddingLeft:0}}>
							<View style={{flex:0.5}}/>
							<View style={{flex:2, justifyContent : "flex-start", alignItems:"center"}}>
								<Button	transparent onPress={() => this.props.navigation.openDrawer()}>
									<Image source={require("../../img/inner/burgerred.png")}  
										style={{flex:1,width: "100%",height: "100%",resizeMode: 'center'}}/>
								</Button>
							</View>
							<View style={{flex:9}}/>
							<View style={{flex:2 }}>
								<Image source={require('../../img/inner/logo.png')}
									style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
							</View>
							<View style={{flex:1}}/>
						</View>
						<View style={{flex:0.5}}/>
						<View style={{flex:12, marginTop:0 , marginLeft:0 , marginRight:0}}>
							
								<FlatList 
									contentContainerStyle={{}}
									data={this.state.newsList}
									keyExtractor={item => item.newsid.toString()}
									renderItem={({item}) =>(
									
									<ListItem style={{marginBottom:10,flex:1,alignItems:"center",paddingTop:10,justifyContent:"center" ,
										 marginLeft:10,marginRight:10,backgroundColor:"#2b4c7d"}}>
										<View style={{flex:1,flexDirection:"column" ,alignItems:"flex-end" ,}}>
											<View style={{flex:1,padding:10, alignItems:"center",justifyContent:"center", alignSelf:"center" , flexDirection:"row"}}>
												<Text style={styles.carTitle}>{item.title}</Text>
											</View>
											<View style={{flex:1,flexDirection:"column", justifyContent:"flex-end" ,alignItems:"flex-end"}}>
												<Text style={styles.bulletText}>
												{item.desc}
												</Text>
											 </View>
										</View>
									</ListItem>
									)
								}
								/>
							
						</View>
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
				fontWeight:"bold",
				fontSize : 17,
				flex:10,
			},
			bulletText :{
				fontFamily : "Futura Md BT Bold",
				color : "#e2e1d9",
				fontSize:12,
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

	
