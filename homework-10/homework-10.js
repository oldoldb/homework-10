var row = 0;
var col = 0;
var MaxNum = 0;
var map = new Array();
var mark = new Array();
var current = new Array();
var visit = new Array();
var tempMark = new Array();
var sum = new Array();
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
var start = 0;
var end = 0;
var startMin = 0;
var endMin = 0;
var ans = -Number.MAX_VALUE;
var statePos = 0;
var state = null;
var counter = -1;
var NumOfState = 0;
var timerId = 0;
var interval = 0;
var mode = 0;
var isRandom = true;
var inputArray = null;
var choice = false;
var dx = new Array(4);
var dy = new Array(4);

//�õ��û����������
function GetRowAndCol() {
    row = parseInt(TextRow.value);
    col = parseInt(TextCol.value);
}
//ѡ����Ӧ��Ϸ�߼�ģʽ
function SelectMode() {
    switch (mode) {
        case 0: MaxSumShow(); break;
        case 1: MaxSumDim2(); break;
        case 2: MaxSumDim2H(); break;
        case 3: MaxSumDim2V(); break;
        case 4: MaxSumDim2VH(); break;
        case 5: MaxSumDim2A(false); break;
        case 6: MaxSumDim2A(true); break;
        default: break;
    }
}
//�����������ָ�����
function CreateTable() {
    GetRowAndCol();
    MaxNum = (parseInt(row) + 1) * (parseInt(col) + 1);
    current = new Array(MaxNum);
    state = new Array(MaxNum);
    for (var i = 0; i < parseInt(MaxNum) ; i++) {
        current[i] = new Array(MaxNum);
        state[i] = new Array(MaxNum);
        for (var j = 0; j < parseInt(MaxNum) ; j++) {
            state[i][j] = 0;
            current[i][j] = 0;
        }
    }
    var table = document.createElement("table");
    table.border = "1";
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (var i = 0; i < parseInt(row) ; i++) {
        map[i] = new Array(col);
        var tr = document.createElement("tr");
        for (var j = 0; j < parseInt(col) ; j++) {
            map[i][j] = isRandom ? Math.floor(Math.random() * (2000) - 1000) : "";
            var tc = document.createElement("td");
            tc.contentEditable = isRandom ? false : true;
            tc.width = 100 + "px";
            tc.height = 100 + "px";
            var ct = document.createTextNode(map[i][j]);
            tc.appendChild(ct);
            tr.appendChild(tc);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementsByTagName("body")[0].appendChild(table);
}

//��ʼ��Sum����
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
//����Sum����,sum[x][y]��ʾ���½�����Ϊ(x,y)�ľ��κ�
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
//һά���������
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
//һά��С������(������ˮƽ����)
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
//һά���������,����״̬�仯��ʾ
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
//��ά��ͨ���������
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
//��άˮƽ�������������
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
//��ά��ֱ�������������
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
//��άˮƽ��ֱ�������������
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
//����߽�
function CheckMargin(x, y) {
    if (parseInt(x) < 0 || parseInt(x) >= parseInt(row) || parseInt(y) < 0 || parseInt(y) >= parseInt(col)) {
        return false;
    }
    else {
        return true;
    }
}
//������ͨ��
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
//��ά��ͨ��
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


//��ʾÿ��״̬
function ShowMidResult() {
    var td = document.getElementsByTagName("td");
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(col) ; j++) {
            td[(i * col) + j].className = "Init";
        }
    }
    var thisTempMaxAns = 0;
    var thisTempAnsRun = 0;
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(col) ; j++) {
            if (current[counter][(i * col) + j] == 1) {
                thisTempAnsRun = parseInt(thisTempAnsRun) + parseInt(map[parseInt(i)][parseInt(j)]);
                if (state[counter][(i * col) + j] == 1) {
                    thisTempMaxAns = parseInt(thisTempMaxAns) + parseInt(map[parseInt(i)][parseInt(j)]);
                    td[(i * col) + j].className = "MaxSumAndHighLight";
                }
                else {
                    td[(i * col) + j].className = "HighLight";
                }
            }
            else if (state[counter][(i * col) + j] == 1) {
                thisTempMaxAns = parseInt(thisTempMaxAns) + parseInt(map[parseInt(i)][parseInt(j)]);
                td[(i * col) + j].className = "MaxSum";
            }
        }
    }
    document.getElementById("TextTempMax").value = thisTempMaxAns.toString();
    document.getElementById("TextTempRun").value = thisTempAnsRun.toString();
}
//��ʾ��һ��״̬
function ShowPrevState() {
    counter--;
    ShowMidResult();
    alert("��ǰ״̬��� : " + counter + ", ״̬��ŷ�Χ : 0 - " + NumOfState);
    if (counter == 0) {
        document.getElementById("ButtonPrev").disabled = true;
    }
    document.getElementById("ButtonNext").disabled = false;
}
//��ʾ��һ��״̬
function ShowNextState() {
    counter++;
    ShowMidResult();
    alert("��ǰ״̬��� : " + counter + ", ״̬��ŷ�Χ : 0 - " + NumOfState);
    if (counter >= NumOfState) {
        document.getElementById("ButtonNext").disabled = true;
        //    ShowMaxSum();
    }
    document.getElementById("ButtonPrev").disabled = false;
}
//�Զ����еĺ���
function AutoRunning() {
    counter++;
    ShowMidResult();
    if (counter >= NumOfState) {
        clearInterval(timerId);
        //    ShowMaxSum();
    }

}


