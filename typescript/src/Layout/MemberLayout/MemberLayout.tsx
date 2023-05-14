import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useUserStore } from "../../stores";

export default function MemberLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      alert("로그인 정보가 없습니다.");
      navigate("/api/login", { state: pathname });
    } else if (user.auth !== "ROLE_ADMIN" && user.auth !== "ROLE_USER") {
      alert("접근 권한이 없습니다.");
      navigate("/api/home", { state: pathname });
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}
