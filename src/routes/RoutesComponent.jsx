import React from "react";
import Loading from "../components/loading/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/not-found";
import { routes } from "../pages/routes";
import { Layout } from "../components/Layout";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectAuth } from "../redux/state/auth";

const RoutesComponent = () => {

  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onIdle = () => {
    if (user) {
      Swal.fire({
        title: 'Su sesión ha expirado. Vuelva a iniciar sesión.', confirmButtonColor: '#facea8', icon: 'warning', customClass: {
          title: 'title_sweet_alert',
        }, allowOutsideClick: false
      });
      dispatch(logoutUser());
    }
  }

  useIdleTimer({
    onIdle,
    timeout: 10000
  })

  const { isLoading } = useProduct();

  useAuth();

  if (isLoading) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map((route, key) => (
            <Route
              index={route.isIndex}
              key={key}
              {...(!route.isIndex ? { path: route.path } : {})}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
