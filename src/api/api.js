const domain_service = 'http://zscoapp.com/zsco/';
//const domain_service = 'http://localhost:8080/zsco/';
const errorNetwrokEn = 'Network error';
export default {
	
	/*
		Make appointment /makeappointment/{language}/{manufacture}
	*/
	async makeAppointment (zuid, custName, custHP, custEmail, brand, dateTime, msg,state,regid, lang){
		try{
			console.log(JSON.stringify({"zuid": zuid, "custName":custName,"custHP1":custHP ,
				 "email":custEmail,"brand":brand,"appointementDateTime":dateTime, "appointementNote":msg ,"state":state,"custId":regid}));
			let response = await fetch (domain_service+'webapi/customers/makeappointment/'+lang+'/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid, "custName":custName,"custHP1":custHP ,
				 "email":custEmail,"brand":brand,"appointementDateTime":dateTime, "appointementNote":msg ,"state":state})
			});
			
			let responseJSON = await response.json();
			console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	/*
		check if should insert new mileage
	*/
	async checkShouldInsertNewMileage(lang, zuid){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/maintenance/shouldInsertNewMileage/'+lang+'/FOTON/'+zuid,
				{
					headers: {
						'Cache-Control': 'no-cache'
					}
				});
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	
	/*
		fetch Maintenace Advice List
	*/
	
	async fetchAdviceList (rangeId,lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/maintenance/adviceList/'+rangeId+'/'+lang+'/FOTON/');
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	
	async fetchAboutUs (lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/cars/aboutus/'+lang+'/FOTON/');
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	
	},
	
	async fetchNewsList (lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Promotions/newslist/'+lang+'/FOTON/');
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	
	},
	/*
	fetch parts list
	*/
	async fetchPartsList (lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Parts/listing/'+lang+'/FOTON/');
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	
	},
	/*
		Save New Mileage
	*/
	async saveNewMileageAndGetRecomendations(zuid, newMileage , lastMileage ){
		try{
			
			let response = await fetch (domain_service+'webapi/maintenance/saveNewMileage/EN/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid, "currentMileage":newMileage, "lastMileage" : lastMileage})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(errorNetwrokEn);
			console.log(error);
		}
	},
	
	/*
		Save New Mileage
	*/
	async resetOilAndKilometer(zuid ){
		try{
			
			let response = await fetch (domain_service+'webapi/maintenance/resetAllMileage/EN/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(errorNetwrokEn);
			console.log(error);
		}
	},
	
	
	/*
		Save Oil change Mileage
	*/
	async saveOilChangeMileage(zuid, newMileage , lang ){
		try{
			
			let response = await fetch (domain_service+'webapi/maintenance/saveOilChangeMileage/'+lang+'/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid, "currentMileage":newMileage})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			console.log(error);
		}
	},
	
	
	/*
		checkOil
	*/
	async checkOilShouldChange(zuid, lang ){
		try{
			
			let response = await fetch (domain_service+'webapi/maintenance/checkoil/EN/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			console.log(error);
		}
	},
	
	/*
		get the last mileage
	*/
	async getLastMileage(lang, zuid){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/maintenance/lastmileage/'+lang+'/FOTON/'+zuid,
				{
					headers: {
						'Cache-Control': 'no-cache'
					}
				});
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	
	/*
		get the last Oil changed mileage
	*/
	async getLastOilChangedMileage(lang, zuid){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/maintenance/LastMileageOilChange/'+lang+'/FOTON/'+zuid);
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	/*
	*/
	 async fetchReservationFiltersList(lang){
		try{
			let response = await fetch (domain_service+'webapi/customers/Reservationfilters/'+lang+'/FOTON/');
			let responseJSON = await response.json();
			//console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert("You're Network connection is not stable");
			return "error_nt";
		}
	},		
	async addAppPlayerId(playerid, zuid){
		try{
			
			let response = await fetch (domain_service+'webapi/customers/newplayerid/EN/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"playerid": playerid, "zuid": zuid})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			console.log(error);
		}
	},
	/*
		save lang pref
	*/
	async saveLangPreference(zuid, lang){
		try{	
			let response = await fetch (domain_service+'webapi/customers/setlang/EN/FOTON/',{
					method: 'PUT',
					headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid, "appLang":lang})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			console.log(error);
		}
	},
	/*
		add the app user
	*/
	async addAppUser(deviceID, maker, os , model , lang){
		try{
			
			let response = await fetch (domain_service+'webapi/customers/newuser/EN/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"deviceUniqueId": deviceID, "maker":maker,"model":model, "os":os})
			});
			//console.log(response);
			let responseJSON = await response.json();
			//console.log("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			console.log(error);
		}
	},
	
	/*
		contact us
	*/
	async sendContactUsMsg (zuid, custName, custHP1, custEmail , msg ,lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/customers/sendContactUsMsg/'+lang+'/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid": zuid, "custName":custName,"hp":custHP1 ,"email":custEmail, "msg":msg})
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	
	/*
	get register customer info
	*/
	async getRegisterCustomerInfo(custId , lang){
		try{
			
			let response = await fetch (domain_service+'webapi/customers/getreginfo/'+lang+'/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"custId": custId})
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			//alert("You're Network connection is not stable");
			return "error_nt";
		}
	
	},
	
	async cancelRegisteration (zuid, custId, lang){
		try{
			let response = await fetch (domain_service+'webapi/customers/cancelreg/'+lang+'/FOTON/',{
				method: 'DELETE',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid":zuid, "custId":custId })
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	/*
	to register customers
	*/
	async registerCustomer(zuid, custId, custName , custHP1, custEmail , vinId , playerid, lang){
		try{
			let response = await fetch (domain_service+'webapi/customers/reg/'+lang+'/FOTON/',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"zuid":zuid, "custId":custId ,"custName": custName, "custHP1":custHP1,"email":custEmail, "vinId":vinId , "playerid" : playerid})
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	
	},
	
	async registerForPromotion(promoId, custName , custHP1, custEmail){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Promotions/requestpromo',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"promoid":promoId ,"custName": custName, "custHp":custHP1,"custEmail":custEmail})
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	
	},
	
	/*
	 to get list of all special promptions
	*/
	async fetchSpecialPromosList(zuid, lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Promotions/specialList/'+zuid+'/'+lang+'/FOTON');
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	/*
	 to get list of all promptions
	*/
	
	async fetchPromosList(lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Promotions/list/'+lang+'/FOTON');
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	
	
	/*
	 to get list of all cars
	*/
	
	async fetchCarList(lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/cars/list/'+lang+'/FOTON');
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	/*
		to get single car details
	*/
	async fetchCarDetails(carid,lang){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/cars/car/'+lang+'/'+carid);
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	async checkPart(sn){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/Parts/check',{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({"partSerialNo": sn})
			});
			
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	async fetchPerodicalRangesList(lang, zuid){
		try{
			//alert("before fetching");
			let response = await fetch (domain_service+'webapi/maintenance/periodicalranges/'+zuid+'/'+lang+'/FOTON',{method : 'GET'});
			let responseJSON = await response.json();
			//alert("adter fetching"+responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	async fetchShowRoomsList(lang){
		try{
			let restCall = await fetch (domain_service+'webapi/locations/list/ShowRooms/FOTON/'+lang,{
			method : 'GET',});
			let responseJSON = await restCall.json();
			console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
	async fetchServiceCentersList(lang){
		try{
			let restCall = await fetch (domain_service+'webapi/locations/list/serviceCenters/FOTON/'+lang,{
			method : 'GET',});
			let responseJSON = await restCall.json();
			console.log(responseJSON);
			return responseJSON;
		}catch(error){
			alert(error);
		}
	},
}