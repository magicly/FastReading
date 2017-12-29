// import sum from './sum';

// test('1 + 2 shoule be 3!', () => {
//   expect(sum(1, 2)).toBe(3);
// });

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
  expect(data).not.toBe({ one: 1, two: 2 });
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);// 0.1 + 0.2 !== 0.3
  expect(value).toBeCloseTo(0.3);
});


const fetchData = callback => {
  setTimeout(() => {
    callback('response: ok');
  }, 1000);
}
// test('the data is wrong', () => {
//   function callback(data) {
//     expect(data).toBe('response: wrong....');
//   }

//   fetchData(callback);
// });
test('the data is ok', done => {
  function callback(data) {
    expect(data).toBe('response: ok');
    done();
  }

  fetchData(callback);
});

const fetchDataByPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('response: ok');
      reject('network error.');
    }, 1000);
  });
}

// test('the data is ok by Promise', () => {
//   expect.assertions(1);
//   return fetchDataByPromise().then(data => {
//     expect(data).toBe('response: ok');
//   })
// });

// test('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return fetchDataByPromise().catch(e => {
//     expect(e).toMatch(/network error/);
//   });
// });

// beforeAll(() => console.log('1 - beforeAll'));
// afterAll(() => console.log('1 - afterAll'));
// beforeEach(() => console.log('1 - beforeEach'));
// afterEach(() => console.log('1 - afterEach'));
// test('', () => console.log('1 - test'));
// describe('Scoped / Nested block', () => {
//   beforeAll(() => console.log('2 - beforeAll'));
//   afterAll(() => console.log('2 - afterAll'));
//   beforeEach(() => console.log('2 - beforeEach'));
//   afterEach(() => console.log('2 - afterEach'));
//   test('', () => console.log('2 - test'));
// });

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test('test mock function.', () => {
  const mockCallback = jest.fn();
  forEach([0, 1], mockCallback);

  // callback被调用两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次调用的第一个参数是0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次调用的第一个参数是0
  expect(mockCallback.mock.calls[1][0]).toBe(1);
});

// const myMock = jest.fn();

// const a = new myMock();
// const b = {name: 'b'};
// const bound = myMock.bind(b);
// bound();

// console.log(myMock.mock.instances);


// const myMock = jest.fn();
// console.log(myMock());
// // > undefined

// myMock
//   .mockReturnValueOnce(10)
//   .mockReturnValueOnce('x')
//   .mockReturnValue(true);

// console.log(myMock(), myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true

const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > true

// jest.mock('./sum');
// import sum from './sum';
// sum.mockImplementation(() => 42);
// console.log(sum(1, 4));
// expect(sum(1, 2)).toBe(3);