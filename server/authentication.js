function loginuser(username, password) {
    var recordedUsers = [{
        username: 'admin',
        password: 'admin',
    }, {
        username: 'user1',
        password: 'test',
    }];
    var result = false;
    recordedUsers.forEach(function(usr){
    	console.log(usr.username);
    	console.log(username);
    	console.log(usr.password);
    	if(usr.username === username && usr.password === password){
    		console.log('return true');
    		result = true;
    	}
    });

    return result;
}

module.exports = loginuser;