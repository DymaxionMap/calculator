$(document).ready(function() {
	var ans = $("#answer");
	var op;
	var prevVal;
	var curVal;
	var result;
	var wholePart = "";
	var fracPart = "";
	var isFrac = false;
    var maxLen = 15;
    var isOp = false;
	ans.text("");
	$("#numpad td").click(function() {
        isOp = false;
		console.log(isFrac);
        if (ans.text().length < maxLen) {
            var frac = 0;
            var whole;
            var i;
            var digit;
            if (!isFrac) {
                wholePart += $(this).text();
                curVal = parseFloat(wholePart);
            } else {
                fracPart += $(this).text();
                if (wholePart === "") {
                    whole = 0;
                } else {
                    whole = parseFloat(wholePart);
                }
                for (i = 0; i < fracPart.length; i++) {
                    digit = parseFloat(fracPart.charAt(i));
                    digit /= Math.pow(10, i+1);
                    frac += digit;
                }
                curVal = whole + frac;
                console.log("Whole: " + whole);
                console.log("Frac: " + frac);
                console.log("curVal: " + curVal);
            }
            console.log("CurVal: " + curVal);
            ans.text(+curVal.toFixed(fracPart.length));
        }
	});
	$("#dot").click(function() {
        if (isOp) {
            ans.text("");
        }
        isOp = false;
		if (!isFrac) {
			isFrac = true;
            if (ans.text() === "") {
                ans.text("0.");
            } else {
                ans.text(ans.text() + ".");
            }
		}
	});
	$("#clear").click(function() {
		isFrac = false;
        isOp = false;
		ans.text("");
        wholePart = "";
        fracPart = "";
        curVal = "";
        prevVal = "";
        op = "";
	});
	$(".binop").click(function() {
        console.log(ans.text());
		if (ans.text() === "") {
			alert("No number inputted!");
		} else {
            prevVal = curVal;
            console.log(prevVal);
			ans.text("");
			op = $(this).text();
			isFrac = false;
            isOp = true;
            curVal = "";
            wholePart = "";
            fracPart = "";
            ans.text(op);
		}
	});
    $("#neg").click(function() {
        if(!isOp && ans.text() !== "") {
            curVal = -curVal;
            if (ans.text().charAt(0) === "-") {
                ans.text(ans.text().substr(1));
            } else {
                ans.text("-" + ans.text());
            }
        }
    });
	$("#equals").click(function() {
        if (op !== "") {
            switch (op) {
                case "+":
                    result = prevVal + curVal;
                    break;
                case "-":
                    result = prevVal - curVal;
                    break;
                case "*":
                    result = prevVal * curVal;
                    break;
                case "/":
                    result = prevVal / curVal;
                    break;
            }
            curVal = result;
            isFrac = false;
            isOp = false;
            result = +result.toFixed(maxLen);
            var ansText = result.toString();
            if (ansText.length < maxLen) {
                ans.text(ansText);
            } else {
                 ans.text(result.toExponential(maxLen-6).toString());
            }
            wholePart = "";
            fracPart = "";
        }
	});
});
