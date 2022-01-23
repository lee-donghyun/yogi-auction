const defaultValue = {
  imageList: [
    "https://cdn-images.farfetch-contents.com/17/52/88/28/17528828_37443323_480.jpg",
  ],
  ask: [
    {
      id: "default option id",
      name: "S",
      price: "₩2,000,000",
      quantity: 11,
    },
    {
      id: "default option id-1",
      name: "M",
      price: "₩2,400,000",
      quantity: 1,
    },
    {
      id: "default option id-0",
      name: "L",
      price: "₩1,800,000",
      quantity: 12,
    },
    {
      id: "default option idasdf",
      name: "XL",
      price: "₩1,400,000",
      quantity: 2,
    },
  ],
  bid: [
    {
      id: "default option iwtd",
      name: "S",
      price: "₩2,300,000",
      quantity: 1,
    },
    {
      id: "default optiorgn id",
      name: "M",
      price: "₩2,700,000",
      quantity: 2,
    },
    {
      id: "default optiasdfon id",
      name: "L",
      price: "₩1,900,000",
      quantity: 1,
    },
    {
      id: "default ophttion id",
      name: "XL",
      price: "₩1,900,000",
      quantity: 6,
    },
  ],
  description:
    "The Air Jordan 1 High Bred Patent features black and red patent leather upper with signature weaved Nike Air tongue labels. From there, a classic Wings logo on the collar and a white with red Air sole complete the retro design.",
  lastSalePrice: "₩1,900,000",
};

