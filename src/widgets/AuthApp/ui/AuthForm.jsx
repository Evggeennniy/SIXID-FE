import {useLocation, Link, useNavigate} from "react-router-dom";
import FluentCommaIcon from "@assets/svg/fluent_comma.svg?react";
import { useInput } from "../../../hooks/useInput";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUserAction, registerUserAction} from "../../../redux/slice/auth/authSlice.js";

export default function AuthForm() {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const navigate = useNavigate();

  const { isRegistered, error: errorRedux ,isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    value: nameValue,
    handleInputBlur: handleNameBlur,
    handleInputChange: handleNameChange,
  } = useInput("", (value) => value.trim() !== "");

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
  } = useInput("", (value) => value.length >= 6);

  const {
    value: confirmPasswordValue,
    handleInputBlur: handleConfirmPasswordBlur,
    handleInputChange: handleConfirmPasswordChange,
  } = useInput("", () => true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      console.log('navigate')
    }else if (isRegistered) {
      navigate("/auth/login");
    }
  }, [isRegistered,isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // clear local error on submit

    if (!isLogin) {
      if (passwordValue !== confirmPasswordValue) {
        setError("Пароли не совпадают");
        return;
      }
      if (nameValue.trim() === "") {
        setError("Введите имя");
        return;
      }
      if (passwordValue.length < 6) {
        setError("Пароль должен быть минимум 6 символов");
        return;
      }
      dispatch(
          registerUserAction({
            username: nameValue,
            password: passwordValue,
            password_confirm: passwordValue,
          })
      );
    } else {
      if (passwordValue.length < 6) {
        setError("Пароль должен быть минимум 6 символов");
        return;
      }
      // TODO: dispatch login action here
      dispatch(loginUserAction({ username: nameValue, password: passwordValue }));
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg flex">
          {/* Left Side - Form */}
          <div className="w-1/2 p-8 bg-blue-50">
            <h2 className="text-2xl text-[#4A4A4A] mb-6">
              {isLogin ? "Вход в Cixid" : "Регистрация в Cixid"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Имя - только для регистрации */}
                  <input
                      type="text"
                      placeholder="Имя"
                      className="w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring"
                      value={nameValue}
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                  />

              {/* Пароль */}
              <input
                  type="password"
                  placeholder="Пароль"
                  className="w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
              />

              {/* Подтверждение пароля - только при регистрации */}
              {!isLogin && (
                  <input
                      type="password"
                      placeholder="Повторить пароль"
                      className="w-full mb-4 px-4 py-2 border border-[#E2E2E2] rounded focus:outline-none focus:ring"
                      value={confirmPasswordValue}
                      onChange={handleConfirmPasswordChange}
                      onBlur={handleConfirmPasswordBlur}
                  />
              )}

              {/* Ошибка */}
              {(error || errorRedux) && (
                  <p className="text-red-600 mb-4 text-sm font-medium">
                    {error ||
                        errorRedux?.message ||
                        errorRedux?.error ||
                        JSON.stringify(errorRedux)}
                  </p>
              )}

              <button
                  type="submit"
                  className="w-full bg-[#1976D2] text-center! hover:bg-blue-700 text-white py-2 rounded font-medium transition"
              >
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </button>
            </form>
            <p className="mt-4 text-sm text-center">
              {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
              <Link
                  to={isLogin ? "/auth/register" : "/auth/login"}
                  className="text-[#1976D2] hover:underline"
              >
                {isLogin ? "Регистрация" : "Вход"}
              </Link>
            </p>
          </div>

          {/* Right Side - Visual */}
          <div className="w-1/2 bg-indigo-300 text-white flex flex-col items-center justify-center p-6 relative">
            <h3 className="text-[32px] font-semibold text-center mb-2">
              Реализуй свои <br />
              <span className="font-bold">цели</span>.
              <span className="text-[22px] font-light"> Не чужие.</span>
            </h3>
            <div className={"absolute top-[28%] left-12 text-lg"}>
              <FluentCommaIcon />
            </div>
            <div className={"absolute bottom-[28%] right-22 text-lg"}>
              <FluentCommaIcon />
            </div>
          </div>
        </div>
      </div>
  );
}