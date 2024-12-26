interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
  self?: boolean,
}

const projectsData: Project[] = [
  {
    title: 'Meal Compass',
    description: `사내에서 매번 점심 메뉴 선정 때문에 골치가 아팠습니다. 이를 해결하기 위해 메뉴 추천 서비스를 만들었습니다. 사용자는 원하는 메뉴를 선택하면 랜덤으로 메뉴를 추천해주는 서비스입니다. 이외에도 카카오맵 연동 등 추가적인 기능들을 구현해뒀습니다. 한 번 사용해보세요 !`,
    imgSrc: '/static/images/compass.png',
    href: 'https://meal-compass.cdd.co.kr',
    self: true,
  },
]

export default projectsData