export const items: Item.ListItem[] & Item.Item[] = [
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/56/66/42/17566642_37574954_480.jpg",
    name: "콘트라스트 스티치 데님 재킷",
    lowestAsk: "₩2,000,000",
    id: "0",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/56/66/42/17566642_37574954_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/78/23/43/17782343_37461530_480.jpg",
    name: "청키 체인 네크리스",
    lowestAsk: "₩580,000",
    id: "1",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/78/23/43/17782343_37461530_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/69/87/16/17698716_37290281_480.jpg",
    name: "로고 패치 탱크 탑",
    lowestAsk: "₩613,000",
    id: "2",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/69/87/16/17698716_37290281_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/58/73/33/17587333_37288581_480.jpg",
    name: "와이드 팬츠",
    lowestAsk: "₩724,000",
    id: "3",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/58/73/33/17587333_37288581_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/86/41/20/17864120_37589778_480.jpg",
    name: "로고 프린트 스트라이프 스웨트셔츠",
    lowestAsk: "₩535,000",
    id: "4",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/86/41/20/17864120_37589778_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/81/72/82/17817282_37588588_480.jpg",
    name: "오렌지 주스 프린트 티셔츠",
    lowestAsk: "₩202,000",
    id: "5",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/81/72/82/17817282_37588588_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/81/86/80/17818680_37523695_480.jpg",
    name: "컬러블록 버뮤다 쇼츠",
    lowestAsk: "₩597,000",
    id: "6",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/81/86/80/17818680_37523695_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/84/54/92/17845492_37601114_480.jpg",
    name: "스타디움 로우탑 스니커즈",
    lowestAsk: "₩1,185,000",
    id: "7",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/84/54/92/17845492_37601114_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/72/74/09/17727409_37577903_480.jpg",
    name: "커브 헴 스웨터",
    lowestAsk: "₩2,363,000",
    id: "8",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/72/74/09/17727409_37577903_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/99/09/17839909_37568836_480.jpg",
    name: "버튼 업 긴소매 셔츠",
    lowestAsk: "₩1,034,000",
    id: "9",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/99/09/17839909_37568836_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/85/35/70/17853570_37623083_480.jpg",
    name: "테이퍼드 유틸리티 팬츠",
    lowestAsk: "₩1,460,000",
    id: "10",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/85/35/70/17853570_37623083_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/45/79/25/17457925_37465433_480.jpg",
    name: "트레드 하이탑 스니커즈",
    lowestAsk: "₩1,050,000",
    id: "11",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/45/79/25/17457925_37465433_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/80/58/35/17805835_37519422_480.jpg",
    name: "V넥 니트 베스트",
    lowestAsk: "₩1,208,000",
    id: "12",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/80/58/35/17805835_37519422_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/84/22/78/17842278_37594262_480.jpg",
    name: "그래픽 프린트 티셔츠",
    lowestAsk: "₩197,000",
    id: "13",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/84/22/78/17842278_37594262_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/44/37/27/17443727_36599248_480.jpg",
    name: "데보스드 로고 시어링 로퍼 뮬",
    lowestAsk: "₩660,000",
    id: "14",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/44/37/27/17443727_36599248_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/37/26/17833726_37594031_480.jpg",
    name: "로고 프린트 스트레이트 트랙팬츠",
    lowestAsk: "₩581,000",
    id: "15",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/37/26/17833726_37594031_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/75/24/17/17752417_37399352_480.jpg",
    name: "로고 자수 후디",
    lowestAsk: "₩910,000",
    id: "16",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/75/24/17/17752417_37399352_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/10/73/85/17107385_37072332_480.jpg",
    name: "플로럴 프린트 티셔츠",
    lowestAsk: "₩500,000",
    id: "17",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/10/73/85/17107385_37072332_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/10/73/52/17107352_35432232_480.jpg",
    name: "패널 버뮤다 쇼츠",
    lowestAsk: "₩910,000",
    id: "18",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/10/73/52/17107352_35432232_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/14/89/26/46/14892646_25993446_480.jpg",
    name: "플랫폼 로우탑 스니커즈",
    lowestAsk: "₩1,030,000",
    id: "19",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/14/89/26/46/14892646_25993446_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/52/98/34/17529834_37440766_480.jpg",
    name: "옵티컬 발렌티노 자카드 트랙재킷",
    lowestAsk: "₩1,700,000",
    id: "20",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/52/98/34/17529834_37440766_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/49/18/17834918_37566522_480.jpg",
    name: "나뭇잎 참 해머드 네크리스",
    lowestAsk: "₩1,215,000",
    id: "21",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/49/18/17834918_37566522_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/52/98/01/17529801_37439765_480.jpg",
    name: "옵티컬 발렌티노 자카드 트랙팬츠",
    lowestAsk: "₩1,700,000",
    id: "22",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/52/98/01/17529801_37439765_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/45/66/65/17456665_37400727_480.jpg",
    name: "퀼팅 패디드 벨트 백",
    lowestAsk: "₩1,596,000",
    id: "23",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/45/66/65/17456665_37400727_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/40/37/90/17403790_37376139_480.jpg",
    name: "더블 브레스티드 블레이저",
    lowestAsk: "₩3,100,000",
    id: "24",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/40/37/90/17403790_37376139_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/32/80/12/17328012_37238824_480.jpg",
    name: "로커 터레인 초커 네크리스",
    lowestAsk: "₩1,708,000",
    id: "25",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/32/80/12/17328012_37238824_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/40/39/50/17403950_37357178_480.jpg",
    name: "미드라이즈 스트레이트 팬츠",
    lowestAsk: "₩1,230,000",
    id: "26",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/40/39/50/17403950_37357178_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/74/62/34/17746234_37495775_480.jpg",
    name: "타입 153 더비 슈즈",
    lowestAsk: "₩1,233,000",
    id: "27",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/74/62/34/17746234_37495775_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/46/31/08/17463108_37124040_480.jpg",
    name: "싱글 브레스티드 울 모헤어 수트 재킷",
    lowestAsk: "₩2,860,000",
    id: "28",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/46/31/08/17463108_37124040_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/45/92/28/17459228_37496802_480.jpg",
    name: "트레드 슬릭 하이탑 스니커즈",
    lowestAsk: "₩1,050,000",
    id: "29",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/45/92/28/17459228_37496802_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/42/72/91/17427291_37421543_480.jpg",
    name: "매듭 디자인 브레이슬릿",
    lowestAsk: "₩460,000",
    id: "30",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/42/72/91/17427291_37421543_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/83/81/17838381_37598033_480.jpg",
    name: "4G 칼라 셔츠",
    lowestAsk: "₩1,607,000",
    id: "31",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/83/81/17838381_37598033_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/66/91/14/17669114_37015587_480.jpg",
    name: "골지 니트 베스트",
    lowestAsk: "₩1,288,000",
    id: "32",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/66/91/14/17669114_37015587_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/58/70/25/17587025_36878489_480.jpg",
    name: "경량 코튼 스카프",
    lowestAsk: "₩241,000",
    id: "33",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/58/70/25/17587025_36878489_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/58/73/32/17587332_37288514_480.jpg",
    name: "와이드 팬츠",
    lowestAsk: "₩743,000",
    id: "34",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/58/73/32/17587332_37288514_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/15/68/60/62/15686062_28547516_480.jpg",
    name: "가죽 앵클 부츠",
    lowestAsk: "₩1,323,000",
    id: "35",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/15/68/60/62/15686062_28547516_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/80/07/32/17800732_37628226_480.jpg",
    name: "골지 니트 스웨터",
    lowestAsk: "₩853,000",
    id: "36",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/80/07/32/17800732_37628226_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/50/39/17835039_37531236_480.jpg",
    name: "타이어 가죽 첼시 부츠",
    lowestAsk: "₩1,480,000",
    id: "37",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/50/39/17835039_37531236_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/90/74/17839074_37617267_480.jpg",
    name: "벨트 카고 쇼츠",
    lowestAsk: "₩1,103,000",
    id: "38",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/90/74/17839074_37617267_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/82/94/60/17829460_37523985_480.jpg",
    name: "+ 로고 프린트 크로스 백",
    lowestAsk: "₩525,000",
    id: "39",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/82/94/60/17829460_37523985_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/53/03/90/17530390_36594663_480.jpg",
    name: "로고 프린트 셔츠",
    lowestAsk: "₩1,400,000",
    id: "40",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/53/03/90/17530390_36594663_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/81/45/90/17814590_37490115_480.jpg",
    name: "브이로고 시그니처 브레이슬릿",
    lowestAsk: "₩294,000",
    id: "41",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/81/45/90/17814590_37490115_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/52/98/03/17529803_37441543_480.jpg",
    name: "스톤워싱 와이드 진",
    lowestAsk: "₩1,100,000",
    id: "42",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/52/98/03/17529803_37441543_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/58/50/41/17585041_37019626_480.jpg",
    name: "원 스터드 로우탑 스니커즈",
    lowestAsk: "₩826,000",
    id: "43",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/58/50/41/17585041_37019626_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/83/07/87/17830787_37566347_480.jpg",
    name: "퍼넬 넥 패딩 보머 재킷",
    lowestAsk: "₩2,700,000",
    id: "44",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/83/07/87/17830787_37566347_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/75/36/05/17753605_37364477_480.jpg",
    name: "엠보스드 로고 티셔츠",
    lowestAsk: "₩590,000",
    id: "45",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/75/36/05/17753605_37364477_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/58/50/37/17585037_37524178_480.jpg",
    name: "트랙스터드 가죽 로퍼",
    lowestAsk: "₩1,008,000",
    id: "46",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/58/50/37/17585037_37524178_480.jpg",
      ...defaultValue.imageList,
    ],
  },
  {
    image:
      "https://cdn-images.farfetch-contents.com/17/52/88/28/17528828_37443323_480.jpg",
    name: "옵티컬 발렌티노 프린트 트랙팬츠",
    lowestAsk: "₩2,100,000",
    id: "47",
    ...defaultValue,
    imageList: [
      "https://cdn-images.farfetch-contents.com/17/52/88/28/17528828_37443323_480.jpg",
      ...defaultValue.imageList,
    ],
  },
];
