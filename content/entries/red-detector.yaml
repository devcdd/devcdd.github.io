code: LAB-001
title: 혈액 감지 센서 모듈 개발
type: service
status: building
created: 2026-10-14
updated: 2026-10-19
tags: [hardware, esp32, sensor]
summary: >
  환자의 혈액을 감지하기 위한 목적으로, 짧은 거리의 붉은색을 감지하여
  비프음을 내는 센서형 모듈을 제작하기 위한 계획.

flow:
  - label: 전원 ON
    detail: 깨끗한 솜과 투명 밴드 위에 기기를 얹은 뒤 확장 보드의 스위치를 켬
  - label: 기준값 저장
    detail: 깨끗한 흰 솜을 여러 번 측정해 평균을 기준값으로 저장하고, 확인음을 한 번 울림
  - label: 측정
    detail: 센서의 흰색 LED가 켜진 상태로 R·G·B 값을 읽음 (기기가 덮어 생기는 그림자가 주변광을 줄여줌)
  - label: 기준 대비 판정
    detail: 흰 솜 기준보다 빨강 비율이 오르고 초록이 크게 줄었는가? (혈액은 초록을 강하게 흡수)
  - label: 부저 ON
    detail: 3회 연속 혈액으로 판정되면 확장 보드 내장 부저로 소리 출력

goals:
  - 솜 위 투명 밴드에 얹은 상태(센서–솜 5~10mm)에서 혈액이 스며드는 것을 안정적으로 감지
  - 선홍색부터 검붉은색, 시간이 지나 갈변한 혈액까지 다양한 혈액 색을 감지
  - 케이블 없이 배터리만으로 동작하는 휴대용 형태
  - 전원을 켜면 별도 조작 없이 바로 감지

milestones:
  - title: 요구사항 분석
    due: 2026-10-14
    done: true
  - title: 제품 제작 계획 스케치
    due: 2026-10-18
    done: true
  - title: 부품 구매
    done: false

sections:
  - heading: 부품
    beforeMilestones: true
    body: |
      ### XIAO Ver

      | 부품 | 모델 | 역할 | 가격 |
      | --- | --- | --- | --- |
      | 마이크로컨트롤러 | [Seeed XIAO ESP32-C3 (Pre-Soldered) [102010633]](https://www.devicemart.co.kr/goods/view?no=15781764) | 센서 데이터 처리 | 10,780원<br>해외 · 약 1주 |
      | 확장 보드 | [Seeeduino XIAO 확장보드 [103030356]](https://www.devicemart.co.kr/goods/view?no=13113589) | 배터리 커넥터·충전, 전원 스위치, 부저, Grove 포트 | 26,290원<br>국내 · 1~3일 |
      | 컬러 센서 | [Grove - I2C Color Sensor V2 [101020341]](https://www.devicemart.co.kr/goods/view?no=1342781) | 흰색 LED로 비추고 반사광의 R·G·B 측정 | 15,070원<br>해외 · 약 2주 |
      | 배터리 | [LiPo 3.7V 500mAh (JST PH 2.0mm 2핀)](https://prod.danawa.com/bridge/go_link_goods.php?cate_c1=860&cate_c2=13735&cate_c3=14885&cate_c4=0&cmpny_c=TH201&link_prod_c=9654437802&cate=11230088) | 휴대용 전원 | 19,600원 |
      | **합계** | | | **71,740원**<br>배송비 제외 |

      ### 아두이노 Ver

      | 부품 | 모델 | 역할 | 가격 |
      | --- | --- | --- | --- |
      | 마이크로컨트롤러 | [아두이노 우노 R3 USB-C 타입 호환 보드](https://www.coupang.com/vp/products/7539807001?itemId=19817671099&vendorItemId=93893252793) | 센서 데이터 처리 | 11,380원 |
      | 컬러 센서 | [Grove - I2C Color Sensor V2 [101020341]](https://www.devicemart.co.kr/goods/view?no=1342781) | 흰색 LED로 비추고 반사광의 R·G·B 측정 | 15,070원<br>해외 · 약 2주 |
      | 변환 케이블 | [Grove - 4 pin Male Jumper to Grove 4 pin Conversion Cable (5개입) [110990210]](https://m.devicemart.co.kr/goods/view/1153480) | Grove 센서·부저를 우노 핀에 연결 | 3,200원 |
      | 부저 | [능동 부저 모듈 Grove Type](https://www.coupang.com/vp/products/8151070394?itemId=23197208849&vendorItemId=90229804125) | 혈액 감지 시 소리 출력 | 1,800원 |
      | 전원 | 미니 보조배터리 (소전류 모드 지원) | 휴대용 전원, 전원 ON/OFF | 미정 |
      | **합계** | | | **31,450원**<br>보조배터리·배송비 제외 |
