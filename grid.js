(function() {

var Row = this['Row'] || require('row');

function Grid(width, height, placeholder) {
    this.parent = Row.prototype;
    this.parent.constructor.call(this);
    this.width = width;
    this.height = height;

    for (var y = this.height; y--;) {
    for (var x = this.width; x--;) {
        this.set(x, y, placeholder);
    }}
}

-function() {
    function F() {}
    F.prototype = Row.prototype;
    Grid.prototype = new F();
    Grid.prototype.constructor = Grid;
}();

Grid.prototype.set = function(x, y, cell) {
    if (cell === undefined) {
        return this.parent.set.call(this, x, y);
    }

    return (this.parent.get.call(this, y) ||
            this.parent.set.call(this, y, new Row()))
            .set(x, cell);
};

Grid.prototype.get = function(x, y) {
    if (y === undefined) {
        return this.parent.get.call(this, x);
    }

    return this.parent.get.call(this, y) ?
           this.parent.get.call(this, y).get(x) :
           undefined;
};

Grid.prototype.on = function(xNum, yNum) {
    if (yNum === undefined) {
        return this.parent.on.call(this, xNum);
    }
    
    return this.parent.on.call(this, yNum) ?
           this.parent.on.call(this, yNum).on(xNum) :
           undefined;
};

Grid.prototype.remove = function(x, y) {
    var toRemove = [[x, y]];
    
    if (y === undefined) {
        if (!isNaN(x)) {
            this.parent.remove.call(this, x);
            return;
        }
        if (x.length !== undefined && 
            x.pop !== undefined) {
            toRemove = x;
        }
    }
    
    for (var row, i = toRemove.length; i--;) {
        x = toRemove[i][0]
        y = toRemove[i][1];
        
        if (row = this.get(y)) {
            row.remove(x);
        
            if (!row.count()) { 
                this.parent.remove.call(this, y);
            }
        }
    }
};

Grid.prototype.flatten = function() {
    var result = [];
    
    this.each(function(cell, x, y) {
        result.push([cell, x, y]);
    });
    
    return result;
};

Grid.prototype.coords = function() {
    var result = [];
    
    this.each(function(cell, x, y) {
        result.push([x, y]);
    });
        
    return result;
};

Grid.prototype.values = function() {
    var result = [];
    
    this.each(function(cell, x, y) {
        result.push(cell);
    });
        
    return result;
};

Grid.prototype.each = function(iterator, context) {
    this.rewind();
    while (this.hasNext()) {
        var row = this.next().rewind();
        var y = this.currentIndex;
        while (row.hasNext()) {
            var cell = row.next();
            var x = row.currentIndex;
            iterator.apply(context, [cell, x, y]);
        }
    }    
};

Grid.prototype.related = function(x, y) {
    var coords = [
        [x-1, y-1], [x, y-1], [x+1, y-1],
        [x-1, y], [x+1, y], [x-1, y+1],
        [x, y+1], [x+1, y+1]
    ];
            
    var related = new Grid();
    
    for (var i = 0; i < 8; i++) {
        var rx = coords[i][0];
        var ry = coords[i][1];
        var cell = this.get(rx, ry);
        
        if (typeof(cell) != 'undefined') {
            related.set(rx, ry, cell);
        }
    }
    
    return related;
};

if (typeof module != 'undefined' &&
    typeof module.exports != 'undefined') {
    module.exports = Grid;
} else {
    this['Grid'] = Grid;
}

}).call(this);