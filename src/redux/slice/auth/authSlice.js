// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { BASE_URL } from "../../../util/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import fetchWithAuth from '../../../util/fetchWithAuth'
// // //register
// export const registerUserAction = createAsyncThunk(
// 	'user/register',
// 	async (payload, { rejectWithValue, getState, dispatch }) => {
// 		try {
// 			const config = {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					"withCredentials": true,
// 				},
// 				body: JSON.stringify(payload),
// 			};

// 			const res = await fetch('/api/auth/register/', config);

// 			if (!res.ok) {
// 				const errorData = await res.json();
// 				return rejectWithValue(errorData);
// 			}

// 			const data = await res.json();
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(error.message || 'Network error');
// 		}
// 	}
// );
// //login
// export const loginUserAction = createAsyncThunk(
// 	"user/login",
// 	async (payload, { rejectWithValue }) => {
// 		try {
// 			const config = {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(payload),
// 			};

// 			const res = await fetch("/api/auth/login/", config);

// 			if (!res.ok) {
// 				const errorData = await res.json();
// 				return rejectWithValue(errorData);
// 			}

// 			const data = await res.json();
// 			return data; // probably contains user info and tokens
// 		} catch (error) {
// 			return rejectWithValue(error.message || "Network error");
// 		}
// 	}
// );

// const initialState = {
// 	user: null,
// 	accessToken: localStorage.getItem('access') || null,
// 	refreshToken: localStorage.getItem('refresh') || null,
// 	loading: false,
// 	error: null,
// 	isRegistered: false,
// 	isAuthenticated: false,
// };

// const authSlice = createSlice({
// 	name: 'auth',
// 	initialState,
// 	reducers: {
// 		logout: (state) => {
// 			state.access = null;
// 			state.refresh = null;
// 			localStorage.removeItem('access');
// 			localStorage.removeItem('refresh');
// 			state.loading = false;
// 			state.error = null;
// 			state.isRegistered = false;
// 			state.isAuthenticated = false
// 			state.user = null;
// 		},


// 		resetRegisterFlag(state) {
// 			state.isRegistered = false;
// 			state.error = null;
// 		},
// 		setTokens: (state, action) => {
// 			const { access, refresh } = action.payload;
// 			if (access) {
// 				state.accessToken = access;
// 				localStorage.setItem('access', access);
// 			}
// 			if (refresh) {
// 				state.refreshToken = refresh;
// 				localStorage.setItem('refresh', refresh);
// 			}
// 		},
// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			// Registration
// 			.addCase(registerUserAction.pending, (state) => {
// 				state.loading = true;
// 				state.error = null;
// 				state.isRegistered = false;
// 			})
// 			.addCase(registerUserAction.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.isRegistered = true;
// 				state.user = action.payload.user;
// 			})
// 			.addCase(registerUserAction.rejected, (state, action) => {
// 				state.loading = false;
// 				state.error = action.payload || 'Registration failed';
// 				state.isRegistered = false;
// 			})

// 			// Login
// 			.addCase(loginUserAction.pending, (state) => {
// 				state.loading = true;
// 				state.error = null;
// 			})
// 			.addCase(loginUserAction.fulfilled, (state, action) => {
// 				const { access, refresh } = action.payload;
// 				if (access) {
// 					state.accessToken = access;
// 					localStorage.setItem('access', access);
// 				}
// 				if (refresh) {
// 					state.refreshToken = refresh;
// 					localStorage.setItem('refresh', refresh);
// 				}
// 				state.loading = false;
// 				state.isAuthenticated = true
// 			})
// 			.addCase(loginUserAction.rejected, (state, action) => {
// 				state.isAuthenticated = false
// 				state.loading = false;
// 				state.error = action.payload || 'Login failed';
// 			});
// 	},
// });

// export const { logout, resetRegisterFlag, setTokens } = authSlice.actions;
// export default authSlice.reducer;




// Register user action (using cookies, no manual token handling)
export const registerUserAction = createAsyncThunk(
	'user/register',
	async (payload, { rejectWithValue }) => {
		try {
			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			};

			const res = await fetch('/api/auth/register/', config); // No need for fetchWithAuth here

			if (!res.ok) {
				const errorData = await res.json();
				return rejectWithValue(errorData);
			}

			const data = await res.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message || 'Network error');
		}
	}
);

export const loginUserAction = createAsyncThunk(
	'user/login',
	async (payload, { rejectWithValue }) => {
		try {
			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			};

			const res = await fetch('/api/auth/login/', config); // login is public, no token needed yet

			if (!res.ok) {
				const errorData = await res.json();
				return rejectWithValue(errorData);
			}

			const data = await res.json();

			// Save access and refresh tokens as cookies
			if (data.access && data.refresh) {
				Cookies.set('access', data.access, {
					secure: true,
					sameSite: 'Strict',
					// expires: 1, // in days, optional
				});
				Cookies.set('refresh', data.refresh, {
					secure: true,
					sameSite: 'Strict',
					// expires: 7, // optional
				});
			}

			return data;
		} catch (error) {
			return rejectWithValue(error.message || 'Network error');
		}
	}
);
const initialState = {
	user: null,
	accessToken: Cookies.get('access') || null,
	refreshToken: Cookies.get('refresh') || null,
	loading: false,
	error: null,
	isRegistered: false,
	isAuthenticated: !!Cookies.get('access'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			Cookies.remove('access');
			Cookies.remove('refresh');
			state.accessToken = null;
			state.refreshToken = null;
			state.loading = false;
			state.error = null;
			state.isRegistered = false;
			state.isAuthenticated = false;
			state.user = null;
		},

		resetRegisterFlag(state) {
			state.isRegistered = false;
			state.error = null;
		},

		setTokens: (state, action) => {
			const { access, refresh } = action.payload;
			if (access) {
				state.accessToken = access;
				Cookies.set('access', access, { expires: 7 });
			}
			if (refresh) {
				state.refreshToken = refresh;
				Cookies.set('refresh', refresh, { expires: 7 });
			}
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(registerUserAction.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.isRegistered = false;
			})
			.addCase(registerUserAction.fulfilled, (state, action) => {
				state.loading = false;
				state.isRegistered = true;
				state.user = action.payload.user;
			})
			.addCase(registerUserAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Registration failed';
				state.isRegistered = false;
			})

			.addCase(loginUserAction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUserAction.fulfilled, (state, action) => {
				const { access, refresh } = action.payload;
				if (access) {
					state.accessToken = access;
					Cookies.set('access', access, { expires: 7 });
				}
				if (refresh) {
					state.refreshToken = refresh;
					Cookies.set('refresh', refresh, { expires: 7 });
				}
				state.loading = false;
				state.isAuthenticated = true;
			})
			.addCase(loginUserAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || 'Login failed';
				state.isAuthenticated = false;
			});
	},
});

export const { logout, resetRegisterFlag, setTokens } = authSlice.actions;
export default authSlice.reducer;