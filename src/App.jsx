/* eslint-disable */
import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import Navbar from './components/navbar/Navbar';
import Browse from './pages/browse/Browse';
import Contacts from './pages/contacts/Contacts';
import EditProfile from './pages/edit-profile/EditProfile';
import Home from './pages/home/Home';
import Messages from './pages/messages/Messages';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import { loadUser } from './redux/actions/auth';
import PrivateRoute from './routing/PrivateRoute';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="search" element={<Search />} />
						<Route path="sign-in" element={<SignIn />} />
						<Route path="sign-up" element={<SignUp />} />
						<Route path="profile/:username" element={<Profile />} />
						<Route path="browse" element={<Browse />} />
						<Route
							path="edit-profile"
							element={
								<PrivateRoute>
									<EditProfile />
								</PrivateRoute>
							}
						/>
						<Route
							path="contacts"
							element={
								<PrivateRoute>
									<Contacts />
								</PrivateRoute>
							}
						/>
						<Route
							path="messages"
							element={
								<PrivateRoute>
									<Messages />
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
