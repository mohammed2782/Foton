import React, { Component } from "react";
import { Image,TouchableHighlight,ImageBackground } from "react-native";
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

const styles  = StyleSheet.create( {
	backgroundImage: {flex: 1, width:undefined, height:undefined, },
	container: {
		backgroundColor: "#FFF"
	},
	text: {
		alignSelf: "center",
		marginBottom: 7
	},
	mb: {
		marginBottom: 10,
		marginRight:5,
	},
	carTitle :{
		fontFamily : "Futura Md BT Bold",
		color : "#e2e1d9",
		fontWeight:"bold",
		fontSize : 17,
		flex:10,
	},
	carBriefDesc:{
		fontFamily :"Franklin Gothic Book Regular",
		fontSize : 12,
		color : "white",
		marginTop : 15,
		paddingLeft:10
	},
	oldPriceText : {
		textDecorationLine: 'line-through', 
		textDecorationStyle: 'solid',
		fontFamily : "Franklin Gothic Book Regular",
		fontSize : 12,
		color: "#b4b3b5"
	},
	newPriceText :{ 
		textDecorationStyle: 'solid',
		fontFamily : "Franklin Gothic Book Regular",
		fontSize : 14,
		color: "#e2e1d9"
	},
	endAtTitle :{
		fontSize:10,
		color:"white",
		paddingTop:30,
		marginTop:10,
		alignSelf:"center",
	},
	promoCode :{
		fontSize:13,
		color:"white",
		fontWeight:"600",
		paddingTop:10,
		alignSelf:"center",
	}
});

export class PromoItem extends Component {
	
	getTitle (promo){
		const  s = promo.validUntil;
		//alert (s);
		return (<View><Text style={styles.endAtTitle}>ساري إلى {promo.validUntil}</Text>
				<Text style={styles.promoCode}>كود العرض {promo.promoCode}</Text></View>);
	}
  render() {
	  console.log(this.props.promo);
	  var title = this.props.promo.carName;
	  if (this.props.promo.partName != null)
		  title += ' - '+this.props.promo.partName;
	  
    return (
	<View style={{flex:1,backgroundColor:"#2b4c7d",padding:10,}}>	
        <View style={styles.mb,{marginLeft:0,marginRight:0,flex:1}}>
			<View style={{paddingLeft:5}}>
				<View style={{flex:1 , flexDirection:"row"}}>
					<Text style={styles.carTitle}>{title}</Text>
				</View>
				<View style={{flex:1 , flexDirection : 'column', padding:15,justifyContent:"center",alignItems:"center"}}>
					<Text style={styles.oldPriceText}>
						Original Price {this.props.promo.currency} {this.props.promo.oldPrice.toLocaleString('en')}
					</Text>
					<Text style={styles.newPriceText}>
						Now {this.props.promo.currency} {this.props.promo.newPrice.toLocaleString('en')}
					</Text>
				</View>
			</View>
			<View style={{borderBottomWidth:0.5,borderBottomColor: '#b4b3b5',borderTopWidth:0.5,borderTopColor: '#b4b3b5',}}>
				<Image style={{resizeMode: "contain",width: null,height: 220,flex: 1,}}
					source={{uri:this.props.promo.imgURL}}/>
            </View>
			<View>
				{this.getTitle(this.props.promo)}
				<Text note style={styles.carBriefDesc}>{this.props.promo.desc}</Text>
            </View>
			<View style={{position: 'absolute',top: 280,backgroundColor:"transparent",left : 0,right:0,width: "100%",height: 70,
				justifyContent: 'center',alignItems: 'center',}}>
				<Image
					style={{resizeMode: "contain",flex: 1,width:"50%",}}
					source={require('../../img/products/special_offer.png')}/>
			</View>
			<View style={{flexDirection : "row" , justifyContent:"center" , alignItems:"center", flex:1}}>
				<View style={{flex:0.5}}/>
				<View style={{flex:4}}>
					<ImageBackground source={require('../../img/mileage/button.png')}
						style={{flex:1,width: "100%",height: "100%"}} resizeMode='contain'>
						<TouchableHighlight onPress={() => 
						this.props.navigation.navigate("GetPromotionInfo_ar",{promoId : this.props.promo.promoid, promoCode:this.props.promo.promoCode})}
						 style={{flex:1,height:50,alignItems:"center",justifyContent:"center"}}>
							<Text style={{fontSize:16,color:"white",textAlign:"center",padding:10,}}>أحصل على هذا العرض</Text>
						</TouchableHighlight>
					</ImageBackground>
				</View>
				<View style={{flex:0.5}}/>
			</View>
			
		</View>
	</View>
    );
  }
}


