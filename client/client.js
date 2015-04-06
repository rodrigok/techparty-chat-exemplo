Meteor.subscribe('messages');
Meteor.subscribe('users');
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

Template.messages.helpers({
	messages: function () {
		return Messages.find();
	},
	getUser: function(username) {
		return username || 'Anonimous';
	}
});

Template.users.helpers({
	users: function () {
		return Meteor.users.find();
	}
});

Template.input.events({
	'keydown .input': function (e) {
		if (e.keyCode == 13) {
			var input = $(e.currentTarget);
			Messages.insert({text: input.text(), username: Meteor.user().username});
			input.text('');
		}
	}
});

Meteor.startup(function() {
	Tracker.autorun(function() {
		console.log(Messages.find().count());
		console.log('log');
	})
})