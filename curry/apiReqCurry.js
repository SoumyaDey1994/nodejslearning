/**
 * createRequest() method accepts base URL & returns method addHeader
 * addHeader() accepts token & returns method execute
 * execute() method accepts resource path, calls fetch API & returns the json response
 * Here, the req is build increamentally CreateRequest() + addHeader() + execute()
 * Then finally the innerMost method invokes fetch
 * 
 * @param {*} baseUrl 
 * @returns 
 */
function createRequest(baseUrl) {
  return function addHeader(token) {
    return async function execute(endpoint) {
      const res = await fetch(baseUrl + endpoint, {
        headers: {
          athorization: token,
        },
      });
      const data = await res.json();
      return data;
    };
  };
}


const req = createRequest('https://dummyjson.com');
const reqWithToken = req('Bearer abcde12345');

const data = await reqWithToken('/products/1');
console.log(data);
