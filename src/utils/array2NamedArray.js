export default function array2NamedArray(array, key) 
{
    const returnArray = Array(array.length);

    for (let i = 0; i < array.length; i++) {
        returnArray[i] = {[key]: array[i]}
    }
    return returnArray
  };