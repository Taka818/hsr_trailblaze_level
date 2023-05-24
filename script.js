/*
 * マイレージ
 * @type {Array<[number,number]>}
 */
const TRAILBLAZE_EXP = [[450, 0], [500, 450], [550, 950], [610, 1500], [670, 2110], [720, 2780], [780, 3500], [840, 4280], [900, 5120], [960, 6020], [1020, 6980], [1070, 8000], [1130, 9070], [1190, 10200], [1250, 11390], [1310, 12640], [1370, 13950], [1430, 15320], [1500, 16750], [1600, 18250], [1710, 19850], [1830, 21560], [1950, 23390], [2080, 25340], [2210, 27420], [2350, 29630], [2480, 31980], [2620, 34460], [2750, 37080], [2850, 39830], [2960, 42680], [3080, 45640], [3200, 48720], [3330, 51920], [3460, 55250], [3600, 58710], [3730, 62310], [3870, 66040], [4000, 69910], [4140, 73910], [4280, 78050], [4430, 82330], [4570, 86760], [4710, 91330], [4860, 96040], [5000, 100900], [5150, 105900], [5300, 111050], [5440, 116350], [5700, 121790], [6150, 127490], [6630, 133640], [7130, 140270], [7640, 147400], [8170, 155040], [8700, 163210], [9230, 171910], [9780, 181140], [10330, 190920], [20300, 201250], [21780, 221550], [23350, 243330], [24970, 266680], [26630, 291650], [65070, 318280], [68810, 383350], [72490, 452160], [76120, 524650], [79710, 600770], ["-", 680480]];

/**
 * 計算ボタン押下時の処理
 */
function keisanBtn_click() {

    /* 取得 */
    // フォーム
    const formInput = document.forms.form_input;

    // 開拓レベル、マイレージ、マイレージ/日
    let trailblazeLevel = formInput.trailblaze_level;
    let valueTrailblazeLevel = Number(trailblazeLevel.value);
    let trailblazeExp = formInput.trailblaze_exp;
    let valueTrailblazeExp = trailblazeExp.value !== "" ? Number(trailblazeExp.value) : "";
    let trailblazeExpD = formInput.trailblaze_exp_d;
    let valueTrailblazeExpD = trailblazeExpD.value !== "" ? Number(trailblazeExpD.value) : "";

    // 結果テーブル
    var tableResult = document.getElementById("result");
    var tableResultTBody = tableResult.tBodies[0];

    // エラー文
    let error1 = document.getElementById("error_1");
    let error2 = document.getElementById("error_2");
    let error3 = document.getElementById("error_3");

    /* リセット */
    // 入力の枠線を黒に変更
    trailblazeExp.classList.remove("is-invalid");
    trailblazeExpD.classList.remove("is-invalid");

    // 結果テーブルを削除
    document.querySelector('tbody').innerHTML = "";

    // エラー文を非表示
    error1.classList.add("d-none");
    error2.classList.add("d-none");
    error3.classList.add("d-none");

    /* 入力チェック */
    let errorCheck = false;

    // マイレージの上限
    const limitTrailblazeExp = TRAILBLAZE_EXP[valueTrailblazeLevel - 1][0] - 1;

    // 「マイレージ」が未入力の場合、エラー
    console.log("e1:" + valueTrailblazeExp);
    if (valueTrailblazeExp === "" || valueTrailblazeExp < 0) {
        trailblazeExp.classList.add("is-invalid");
        error1.classList.remove("d-none");
        errorCheck = true;
        console.log("e1");
    }
    // 「マイレージ」が入力された開拓レベルの0~上限以外の場合、、エラー
    else if (limitTrailblazeExp < valueTrailblazeExp) {
        trailblazeExp.classList.add("is-invalid");
        error2.classList.remove("d-none");
        error2.innerHTML = "「マイレージ」を範囲内で入力してください（開拓レベル" + valueTrailblazeLevel + "の場合、0以上" + limitTrailblazeExp + "以下）";
        errorCheck = true;
        console.log("e2");
    }

    // 「マイレージ/日」が未入力の場合、エラー
    if (valueTrailblazeExpD === "" || valueTrailblazeExpD < 1) {
        trailblazeExpD.classList.add("is-invalid");
        error3.classList.remove("d-none");
        errorCheck = true;
        console.log("e3");
    }

    // エラーが存在する場合、テーブルを表示しない
    if (errorCheck) { return false; }

    /* 結果テーブルを作成 */
    // 累計マイレージを計算
    let exp = TRAILBLAZE_EXP[valueTrailblazeLevel - 1][1] + valueTrailblazeExp;

    for (let i = valueTrailblazeLevel; i <= 70; i++) {
        let rowTrailblazeExp = TRAILBLAZE_EXP[i - 1];
        let valueTrailblazeExpH = Math.max(rowTrailblazeExp[1] - exp, 0);;
        tableResultTBody.appendChild(createRow(
            i,
            rowTrailblazeExp[0].toLocaleString(),
            rowTrailblazeExp[1].toLocaleString(),
            valueTrailblazeExpH.toLocaleString(),
            Math.ceil(valueTrailblazeExpH / valueTrailblazeExpD).toLocaleString()
        ));
    }
}

/**
 * 行を作成する.
 * @param {*} thString - <th>タグ
 * @param {*} tdStrings - <td>タグ
 * @return {Object} 行
 */
function createRow(thString, ...tdStrings) {

    // 行を生成
    let tr = document.createElement("tr");

    // セルを生成
    // <th>タグ
    tr.appendChild(createTh(thString));
    // <td>タグ
    tdStrings.forEach(tdString => tr.appendChild(createTd(tdString)));

    return tr;
}

/**
 * <th>タグを生成する
 * @param {string} string - 文字列
 * @param {Object} <th>タグ
 */
function createTh(string) {
    let th = document.createElement("th");
    th.scope = "row";
    th.appendChild(document.createTextNode(string));
    return th;
}

/**
 * <td>タグを生成する
 * @param {string} string - 文字列
 * @param {Object} <td>タグ
 */
function createTd(string) {
    let td = document.createElement("td");
    td.appendChild(document.createTextNode(string));
    return td;
}

// フォームのsubmitを禁止する
document.getElementById("form_input").onsubmit = function () { return false }

// ボタン押下時のイベント処理を追加する
const keisanBtn = document.getElementById("keisan");
keisanBtn.addEventListener("click", keisanBtn_click);
