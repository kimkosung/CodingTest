function solution(array) {
    let answer = 0;
    
    array.forEach((e) => {
        answer += e.toString().split('7').length - 1;
    });
    
    return answer;
}
