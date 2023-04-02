export default function intersection(array1, array2) {
    return array1.map(function(n) {
        return array2.indexOf(n) !== -1;
    });
} 