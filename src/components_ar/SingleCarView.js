import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {
	Image,
	Linking,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	View,
	ImageBackground
} from 'react-native';
import api from '../api/api.js';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body,
  ScrollableTab
} from "native-base";
import ProgressBar from './ProgressBar';
import LinearGradient from 'react-native-linear-gradient';
import TabOne from "./SingleCarTabs/tabOne";
import TabTwo from "./SingleCarTabs/tabTwo";
import TabThree from "./SingleCarTabs/tabThree";
import styles from './CarsStyles/SingleCarView';
import Swiper from 'react-native-swiper';
import CarSpecificationsTab from './SingleCarTabs/CarSpecificationsTab';
import CarFeaturesTab from './SingleCarTabs/CarFeaturesTab';

export class SingleCarView_ar extends  Component <{}> {
	constructor(props) {
		super(props);

		this.state = {
			castsTabHeight: null,
			heightAnim: null,
			infoTabHeight: 200,
			isLoading: true,
			isRefreshing: false,
			showSimilarMovies: true,
			trailersTabHeight: null,
			tab: 0,
			youtubeVideos: [],
			car:null,
			carid:this.props.navigation.getParam("carid","NO-ID"),
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
	}
	
	
	async componentDidMount() {
		//const carid = this.props.navigation.getParam("carid","NO-ID");
		const cardtls = await api.fetchCarDetails(this.state.carid,'AR');
		//alert("this is json2 "+cardtls.carManufactureCode);
		this.setState({car : cardtls , isLoading:false});
		this.setState({ isLoading:false});
		//alert(this.props.navigation.getParam("carid","NO-ID"));
		
	}

	async _retrieveDetails(isRefreshed) {
		const cardtls = await api.fetchCarDetails(this.state.carid,'AR');
		this.setState({car : cardtls , isLoading:false});
		this.setState({ isLoading:false});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}
	
	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveDetails('isRefreshed');
	}

	
	_onChangeTab({ i, ref }) {
		this.setState({ tab: i });
	}

	
	
	_getTabHeight(tabName, height) {
		if (tabName === 'casts') this.setState({ castsTabHeight: height });
		if (tabName === 'trailers') this.setState({ trailersTabHeight: height });
	}

	render() {
		 if (this.state.isLoading)
				return (<View><Image source={require('../../img/loading.gif')} style={{width: "100%",
										height: "100%",resizeMode: "cover"}}/></View>);
		const car = this.state.car;
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
						<View style={{flex:0.5,marginTop:5,paddingBottom:5,marginRight:25,}}>
							<View style={{flex:1,flexDirection:"row-reverse",justifyContent : "flex-start",alignItems:"flex-start"}}>
								<View>
									<Text style = {{color:'white', fontSize:20, fontWeight:"700", fontFamily:'Futura Md BT Bold'}}>
										{car.carName}
									</Text>
									<Image	source = {require ('../../img/silverline.png')} 
									style ={{resizeMode:"contain",height:2,width:"100%",}}/>
								</View>
							</View>	
						</View>
						<View style={{flex:13, marginTop:10 , marginLeft:20 , marginRight:20,backgroundColor:"#2b4c7d"}}>
							
								<View style={{flex:22}}>
								<ScrollView
									style={styles.container}
									scrollEventThrottle={100}
									refreshControl={
										<RefreshControl
											refreshing={this.state.isRefreshing}
											onRefresh={this._onRefresh}
											colors={['#EA0000']}
											tintColor="white"
											title="loading..."
											titleColor="white"
											progressBackgroundColor="white"
										/>
									}>
									<View>
										<Swiper
											style={styles.swiper}
											autoplay
											autoplayTimeout={4}
											showsPagination={true}
											height={248}
											activeDotColor ="#d1251a"
											loop
											index={5}>
											{
												car.images.map((item, index) => (
													<View key={index}>
														<Image source={{ uri:item }} style={styles.imageBackdrop} />
													</View>
												))
											}
										</Swiper> 
										<View style={styles.contentContainer}>	
											<Tabs 
												tabBarBackgroundColor={'#ffffff'} 
												tabBarUnderlineStyle ={{backgroundColor:"transparent"}}
												style={{borderWidth:0}}
												initialPage={this.state.currentTab} onChangeTab={({ i }) => this.setState({ currentTab: i })}>
												
												<Tab 
													heading="مميزات"
													tabStyle= {styles.inActiveTab} 
													textStyle={{color: '#D3D3D3' , fontSize:13}} 
													activeTabStyle={styles.activeTab}  
													activeTextStyle={{color:"white", fontSize:13}}
													style={{backgroundColor:"transparent",borderRightColor:"rgb(124, 136, 155)",borderRightWidth:2}}
												>
												<LinearGradient colors={["#090f17", "transparent"]} start={{x:0.5, y:0}} end={{x:0.5, y:0.7}}locations={[0.0, 1.0]}>
													<CarFeaturesTab features={car.features} navigation = {this.props.navigation}/>
												</LinearGradient>
												</Tab>
												<Tab 
													heading = "مواصفات"
													tabStyle= {styles.inActiveTab} 
													textStyle={{color: '#D3D3D3' , fontSize:13}} 
													activeTabStyle={styles.activeTab}  
													activeTextStyle={{color:"white", fontSize:13}}
													style={{backgroundColor:"transparent",borderRightColor:"rgb(124, 136, 155)",borderRightWidth:2}}
												>
												<LinearGradient colors={["#090f17", "transparent"]} start={{x:0.5, y:0}} end={{x:0.5, y:0.7}}locations={[0.0, 1.0]}>
													<CarSpecificationsTab specs={car.specs} navigation = {this.props.navigation}/>
												</LinearGradient>
												</Tab>
											</Tabs>
										</View>
									</View>
								
								</ScrollView>
								</View>
								<View style={{flex:1}}/>
							
						</View>
						
					</View>
				</ImageBackground>
		);
	}
}



