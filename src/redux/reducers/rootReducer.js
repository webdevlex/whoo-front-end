/* eslint-disable */
import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import navigation from './navigation';
import profile from './profile';
import allProfiles from './allProfiles';
import thread from './thread';
import search from './search';
import profileToView from './profileToView';
import errors from './errors';

export default combineReducers({
	auth,
	alerts,
	navigation,
	profile,
	allProfiles,
	thread,
	search,
	profileToView,
	errors,
});
