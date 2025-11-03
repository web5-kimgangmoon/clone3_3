## 이슈

1. 넷플릭스의 헤더 크기에 따른 반응을 구현하려고 했다.
2. 넷플릭스 이미지에 불투명도를 넣어주려고 했다. 그러나 filter(brightness)를 사용할 경우, 요소 내부 전체 컨텐츠에 불투명도가 추가되어 버렸다.
3. autocomplete 기능을 이용할 경우, autofill 스타일링으로 강제로 배경이 덮어씌워진다.

## 해결과정

1. 배경이미지와 관련된 스타일을 찾아보았다.
2. 넷플릭스 원본 페이지는 어떻게 했나 확인해봤고, 그 결과 해당 페이지에선 두 개의 요소를 겹쳐서 배경색을 구현했다. background-image가 background-color 위에 겹쳐지기 때문으로 하나의 요소로 배경을 표현하지 못하는게 원인으로 보인다.
3. 계속 고민했다. 어떻게 해야 autofill 기능으로 인한 강제 배경색 전환을 없앨 수 있을까. box-shadow로 덮는 방법, transition으로 delay를 주는 방법을 확인했지만, box-shadow로는 transparent를 구현할 수 없었고 transition은 결국 시간이 걸릴 뿐 autofill에 의한 강제 배경색으로 전환될 수 밖에 없었다.

## 해결된 이슈

1. 배경이미지의 object-fit 역할을 해주는 background-size를 스타일로 해결했다. 그리고 자세히 관찰해보니, cover 속성이였다.
2. object-position을 center로 맞추고, width와 height를 부모요소에 맞춰주면 됐다. 쓸데없이 어렵게 생각하고 복잡하게 돌아가 버렸다...
3. 결론은 transition-delay... 길게 늘려놓은 transition delay가 해답이였다. transition-delay가 해답인지 확신하지 못했던 이유는, netflex에서 js를 통해 추가적으로 요소를 제어했기 때문에 오해했다. 86400초라는 긴 transition delay로 제어하고 있었고, animation keyframe으로 autofill 상태를 확인하여 js로 추가적으로 제어했다.
