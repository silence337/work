# Gauge Progress
gauge progress vanilla JS 

### markup

```
<div id="progress">
  <div class="bar"></div>
</div>
```

### js
```
var gProgress = new gaugeProgress({
	id : 'progress',        // element ID
	maximum : '500000',     // 최대 값 설정
	current : '200000',     // 변경되는 값 설정
	percentage : true,      // 현재 퍼센트 노출여부 : default - false
	currentNode : 'count',  // 변경값 노출 시킬 element ClassName (css 별도 컨트롤)
	maximumNode : 'maximum',// 최대값 노출 시킬 element ClassName (css 별도 컨트롤)
	fps : '1s',             // 게이지 fps ( 길이에 따라 속도 조절 )
	callback : function(){
		// 게이지 달성 구간에 따라 인터랙션을 주기 위한 callback
		// 게이지 animate 진행시작과 동시에 호출.
	}
});
```

#### changeCurrent method
```
var current = document.getElementById("price").value;
gProgress2.changeCurrent(current);
```
