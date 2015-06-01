describe('getDivAttribute', function() {
  var d = document.querySelector('title');

  it('Should show the title of the index page', function() {
    expect(d.innerHTML().toBe('Firechat - open source chat built on Firebase');
  });
});