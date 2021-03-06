module('Grid');

test('inherited from "Row"', function() {
    var grid = new Grid();
    
    ok(grid instanceof Row);
});

test('initialization #1', function() {
    var width = 5;
    var height = 10;
    var placeholder = 1;

    var grid = new Grid(width, height, placeholder);
    
    for (var y = height; y--;) {
    for (var x = width; x--;) {
        equal(grid.get(x, y), placeholder);
    }}
});

test('initialization #2', function() {
    var grid = new Grid([
        [0, 1, 1],
        [0, 2, 2],
        [0, 3, 3]
    ]);
    
    equal(grid.count(), 3);
    equal(grid.get(0, 1), 1);
    equal(grid.get(0, 2), 2);
    equal(grid.get(0, 3), 3);
});

test('"set" #1', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
    
    ok(grid.items[0] instanceof Row);
    ok(grid.items[1] instanceof Row);
    
    equal(grid.items[0].items[0], 1);
    equal(grid.items[0].items[1], 2);
    equal(grid.items[0].items[2], 3);
    
    equal(grid.items[1].items[0], 4);
    equal(grid.items[1].items[1], 5);
    equal(grid.items[1].items[2], 6);
});

test('"set" #2', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
        
    equal(grid.get(0, 0), 1);
    equal(grid.get(1, 0), 2);
    equal(grid.get(2, 0), 3);
    
    equal(grid.get(0, 1), 4);
    equal(grid.get(1, 1), 5);
    equal(grid.get(2, 1), 6);
});

test('"on"', function() {
    var grid = new Grid();
    
    grid.set(-3, -1, 1);
    grid.set(-2, -1, 2);
    grid.set(-1, -1, 3);
    
    grid.set(-3, 0, 4);
    grid.set(-2, 0, 5);
    grid.set(-1, 0, 6);
        
    equal(grid.on(0, 0), 1);
    equal(grid.on(1, 0), 2);
    equal(grid.on(2, 0), 3);
    
    equal(grid.on(0, 1), 4);
    equal(grid.on(1, 1), 5);
    equal(grid.on(2, 1), 6);
});

test('"remove" #1', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.remove(1, 0);
    grid.remove(2, 0);
    
    equal(grid.get(0, 0), 1);
    equal(grid.get(1, 0), undefined);
    equal(grid.get(2, 0), undefined);
});

test('"remove" #2', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.remove(0, 0);
    grid.remove(1, 0);
    grid.remove(2, 0);
    
    equal(grid.get(0), undefined);
});

test('"remove" #3', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.remove(0);
    
    equal(grid.get(0), undefined);
});

test('"remove" #4', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.remove([[1, 0], [2, 0]]);
    
    equal(grid.get(0, 0), 1);
    equal(grid.get(1, 0), undefined);
    equal(grid.get(2, 0), undefined);
});

test('"flatten"', function() {
    var grid = new Grid();
    
    grid.set(0, -1, 1);
    grid.set(1, -1, 2);
    grid.set(2, -1, 3);
    
    grid.set(0, 0, 4);
    grid.set(1, 0, 5);
    grid.set(2, 0, 6);
        
    deepEqual(grid.flatten(), [[1, 0, -1], [2, 1, -1], [3, 2, -1],
            [4, 0, 0], [5, 1, 0], [6, 2, 0]]);
});

test('"coords"', function() {
    var grid = new Grid();
    
    grid.set(0, -1, 1);
    grid.set(1, -1, 2);
    grid.set(2, -1, 3);
    
    grid.set(0, 0, 4);
    grid.set(1, 0, 5);
    grid.set(2, 0, 6);
        
    deepEqual(grid.coords(), [[0, -1], [1, -1], [2, -1], [0, 0], [1, 0], [2, 0]]);
});

test('"values"', function() {
    var grid = new Grid();
    
    grid.set(0, -1, 1);
    grid.set(1, -1, 2);
    grid.set(2, -1, 3);
    
    grid.set(0, 0, 4);
    grid.set(1, 0, 5);
    grid.set(2, 0, 6);
        
    deepEqual(grid.values(), [1, 2, 3, 4, 5, 6]);
});

test('"related" #1', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
    
    grid.set(0, 2, 7);
    grid.set(1, 2, 8);
    grid.set(2, 2, 9);
    
    var related = grid.related(1, 1);
    
    deepEqual(related.flatten(), [[1, 0, 0], [2, 1, 0], [3, 2, 0],
        [4, 0, 1], [6, 2, 1], [7, 0, 2], [8, 1, 2], [9, 2, 2]]);
});

test('"related" #2', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
    
    grid.set(0, 2, 7);
    grid.set(1, 2, 8);
    grid.set(2, 2, 9);
    
    var related = grid.related(1, 0);
    
    deepEqual(related.flatten(), [[1, 0, 0], [3, 2, 0], [4, 0, 1], [5, 1, 1], [6, 2, 1]]);
});

