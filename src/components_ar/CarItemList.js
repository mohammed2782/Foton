import React, { Component } from "react";
import { Image ,ImageBackground,} from "react-native";
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
  
} from "native-base";
import {
FlatList,
StyleSheet,
View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const styles  = StyleSheet.create( {
	container: {
		
	},
	text: {
		alignSelf: "center",
		marginBottom: 7
	},
	mb: {
		
		marginBottom: 10,
		flex:1,
		paddingRight:0,
		paddingLeft:0,
		marginTop:0,
		marginLeft:0,
		marginRight:0,
		borderRadius:0,
		backgroundColor:"transparent",
		borderLeftWidth:0,
		borderTopWidth:0,
		borderRightWidth:0,
		borderBottomWidth:0,
		shadowRadius:0,
		shadowOpacity:0.0,
		width: "100%",
		justifyContent:"center",
		shadowOffset: {
			"width":0,
			"height":0
		}
	},
	carTitle :{
		fontFamily : "Futura Md BT Bold",
		color : "#fff",
		fontWeight:"bold",
		fontSize : 15,
		flex:10,
		textAlign:"right",
	},
	carBriefDesc:{
		fontFamily :"Franklin Gothic Book Regular",
		fontSize : 11,
		color : "#fff",
		marginTop : 5,
		paddingLeft:10,
		textAlign:"right",
		paddingRight:10,
	},
	backgroundImage: {flex: 1, width:undefined, height:undefined, },
	linearGradient : {borderLeftWidth:0,margin:10,marginRight:10,paddingTop:0,marginTop:0}
});


class CarItemList extends Component {
  render() {
    return (
	<ImageBackground style={styles.backgroundImage}
			 source={require('../../img/products/itembg.png')} blurRadius={0} resizeMode = "cover">								
        <View style={{flex:1,flexDirection:"row"}}>
			<View style={{flex:0.1}}/>
			<View style={{flex:4}}>
				<View style={{flex:2,alignItems:"center",justifyContent:"center",flexWrap: 'wrap',flexDirection:"row",
				 marginTop:10,marginLeft:10,marginRight:14,marginBottom:20}}>
					<Image style={{resizeMode: "cover",width: "100%",height:170,flex: 1}}source={{uri:this.props.car.thumbnailUrl}}/>
				</View>
				<View style={{flex:1,marginLeft:5,marginRight:7}}>
					<LinearGradient colors={["#090f17", "transparent"]} start={{x:0.5, y:0}} end={{x:0.5, y:0.7}}locations={[0.0, 1.0]}>
						<View style={{flex:1 , flexDirection:"row-reverse",paddingLeft:10,paddingTop:10}}>
							<Text style={styles.carTitle}>{this.props.car.carName}</Text>
						</View>
						
						<Text note style={styles.carBriefDesc}>{this.props.car.carFullDesc}</Text>
						<View style={{flexDirection : "column" , justifyContent:"center" , alignItems:"center", flex:1,marginBottom:10}}>
							<View>
								<Button transparent style={{ flex:1, margin: 15,marginBottom:0,borderRadius: 10, marginTop: 0, padding:10, }}
								onPress={() => this.props.navigation.navigate ("SingleCarView_ar",{carid : this.props.car.carId})}>
											<Text style={{alignItems:"center" , justifyContent:"center",color:"white"}}>أقرأ المزيد</Text>			
								</Button>
							</View>
							<Image	source = {require ('../../img/silverline.png')} style ={{resizeMode:"center",height:1,width:"50%",}}/>
						</View>
					</LinearGradient>
				</View>
			</View>
			<View style={{flex:0.2}}/>
		</View>
	</ImageBackground>
    );
  }
}

export default CarItemList;
