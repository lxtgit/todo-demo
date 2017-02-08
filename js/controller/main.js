
// 控制器
(function(angular){
	'use strict';
	var controllers = angular.module('app.controller.main',[]);
	controllers.controller('MainController',['$scope','$routeParams','$route',function($scope,$routeParams,$route) {
		

		//  获取id
		function getID() {
			var newid = Math.random();
			for(var i = 0;i<$scope.list.length;i++) {
				if(newid===$scope.list.id) {
					newid = getId();
				}
			}
			return newid;	
		}

		// 暴露文本框
		$scope.txt='';
		// 暴露列表数据
		$scope.list = [
			{
				id:0.1,
				name:'学习',
				completed:false
			},
			{
				id:0.2,
				name:'睡觉',
				completed:false
			},
			{
				id:0.3,
				name:'打豆豆',
				completed:true
			}
		];

		// 往列表里添加项目
		$scope.add = function() {
			if($scope.txt) {
				$scope.list.push({
					id:getID(),
					name: $scope.txt,
					completed:false
				});
			} else {
				return;
			}
			$scope.txt='';
		};

		// 在列表里删除项目
		$scope.remove = function(id) {
			for(var i = 0; i<$scope.list.length;i++) {
				if($scope.list[i].id === id) {
					$scope.list.splice(i,1);
					break;
				}
			}
		}

		// 清除已经完成的项目
		$scope.clear = function() {
			var result = [];
			for(var i = 0; i<$scope.list.length;i++) {
				if(!$scope.list[i].completed) {
					result.push($scope.list[i]);
				}
			}
			$scope.list = result;
		};

		// 根据有没有完成的项目 判断是否隐藏清除按钮  在这里必须得有返回值
		$scope.show = function() {
			for(var i = 0; i<$scope.list.length;i++) {
				if($scope.list[i].completed) {
					return true;
				}
			}
			return false;
		};

		// 编译元素
		$scope.currentElementId = -1;
		$scope.editElementId = function(id) {
			$scope.currentElementId = id;
		};
		$scope.save = function() {
      		$scope.currentElementId = -1;
    	};

    	// 全选或反选
    	var now = true;
    	$scope.selectAll = function () {
    		for(var i = 0; i<$scope.list.length;i++) {
    			$scope.list[i].completed = now;
    		}
    		now = !now;
    	};


    	// 点击显示效果
    	var status = $routeParams.status;
  		$scope.selector = {};	
  			switch(status) {
  			  case 'active':
  				$scope.selector = {completed:false};
  				break;
  			  case 'completed':
  				$scope.selector = {completed:true};
  				break;
  			  default:
  			    $route.updateParams({status:''}); 
  				$scope.selector = {};
  				break;
  			}
  		
  		// 自定义比较函数  filter默认是模糊匹配
  		$scope.equalCompare = function(source, target) {
      		return source === target;
    };

    }]);
})(angular);