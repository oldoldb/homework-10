//显示每个状态
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
//显示上一个状态
function ShowPrevState() {
    counter--;
    ShowMidResult();
    alert("当前状态序号 : " + counter + ", 状态序号范围 : 0 - " + NumOfState);
    if (counter == 0) {
        document.getElementById("ButtonPrev").disabled = true;
    }
    document.getElementById("ButtonNext").disabled = false;
}
//显示下一个状态
function ShowNextState() {
    counter++;
    ShowMidResult();
    alert("当前状态序号 : " + counter + ", 状态序号范围 : 0 - " + NumOfState);
    if (counter >= NumOfState) {
        document.getElementById("ButtonNext").disabled = true;
        //    ShowMaxSum();
    }
    document.getElementById("ButtonPrev").disabled = false;
}
//自动运行的函数
function AutoRunning() {
    counter++;
    ShowMidResult();
    if (counter >= NumOfState) {
        clearInterval(timerId);
        //    ShowMaxSum();
    }

}
