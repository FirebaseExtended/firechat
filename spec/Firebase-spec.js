describe('Loaded Libraries', function() {
  it('The Firebase library should be loaded', function() {
  	var createFirebase = function() {
  		return new Firebase('https://brilliant-fire-2797.firebaseio.com');
  	};
  	expect(createFirebase).not.toThrow();
  });
});

describe("Firebase UserRef", function() {
	it('should have a user Reference', function (done) {
		loadFixtures('fixtures/index.html');
		var createFirebase = function() {
  		return new Firebase('https://brilliant-fire-2797.firebaseio.com');
  	};
    var tokenGenerator = new FirebaseTokenGenerator("LENnUH4jYdZSk4864WZDk5VgojFCE1h7UTKXcBW3");
    var chatToken = tokenGenerator.createToken({uid: "custom:1", name: "Mark Nyon"});

  	var firebaseRef = createFirebase();
	});
});