export default function seq(from, to)
{
    if (to < from) throw new Error('seq is stupid, expects from to be larger than to')
    return (Array.from(Array(to - from + 1).keys()).map(x => x + from));
}