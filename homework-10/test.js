test("Test for MaxSum(b,n)",function()
{
    var testArray = new Array(10, -1, -10, 10, 2);
    var ActualResult=MaxSum(testArray,5);
    equal(ActualResult, 12, "MaxSum(testArray,5) is 12");
    testArray = new Array(-10, -10, -10, -10, -100);
    ActualResult = MaxSum(testArray, 5);
    equal(ActualResult, -10, "MaxSum(testArray,5) is -10");
})
test("Test for MinSum(b,n)",function()
{
    var testArray = new Array(10, -1, -10, 10, 2);
    var ActualResult=MinSum(testArray,5);
    equal(ActualResult, -11, "MinSum(testArray,5) is -11");
    testArray = new Array(-10, -10, -10, -10, -100);
    ActualResult = MinSum(testArray, 5);
    equal(ActualResult, -140, "MinSum(testArray,5) is -140");
})
test("Test for CheckMargin(x,y)",function()
{
    var row=10;
    var col=5;
    var ActualResult=CheckMargin(10,5);
    equal(ActualResult, false, "CheckMargin(10,5) is false");
    ActualResult = CheckMargin(-1, -1);
    equal(ActualResult, false, "CheckMargin(-1,-1) is true");
})