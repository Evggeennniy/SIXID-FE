import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../util/baseURL";


//register
export const registerUserAction = createAsyncThunk(
	'user/register',
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			const config = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"withCredentials": true,
				},
				body: JSON.stringify(payload),
			};

			const res = await fetch('/api/auth/register/', config);

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
//login
export const loginUserAction = createAsyncThunk(
	"user/login",
	async (payload, { rejectWithValue }) => {
		try {
			const config = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			};

			const res = await fetch("/api/auth/login/", config);

			if (!res.ok) {
				const errorData = await res.json();
				return rejectWithValue(errorData);
			}

			const data = await res.json();
			return data; // probably contains user info and tokens
		} catch (error) {
			return rejectWithValue(error.message || "Network error");
		}
	}
);

const initialState = {
	user: null,
	accessToken: localStorage.getItem('access') || null,
	refreshToken: localStorage.getItem('refresh') || null,
	loading: false,
	error: null,
	isRegistered: false,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.access = null;
			state.refresh = null;
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			state.loading = false;
			state.error = null;
			state.isRegistered = false;
			state.isAuthenticated = false
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
				localStorage.setItem('access', access);
			}
			if (refresh) {
				state.refreshToken = refresh;
				localStorage.setItem('refresh', refresh);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Registration
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

			// Login
			.addCase(loginUserAction.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUserAction.fulfilled, (state, action) => {
				const { access, refresh } = action.payload;
				if (access) {
					state.accessToken = access;
					localStorage.setItem('access', access);
				}
				if (refresh) {
					state.refreshToken = refresh;
					localStorage.setItem('refresh', refresh);
				}
				state.loading = false;
				state.isAuthenticated = true
			})
			.addCase(loginUserAction.rejected, (state, action) => {
				state.isAuthenticated = false
				state.loading = false;
				state.error = action.payload || 'Login failed';
			});
	},
});

export const { logout, resetRegisterFlag, setTokens } = authSlice.actions;
export default authSlice.reducer;