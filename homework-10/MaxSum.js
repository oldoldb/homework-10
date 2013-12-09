//初始化Sum数组
function InitSum() {
    for (var i = 0; i < parseInt(row) ; i++) {
        sum[i] = new Array(col);
        for (var j = 0; j < parseInt(col) ; j++) {
            sum[i][j] = 0;
        }
    }
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(col) ; j++) {
            if (i == 0 && j == 0) {
                sum[i][j] = map[i][j];
            }
            else if (i == 0) {

                sum[i][j] = parseInt(sum[i][j - 1]) + parseInt(map[i][j]);
            }
            else if (j == 0) {
                sum[i][j] = parseInt(sum[i - 1][j]) + parseInt(map[i][j]);
            }
            else {
                sum[i][j] = parseInt(sum[i - 1][j]) + parseInt(sum[i][j - 1]) - parseInt(sum[i - 1][j - 1]) + parseInt(map[i][j]);
            }
        }
    }
}
//计算Sum数组,sum[x][y]表示右下角坐标为(x,y)的矩形和
function GetSum(x1, y1, x2, y2) {
    if (x1 == 0 && y1 == 0) {
        return sum[x2][y2];
    }
    else if (x1 == 0) {
        return parseInt(sum[x2][y2]) - parseInt(sum[x2][y2 - 1]);
    }
    else if (y1 == 0) {
        if (x1 > x2) {
            return parseInt(sum[row - 1][y1]) - parseInt(GetSum(x2, y2, x1, y1)) + parseInt(map[x2][y2]) + parseInt(map[x1][y1]);
        }
        else {
            return parseInt(sum[x2][y2]) - parseInt(sum[x1 - 1][y1]);
        }
    }
    else {
        if (x1 > x2) {
            return parseInt(sum[row - 1][y2]) - parseInt(sum[row - 1][y2 - 1]) - parseInt(GetSum(x2, y2, x1, y1)) + parseInt(map[x1][y1]) + parseInt(map[x2][y2]);
        }
        else {
            return parseInt(sum[x2][y2]) - parseInt(sum[x2][y2 - 1]) - parseInt(sum[x1 - 1][y2]) + parseInt(sum[x1 - 1][y1 - 1]);
        }
    }
}
//一维最大子数组
function MaxSum(a, n) {
    var thisAns = -Number.MAX_VALUE;
    var thisSum = 0;
    var pos = 0;
    start = 0;
    end = 0;
    for (var i = 0; i < parseInt(n) ; i++) {
        thisSum = parseInt(thisSum) + parseInt(a[i]);
        if (parseInt(thisSum) > parseInt(thisAns)) {
            thisAns = parseInt(thisSum);
            start = parseInt(pos);
            end = parseInt(i);
        }
        if (thisSum < 0) {
            thisSum = 0;
            pos = i + 1;
        }
    }
    return thisAns;
}
//一维最小子数组(用于求水平相连)
function MinSum(a, n) {
    var thisAns = Number.MAX_VALUE;
    var thisSum = 0;
    var pos = 0;
    startMin = 0;
    endMin = 0;
    for (var i = 0; i < parseInt(n) ; i++) {
        thisSum = thisSum + parseInt(a[i]);
        if (parseInt(thisSum) < parseInt(thisAns)) {
            thisAns = parseInt(thisSum);
            startMin = parseInt(pos);
            endMin = parseInt(i);
        }
        if (thisSum > 0) {
            thisSum = 0;
            pos = i + 1;
        }
    }
    return thisAns;
}
//一维最大子数组,加入状态变化显示
function MaxSumShow() {
    var thisAns = -Number.MAX_VALUE;
    var thisSum = 0;
    var pos = 0;
    start = 0;
    end = 0;
    for (var i = 0; i < parseInt(col) ; i++) {
        for (var ii = parseInt(pos) ; ii <= parseInt(i) ; ii++) {
            current[statePos][parseInt(ii)] = 1;
        }
        thisSum = thisSum + parseInt(map[0][parseInt(i)]);
        if (thisSum > thisAns) {
            thisAns = thisSum;
            start = pos;
            end = i;
        }
        if (thisSum < 0) {
            thisSum = 0;
            pos = i + 1;
        }
        for (var ii = parseInt(start) ; ii <= parseInt(end) ; ii++) {
            state[statePos][parseInt(ii)] = 1;
        }
        statePos++;
    }
    NumOfState = statePos - 1;
    mark = new Array(row);
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(col);
        for (var j = 0; j < parseInt(col) ; j++) {
            mark[i][j] = 0;
        }
    }
    for (var i = parseInt(x1) ; i <= parseInt(x2) ; i++) {
        for (var j = parseInt(start) ; j <= parseInt(end) ; j++) {
            mark[i][j] = 1;
        }
    }
    ans = thisAns;
    document.getElementById("TextMaxSum").value = ans.toString();
    return thisAns;
}
//二维普通最大子数组
function MaxSumDim2() {
    InitSum();
    start = 0;
    end = 0;
    var b = new Array(parseInt(col) + 1);
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = i; j < parseInt(row) ; j++) {
            for (var k = 0; k < parseInt(col) ; k++) {
                b[k] = parseInt(GetSum(i, k, j, k));
            }
            var temp = parseInt(MaxSum(b, col));
            for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                for (var jj = parseInt(start) ; jj <= parseInt(end) ; jj++) {
                    current[statePos][(ii * col) + jj] = 1;
                }
            }
            if (parseInt(ans) < parseInt(temp)) {
                ans = parseInt(temp);
                x1 = i;
                x2 = j;
                y1 = start;
                y2 = end;
            }
            for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                    state[statePos][(ii * col) + jj] = 1;
                }
            }
            statePos++;
        }
    }
    NumOfState = statePos - 1;
    mark = new Array(row);
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(col);
        for (var j = 0; j < parseInt(col) ; j++) {
            mark[i][j] = 0;
        }
    }
    for (var i = parseInt(x1) ; i <= parseInt(x2) ; i++) {
        for (var j = parseInt(y1) ; j <= parseInt(y2) ; j++) {
            mark[i][j] = 1;
        }
    }
    //    ShowMaxSum();
    document.getElementById("TextMaxSum").value = ans.toString();
    return ans;
}
//二维水平相连最大子数组
function MaxSumDim2H() {
    InitSum();
    var all = parseInt(0);
    ans = 0;
    start = 0;
    end = 0;
    var b = new Array(parseInt(col) + 1);
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = parseInt(i) ; j < parseInt(row) ; j++) {
            all = 0;
            for (var k = 0; k < parseInt(col) ; k++) {
                b[parseInt(k)] = parseInt(GetSum(i, k, j, k));
                all = parseInt(all) + parseInt(b[parseInt(k)]);
            }
            var tempMax = parseInt(MaxSum(b, col));
            var tempMin = parseInt(MinSum(b, col));
            var tempAns = 0;
            var tempStart = 0;
            var tempEnd = 0;
            if (parseInt(tempMax) > parseInt(all) - parseInt(tempMin)) {
                tempAns = parseInt(tempMax);
                tempStart = parseInt(start);
                tempEnd = parseInt(end);
            }
            else {
                tempAns = parseInt(all) - parseInt(tempMin);
                tempStart = -parseInt(startMin);
                tempEnd = -parseInt(endMin);
            }
            if (parseInt(tempStart) < 0 || parseInt(tempEnd) < 0) {
                for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                    for (var jj = 0; jj < parseInt(-parseInt(tempStart)) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = parseInt(-parseInt(tempEnd) + 1) ; jj < parseInt(col) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                    for (var jj = parseInt(tempStart) ; jj <= parseInt(tempEnd) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            if (parseInt(ans) < parseInt(tempAns)) {
                ans = parseInt(tempAns);
                x1 = parseInt(i);
                x2 = parseInt(j);
                y1 = parseInt(tempStart);
                y2 = parseInt(tempEnd);
            }
            if (parseInt(tempMin) == parseInt(all)) {
                if (parseInt(ans) < parseInt(tempMax)) {
                    ans = parseInt(tempMax);
                    y1 = parseInt(tempStart);
                    y2 = parseInt(tempEnd);
                }
            }
            if (parseInt(y1) < 0 || parseInt(y2) < 0) {
                for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                    for (var jj = 0; jj < -parseInt(y1) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(y2) + 1; jj < parseInt(col) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                    for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            statePos++;
        }
    }
    NumOfState = statePos - 1;
    mark = new Array(row);
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(col);
    }
    if (y1 < 0 || y2 < 0) {
        for (var i = x1; i <= x2; i++) {
            for (var j = 0; j < -y1; j++) {
                mark[i][j] = 1;
            }
            for (var j = -y2 + 1; j < col; j++) {
                mark[i][j] = 1;
            }
        }
    }
    else {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                mark[i][j] = 1;
            }
        }
    }
    document.getElementById("TextMaxSum").value = ans.toString();
    return ans;
}
//二维垂直相连最大子数组
function MaxSumDim2V() {
    InitSum();
    ans = 0;
    start = 0;
    end = 0;
    var b = new Array(parseInt(col) + 1);
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(row) ; j++) {
            for (var k = 0; k < parseInt(col) ; k++) {
                b[k] = parseInt(GetSum(i, k, j, k));
            }
            if (parseInt(i) > parseInt(j)) {
                for (var jj = parseInt(start) ; jj <= parseInt(end) ; jj++) {
                    for (var ii = 0; ii <= parseInt(j) ; ii++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var ii = parseInt(i) ; ii < parseInt(row) ; ii++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                    for (var jj = parseInt(start) ; jj <= parseInt(end) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }

            var temp = parseInt(MaxSum(b, col));
            if (parseInt(ans) < parseInt(temp)) {
                ans = parseInt(temp);
                if (parseInt(j) < parseInt(i)) {
                    x1 = -parseInt(i);
                    x2 = -parseInt(j);
                }
                else {
                    x1 = parseInt(i);
                    x2 = parseInt(j);
                }
                y1 = parseInt(start);
                y2 = parseInt(end);
            }
            if (parseInt(x1) < 0 || parseInt(x2) < 0) {
                for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                    for (var ii = 0; ii <= -parseInt(x2) ; ii++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var ii = -parseInt(x1) ; ii < parseInt(row) ; ii++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                    for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            statePos++;
        }
    }
    NumOfState = statePos - 1;
    mark = new Array(row);
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(col);
        for (var j = 0; j < parseInt(col) ; j++) {
            mark[i][j] = 0;
        }
    }
    if (parseInt(x1) < 0 || parseInt(x2) < 0) {
        for (var j = parseInt(y1) ; j <= parseInt(y2) ; j++) {
            for (var i = 0; i <= -parseInt(x2) ; i++) {
                mark[i][j] = 1;
            }
            for (var i = -parseInt(x1) ; i < parseInt(row) ; i++) {
                mark[i][j] = 1;
            }
        }
    }
    else {
        for (var i = parseInt(x1) ; i <= parseInt(x2) ; i++) {
            for (var j = parseInt(y1) ; j <= parseInt(y2) ; j++) {
                mark[i][j] = 1;
            }
        }
    }
    //    ShowMaxSum();
    document.getElementById("TextMaxSum").value = ans.toString();
    return ans;
}
//二维水平垂直相连最大子数组
function MaxSumDim2VH() {
    InitSum();
    var all = 0;
    ans = 0;
    start = 0;
    end = 0;
    var b = new Array(parseInt(col) + 1);
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(row) ; j++) {
            all = 0;
            for (var k = 0; k < parseInt(col) ; k++) {
                b[k] = parseInt(GetSum(i, k, j, k));
                all = parseInt(all) + parseInt(b[k]);
            }
            var tempMax = parseInt(MaxSum(b, col));
            var tempMin = parseInt(MinSum(b, col));
            var tempAns = 0;
            var tempStart = 0;
            var tempEnd = 0;
            if (parseInt(tempMax) > parseInt(all) - parseInt(tempMin)) {
                tempAns = parseInt(tempMax);
                tempStart = parseInt(start);
                tempEnd = parseInt(end);
            }
            else {
                tempAns = parseInt(all) - parseInt(tempMin);
                tempStart = -parseInt(startMin);
                tempEnd = -parseInt(endMin);
            }
            if (parseInt(i) > parseInt(j) && (tempStart < 0 || tempEnd < 0)) {
                for (var ii = 0; ii <= parseInt(j) ; ii++) {
                    for (var jj = 0; jj < -parseInt(tempStart) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(tempEnd) + 1; jj < parseInt(col) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
                for (var ii = parseInt(i) ; ii < parseInt(row) ; ii++) {
                    for (var jj = 0; jj < -parseInt(tempStart) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(tempEnd) + 1; jj < parseInt(col) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else if (tempStart < 0 || tempEnd < 0) {
                for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                    for (var jj = 0; jj < -parseInt(tempStart) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(tempEnd) + 1; jj < parseInt(col) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else if (parseInt(i) > parseInt(j)) {
                for (var jj = parseInt(tempStart) ; jj <= parseInt(tempEnd) ; jj++) {
                    for (var ii = 0; ii <= parseInt(j) ; ii++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                    for (var ii = parseInt(i) ; i < parseInt(row) ; ii++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(i) ; ii <= parseInt(j) ; ii++) {
                    for (var jj = parseInt(tempStart) ; jj <= parseInt(tempEnd) ; jj++) {
                        current[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            if (parseInt(ans) < parseInt(tempAns)) {
                ans = parseInt(tempAns);
                if (parseInt(j) < parseInt(i)) {
                    x1 = -parseInt(i);
                    x2 = -parseInt(j);
                }
                else {
                    x1 = parseInt(i);
                    x2 = parseInt(j);
                }
                y1 = parseInt(tempStart);
                y2 = parseInt(tempEnd);
            }
            if (parseInt(tempMin) == parseInt(all)) {
                if (parseInt(ans) < parseInt(tempMax)) {
                    ans = parseInt(tempMax);
                    y1 = parseInt(tempStart);
                    y2 = parseInt(tempEnd);
                }
            }
            if ((x1 < 0 || x2 < 0) && (y1 < 0 || y2 < 0)) {
                for (var ii = 0; ii <= -parseInt(x2) ; ii++) {
                    for (var jj = 0; jj < -parseInt(y1) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(y2) + 1; jj < parseInt(col) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
                for (var ii = -parseInt(x1) ; ii < parseInt(row) ; ii++) {
                    for (var jj = 0; jj < -parseInt(y1) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(y2) + 1; jj < parseInt(col) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else if (y1 < 0 || y2 < 0) {
                for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                    for (var jj = 0; jj < -parseInt(y1) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var jj = -parseInt(y2) + 1; jj < parseInt(col) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else if (x1 < 0 || x2 < 0) {
                for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                    for (var ii = 0; ii <= -parseInt(x2) ; ii++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                    for (var ii = -parseInt(x1) ; i < parseInt(row) ; ii++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            else {
                for (var ii = parseInt(x1) ; ii <= parseInt(x2) ; ii++) {
                    for (var jj = parseInt(y1) ; jj <= parseInt(y2) ; jj++) {
                        state[statePos][(ii * col) + jj] = 1;
                    }
                }
            }
            statePos++;
        }
    }
    NumOfState = statePos - 1;
    mark = new Array(row);
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(col);
        for (var j = 0; j < parseInt(col) ; j++) {
            mark[i][j] = 0;
        }
    }
    if ((x1 < 0 || x2 < 0) && (y1 < 0 || y2 < 0)) {
        for (var i = 0; i <= -x2; i++) {
            for (var j = 0; j < -y1; j++) {
                mark[i][j] = 1;
            }
            for (var j = -y2 + 1; j < col; j++) {
                mark[i][j] = 1;
            }
        }
        for (var i = -x1; i < row; i++) {
            for (var j = 0; j < -y1; j++) {
                mark[i][j] = 1;
            }
            for (var j = -y2 + 1; j < col; j++) {
                mark[i][j] = 1;
            }
        }
    }
    else if (y1 < 0 || y2 < 0) {
        for (var i = x1; i <= x2; i++) {
            for (var j = 0; j < -y1; j++) {
                mark[i][j] = 1;
            }
            for (var j = -y2 + 1; j < col; j++) {
                mark[i][j] = 1;
            }
        }
    }
    else if (x1 < 0 || x2 < 0) {
        for (var j = y1; j <= y2; j++) {
            for (var i = 0; i <= -x2; i++) {
                mark[i][j] = 1;
            }
            for (var i = -x1; i < row; i++) {
                mark[i][j] = 1;
            }
        }
    }
    else {
        for (var i = x1; i <= x2; i++) {
            for (var j = y1; j <= y2; j++) {
                mark[i][j] = 1;
            }
        }
    }
    document.getElementById("TextMaxSum").value = ans.toString();
    return ans;

}
//处理边界
function CheckMargin(x, y) {
    if (parseInt(x) < 0 || parseInt(x) >= parseInt(row) || parseInt(y) < 0 || parseInt(y) >= parseInt(col)) {
        return false;
    }
    else {
        return true;
    }
}
//深搜联通块
function dfs(x, y, choice) {
    visit[parseInt(x)][parseInt(y)] = true;
    for (var i = 0; i < 4; i++) {
        var tx = choice ? (parseInt(x) + parseInt(dx[i]) + parseInt(row)) % parseInt(row) : parseInt(x) + parseInt(dx[i]);
        var ty = choice ? (parseInt(y) + parseInt(dy[i]) + parseInt(col)) % parseInt(col) : parseInt(y) + parseInt(dy[i]);
        if (CheckMargin(tx, ty) && visit[tx][ty] == 0 && tempMark[tx][ty] == 1) {
            dfs(tx, ty, choice);
        }
    }
}
//二维联通块
function MaxSumDim2A(choice) {
    dx[0] = parseInt(1);
    dx[1] = parseInt(0);
    dx[2] = parseInt(-1);
    dx[3] = parseInt(0);
    dy[0] = parseInt(0);
    dy[1] = parseInt(1);
    dy[2] = parseInt(0);
    dy[3] = parseInt(-1);
    ans = -Number.MAX_VALUE;
    mark = new Array(parseInt(row));
    for (var i = 0; i < parseInt(row) ; i++) {
        mark[i] = new Array(parseInt(col));
    }
    var n = parseInt(row) * parseInt(col);
    current = new Array(parseInt(1 << n));
    state = new Array(parseInt(1 << n));
    for (var i = 0; i < parseInt(1 << n) ; i++) {
        current[i] = new Array(n);
        state[i] = new Array(n);
    }
    for (var i = 0; i < (1 << n) ; i++) {
        visit = new Array(row);
        tempMark = new Array(row);
        for (var j = 0; j < parseInt(row) ; j++) {
            visit[j] = new Array(col);
            tempMark[j] = new Array(col);
            for (var k = 0; k < parseInt(col) ; k++) {
                visit[parseInt(j)][parseInt(k)] = false;
            }
        }
        for (var j = 0; j < n; j++) {
            tempMark[Math.floor(parseInt(j) / parseInt(col))][parseInt(j) % parseInt(col)] = (parseInt(i) & (1 << parseInt(j))) >> parseInt(j);
        }
        var ok = true;
        for (var j = 0; j < parseInt(row) ; j++) {
            if (!ok) {
                break;
            }
            for (var k = 0; k < parseInt(col) ; k++) {
                if (tempMark[parseInt(j)][parseInt(k)] == 1) {
                    dfs(j, k, choice);
                    ok = false;
                    break;
                }
            }
        }
        for (var j = 0; j < parseInt(row) ; j++) {
            for (var k = 0; k < parseInt(col) ; k++) {
                current[statePos][(j * col) + parseInt(k)] = tempMark[parseInt(j)][parseInt(k)];
            }
        }
        ok = true;
        for (var j = 0; j < parseInt(row) ; j++) {
            if (!ok) {
                break;
            }
            for (var k = 0; k < parseInt(col) ; k++) {
                if (tempMark[parseInt(j)][parseInt(k)] == 1 && !visit[parseInt(j)][parseInt(k)]) {
                    ok = false;
                    break;
                }
            }
        }
        var s = -Number.MAX_VALUE;
        if (ok) {
            s = 0;
            for (var j = 0; j < parseInt(row) ; j++) {
                for (var k = 0; k < parseInt(col) ; k++) {
                    if (tempMark[parseInt(j)][parseInt(k)] == 1) {
                        s += parseInt(map[parseInt(j)][parseInt(k)]);
                    }
                }
            }
            if (parseInt(s) > parseInt(ans)) {
                ans = s;
                for (var j = 0; j < parseInt(row) ; j++) {
                    for (var k = 0; k < parseInt(col) ; k++) {
                        mark[parseInt(j)][parseInt(k)] = tempMark[parseInt(j)][parseInt(k)];
                    }
                }
            }

        }
        for (var j = 0; j < parseInt(row) ; j++) {
            for (var k = 0; k < parseInt(col) ; k++) {
                state[statePos][(j * col) + parseInt(k)] = mark[parseInt(j)][parseInt(k)];
            }
        }
        statePos++;
    }
    NumOfState = statePos - 1;
    document.getElementById("TextMaxSum").value = ans.toString();
    return ans;
}