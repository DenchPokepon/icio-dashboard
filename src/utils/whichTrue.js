export default function whichTrue(boolArray) {
    return [...boolArray.keys()].filter(i => boolArray[i])
}