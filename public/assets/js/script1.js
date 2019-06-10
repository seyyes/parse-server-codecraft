Parse.initialize("myAppId");

Parse.serverURL = 'http://localhost:1337/parse';

var Post = Parse.Object.extend("Post");

var post = new Post();
//ajout de colonnes
//post.set("body","Hello my name is Seynabou");
//post.set("tags", ["first post", "welcome"]);
//post.set("numComments", 0);

//On peut aussi tout mettre dans un tableau et le mettre à la place de null
var data = {
  "body": "Hello my name is Seynabou",
  "tags": ["first-post", "welcome"],
  "numComments": 0,
  "author": "Seynabou Sene"
};

post.save(data, {
  success: function(obj){
    console.log("Successfully saved " + obj.id);
    //One-To-One relationship
    var Comment = Parse.Object.extend("Comment");
    var comment = new Comment();
    comment.set("message", "This is an awesome comment");
    comment.set("parent", post);
    comment.save(null, {
      success: function(obj){
        console.log("Saved comment " + obj.id);
        
        //One-To-Many relationship (here One post can have many comments)
        var comments = post.relation("comments");
        comments.add(comment);        
        post.save();
      }
    });
    
    var q = new Parse.Query("Post");
    q.get(post.id, {
      success: function(obj) {
        console.log("successfully got "+ obj.id);
        
        obj.set("body","This is an updated message");
        obj.increment("numComments");
        obj.add("tags", "updated-post");
        
        obj.save(null, {
          success: function(obj) {
            console.log("successfully edited "+ obj.id);
            
//            obj.destroy({
//              success: function(obj){
//                console.log("Successfully destroyed " + obj.id);
//              },
//              error: function(obj, err) {
//              console.error(err);
//            }
//            });//to delete one value we can use unset and destroy to delete a whole line
            
            
            
          },
          error: function(obj, err) {
            console.error(err); 
          }
        });
        
        
      },
      error: function(obj, err) {
       console.error(err); 
      }
    });
  },
  error: function(obj, err){
    console.error(err);
  }
});















