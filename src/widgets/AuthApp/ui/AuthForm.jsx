import { useLocation, Link, useNavigate } from "react-router-dom";
import FluentCommaIcon from "@assets/svg/fluent_comma.svg?react";
import { useInput } from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  registerUserAction,
} from "../../../redux/slice/auth/authSlice.js";

export default function AuthForm() {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    isAuthenticated,
    isRegistered,
    error: errorRedux,
  } = useSelector((state) => state.auth);

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
  } = useInput("", (value) => value.trim() !== "");

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value) => value.length >= 5);

  const {
    value: confirmPasswordValue,
    handleInputChange: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
  } = useInput("", () => true);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else if (isRegistered) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, isRegistered, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      if (nameValue.trim() === "") {
        setError("Введите имя");
        return;
      }
      if (passwordValue.length < 5) {
        setError("Пароль должен быть минимум 5 символов");
        return;
      }
      if (passwordValue !== confirmPasswordValue) {
        setError("Пароли не совпадают");
        return;
      }
      if (!agreed) {
        setError("Вы должны принять политику конфиденциальности");
        return;
      }

      dispatch(
        registerUserAction({
          username: nameValue,
          password: passwordValue,
          password_confirm: confirmPasswordValue,
        })
      );
    } else {
      if (passwordValue.length < 5) {
        setError("Пароль должен быть минимум 5 символов");
        return;
      }
      dispatch(
        loginUserAction({
          username: nameValue,
          password: passwordValue,
        })
      );
    }
  };
  return (
    <div className='flex justify-center items-center min-h-screen '>
      <div className='w-full sm:max-w-4xl rounded-xl overflow-hidden sm:shadow-lg flex flex-col gap-4 sm:gap-0 sm:flex-row items-center sm:items-start sm:h-[27rem]'>
        {/* Left Side - Form */}
        <div className='w-full sm:h-full sm:w-1/2 p-8  bg-[#ECF7FF] shadow rounded-xl sm:rounded-none am:shadow-none'>
          <h2 className='text-2xl text-[#4A4A4A] mb-6'>
            {isLogin ? "Вход в Cixid" : "Регистрация в Cixid"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Имя */}
            <input
              type='text'
              placeholder='Имя'
              className='w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring'
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
            />

            {/* Пароль */}
            <input
              type='password'
              placeholder='Пароль'
              className='w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring'
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />

            {/* Подтвердить пароль */}
            {!isLogin && (
              <input
                type='password'
                placeholder='Повторить пароль'
                className='w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring'
                value={confirmPasswordValue}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
              />
            )}

            {!isLogin && (
              <label className='flex items-start gap-2 text-sm text-gray-600 mb-4'>
                <input
                  type='checkbox'
                  className='mt-1 accent-blue-600'
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  Я принимаю{" "}
                  <a
                    href='/privacy-policy'
                    className='text-[#1976D2] hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    политику конфиденциальности
                  </a>
                </span>
              </label>
            )}

            {(error || errorRedux) && (
              <p className='text-red-600 mb-4 text-sm font-medium'>
                {error ||
                  errorRedux?.message ||
                  errorRedux?.error ||
                  JSON.stringify(errorRedux)}
              </p>
            )}

            <button
              type='submit'
              className='w-full bg-[#1976D2] hover:bg-blue-700 text-white flex justify-center items-center py-2 rounded font-medium transition'
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
          <p className='mt-4 text-sm text-center'>
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <Link
              to={isLogin ? "/auth/register" : "/auth/login"}
              className='text-[#1976D2] hover:underline'
            >
              {isLogin ? "Регистрация" : "Вход"}
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className='w-full sm:w-1/2 rounded-xl shadow-lg sm:shadow h-[11.625rem]  sm:h-full sm:rounded-none bg-indigo-300 text-white flex flex-col items-center justify-center p-6 relative'>
          <h3 className='text-[2rem] font-semibold text-center mb-2'>
            Реализуй свои <br />
            <span className='font-bold'>цели</span>.
            <span className='text-[1.375rem] font-light'> Не чужие.</span>
          </h3>
          <div
            className={
              "absolute sm:top-[28%] sm:left-12 top-[10%] left-5 text-lg"
            }
          >
            <FluentCommaIcon />
          </div>
          <div
            className={
              "absolute sm:bottom-[28%] sm:right-22 bottom-[10%] right-5 text-lg"
            }
          >
            <FluentCommaIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
