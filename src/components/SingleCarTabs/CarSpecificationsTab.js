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
			SpecsList : null,
		}
	}
	componentWillReceiveProps(){
			
		this.setState( {SpecsList : this.props.specs} );
		
	}
	
	
  render () {
	 
	return (
	
		<Content padder style={{ marginTop: 0,backgroundColor:"transparent" }}>
			<View>
				<View style={{display:"flex",flex:1,flexDirection:"column", justifyContent:"center"}}>
					<FlatList 
						data={this.state.SpecsList}
						keyExtractor={item => item.specName}
						renderItem={({item}) =>(
							
							<View style={{flexDirection :"row",alignItems:"center",paddingTop:5}}>
								<Text note style={{fontSize:12,flex:1}}>
										{item.specName}
								</Text>
								<Text  style={{fontSize:11, fontWeight:"bold",flex:1,color:"white"}}>
									{item.specValue}
								</Text>
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