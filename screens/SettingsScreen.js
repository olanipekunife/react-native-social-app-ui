/* @flow */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, View, AsyncStorage } from 'react-native';
import Table, { Section, KeyValueCell, StaticCell, TouchableCell, BioCell, SwitchCell } from 'react-native-js-tableview';
import { getColorPalette } from '../assets/colors';
import { Icon } from 'expo';


export default class SettingsScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		const { theme = 'light', onToggleThemeTouched } = params;
		const palette = getColorPalette(theme);

		return {
			title: `${navigation.getParam('name')} Profile`,
		

      headerTintColor: palette.headerText,
      headerStyle: {
        backgroundColor: '#DF001D'
      },
			// headerStyle: {
			// 	backgroundColor: palette.header,
			// 	...Platform.select({ ios: { borderBottomColor: palette.headerSeparator } }),
			// },
		};
  };
  
 
	constructor(props) {
		super(props);

		const theme = 'light';
  
    
		this.state = { theme, enabledRecommendations: false, selectedBook: 0, name: '', moji: 'https://via.placeholder.com/100', phone: '', email: '', birth: '' };
		this.props.navigation.setParams({ theme, onToggleThemeTouched: this.onToggleThemeTouched });
	}
 async componentDidMount() {
      const stat = await AsyncStorage.getItem('state');
      this.props.navigation.setParams({ name: JSON.parse(stat).name });
      this.setState({ name: JSON.parse(stat).name, moji: JSON.parse(stat).moji, phone: JSON.parse(stat).phone, city: JSON.parse(stat).city, birth: JSON.parse(stat).date });
      //navigation.getParam('itemId', 'NO-ID');
    }
	onToggleThemeTouched = () => {
		const theme = (this.state.theme === 'dark') ? 'light' : 'dark';

		this.setState({ theme });
		this.props.navigation.setParams({ theme, onToggleThemeTouched: this.onToggleThemeTouched });
	};

	onBioTouched = () => {
	};

	onContactTouched = (contact) => {
		const messages = {
			phone: 'Sorry, Adam Smith is not available right now. 😀',
			email: 'Really!, The man probably haven\'t even thought about sending and receiving messages that fast.',
		};

		alert(messages[contact]);
	};

	onContactLongTouched = (contact) => {
		const messages = {
			phone: 'Adam Smith\'s phone number is copied',
			email: 'Adam Smith\'s email address is copied',
		};

		alert(messages[contact]);
	};

	onWorksTouched = (work) => {

	};

	onEnableRecommendationsSwitched = () => {
		const { enabledRecommendations } = this.state;
		this.setState({ enabledRecommendations: !enabledRecommendations });
	};

	onReminderTouched = (index) => {
		this.setState({ selectedBook: index });
	};

	onLogoutTouched = () => {

	};

	render() {
		const { theme, enabledRecommendations } = this.state;
		const palette = getColorPalette(theme);

	
		const getIcon = (name, tint) => (
      <Icon.FontAwesome
      name={name}
      color={tint || palette.icons}
      />
		);
		const getBooks = () =>
			['The Wealth of Nations', 'The Theory of Moral Sentiments', 'Lectures on Jurisprudence', 'Essays on Philosophical Subjects', 'The Essential Adam Smith']
				.map((title, index) =>
					<StaticCell
						key={index}
						title={title}
						disabled={!this.state.enabledRecommendations}
						accessory={this.state.selectedBook === index ? 'checkmark' : ''}
						hideAccessorySeparator
						onPress={this.onReminderTouched.bind(this, index)}
					/>);


		let generalHeader = 'General';
		const generalFooter = 'All materials about Adam Smith are brought to you from wikipedia.org';
		if (Platform.OS === 'ios') {
			generalHeader = generalHeader.toUpperCase();
		}

		return (
			<View style={{ backgroundColor: '#fff', flex: 1 }}>
				<StatusBar
					backgroundColor={palette.statusBar}
					barStyle={Platform.OS === 'android' || theme === 'dark' ? 'light-content' : 'dark-content'}
				/>

				<Table
					accentColor={palette.accent}
					theme={theme}
					blendAccent={false}
					style={styles.container}
					scrollable
				>

					<Section>
						<BioCell
							title={this.state.name}
							subtitle='Scottish economist, philosopher, and author.'
							photoSource={{ uri: this.state.moji }}
							accessory='details'
							onPress={this.onBioTouched}
						/>

						<KeyValueCell
							style={styles.email}
							title={this.state.phone}
							iconComponent={getIcon('phone')}
							accessory='disclosure' loading={false}
							onPress={this.onContactTouched.bind(this, 'phone')}
							onLongPress={this.onContactLongTouched.bind(this, 'phone')}
						/>

						<KeyValueCell
							style={styles.email}
							title={this.state.city}
							iconComponent={getIcon('building-o')}
							accessory='disclosure'
							onPress={this.onContactTouched.bind(this, 'email')}
							onLongPress={this.onContactLongTouched.bind(this, 'email')}
						/>
            	<KeyValueCell
							style={styles.email}
							title={this.state.birth}
							iconComponent={getIcon('birthday-cake')}
							accessory='disclosure'
							onPress={this.onContactTouched.bind(this, 'email')}
							onLongPress={this.onContactLongTouched.bind(this, 'email')}
            	/>
					</Section>

					{/* <Section header={generalHeader} footer={generalFooter} separatorInsetLeft={54}>
						<KeyValueCell
							title='Books'
							value='3 books'
							iconComponent={getIcon('book')}
							accessory='disclosure'
							customAction='www.google.com'
							customActionType='openUrl'
							customActionTrigger='onPress'
							onPress={this.onWorksTouched.bind(this, 'books')}
						/>

						<KeyValueCell
							title='Articles'
							value='238 articles'
							iconComponent={getIcon('article')}
							accessory='disclosure'
							onPress={this.onWorksTouched.bind(this, 'books')}
						/>

						<KeyValueCell
							title='Projects'
							value='8 projects'
							iconComponent={getIcon('project')}
							accessory='disclosure'
							onPress={this.onWorksTouched.bind(this, 'books')}
						/>
					</Section>

					<Section header='Select Your favorite book:'>
						<SwitchCell
							title='Enable Recommendations'
							value={enabledRecommendations}
							onSwitch={this.onEnableRecommendationsSwitched}
						/>

						{getBooks()}
					</Section> */}

					<Section>
						<TouchableCell
							title='Log Out'
							accentColor={'#B71C1C'}
							onPress={this.onLogoutTouched}
						/>
					</Section>
				</Table>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 30,
	},
	email: {
		//backgroundColor: '#fbfbfb',
	},
});
