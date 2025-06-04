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
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null,

	isRegistered: false,  // true if registration succeeded
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.isAuthenticated = false;
			state.user = null;
			state.isRegistered = false;
			state.error = null;
		},
		resetRegisterFlag(state) {
			state.isRegistered = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// Register user
		builder
			// Register user
			.addCase(registerUserAction.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.isRegistered = false;
			})
			.addCase(registerUserAction.fulfilled, (state, action) => {
				state.loading = false;
				state.isRegistered = true; // Registration success
				state.user = action.payload;
				state.error = null;
			})
			.addCase(registerUserAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isRegistered = false;
			})

			// Login user
			.addCase(loginUserAction.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.isAuthenticated = false;
			})
			.addCase(loginUserAction.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true; // Login success
				state.user = action.payload;
				state.error = null;
			})
			.addCase(loginUserAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.isAuthenticated = false;
			});
	},
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;