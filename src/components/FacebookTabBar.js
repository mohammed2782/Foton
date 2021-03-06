'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
} = React;

var Icon = require('FAKIconImage');
var deviceWidth = require('Dimensions').get('window').width;

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  tabs: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0)',
  },

  activeTabTitle: {
    marginTop: 40,
    color: '#3B5998',
  },

  nonActiveTabTitle: {
    marginTop: 40,
    color: '#BDBDBD',
  },

});

var FacebookTabBar = React.createClass({

  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    tabTitles: React.PropTypes.array,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
        <View style={[styles.tab]}>
          <Icon name={name} size={30} color='#3B5998' style={{width: 30, height: 30, position: 'absolute', top: 0, left: 20}}
                ref={(icon) => { this.selectedTabIcons[page] = icon }}/>
          <Icon name={name} size={30} color='#ccc' style={{width: 30, height: 30, position: 'absolute', top: 0, left: 20}}
                ref={(icon) => { this.unselectedTabIcons[page] = icon }}/>
          <Text style={isTabActive ? styles.activeTabTitle : styles.nonActiveTabTitle}>
            {this.props.tabTitles[page]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  setAnimationValue(value) {
    var currentPage = this.props.activeTab;

    this.unselectedTabIcons.forEach((icon, i) => {
      if (value - i >= 0 && value - i <= 1) {
        icon.setNativeProps({opacity: value - i});
      }
      if (i - value >= 0 &&  i - value <= 1) {
        icon.setNativeProps({opacity: i - value});
      }
    });
  },

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  },
});

module.exports = FacebookTabBar;
