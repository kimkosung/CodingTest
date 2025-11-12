function solution(n, w, num) {
    const totalFloors = Math.ceil(n / w);
    const stack = createStack(totalFloors, w);
    const targetPosition = findPackagePosition(stack, num, totalFloors, w);
    
    return countRemovalSteps(stack, targetPosition, num, n);
}

function createStack(totalFloors, width) {
    const stack = [];
    
    for (let floor = 0; floor < totalFloors; floor++) {
        const packages = Array.from(
            { length: width }, 
            (_, index) => index + 1 + (floor * width)
        );
        
        // 짝수 층은 정방향, 홀수 층은 역방향
        stack[floor] = floor % 2 === 0 
            ? packages 
            : packages.reverse();
    }
    
    return stack;
}

function findPackagePosition(stack, targetNum, totalFloors, width) {
    for (let floor = 0; floor < totalFloors; floor++) {
        for (let col = 0; col < width; col++) {
            if (stack[floor][col] === targetNum) {
                return { floor, col };
            }
        }
    }
    return null;
}

function countRemovalSteps(stack, targetPosition, targetNum, maxPackage) {
    // 목표 택배를 꺼내는 횟수 (기본 1회)
    let steps = 1;
    
    // 같은 열에서 목표 택배 위에 있는 택배들을 제거해야 함
    for (const floorPackages of stack) {
        const packageAtColumn = floorPackages[targetPosition.col];
        
        if (packageAtColumn > targetNum && packageAtColumn <= maxPackage) {
            steps++;
        }
    }
    
    return steps;
}
