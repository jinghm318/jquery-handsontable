describe('Core_onKeyDown', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      this.$container.remove();
    }
  });

  it('should advance to next cell when TAB is pressed', function () {
    //https://github.com/warpech/jquery-handsontable/issues/151
    handsontable();
    selectCell(0, 0);
    keyDownUp('tab');
    expect(getSelected()).toEqual([0, 1, 0, 1]);
  });

  it('while editing, should finish editing and advance to next cell when TAB is pressed', function () {
    //https://github.com/warpech/jquery-handsontable/issues/215
    handsontable();
    selectCell(1, 1);
    keyDownUp('enter');
    this.$keyboardProxy.val('Ted');
    keyDownUp('tab');
    expect(getData()[1][1]).toEqual('Ted');
    expect(getSelected()).toEqual([1, 2, 1, 2]);
  });

  it('while editing, should finish editing and advance to lower cell when down arrow is pressed', function () {
    //https://github.com/warpech/jquery-handsontable/issues/215
    handsontable();
    selectCell(1, 1);
    keyDownUp('enter');
    this.$keyboardProxy.val('Ted');
    keyDownUp('arrow_down');
    expect(getData()[1][1]).toEqual('Ted');
    expect(getSelected()).toEqual([2, 1, 2, 1]);
  });

  it('while editing, should finish editing and advance to upper cell when up arrow is pressed', function () {
    //https://github.com/warpech/jquery-handsontable/issues/215
    handsontable();
    selectCell(1, 1);
    keyDownUp('enter');
    this.$keyboardProxy.val('Ted');
    keyDownUp('arrow_up');
    expect(getData()[1][1]).toEqual('Ted');
    expect(getSelected()).toEqual([0, 1, 0, 1]);
  });

  it('while editing, should finish editing and advance to next cell when right arrow is pressed', function () {
    //https://github.com/warpech/jquery-handsontable/issues/215
    handsontable();
    selectCell(1, 1);
    keyDownUp('enter');
    this.$keyboardProxy.val('Ted');
    keyDownUp('arrow_right');
    expect(getData()[1][1]).toEqual('Ted');
    expect(getSelected()).toEqual([1, 2, 1, 2]);
  });

  it('while editing, should finish editing and advance to previous cell when left arrow is pressed and the text cursor is at position 0', function () {
    //this test almost always *succeeds* in Chrome so be sure to also test in FF, IE
    //https://github.com/warpech/jquery-handsontable/issues/215
    runs(function () {
      handsontable();
      selectCell(2, 2);
      keyDownUp('enter');
      this.$keyboardProxy.val('Ted');
      setCaretPosition(0); //set's text cursor to the beginning of the textarea
      keyDownUp('arrow_left');
      expect(getData()[2][2]).toEqual('Ted');
      expect(getSelected()).toEqual([2, 1, 2, 1]);
    });
  });
});