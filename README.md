# Yogi-Auction  
[요기옥션](https://yogi-auction.shop) 웹 프로젝트입니다. 모바일 화면을 우선으로 개발되었습니다. 태블릿 이상 화면에서의 레이아웃은 개선 예정입니다.

## 개요
next.js와 firebase를 사용해 구현한 사용자간 직접 거래 앱입니다. 사용자는 원하는 가격에 물건을 거래하거나, 원하는 가격을 제시 할 수 있습니다. 원하는 물건이 없는 경우, 상품 등록을 요청할 수 있습니다.  

기능은 계속 업데이트 예정입니다.  

관리용 어드민은 다른레포지토리를 참고해주세요. ([admin-yogi-auction](https://github.com/lee-donghyun/admin-yogi-auction))


## 기술 스택
- typescript : 규모가 커지더라도 부담이 없다. 컴파일 과정에서 에러를 내서, 예상치 못한 버그를 최대한 줄일 수 있다. 컴포넌트 props 자동완성으로, 개발 효율성을 올려준다.
- firebase : 백엔드 개발없이 사용자 인증, 서버등을 구현 할 수 있다. 인증은 firebase rest api를 통해 구현했고, firestore 및 cloud storage 는 sdk를 사용해 구현했다.
- tailwindcss : html 엘리먼트와 한 곳에서 스타일을 함으로서 개발속도가 빠르고, 반응형에 대한 지원이 잘 되어있다. 가독성이 떨어지고, 번들크기가 커진다는 단점이 있다.
- next.js : ssr과 routing을 간단하게 처리 할 수 있다. vercel이 지속적으로 지원해준다. 다양한 라이브러리에 대응이 잘 되어있다.
- recoil : atom과 selector, 내장 훅의 조합으로 간단하게 전역 상태를 관리 할 수 있다. 비동기 처리도 기본기능으로 구현이 가능하다.
- swr : 데이터 페칭을 간단하고 직관적으로 구현 할 수 있다. next.js에서 정적으로 생성된 페이지의 경우 fallback 데이터를 통해 페이지를 유지하며 최신 데이터를 보장받을 수 있다. 무한 스크롤과 같은 부가기능도 지원한다.


## 배포
[https://yogi-auction.shop](https://yogi-auction.shop)
vercel을 사용합니다. main 브랜치에 push하면 배포 됩니다.

## 로컬 서버
```
npm i && npm run dev
```
