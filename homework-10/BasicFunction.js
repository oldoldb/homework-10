//得到用户输入的行列
function GetRowAndCol() {
    row = parseInt(TextRow.value);
    col = parseInt(TextCol.value);
}
//选择相应游戏逻辑模式
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
//生成随机或者指定表格
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
