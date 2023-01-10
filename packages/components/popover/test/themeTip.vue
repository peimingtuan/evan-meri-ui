<template>
	<m-tips content="我是提示文字" trigger="click">
		<template #content>
			<div class="tip-pop-bg">
				<div class="tip-pop-item">
					<div class="box"></div>
					供冷季：03.12-04.20
				</div>
				<div class="tip-pop-item">
					<div class="box box1"></div>
					过渡季：04.21-06.20、04.21-06.20
				</div>
				<div class="tip-pop-item">
					<div class="box box2"></div>
					供暖季：04.21-06.20、04.21-06.20
				</div>
			</div>
		</template>
		<m-button>白底</m-button>
	</m-tips>
	<m-tips content="我是提示文字" theme="darkTransparent" placement="right-start" trigger="click">
		<template #content>
			<div class="tip-pop">
				<div class="popover-title">空调</div>
				<div class="popover-main">
					<div class="popover-left">
						<div class="popover-left-item">
							<div class="popover-left-item-text">已发布策略</div>
							<div class="popover-left-item-number">54</div>
						</div>
						<div>
							<div class="popover-left-item-text">已发布策略</div>
							<div class="popover-left-item-number">54</div>
						</div>
					</div>
					<div class="popover-right">
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
						<div class="popover-right-item">品质优先&nbsp;36</div>
					</div>
				</div>
			</div>
		</template>
		<m-button>透明黑底</m-button>
	</m-tips>
</template>

<style lang="less" scoped>
.tip-pop-bg {
	height: 140px;
	width: 260px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.tip-pop-item {
		display: flex;
		align-items: center;
	}
	.box {
		width: 10px;
		height: 10px;
		background-color: #0091ff;
		border-radius: 50%;
		margin:0 10px;
	}
	.box.box1 {
		background-color: #25B9DA;
	}
	.box.box2 {
		background-color: #FFA53D;
	}
}
.tip-pop {
	.popover-title {
		font-weight: 700;
	}
	.popover-main {
		display: flex;
		.popover-left {
			margin-right: 20px;
		}
	}
}
</style>
