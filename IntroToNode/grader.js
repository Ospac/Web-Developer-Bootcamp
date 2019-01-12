function aver(ary){
    var sum = 0;
    for(var i = 0; i < ary.length; i++){
        sum += ary[i];
    }
    return Math.round(sum / ary.length);
}

var scores =  [1,2,3,4,5,6,7,8,9,10];
var scores2 = [40, 65, 77,82, 80, 54, 73,63,95,49];

console.log(aver(scores));
console.log(aver(scores2));
console.log(Math.round(4.1));
