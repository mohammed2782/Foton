import React, { Component } from 'react';
import { View, StyleSheet , Image , FlatList } from 'react-native';
import api from '../../api/api.js';
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
  CardItem,
  Card,
  Text,
  List
} from "native-base";

class CarSpecificationsTab extends Component {
	constructor (props){
		super(props);
		this.state ={
			featuresList : null,
		}
	}
	componentWillReceiveProps(){
			
		this.setState( {featuresList : this.props.features} );
		
	}
	
	
  render () {
	 
	return (
	
		<Content padder style={{ marginTop: 0 }}>
			<View>
				<View style={{display:"flex",flex:1,flexDirection:"column", justifyContent:"center"}}>
					<FlatList 
						data={this.state.featuresList}
						 keyExtractor={(item, index) => item}
						renderItem={({item}) =>(
							<View style={{flexDirection:"row",flex:1}}>
								<View style={{flex:0.5}}>
									<Image source={require("../../../img/products/bullet.png")}  style={{ 
										flex:1,
										width: "100%",
										height: "100%",
										resizeMode: 'contain'}}/>
								</View>
								<View style={{flex:14}}>
									<Text  style={{paddingLeft:10, fontSize:12 , fontWeight:"bold",color: "white"}}>
										{item}
									</Text>
								</View>
							</View>
							)
						}
					/>
				</View>
			</View>
		</Content>
	)
	
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  ListItemStyle:{marginLeft:0, backgroundColor :"#d1251a", paddingTop:0, paddingBottom:0, paddingLeft:0, paddingRight:0, marginBottom:5 },
  text: { fontSize: 9, fontFamily:"Futura Md BT Bold", color : "#FFF", marginBottom:10, marginTop:10, fontWeight: 'bold', paddingLeft:20},
});


export default CarSpecificationsTab