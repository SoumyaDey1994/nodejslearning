/**
 * ValidateLength() is a method accepting minLength as parameter
 * and returning a function validateInput
 * validateInput() accepting a value & returns if the length of value >= minLength
 * Here ValidateLength() created a partial function which is bind with minLength &
 * can be resused to validate any value against given length set previously
 * @param {*} minLength
 * @returns
 */
function validateLength(minLength) {
  return function validateInput(value) {
    return value.length >= minLength;
  };
}

const lengthValidator = validateLength(8);

const input1 = "Tanima@1973";
const input2 = "maa1234";
console.log(
  `Is ${input1} allowed against min 8 characters: ${lengthValidator(input1)}`,
);
console.log(
  `Is ${input2} allowed against min 8 characters: ${lengthValidator(input2)}`,
);

const lengthValidator2 = validateLength(12);

const input3 = "Cisco@01012026";
console.log(
  `Is ${input1} allowed against min 12 characters: ${lengthValidator2(input1)}`,
);
console.log(
  `Is ${input3} allowed against min 12 characters: ${lengthValidator2(input3)}`,
);
