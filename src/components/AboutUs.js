import React, { Component } from "react";
import { FlatList,
StyleSheet,
View,
ImageBackground,
Image,Dimensions, ScrollView , ListView } from "react-native";
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
  Right,
  Body
} from "native-base";
import api from '../api/api.js';

export class AboutUs extends Component {
	//fetchAboutUs
	constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				aboutUsList :null,
				isLoading : true,
				philoArray : [],
				objectivesArray : [],
				companyName : null,
				intro : null,
				philoSectionName : null,
				objectivesSectionName : null,
				
			}
		};
	async componentDidMount(){
			//alert("this is json1 ");
			const aboutUsJSON = await api.fetchAboutUs('EN');
			console.log(aboutUsJSON);
			this.setState({ aboutUsList : aboutUsJSON , isLoading:false });
			this.setState({companyName:aboutUsJSON.companyName});
			this.setState({objectivesSectionName : aboutUsJSON.sections[1].sectionName});
			this.setState({philoSectionName : aboutUsJSON.sections[0].sectionName});
			this.setState({intro:aboutUsJSON.intro});
			this.setState({ philoArray : aboutUsJSON.sections[0].points});
			this.setState({ objectivesArray : aboutUsJSON.sections[1].points});
			
			//console.log(this.state);
		}		
	renderRow(data,index) {
	  return (
		<View key={index} style={{flexDirection: 'row' }}>
					  <Text style={styles.bullet}>{'\u2022'}</Text>
					  <Text style={styles.bulletText}>{data}</Text>
					  
					</View>
	  );
	}
		
render() {
	return (
	<ImageBackground style={styles.backgroundImage}
					 source={require('../../img/aboutus/Background.png')} blurRadius={0} resizeMode = "cover">
		<View style={{flex:1}}> 
			<View style={{flexDirection : "row" ,marginTop:15, flex:1,paddingLeft:0}}>
				<View style={{flex:0.5 }}/>
				<View style={{flex:1, justifyContent : "flex-start", alignItems:"center"}}>
					<Button	transparent style={{flex:1}} onPress={() => this.props.navigation.goBack()}>
						<Image source={require("../../img/inner/backen.png")}  
							style={{ flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
					</Button>
				</View>
				<View style={{flex:8 }}/>
				<View style={{flex:1.5 , justifyContent:"flex-end" }}>
					<Image source={require('../../img/inner/logo.png')}
						style={{flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
				</View>
				<View style={{flex:0.5 }}/>	
			</View>
			
			<View style={{flex:12,marginTop:10,backgroundColor:"rgba(43, 75, 122,0.5)",marginLeft:20,marginRight:20}}>
			<ScrollView >
					<View style={{flex:0.5,paddingTop:10,marginLeft:10, paddingBottom:10, alignItems:"center",justifyContent:"center", alignSelf:"center" , flexDirection:"row"}}>
						<Text style={styles.carTitle}>{this.state.companyName}</Text>
					</View>
					<View style={{flex:1,marginLeft:10,marginRight:10}}>
						<Text style = {[styles.bulletText , {padding:10}]}>{this.state.intro}</Text>
					</View>	
					<View style={{flex:1,alignItems:"center",paddingTop:10,justifyContent:"center" ,marginLeft:35,marginRight:35}}>
						<View style={{flex:0.5}}>
							<Image style={{resizeMode: 'contain',height:200,}} source ={require('../../img/aboutus/car1aboutus.png')} />
						</View>
						<View style={{flex:1,paddingTop:10, alignItems:"flex-start",justifyContent:"flex-start"}}>
							<Text style={styles.carTitle}>{this.state.philoSectionName}</Text>
						</View>
						{this.state.philoArray.map((datum,index) => this.renderRow(datum,index))}
					</View>
					<View style={{flex:1,alignItems:"center",paddingTop:10, paddingBottom:20,justifyContent:"center" ,marginLeft:35,marginRight:35}}>
						<View style={{flex:1, alignItems:"center",justifyContent:"center", alignSelf:"center"}}>
							
							<Text style={styles.carTitle}>{this.state.objectivesSectionName}</Text>
						</View>
						{this.state.objectivesArray.map((datum,index) => this.renderRow(datum,index))}
					</View>
				</ScrollView >
			</View>	
			<View style={{flex:1}}/>
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
				fontSize : 15,
				flex:10,
			},
			bulletText :{
				fontFamily : "Futura Md BT Bold",
				color : "white",
				fontSize:12,
				flex: 1, paddingLeft: 5,
				textAlign:"justify"
			},
			bullet :{
				fontFamily : "Futura Md BT Bold",
				color : "white",
				fontSize:12,
				
			},
			
		}
	);
