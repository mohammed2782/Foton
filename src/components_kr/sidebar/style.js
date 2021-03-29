const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    
    height: deviceHeight / 6,
    width: null,
    position: "relative",
	 resizeMode: "center"
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 15: deviceWidth / 14,
    top: Platform.OS === "android" ? deviceHeight / 20 : deviceHeight / 18,
   
   
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 14,
	color:"white",
	textAlign:"right",
	
  },
   disabledText: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 14,
	color:"#6c8189",
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  langText:{
	color:"white" , fontSize:13, fontWeight: Platform.OS === "ios" ? "600" : "500",
  },
  linearGradient:{flex: 1,marginTop:5, marginRight:5}
};
