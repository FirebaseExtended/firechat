describe('Loaded Libraries', function() {
	var createFirebase = {};
	beforeEach(function () {
  	createFirebase = function() {
  		return new Firebase('https://brilliant-fire-2797.firebaseio.com');
  	};
	});

  it('The Firebase library should be loaded without raising an error', function() {
  	expect(createFirebase).not.toThrow();
  });

  it('The Firechat library should be loaded without raising an error', function() {
  	var firechatRef = createFirebase();
  	var createFirechat = function() {
  		return new Firechat(firechatRef);
  	};
  	expect(createFirechat).not.toThrow();
  });
});

