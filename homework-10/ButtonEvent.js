//各种Button事件
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
        //    alert("当前状态序号 : " + counter + ", 状态序号范围 : 0 - " + NumOfState);
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