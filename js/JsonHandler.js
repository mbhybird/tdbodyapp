function processFiles(files) {
    var file = files[0];

    var type = file.name.substring(file.name.lastIndexOf(".") + 1);

    if (window.FileReader) {

        var reader = new FileReader();

        if (type === "json" || type === "txt") {
            reader.onload = function (e) {
                var bodyJson = JSON.parse(e.target.result);
                var height = bodyJson["身高"];
                var neck = bodyJson["颈围"];
                var shoulder = bodyJson["肩宽"];
                var breast = bodyJson["胸围"];
                var waist = bodyJson["腰围"];
                var buttocks = bodyJson["臀围"];
                var knee = bodyJson["膝围"];
                var elbow = bodyJson["肘围"];
                var arm = bodyJson["臂长"];

                character.updateMorphs( {
                    "身高":parseFloat(height) * 10,
                    "臂长":parseFloat(arm) * 10,
                    "肩宽":parseFloat(shoulder) * 10,
                    "臀围":parseFloat(buttocks) * 10,
                    "胸围":parseFloat(breast) * 10,
                    "腰围":parseFloat(waist) * 10,
                    "肘围":parseFloat(elbow) * 10,
                    "膝围":parseFloat(knee) * 10,
                    "颈围":parseFloat(neck) * 10
                } );

                morphConfig["身高"] = parseFloat(height) * 10;
                morphConfig["臂长"] = parseFloat(arm) * 10;
                morphConfig["肩宽"] = parseFloat(shoulder) * 10;
                morphConfig["臀围"] = parseFloat(buttocks) * 10;
                morphConfig["胸围"] = parseFloat(breast) * 10;
                morphConfig["腰围"] = parseFloat(waist) * 10;
                morphConfig["肘围"] = parseFloat(elbow) * 10;
                morphConfig["膝围"] = parseFloat(knee) * 10;
                morphConfig["颈围"] = parseFloat(neck) * 10;

            };

            reader.readAsText(file, "utf-8");
        }
        else {
            alert("请上传json或txt文件！");
        }
    }
    else {
        alert("浏览器不支持，推荐使用Google浏览器！");
    }
}