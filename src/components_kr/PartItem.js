import React, { Component } from "react";
import { Image,ImageBackground } from "react-native";
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
  Right
} from "native-base";
import {
FlatList,
StyleSheet,
View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const styles  = StyleSheet.create( {
	container: {
		backgroundColor: "#FFF"
	},
	text: {
		alignSelf: "center",
		marginBottom: 7
	},
	mb: {
		height:200,
		marginRight:5,
	},
	carTitle :{
		fontFamily : "Futura Md BT Bold",
		color : "white",
		fontWeight:"bold",
		fontSize : 17,
		flex:10,
	},
	carBriefDesc:{
		fontFamily :"Franklin Gothic Book Regular",
		fontSize : 12,
		color : "white",
		marginTop : 10,
		paddingLeft:5,
		marginRight:5,
		marginBottom:15
	},
	oldPriceText : {
		textDecorationLine: 'line-through', 
		textDecorationStyle: 'solid',
		fontFamily : "Franklin Gothic Book Regular",
		fontSize : 10,
		color: "#4c9d2f"
	},
	newPriceText :{ 
		textDecorationStyle: 'solid',
		fontFamily : "Franklin Gothic Book Regular",
		fontSize : 11,
		color: "#ec3612"
	},
	endAtTitle :{
		fontSize:12,
		color:"black",
		paddingTop:5,
		alignSelf:"flex-start",
		fontWeight:"600",
	},
	promoCode :{
		fontSize:13,
		color:"#ec3612",
		fontWeight:"600",
		paddingTop:10,
		alignSelf:"center",
	},
	backgroundImage: {flex: 1, width:undefined, height:undefined, }
});

export class PartItem extends Component {
	
	getTitle (promo){
		const  s = promo.validUntil;
		//alert (s);
		return (<View><Text style={styles.endAtTitle}>Valid unitl {promo.validUntil}</Text>
				<Text style={styles.promoCode}>Promo Code {promo.promoCode}</Text></View>);
	}
  render() {
	  console.log(this.props.promo);
	  
    return (
	
	<ImageBackground style={styles.backgroundImage}
			 source={require('../../img/products/itembg.png')} blurRadius={0} resizeMode = "cover">								
        <View style={{flex:1,flexDirection:"row"}}>
			<View style={{flex:0.3}}/>
			<View style={{flex:4}}>
				<View style={{flex:2,alignItems:"center",justifyContent:"center",flexWrap: 'wrap',flexDirection:"row",
				 marginTop:15,marginLeft:7,marginRight:12,marginBottom:10}}>
					<Image style={{resizeMode: "cover",width: "100%",height:170,flex: 1}} source={{uri:this.props.part.partImgUrl}}/>
				</View>
				<View style={{flex:1,marginLeft:4,marginRight:7,marginBottom:10}}>
					<LinearGradient colors={["#090f17", "transparent"]} start={{x:0.5, y:0}} end={{x:0.5, y:1.0}}locations={[0.0, 1.0]}>
						<View style={{flex:1 , flexDirection:"row",paddingLeft:5}}>
							<Text style={styles.carTitle}>{this.props.part.partName}</Text>
						</View>
						
						<Text note style={styles.carBriefDesc}>{this.props.part.desc}</Text>
						
					</LinearGradient>
				</View>
			</View>
			<View style={{flex:0.3}}/>
		</View>
	</ImageBackground>
       
    );
  }
}


