//各种检查输入

//当一维数组时需要检查row是否>1
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
            alert("当你选择联通块模式时，由于算法复杂度太高，建议将数组维度减小!");
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