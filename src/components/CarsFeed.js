import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
} from 'react-native';
import CarItemList from './CarItemList';
import OtherTab from './OtherTab';
//import * as globalStyles from '../styles/global';
import api from '../api/api.js';

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
  ListItem
} from "native-base";

	export  class CarsFeed extends Component <{}> {
		constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				carsList :this.props.cars,
				isLoading:true,
			}
		}
		
		
		async componentDidMount(){
			//alert("this is json1 ");
			const carsList = await api.fetchCarList('en');
			this.setState( (prevState) => { return {carsList , isLoading:false,} } );
		}
			
		render() {
			if (this.state.isLoading)
				return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
			return (
				<ImageBackground style={styles.backgroundImage}
					 source={require('../../img/products/products_bg.png')} blurRadius={0} resizeMode = "cover">
					<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
						<View style={{flexDirection : "row" ,marginTop:15, flex:1,
							paddingLeft:0}}>
							<View style={{flex:0.5 }}/>
							<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
								<Button	transparent style={{flex:1}} onPress={() => this.props.navigation.goBack()}>
									<Image source={require("../../img/inner/backen.png")}  style={{ 
										flex:1,
										width: "100%",
										height: "100%",
										resizeMode: 'contain'}}/>
								</Button>
							</View>
							<View style={{flex:8 }}/>
							<View style={{flex:1.5 , justifyContent:"flex-end" }}>
								<Image source={require('../../img/inner/logo.png')}
									style={{
										flex:1,
										width: "100%",
										height: "100%",
										resizeMode: 'contain'
										}}
								/>
							</View>
							<View style={{flex:0.5 }}/>	
						</View>
						<View style={{flex:0.3,marginTop:5,paddingBottom:5,marginLeft:25,justifyContent : "flex-start", alignItems:"flex-start"}}>
							<Text style = {{color:'white', fontSize:20, fontWeight:"700", fontFamily:'Futura Md BT Bold'}}>
								Products
							</Text>
						</View>
						<View style={{flex:13, marginTop:10 , marginLeft:5, marginRight:5}}>
							<FlatList 
								data={this.state.carsList}
								keyExtractor={item => item.carName}
								renderItem={({item}) =>(
									<View style={{flex:1}}>
										<ListItem
											button
											navigation ={this.props.navigation}
											style={{borderColor:"transparent",borderWidth:0,marginLeft:10,marginRight:0,paddingRight:0}}
											>
											<CarItemList car={item} navigation={this.props.navigation} />
										</ListItem>
									</View>
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
			
		}
	);

	
