import React, { Component } from 'react';
import {ImageBackground, View, StyleSheet , Image , FlatList , TouchableHighlight} from 'react-native';
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
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import Geolocation from '@react-native-community/geolocation';
import LinearGradient from 'react-native-linear-gradient';
class ShowRoomTab extends Component {
	constructor (props){
		super(props);
		//alert("this is const");
		this.state ={
			showRoomsList : null,
			UserLocationOff : true,
			showMap : false,
			markersList:null,
			locationServices : false,
			loading : true,
		}
	}
	async componentWillMount(){
		this._findUserPosition();
	}
	
	async componentDidMount(){
		//alert("this is json1 ");
		const showRooms = await api.fetchShowRoomsList('KR');
		//alert("this is json2 "+showRooms[0].locationDtls);
		this.setState( {showRoomsList : showRooms} );
		
		const markers = this.state.showRoomsList.map( (item) =>{
			return {
				latlng :{
					latitude:item.lat,
					longitude:item.longt
				},
				title :item.locationHeader,
				id : item.id
			};
		});
		this.setState({markersList:markers});
		
		this.setState({loading:false});
	}
	
	loadMap(){
		//if (this.state.locationServices && this.state.markersList!=null){
			
			this.props.navigation.navigate("viewmap" , {markers:this.state.markersList});
	  //}
		
	}
	
	
	_openLocationSettings = () => {
		let self = this;
		LocationServicesDialogBox.checkLocationServicesIsEnabled({
			message: "<h2>بكارهيَنياني ناونيشان؟</h2>ئه‌م ئپڵکێشنه‌ ده‌یه‌وێت چاک کردنی ئامێره‌که‌ت بگۆڕێت:<br/><br/> به‌کارهێنانی GPS و WIFI و توڕی مۆبایل بۆ ناونیشان<br/>",
			ok: "بةلَىَ",
			cancel: "نةخيَر"
		}).then(function(success) {
			self._findUserPosition();
			self.setState({
				locationServices: true
			});
		}).catch((error) => {
			console.log(error.message); // error.message => "disabled"
		});
	}
	
	_enableTheButton = () => {
		this.setState({
			buttonDisable: false,
			buttonTitle: 'Add my location',
			locationServices: true
		});
	}
	
	_findUserPosition = (e) => {
		Geolocation.getCurrentPosition(
		  (position) => {
			this._enableTheButton();
			this.setState({
			  locationServices: true
			});
		  },
		  (error) => {
			console.log('inside error', error);
			this.setState({
			  locationServices: false
			});
		  },
		  {enableHighAccuracy :false,timeout: 2000, maximumAge: 1000}
		);
	}
  render () {
	if (this.state.loading )
				return (<View><Image source={require('../../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
										
	  if (this.state.showRoomsList!=null)
		console.log("fetching");//alert("this is after "+this.state.showRoomsList[0].locationDtls);
	var buttonAction;
	var buttonName = "";
	if (!this.state.locationServices){
		buttonAction =  this._openLocationSettings;
		console.log("inside the if");
	}else{
		buttonAction = this.loadMap;
		console.log("inside the else");
	}
	console.log(buttonAction);
    
	return (
	<View style={{flex:1}}>
		<View style={{display:"flex",flex:6,flexDirection:"column", justifyContent:"center"}}>
			<FlatList 
				data={this.state.showRoomsList}
				keyExtractor={item => item.id}
				renderItem={({item}) =>(
					<LinearGradient style={{marginBottom:5,marginTop:5,flex:1,flexDirection :"row"}} colors={["#090f17", "transparent"]} 
					 start={{x:0, y:0}} end={{x:1, y:0}}locations={[0,0.9]}>
						<View style={{flex:1,flexDirection :"row-reverse",alignItems:"center",marginBottom:5,padding:10}}>
							<View style={{flex:1,justifyContent:"flex-start", paddingRight:10,paddingLeft:5}}>
								<Image source = {require('../../../img/aftersales/location.png')}
									style ={{flex:1 , minWidth: 35,minHeight: 35, maxWidth: 35,maxHeight: 35,resizeMode: 'contain', }}>
								</Image>
							</View>
							<View style={{flex:7}}>
								<Text style={{fontSize:12,color:"white", fontWeight:"bold"}}>{item.locationHeader}</Text>
								<Text note style={{fontSize:11}}>{item.locationDtls}</Text>
							</View>
						</View>
					</LinearGradient>
					)
				}
			/>
		</View>
		<View style={{flex:1, flexDirection :"column",alignItems:"center", paddingBottom:10}}>
			<View style={{flex:2,flexDirection:"row-reverse"}}>
				<View style={{flex:0.5}}/>
				<View style={{flex:3}}>
					<Button block onPress={()=> {this.state.locationServices?this.loadMap():this._openLocationSettings();}}
						style={{backgroundColor:"#2b4c7d",height:40, flex:1, margin: 5, marginTop: 10, padding:10 }}>
						<Text style={{color:"white"}}>ناونيشانمان لةسةر نةخشة</Text>
					</Button>
				
				
				</View>
				<View style={{flex:0.5}}/>
			</View>
			<View style={{flex:1}}/>
		</View>
		
	</View>
	)
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject },
  ListItemStyle:{marginLeft:0, backgroundColor :"#d1251a", paddingTop:0, paddingBottom:0, paddingLeft:0, paddingRight:0, marginBottom:5 },
  text: { fontSize: 9, fontFamily:"Futura Md BT Bold", color : "#FFF", marginBottom:10, marginTop:10, fontWeight: 'bold', paddingLeft:20},
  locationNotificationBox: {
    backgroundColor: '#f6a623',
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0
  },
  locationNotificationBoxText: {
    color: '#ffffff',
    fontWeight: 'bold',
    paddingLeft: 20
  },
  locationBoxIcon: {
    color: '#ffffff'
  },
  locationNotificationBoxInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 20
  },
});

/* ShowRoomTab.defaultProps = {
		showRoomsList: [
			{
				 
				locationHeader: "BELADI SERVICE CENTER",
				locationDtls: 1,
				
			},
			{
				 
				locationHeader: "BELADI SERVICE CENTER",
				locationDtls: "52nd street near karrada court",
			},
			{
				 
				locationHeader: "BELADI SERVICE CENTER",
				locationDtls: "52nd street near karrada court",
			},
		]
	}; */
export default ShowRoomTab