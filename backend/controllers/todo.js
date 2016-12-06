'use strict';

var db = require(__dirname + '/../lib/mysql');

exports.sign_in = function(req, res, next){
	//console.log(req.query);

	var query_string = 'SELECT * FROM User WHERE user_handle=? && password=?';
	var request_data = [req.query.handle, req.query.password];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			if(result.length != 0){
				console.log("Successfully logged-in");
				req.session.user = {
					user_id: result[0].userid,
					fullname: result[0].user_full_name,
					username: result[0].user_handle,
					password: result[0].password
				};
				req.session.save();
				return res.send(req.session.user);
			}
			else{
				return res.send({value: 0, message: 'User name and password do not match!'});
			}
		}
	});
};

exports.create_account = function(req, res, next){

	//console.log(req.query);
	var query_string = 'INSERT INTO User(user_full_name, user_handle, password, email, followers) VALUES(?,?,?,?,?)';
	var request_data = [req.query.fullname, req.query.handle, req.query.password, req.query.email, req.query.followers];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log("1");
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'Account created successfully!'});
		}
	});
};


exports.sign_out = function(req, res, next){
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	  	return res.send({message: 'Account logged out successfully!'});
	  }
	});
};

exports.get_tweets = function(req, res, next){

	var query_string = 'SELECT * FROM Tweets NATURAL JOIN User WHERE userid=? ORDER BY tweet_time DESC';
	var request_data = [req.session.user.user_id]
	db.query(query_string, request_data, function(err, result){
		//console.log(result);
		res.send(result);
	});
};

exports.get_logged = function(req, res, next){
	return res.send(req.session.user);
};

exports.get_tweetcount = function(req, res, next){
	
	var query_string = 'SELECT count(t.tweet) tweetcount FROM Tweets t WHERE t.userid = ?';
	var request_data = [req.session.user.user_id];

	db.query(query_string, request_data, function(err, result){
		//console.log(result);
		res.send(result);
	});

};

exports.get_followerscount = function(req, res, next){
	
	var query_string = 'SELECT count(f.followerid) followerscount FROM Followers f WHERE f.userid = ?';
	var request_data = [req.session.user.user_id];

	db.query(query_string, request_data, function(err, result){
		//console.log(result);
		res.send(result);
	});

};


exports.post_tweet = function(req, res, next){

	//console.log(req.query);
	var query_string = 'INSERT INTO Tweets(tweet, tweet_likes, tweet_retweets, tweet_time, userid) VALUES(?,?,?,now(),?)';
	var request_data = [req.query.tweet, req.query.likes, req.query.retweets, req.session.user.user_id];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			return res.send({message: 'Tweet sent.'});
		}
	});
};


exports.delete_tweet = function(req, res, next){
	
	//console.log(req.query);
	var query_string = 'DELETE FROM Tweets WHERE tweetid=?';
	var request_data = [req.query.tweetid];

	db.query(query_string, request_data, function(err, result){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}else{
			console.log(result);
			return res.send({message: 'Tweet deleted.'});
		}
	});
};