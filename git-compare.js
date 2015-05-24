(function gitHubDiff() {
    var Stack = [];
    var doDiffBtn = document.createElement("BUTTON");

    var commitsFromCommitsPage = document.getElementsByClassName("sha");
    
    var commitsFromReleasesPage = document.getElementsByClassName("octicon-git-commit");
        
    function addGitShaToStack(shaStack, sha) {
        shaStack[0] = shaStack[1];
        shaStack[1] = sha;

        console.log("Added sha: " + sha);
        var btnTxt = "Run Diff: ".concat(shaStack[0]).concat("...").concat(shaStack[1]);

        doDiffBtn.innerHTML = btnTxt;
    }

    function addButton(e, i, a) {
        var btn = document.createElement("BUTTON");
        var onclickFn = function () {
                addGitShaToStack(Stack, this.id);
            };
            
        if (e.classList.contains("sha")) {
            var commitHash = e.textContent.trim();
            btn.id = commitHash;
            btn.onclick = onclickFn;
            e.parentNode.appendChild(btn);
        } else if (e.classList.contains("octicon-git-commit")) {
            var commitHash = e.parentElement.textContent.trim();
            btn.id = commitHash;
            btn.onclick = onclickFn;
            e.parentNode.parentNode.appendChild(btn);
        };
    }

    [].map.call(commitsFromCommitsPage, addButton);
    [].map.call(commitsFromReleasesPage, addButton);

    function goToGitHubDiffPage() {
        var path = window.location.pathname;
        path = path.split("/");
        
        var baseDiffPath = path[1].concat("/").concat(path[2]);
        var diffPath = baseDiffPath.concat("/compare/").concat(Stack[0]).concat("...").concat(Stack[1]);
        var diffUrl = "https://github.com/".concat(diffPath);
        console.log(diffUrl);
        window.location.assign(diffUrl);
    }

    function createDiffBtn(doDiffBtn) {
        var btnTxt = document.createTextNode("Run Diff");
        doDiffBtn.appendChild(btnTxt);

        doDiffBtn.onclick = goToGitHubDiffPage;

        doDiffBtn.style.position = "fixed";
        doDiffBtn.style.top = "10px";
        doDiffBtn.style.right = "20px";

        return doDiffBtn;
    }

    document.body.appendChild(createDiffBtn(doDiffBtn));
})();
