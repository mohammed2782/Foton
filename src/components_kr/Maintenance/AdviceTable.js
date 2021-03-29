import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
FlatList,
StyleSheet,
View,
ImageBackground,
Image,
AsyncStorage,
ScrollView,
KeyboardAvoidingView 
} from 'react-native';

//import * as globalStyles from '../../styles/global';
import api from '../../api/api.js';
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
  ListItem,
  Form,
  Label,
  Input
} from "native-base";

export  class AdviceTable_kr extends   Component <{}>{
	constructor (props){
			super(props);
			//alert("this is const");
			this.state ={
				adviceList :null,
				isLoading : true,
				rangeId : this.props.navigation.state.params.rangeId,
				startRange : this.props.navigation.state.params.startRange,
				endRange :this.props.navigation.state.params.endRange,
			}
	}
		async componentDidMount(){
			
			const adviceListJSON = await api.fetchAdviceList(this.state.rangeId, 'KR');
			this.setState({ adviceList : adviceListJSON , isLoading:false });
			
			console.log(this.state);
	}
    renderRow(data) {
		
		return (
			<View style={{ flexDirection: 'row-reverse' ,borderBottomWidth:0.5, borderRadius:3,borderColor: 'grey',}}>
				<View style={{flex:1, padding:10, borderLeftWidth:0.5,borderColor: 'grey' }} >
					
					<Text style={styles.title}>
						{data.title}
					</Text>
				</View>
				<View style={{ padding:10, flexDirection:'row', flex: 3, flexWrap: 'wrap'}}>
					<Text style={styles.briefDesc}>
						{data.msg}
					</Text>
				</View>
				
			</View>
		);
		
    }

    render() {
        if (this.state.isLoading)
				return (<View><Image source={require('../../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
        return (
			<ImageBackground style={styles.backgroundImage}
					 source={require('../../../img/mileage/BG.png')} blurRadius={0} resizeMode = "cover">
				<View style={{flexDirection:"column" , flex:1 , justifyContent:"flex-start"}}>
					<View style={{flexDirection : "row-reverse" ,marginTop:20,alignItems:"flex-start", paddingLeft:0}}>
						<View style={{flex:0.5}}/>
						<View style={{flex:1, justifyContent : "flex-start", alignItems:"flex-start" , }}>
							<Button	transparent onPress={() => this.props.navigation.goBack()}>
								<Image source={require("../../../img/inner/backar.png")}  
									style={{ flex:1,width: "100%",height: "100%",resizeMode: 'contain'}}/>
							</Button>
						</View>
						<View style={{flex:5}}/>
						<View style={{flex:1, alignSelf: "flex-end",marginLeft:10, }}>
							<Image source={require('../../../img/inner/logo.png')}
								style={{flex:1,alignSelf: "flex-end",width: "100%",height: "100%",resizeMode: 'contain'}}/>
						</View>
						<View style={{flex:0.5}}/>	
					</View>
					<View style={{flex:1, justifyContent : "flex-start", alignItems:"flex-end" ,marginRight:20 , marginTop:20}}>
						<Text style = {{color:'white', fontSize:15, fontWeight:"700", fontFamily:'Futura Md BT Bold'}}>
								 التوصيات {this.state.startRange} - {this.state.endRange} كيلومتر
							</Text>
					</View>
					<View style={{flex:10,backgroundColor:"rgba(43, 75, 122,0.7)" , marginLeft:20 , marginRight:20}}>
						<FlatList 
							data={this.state.adviceList}
							contentContainerStyle={{alignSelf: "stretch" , justifyContent:"flex-start"}}
							style ={{ borderWidth:1 , borderRadius:7,borderColor: 'grey', }}
							keyExtractor={item => item.msgid.toString()}
							renderItem={({item}) =>(
								this.renderRow(item)
								)	
							}
						/>
					</View>
					<View style={{flex:2}}/>
				</View>
				</ImageBackground>
        );
    }
}
const styles = StyleSheet.create(
		{
			backgroundImage: {flex: 1, width:undefined, height:undefined },
			briefDesc:{
				fontFamily :"Franklin Gothic Book Regular",
				fontSize : 12,
				color : "white",
				marginTop : 10,
				paddingLeft:5,
				marginRight:5,
				flexWrap: "wrap",
				flex:1,
				textAlign:"right"
			},
			title:{
				fontFamily :"Franklin Gothic Book Regular",
				fontSize : 13,
				color : "white",
				marginTop : 10,
				paddingLeft:5,
				marginRight:5,
				flexWrap: "wrap",
				fontWeight:"500",
				flex:1,
			},
			
		}
	);