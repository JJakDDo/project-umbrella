# 우산챙겨?!
> 초단기 날씨 공공 API를 활용해서 앞으로 6시간 동안의 날씨를 알려주는 웹 어플리케이션.  
> 외출하기 전에 우산을 챙겨야 하는지 쉽게 확인할 수 있게 만든 서비스이다.

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=Javascript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"/></a>
<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat&logo=StyledComponents&logoColor=white"/></a>

맵에서 확인하고 싶은 지역을 클릭하면 해당 지역의 날씨를 알려준다.  
날씨는 현재시간을 기준으로 앞으로 6시간 후 까지의 날씨를 알려준다.    

<img src="https://user-images.githubusercontent.com/34996487/186893781-c5ccab95-0795-4593-a27d-115b920c3ca3.png"/>  

배포 링크: [project-umbrella-chi.vercel.app/](https://project-umbrella-chi.vercel.app/)

## 설치 방법
### 클라이언트 실행
```
npm install
npm run dev
```

## 사용 예제 (기능)
### 지도 클릭
svg를 사용해서 지도를 브라우저에 랜더링을 했고 각 지역을 클릭하면 해당 지역으로 zoom-in이 되고 동시에 해당 지역의 center로 맵이 이동하게된다.

### 지역 이동
zoom-in이 된 상태에서 다음 또는 이전 지역으로 이동하기 버튼을 통해 바로 이동할 수 있다.

### 기상 정보 api
공공 api를 사용해서 해당 지역의 기상 정보 데이터를 불러온다.

### 날씨 정보
날씨 정보에는 총 4가지가 있다.
- 맑음
- 구름 조금
- 구름 많음
- 비

오후 6시부터 오전 6시까지는 달이 있는 lottie 파일이 실행되고 그 외 시간에는 해가 있는 lottie 파일이 실행된다.

<img src="https://user-images.githubusercontent.com/34996487/186894768-e6bdd4ca-f158-4a4d-9abc-61ca8c0a4c29.gif" />

## 업데이트 내역
- 1.0.0
  - 서울 지역 업데이트

## 추가할 내역
- 다른 지역 추가 예정
- 반응형 디자인 추가 예정

## 라이센스

## 외부 리소스
- svg 데이터
  - http://www.gisdeveloper.co.kr/?p=8555
