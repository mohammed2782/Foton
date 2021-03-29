import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
} from 'react-native';

import {PartItem} from './PartItem';
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

export  class Parts_ar extends Component <{}> {
	constructor (props){
		super(props);
		this.state ={
			partsList :null,
			isLoading : true,
		}
	};
	async componentDidMount(){
		const partsListJSON = await api.fetchPartsList('ar');
		this.setState({ partsList : partsListJSON , isLoading:false });
	}
	_renderItem = ({ section, index }) => {
		const arrayLength = this.state.partsList.length;	
		const numColumns = 2;
		if (index % numColumns !== 0) return null;
		const items = [];
		for (let i = index; i < index + numColumns; i++) {
		  if (i < arrayLength){
			items.push(<PartItem key={this.state.partsList[i].partid} part={this.state.partsList[i]} />);
		  }
		}
		return (
			 <ListItem>
				 <View style={{flex:1,flexDirection:"row-reverse", justifyContent:"flex-start" ,}}>{items}</View>
			 </ListItem>
		);
	};
	render() {
		if (this.state.isLoading)
			return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
									height: "100%",resizeMode: "cover"}}/></View>);
		return (
			<ImageBackground style={styles.backgroundImage}
				 source={require('../../img/products/products_bg.png')} blurRadius={0} resizeMode = "cover">
				<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
					<View style={{flexDirection : "row-reverse" ,marginTop:15, flex:1.1,
							paddingLeft:0}}>
						<View style={{flex:0.5 }}/>
						<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
							<Button	transparent style={{flex:1}} onPress={() => this.props.navigation.goBack()}>
								<Image source={require("../../img/inner/backar.png")}  style={{ 
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
					<View style={{flex:0.3,marginTop:15,paddingBottom:5,marginRight:25,justifyContent : "flex-end", alignItems:"flex-end"}}>
						<Text style = {{color:'white', fontSize:20, fontWeight:"700", fontFamily:'Futura Md BT Bold'}}>
							قطع الغيار
						</Text>
					</View>
					<View style={{flex:12, marginTop:0 , marginLeft:10 , marginRight:10}}>							
						<FlatList contentContainerStyle={{}} data={this.state.partsList} keyExtractor={item => item.partid.toString()}
							renderItem={this._renderItem}/>
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

	
