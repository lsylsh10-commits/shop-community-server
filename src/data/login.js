// src/data/login.js

/*
  로그인 화면에서 사용하는 임시 데이터입니다.

  추후 실제 로그인 API / 공통 인증 데이터가 연결되면
  이 파일의 데이터 또는 import 경로만 교체할 수 있도록
  화면 컴포넌트와 분리해서 관리합니다.
*/

export const socialLoginOptions = [
  {
    id: "naver",
    name: "네이버로 로그인",
    icon: "/shop-community/images/login/naver.svg",
  },
  {
    id: "kakao",
    name: "카카오로 로그인",
    icon: "/shop-community/images/login/kakao.svg",
  },
  {
    id: "google",
    name: "구글로 로그인",
    icon: "/shop-community/images/login/google.svg",
  },
];