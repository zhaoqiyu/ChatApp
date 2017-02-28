function UserCache(){
  var userList = [];

  var User = (username, id) => {this.username = username, this.id = id};


  return{
    getUserList: function(){
      return userList;
    },
    addUser: function(username, id){
      userList.push(new User(username, id));
      return null;
    },
    removeUser: function(userid){
      userList.forEach(function(user){
        if us
      })
      var index = userList.indexOf(userid);
      if(index === -1){
        return false;
      }
      userList.splice(index);
      return true;      
    },
    flushUserList: function(){
      userList.length = 0;
    }
  }
}



module.export.UserCache;