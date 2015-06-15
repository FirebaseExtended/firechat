describe('Loaded Libraries', function() {
  it('The Firebase library should be loaded', function() {
  	var createFirebase = function() {
  		return new Firebase('https://brilliant-fire-2797.firebaseio.com');
  	};
  	expect(createFirebase).not.toThrow();
  });
});