(function() {
    angular.module('ChatApp', [])
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$document', '$window'];

    function ChatController($scope, $document, $window) {
        $document.ready(function() {
            var socket = io();
            $scope.receivedMsg = [];
            $scope.eraser = eraser;
            var eraserMode = false;
            $scope.sendMsg = sendMsg;
            $scope.displayOnly = false;

            function sendMsg() {
                socket.emit('chat message', $scope.msg);
                console.log('Emitted chat mess:' + $scope.msg);
                $scope.msg = '';
            }

            socket.on('chat message', function(msg) {
                console.log(msg);
                $scope.receivedMsg.push(msg);
                $scope.$digest();

            });
            var ctx = document.getElementById('canvas1').getContext('2d');
            var displayOnlyCtx = document.getElementById('canvas2').getContext('2d');
            ctx.lineJoin = ctx.lineCap = displayOnlyCtx.lineJoin = displayOnlyCtx.lineCap = 'round';
            var isDrawingFlag = false;

            socket.on('start_draw', function(data){
            	console.log(data);
            	if(isDrawingFlag) return;
            	$scope.displayOnly = true;
            	$scope.$digest();
            	displayOnlyCtx.moveTo(data.x, data.y);
            	displayOnlyCtx.lineWidth = data.width;
            	displayOnlyCtx.strokeStyle = data.style;
            	displayOnlyCtx.beginPath();

            });

            socket.on('draw_data', function(data){
            	displayOnlyCtx.lineTo(data.x, data.y);
            	displayOnlyCtx.stroke();
            })

            document.getElementById('canvas1').onmousemove = function(evt) {
                //var msg = "Handler for .mousemove() called at ";

                if (isDrawingFlag) {
                    //ctx.beginPath();
                    ctx.lineTo(evt.offsetX, evt.offsetY);
                    ctx.stroke();
                    socket.emit('draw_data', {
                        x: evt.offsetX,
                        y: evt.offsetY
                    });

                }
            }

            document.getElementById('canvas1').onmousedown = function(evt) {
                ctx.moveTo(evt.offsetX, evt.offsetY);
                if (eraserMode) {
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = '#FFFFFF';
                } else {
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = '#000000';
                }
                ctx.beginPath();

                isDrawingFlag = true;
                socket.emit('start_draw', {
                    x: evt.offsetX,
                    y: evt.offsetY,
                    width: ctx.lineWidth,
                    style: ctx.strokeStyle
                });

                $scope.$digest();
            }

            document.getElementById('canvas1').onmouseup = function stop_draw() {
                console.log('up');
                isDrawingFlag = false;
            }

            function eraser() {
                eraserMode = !eraserMode;
            }

            function colorPicker() {

            }
        });
    }
})();