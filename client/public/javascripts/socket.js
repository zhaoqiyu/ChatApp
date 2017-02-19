(function() {
    angular.module('ChatApp', [])
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$document', '$window'];

    function ChatController($scope, $document, $window) {
        var socket = io();
        $scope.receivedMsg = [];
        $scope.mouseDownFlag = false;


        console.log('????');
        $scope.sendMsg = sendMsg;

        function sendMsg() {
            socket.emit('chat message', $scope.msg);
            console.log('Emitted chat mess:' + $scope.msg);
            $scope.msg = '';
        }

        socket.on('chat message', function(msg) {
            console.log(msg);
            $scope.receivedMsg.push(msg);
        });
        $document.ready(function() {
            var c = document.getElementById('canvas1');
            $scope.ctx = c.getContext('2d');

            document.getElementById('canvas1').onmousemove = function(evt) {
                //var msg = "Handler for .mousemove() called at ";
                if ($scope.mouseDownFlag) {
                    $scope.ctx.lineTo(evt.offsetX, evt.offsetY);
                    $scope.ctx.stroke();
                }
                //msg += event.offsetX + ", " + event.offsetY;
                //console.log(msg);
            };

            document.getElementById('canvas1').onmousedown = function(evt) {
                console.log(evt);
                $scope.ctx.moveTo(evt.offsetX, evt.offsetY);
                $scope.mouseDownFlag = true;
                // $scope.timerId = setInterval(function(){
                // 	console.log($window);
                // 	console.log('test');
                // 	console.log(evt);
                // 	//console.log(window.event.offsetX, window.event.offsetY);
                // 	//ctx.lineTo(window.event.offsetX, window.event.offsetY);
                // 	ctx.stroke();
                // }, 300);
                $scope.posX = evt.offsetX;
                $scope.posY = evt.offsetY;

                $scope.$digest();
            }

            document.getElementById('canvas1').onmouseup = function stop_draw() {
                console.log('up');
                $scope.mouseDownFlag = false;
                //clearInterval($scope.timerId);
            }

        })


        function drawLine(context, x, y) {
            console.log(context);
            context.lineTo(x, y);
            context.stroke();
        }

    }
})();