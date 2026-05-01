전체 구조의 흐름은 아래와 같습니다. 저는 1-1~1-4의 흐름을 구현하였습니다.
```
src/
├── controllers/
│   └── store.controller.js
├── services/
│   └── store.service.js
├── repositories/
│   └── store.repository.js
├── routes/
│   └── store.route.js
└── db.js
```
1-1. 특정 지역에 가게 추가 API

endpoint : POST /api/v1/regions/:regionId/stores

1. 사용자가 특정 지역에 추가할 가게 정보를 요청으로 보낸다.
2. store.route.js에서 /regions/:regionId/stores 요청을 받는다.
3. store.controller.js의 createStore()가 실행된다.
4. Controller는 URL의 regionId와 요청 body의 name, address, score를 Service로 넘긴다. 
5. Service는 가게 이름과 주소가 입력되었는지 검사한다.
6. Repository가 DB의 store 테이블에 가게 정보를 저장한다.
7. 저장할 때 location_id에는 regionId가 들어간다.
8. DB 저장이 완료되면 Repository는 생성된 가게 정보를 Service로 반환한다.
9. Service는 결과를 Controller로 반환한다.
10. Controller는 사용자에게 “가게 추가 성공” 응답을 보낸다.

1-2. 가게에 리뷰 추가 API

endpoint : POST /api/v1/stores/:storeId/reviews

1. 사용자가 리뷰 내용을 입력하고 요청을 보낸다.
2. store.route.js에서 /stores/:storeId/reviews 요청을 받는다.
3. store.controller.js의 createReview()가 실행된다.
4. Controller는 storeId, memberId, body, score를 Service로 넘긴다.
5. Service는 리뷰를 추가하려는 가게가 실제로 존재하는지 검사한다.
6. Repository가 DB의 store 테이블에서 가게를 조회한다.
7. 가게가 존재하면 Repository가 review 테이블에 리뷰를 저장한다.
8. 저장된 리뷰 정보를 Controller로 반환하고, Controller는 응답을 보낸다.

1-3. 가게에 미션 추가 API

endpoint : POST /api/v1/stores/:storeId/missions

1. 사용자가 특정 가게에 추가할 미션 정보를 요청으로 보낸다.
2. store.route.js에서 /stores/:storeId/missions 요청을 받는다.
3. store.controller.js의 createMission()이 실행된다.
4. Controller는 storeId, reward, deadline, missionSpec을 Service로 넘긴다.
5. Service는 해당 가게가 존재하는지 먼저 검사한다.
6. Repository가 DB의 store 테이블에서 가게를 조회한다.
7. 가게가 존재하면 Repository가 mission 테이블에 미션 정보를 저장한다.
8. 저장된 미션 정보를 응답으로 반환한다.

1-4. 가게의 미션을 도전 중인 미션에 추가 API

endpoint : POST /api/v1/missions/:missionId/challenge

1. 사용자가 특정 미션에 도전 요청을 보낸다.
2. store.route.js에서 /missions/:missionId/challenge 요청을 받는다.
3. store.controller.js의 challengeMission()이 실행된다.
4. Controller는 memberId, missionId를 Service로 넘긴다.
5. Service는 먼저 해당 미션이 존재하는지 검사한다.
6. Repository가 DB의 mission 테이블에서 미션을 조회한다.
7. Service는 사용자가 이미 해당 미션에 도전 중인지 검사한다.
8. Repository가 mission_member 테이블에서 중복 데이터를 조회한다.
9. 중복이 없으면 Repository가 mission_member 테이블에 진행중 상태로 저장한다.
10. 저장된 도전 미션 정보를 응답으로 반환한다.
