import React, { Component } from "react";
import { Image, View , AsyncStorage, FlatList} from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
  Body
} from "native-base";
import styles from "./style";
import LinearGradient from 'react-native-linear-gradient';
//const drawerCover = require("../../../img/home3.jpg");
const drawerCover = require("../../../img/logo.png");
const menuData = [
  {
	id: "1",
    name: "لاپه‌ره‌ی سه‌ره‌کی",
    route: "Home",
    checkRegistered:false,
   
  },
  {
	id: "2",
    name: "حجز موعد تجربة قيادة",
	nameWhenChanged : "حجز موعد تجربة قيادة",
    route: "ReservationPage_kr",
	checkRegistered:false,

  },
  {
	  id: "3",
    name: "تۆمارکردن",
	nameWhenChanged : "تۆمارکردن",
    route: "Register_kr",
	checkRegistered:false,

  },
  {
	  id: "4",
    name: "پێوه‌ری کیلۆمه‌تر",
    route: "Maintenance_kr",
	checkRegistered:false,

  },
  {
	  id: "5",
    name: "ئۆفره‌کان",
    route: "Offers_kr",
    checkRegistered:false,
  },

  {
	  id: "6",
    name: "ئاگادارکردنه‌وه‌",
    route: "ShortNews_kr",
	checkRegistered:false,

  },
  {
	  id: "7",
    name: "ئۆفه‌ره‌ تایبه‌ته‌کان",
    route: "Promotions_kr",
	checkRegistered:true,

  },
  {
	  id: "8",
    name: "چاککردنه‌وه‌ی به‌رده‌وام",
    route: "PerodicalMaintenance_kr",
	checkRegistered:true,

  },
  
  
];

class SideBar_kr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
	  custId : null,
	  isRegistered :false,
	  datas:[],
	  isRegistered :this.props.screenProps.isRegistered,
	  appCallBackFunction : this.props.screenProps.AppCallBackFunction,
    };
  }
	
	registerUser = async()=>{
		//alert("changed in the sidebar level");
		this.setState({isRegistered:true});
	}
	
	unRegisterUser = async()=>{
		//alert("changed in the sidebar level");
		this.setState({isRegistered:false});
	}
	
	async componentWillMount (){
		await this.getCustomerId();
		
	}
	async getCustomerId (){
		const id = null;
		try{
			const id = await AsyncStorage.getItem("custId");
			if (id !=undefined && id !=null && id>0){
				isRegistered = true;
				this.setState({custId:id ,isRegistered:true,datas:menuData});
			}
		}catch (error){
			alert(error);
		}
		return id;
	}
  render() {
	  console.log("this is side bar isRegistered===>"+this.state.isRegistered);
	 // this.props.screenProps.lang
	 
	 
    return (
	
	<View style={{flex:1,flexDirection:"column",}}>
		<View style={{flex:10,}}>
			<Container style={{backgroundColor:"#3b5998"}}>
				<Content
				  bounces={true}
				  style={{ flex: 1, top: 1 ,paddingTop:10}}
				>
				<Image source={drawerCover} style={styles.drawerCover} />
			
				 <FlatList
					data={menuData}
					style= {{marginLeft:0, }}
					keyExtractor={item => item.id.toString()}
					renderItem={({item}) =>
						<LinearGradient colors={["transparent","#090f17"]} start={{x:0, y:0.5}} end={{x:0.85, y:0.5}}
											locations={[0.0, 1.0]}	style={styles.linearGradient}>
						<ListItem
							button
							noBorder
							onPress={(this.state.isRegistered || !item.checkRegistered)?
							 () => this.props.navigation.navigate(item.route,{appCallBackFunction:this.registerUser, unRegCallBackFunction:this.unRegisterUser}):null}
							style = {{flex:1,flexDirection:"column",alignItems:"flex-end",justifyContent:"flex-end",paddingBottom:0,marginLeft:0,paddingTop:0,paddingRight:0 }}
						>
							<View
								style={{flexDirection:"row",paddingTop:14,paddingBottom:14,paddingRight:15}}>
								
								
								<Text style={[styles.text, (this.state.isRegistered || !item.checkRegistered)?null:styles.disabledText]}>
									{(this.state.isRegistered && (item.name=='Register'))?item.nameWhenChanged:item.name}
									
								</Text>
								
							</View>
								 
							<Image
									source = {require ('../../../img/silverline.png')}
									style ={{resizeMode:"cover",height:1,width:"100%",}}
								/>
							
					  </ListItem>
					 </LinearGradient>
					}
					
					/>
				
				
				
			
        </Content>
		
		
		
      </Container>
	  </View>
	  <View style={{backgroundColor:"#3b5998",flex:1, flexDirection:"row",justifyContent:"flex-start",alignItems:"center" }}>
					<View style={{flexDirection:"row", flex:1}}>
						<View style={{flex:1,flexDirection:"row", paddingLeft:20, alignItems:"center"}}>
							<Image source={require('../../../img/planet.png')} style={{width: "60%",
										height: "60%",resizeMode:"contain"}}/>
						</View>
						<View style={{flexDirection:"row", justifyContent:"flex-start" , alignItems:"center", flex:5}}>
							
							<Button transparent onPress={()=>this.props.screenProps.lang("AR")} >
								<Text style={styles.langText}>عربي</Text>
							</Button>
							<Button transparent onPress={()=>this.props.screenProps.lang("EN")} >
								<Text style={styles.langText} >En</Text>
							</Button>
							
							<Button transparent onPress={()=>this.props.screenProps.lang("KR")} >
								<Text style={styles.langText} >كوردي</Text>
							</Button>
						</View>
					</View>
		</View>
	</View> 
    );
  }
}

export default SideBar_kr;