test('"related" #3', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
    
    grid.set(0, 2, 7);
    grid.set(1, 2, 8);
    grid.set(2, 2, 9);
    
    var related = grid.related(1, 2);
        
    deepEqual(related.flatten(), [[4, 0, 1], [5, 1, 1], [6, 2, 1], [7, 0, 2], [9, 2, 2]]);
});

test('"each" #1', 9, function() {
    var grid = new Grid();
    var cells = [[0, 0, 1], [1, 0, 2], [2, 0, 3]];
    
    grid.set(cells[0][0], cells[0][1], cells[0][2]);
    grid.set(cells[1][0], cells[1][1], cells[1][2]);
    grid.set(cells[2][0], cells[2][1], cells[2][2]);
    
    var iteration = 0;
    
    grid.each(function(cell, x, y) {
        equal(cell, cells[iteration][2]);
        equal(x, cells[iteration][0]);
        equal(y, cells[iteration][1]);
        iteration++;
    });
});

test('"each" #2', 1, function() {
    var grid = new Grid();
    var context = {'a': 1, 'b': 2};

    grid.set(0, 0, 1);
    grid.each(function() {
        equal(this, context);
    }, context);
});

test('"concat"', function() {
    var grid1 = new Grid();
    var grid2 = new Grid();

    grid1.set(0, 0, 0);
    grid1.set(0, 1, 1);
    grid2.set(0, 2, 2);
    grid2.set(0, 3, 3);

    grid1.concat(grid2);
    
    equal(grid1.get(0, 0), 0);
    equal(grid1.get(0, 1), 1);
    equal(grid1.get(0, 2), 2);
    equal(grid1.get(0, 3), 3);
});

test('"border" #1', function() {
    var grid = new Grid();

    grid.set(0, 0, 0);
    grid.set(1, 0, 1);
    
    var border = grid.border();
    
    equal(border.length, 10);
    
    ok(border.some(function(val) { return val[0] == -1 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == -1}));
    
    ok(border.some(function(val) { return val[0] == -1 && val[1] == 0}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == 0}));
    
    ok(border.some(function(val) { return val[0] == -1 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == 1}));
});

test('"border" #2', function() {
    var grid = new Grid();

    grid.set(0, 0, 0);
    grid.set(1, 0, 1);
    
    var border = grid.border(2);
    
    equal(border.length, 28);

    ok(border.some(function(val) { return val[0] == -2 && val[1] == -2}));
    ok(border.some(function(val) { return val[0] == -1 && val[1] == -2}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == -2}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == -2}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == -2}));
    ok(border.some(function(val) { return val[0] ==  3 && val[1] == -2}));
    
    ok(border.some(function(val) { return val[0] == -2 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] == -1 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == -1}));
    ok(border.some(function(val) { return val[0] ==  3 && val[1] == -1}));
    
    ok(border.some(function(val) { return val[0] == -2 && val[1] == 0}));
    ok(border.some(function(val) { return val[0] == -1 && val[1] == 0}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == 0}));
    ok(border.some(function(val) { return val[0] ==  3 && val[1] == 0}));
    
    ok(border.some(function(val) { return val[0] == -2 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] == -1 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == 1}));
    ok(border.some(function(val) { return val[0] ==  3 && val[1] == 1}));

    ok(border.some(function(val) { return val[0] == -2 && val[1] == 2}));
    ok(border.some(function(val) { return val[0] == -1 && val[1] == 2}));
    ok(border.some(function(val) { return val[0] ==  0 && val[1] == 2}));
    ok(border.some(function(val) { return val[0] ==  1 && val[1] == 2}));
    ok(border.some(function(val) { return val[0] ==  2 && val[1] == 2}));
    ok(border.some(function(val) { return val[0] ==  3 && val[1] == 2}));
});

test('"count"', function() {
    var grid = new Grid();
    
    grid.set(0, 0, 1);
    grid.set(1, 0, 2);
    grid.set(2, 0, 3);
    
    grid.set(0, 1, 4);
    grid.set(1, 1, 5);
    grid.set(2, 1, 6);
    
    grid.set(0, 2, 7);
    grid.set(1, 2, 8);
    grid.set(2, 2, 9);
        
    deepEqual(grid.count(), 9);
});

test('"filter"', function() {
    var grid = new Grid();

    grid.set(0, 0, 1);
    grid.set(1, 0, 1);
    grid.set(2, 0, 1);
    grid.set(0, 1, 1);
    grid.set(1, 1, 1);
    grid.set(2, 1, 1);
    grid.set(0, 2, 1);
    grid.set(1, 2, 1);
    grid.set(2, 2, 1);
    
    grid.filter(1, 1, 2, 2);
    
    equal(grid.count(), 4);
    
    ok(grid.get(1, 1));
    ok(grid.get(2, 1));
    ok(grid.get(1, 2));
    ok(grid.get(2, 2));
});