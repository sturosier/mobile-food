const ParamParser = require('../utils/paramParser');

test('Should find coordinate from arguments', () => {
    let parser = new ParamParser();
    let arg = {
        query: {
            latitude: -90,
            longitude: 80
        }
    };

    let found = parser.foundCoordinate(arg);
    expect(found).toBe(true);
});

test('Should NOT find coordinate from arguments', () => {
    let parser = new ParamParser();
    let arg = {
        query: {
            foo: -90,
            bar: 80
        }
    };

    let found = parser.foundCoordinate(arg);
    expect(found).toBe(false);
});