//����Button�¼�
function ButtonPauseClicked() {
    var thisButton = document.getElementById("ButtonPause");
    if (thisButton.value == "Pause") {
        clearInterval(timerId);
        document.getElementById("ButtonPause").value = "Resume";
        document.getElementById("RadioManual").disabled = false;
    }
    else if (thisButton.value = "Resume") {
        interval = document.getElementById("TextInterval").value;
        timerId = setInterval(AutoRunning, interval);
        document.getElementById("ButtonPause").value = "Pause";
    }
}
function ButtonStartClicked() {
    if (!isRandom) {
        if (!CheckInputArray()) {
            return;
        }
        var td = document.getElementsByTagName("td");
        for (var i = 0; i < parseInt(row) ; i++) {
            for (var j = 0; j < parseInt(col) ; j++) {
                td[(i * col) + j].contentEditable = false;
                map[parseInt(i)][parseInt(j)] = parseInt(td[(i * col) + j].textContent);
            }
        }
    }
    document.getElementById("ButtonStart").disabled = true;
    document.getElementById("ButtonRandom").disabled = true;
    document.getElementById("TextRow").disabled = true;
    document.getElementById("TextCol").disabled = true;
    var modeList = document.getElementsByName("RadioLogicMode");
    for (var i = 0; i < modeList.length; i++) {
        if (modeList[i].checked) {
            mode = i;
            break;
        }
    }
    if (document.getElementById("RadioManual").checked) {
        document.getElementById("TextInterval").disabled = true;
        document.getElementById("ButtonPause").disabled = true;
        SelectMode();
        //    alert("��ǰ״̬��� : " + counter + ", ״̬��ŷ�Χ : 0 - " + NumOfState);
        document.getElementById("ButtonPrev").disabled = true;
    }
    else if (document.getElementById("RadioAuto").checked) {
        document.getElementById("ButtonPrev").disabled = true;
        document.getElementById("ButtonNext").disabled = true;
        SelectMode();
        if (!CheckInputInterval()) {
            return;
        }
        interval = document.getElementById("TextInterval").value;
        timerId = setInterval(AutoRunning, interval);
    }
}
function RadioManualClicked() {
    document.getElementById("TextInterval").disabled = true;
    document.getElementById("ButtonPause").disabled = true;
    document.getElementById("ButtonPrev").disabled = false;
    document.getElementById("ButtonNext").disabled = false;
    if (counter >= NumOfState) {
        document.getElementById("ButtonNext").disabled = true;
    }
}
function RadioAutoClicked() {
    document.getElementById("ButtonPrev").disabled = true;
    document.getElementById("ButtonNext").disabled = true;
    document.getElementById("TextInterval").disabled = false;
    document.getElementById("ButtonPause").disabled = false;
    document.getElementById("RadioManual").disabled = true;
}
function ButtonRandomClicked() {
    if (!CheckInput()) {
        return;
    }
    if (!CheckDim1ForSpecial()) {
        return;
    }
    if (!CheckDim2AForSpecial()) {
        return;
    }
    isRandom = true;
    CreateTable();
    document.getElementById("ButtonStart").disabled = false;
    document.getElementById("ButtonRandom").disabled = true;
    document.getElementById("ButtonNormal").disabled = true;
    document.getElementById("TextCol").disabled = true;
    document.getElementById("TextRow").disabled = true;
}
function ButtonNormalClicked() {
    if (!CheckInput()) {
        return;
    }
    if (!CheckDim1ForSpecial()) {
        return;
    }
    if (!CheckDim2AForSpecial()) {
        return;
    }
    isRandom = false;
    CreateTable();
    document.getElementById("ButtonStart").disabled = false;
    document.getElementById("ButtonRandom").disabled = true;
    document.getElementById("ButtonNormal").disabled = true;
    document.getElementById("TextCol").disabled = true;
    document.getElementById("TextRow").disabled = true;
}


