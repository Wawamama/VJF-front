import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native'
import { Text, Input, Overlay } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { MY_IP } from '@env'
import LastOrder from '../Components/LastOrder'

const LastOrderScreen = props => {
	const [overlay, setOverlay] = useState(false)
	const [choice, setChoice] = useState('')
	const [mealId, setMealId] = useState('')
	const [voted, setVoted] = useState(false)
	const [hasOrder, setHasOrder] = useState(true)

	const handleThumbClick = async userchoice => {
		setChoice(userchoice)
		setOverlay(true)
		setVoted(true)
		updateUser(userchoice)
	}

	const updateUser = async choice => {
		const token = props.token
		if (choice === 'good') {
			try {
				const data = await fetch(
					`https://vite-jai-faim.herokuapp.com/users/favorites`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: `token=${token}&meal_id=${mealId}`,
					}
				)
				const result = await data.json()
			} catch (err) {
				console.log(err.message)
			}
		} else if (choice === 'bad') {
			try {
				const data = await fetch(
					`https://vite-jai-faim.herokuapp.com/users/blacklist/${token}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
						body: `mealId=${mealId}`,
					}
				)
				const result = await data.json()
			} catch (err) {
				console.log(err.message)
			}
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<Text h3 style={styles.text}>
				Votre dernière commande
			</Text>
			<LastOrder
				mealId={mealId}
				setMealId={setMealId}
				hasOrder={hasOrder}
				setHasOrder={setHasOrder}
			/>
			{!voted && hasOrder && (
				<View>
					<Text h4 style={styles.text}>
						Qu'en avez vous pensé ?
					</Text>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							marginTop: 20,
						}}
					>
						<TouchableOpacity onPress={() => handleThumbClick('bad')}>
							<Image
								style={styles.tinyLogo}
								source={require('../assets/thumbdown.png')}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleThumbClick('good')}>
							<Image
								style={styles.tinyLogo}
								source={require('../assets/thumbup.png')}
								onPress={() => handleThumbClick('good')}
							/>
						</TouchableOpacity>
					</View>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<Input
							placeholder="Ajoutez un commentaire"
							style={{ marginTop: 40, marginHorizontal: 10 }}
						/>
					</KeyboardAvoidingView>
				</View>
			)}
			<Overlay
				isVisible={overlay}
				onBackdropPress={() => setOverlay(false)} // REMOVE FOR PRODUCTION
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
					textAlign: 'center',
				}}
			>
				<Text h4>Merci</Text>
				{choice === 'good' ? (
					<Text>Nous avons ajouté le plat à vos favoris</Text>
				) : (
					<Text>Vous ne recevrez plus ce plat</Text>
				)}
			</Overlay>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	text: {
		textAlign: 'center',
		marginTop: 40,
	},
	tinyLogo: {
		width: 80,
		height: 80,
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(LastOrderScreen)
