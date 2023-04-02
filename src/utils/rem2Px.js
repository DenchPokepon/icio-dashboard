export default function rem2Px(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}