//���ּ������

//��һά����ʱ��Ҫ���row�Ƿ�>1
function CheckDim1ForSpecial() {
    var thisMode = document.getElementById("RadioDim1");
    if (thisMode.checked && parseInt(document.getElementById("TextRow").value) != 1) {
        alert("When you choose Dim1,Row should be 1!");
        return false;
    }
    return true;
}
function CheckDim2AForSpecial() {
    var thisMode = document.getElementById("RadioDim2A");
    var thisMode2 = document.getElementById("RadioDim2AVH");
    if (thisMode.checked||thisMode2.checked) {
        var thisRow = parseInt(document.getElementById("TextRow").value);
        var thisCol = parseInt(document.getElementById("TextCol").value);
        if (thisRow * thisCol > 16) {
            alert("����ѡ����ͨ��ģʽʱ�������㷨���Ӷ�̫�ߣ����齫����ά�ȼ�С!");
            return false;
        }
    }
    return true;
}
function CheckInputInterval() {
    var stdInput = /^[1-9]+[0-9]*$/;
    var inputInterval = document.getElementById("TextInterval");
    if (!stdInput.test(inputInterval.value)) {
        alert("Please Check the Interval Input!");
        TextInterval.focus();
        return false;
    }
    if (parseInt(inputInterval.value) < 100 || parseInt(inputInterval.value) > 3000) {
        alert("Maybe it will be too Fast or too Slow!");
        TextInterval.focus();
        return false
    }
    return true;
}
function CheckInputArray() {
    var stdInput = /^-?[1-9]+[0-9]*$/;
    var td = document.getElementsByTagName("td");
    for (var i = 0; i < parseInt(row) ; i++) {
        for (var j = 0; j < parseInt(col) ; j++) {
            if (!stdInput.test(td[(i * col) + j].textContent)) {
                alert("Please Check the Table Input!");
                return false;
            }
        }
    }
    return true;
}
function CheckInput() {
    var stdInput = /^[1-9]+[0-9]*$/;
    if (!stdInput.test(TextCol.value)) {
        alert("Error Input for Col!,Please Input a Positive Integer!");
        TextCol.focus();
        return false;
    }
    if (!stdInput.test(TextRow.value)) {
        alert("Error input for Row!,Please Input a Positive Integer!");
        TextRow.focus();
        return false;
    }
    if (parseInt(TextRow.value) > 9 && RadioDim1.checked) {
        alert("Error : Mode Dim1 Row need to be < 10!");
        TextRow.focus();
        return false;
    }
    return true;
}