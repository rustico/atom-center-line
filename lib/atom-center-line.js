var lastTimeClicked = new Date('01/01/1900');
var isInTop = false;

module.exports = {
    activate: function(state) {
        atom.commands.add('atom-workspace', {
            'atom-center-line:toggle': this.toggle
        });

        var editor = atom.workspace.getActiveTextEditor();
        var presenter = atom.views.getView(editor).component.presenter;
        presenter.updateScrollHeight = function() {
            console.info("Oh.. UpdateScrollHeight Removed by Atom Center Line package");
        };
    },
    deactivate: function() {

    },
    toggle: function() {
        var editor = atom.workspace.getActiveTextEditor(),
            rowPerPage = editor.getRowsPerPage(),
            cursorRow = editor.getCursorScreenPosition().row,
            defaultScrollMagicNumber = 4,
            rowsToMove;

        timeClicked = new Date();
        if(timeClicked - lastTimeClicked < 500 && isInTop) {
            rowsToMove = -(rowPerPage / 2) + 2;
            isInTop = false;
        } else {
            rowsToMove = rowPerPage - defaultScrollMagicNumber;
            isInTop = true;
        }

        var distanceToTop = cursorRow + rowsToMove;

        var currentView = atom.views.getView(editor),
            currentPresenter = currentView.component.presenter,
            distanceToTopInPixels = (distanceToTop + 3) * editor.getLineHeightInPixels();

        lastTimeClicked = timeClicked;

        if (distanceToTopInPixels > currentPresenter.scrollHeight) {
          currentPresenter.scrollHeight += distanceToTopInPixels - currentPresenter.scrollHeight;
        }

        editor.scrollToScreenPosition([distanceToTop, 0]);
    }
};
